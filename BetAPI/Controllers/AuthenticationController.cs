using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BetAPI.Data;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;


namespace BetAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthenticationController : ControllerBase
{
    private readonly IConfiguration _conf;
   // private readonly Context _context;

    public AuthenticationController( IConfiguration conf)
    {
       
        _conf = conf;
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<ActionResult> Register(RegisterDTO request)
    {

        try
        {
            var connString = _conf.GetConnectionString("ConnectionAPIConnectionString");
            using (SqlConnection con = new SqlConnection(connString))
            {
                await con.OpenAsync();

                var sql = "SELECT * FROM Users WHERE Username = @Username";
                using (SqlCommand cmd = new SqlCommand(sql, con))
                {
                    
                     cmd.Parameters.AddWithValue("@Username", request.Username);
                     using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                     {
                         if (reader.HasRows)
                         {
                             return BadRequest("Username already exists");
                         }
                     }

                  
                }

                request.Password = tools.PasswordHashing(request.Password);

                var sqlInsert = "INSERT INTO Users (Username, Password, Email, Role) " +
                                "VALUES (@Username, @Password, @Email, @Role)";
                using (SqlCommand cmd = new SqlCommand(sqlInsert, con))
                {
                    cmd.Parameters.AddWithValue("@Username", request.Username);
                    cmd.Parameters.AddWithValue("@Password", request.Password);
                    cmd.Parameters.AddWithValue("@Email", request.Email);
                    cmd.Parameters.AddWithValue("@Role", "USER");

                    await cmd.ExecuteNonQueryAsync();
                }
            }

            return Ok(request);
        }
        catch (Exception ex)
        {
            return BadRequest($"Failed to register {ex.Message}");
        }
    }

  

    //Login 
    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<ActionResult> Login(logginnUser request)
    {

        try
        {
            //hash the password
            var inPassword = tools.PasswordHashing(request.Password);

            //connect to database
            var connString = _conf.GetConnectionString("ConnectionAPIConnectionString");
            using (SqlConnection conn = new SqlConnection(connString))
            {
                //open connection
                await conn.OpenAsync();

                //create query command
                var query = "SELECT * FROM Users WHERE Username = @username AND Password = @password";
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@username", request.Username);
                    cmd.Parameters.AddWithValue("@password", inPassword);

                    //execute query and read results
                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        if (!reader.HasRows) return BadRequest("username or password are incorrect");
                        reader.Read();

                        //create auth claim
                        var authClaim = new List<Claim>
                    {
                        new("UserId", reader.GetInt32(reader.GetOrdinal("Id")).ToString()),
                        new(ClaimTypes.Name, reader.GetString(reader.GetOrdinal("Username"))),
                        new("Username", reader.GetString(reader.GetOrdinal("Username"))),
                        new("Email", reader.GetString(reader.GetOrdinal("Email"))),
                        new(ClaimTypes.Role, reader.GetString(reader.GetOrdinal("Role")))
                    };

                        //create user object
                        var loggedInUser = new User
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Username = reader.GetString(reader.GetOrdinal("Username")),
                            Email = reader.GetString(reader.GetOrdinal("Email")),
                            Role = reader.GetString(reader.GetOrdinal("Role")),
                            Password = reader.GetString(reader.GetOrdinal("Password"))
                        };

                        //get our token
                        var token = GetToken(authClaim);

                        //return our token
                        return Ok(new
                        {
                            username = loggedInUser.Username,
                            email = loggedInUser.Email,
                            role = loggedInUser.Role,
                            token = new JwtSecurityTokenHandler().WriteToken(token)
                        });
                    }
                }
            }
        }
        catch (Exception ex)
        {
            return BadRequest($"Failed to login {ex.Message}");
        }
    }



    //create our token 
    private JwtSecurityToken GetToken(List<Claim> authClaim)
    {
        //get the signing key
        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_conf["JWT:Secret"]));


        //create our tokens
        var token = new JwtSecurityToken(
            _conf["JWT:ValidIssuer"],
            _conf["JWT:ValidAudience"],
            expires: DateTime.Now.AddMinutes(30),
            claims: authClaim,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
        );
        return token;
        //now you can create your token in the log in
    }
}






/*
 * 
 * the methods with entity framework core
   *  public async Task<ActionResult> Register(RegisterDTO request)
{
  try
  {
      var dbUser = await _context.Users.Where(u => u.Username == request.Username).FirstOrDefaultAsync();
      if (dbUser != null) return BadRequest("username exist already");

      //hash the password
      request.Password = tools.PasswordHashing(request.Password);

      var user = new User
      {
          Username = request.Username,
          Password = request.Password,
          Email = request.Email,
          Role = "USER"
      };

      _context.Users.Add(user);

      await _context.SaveChangesAsync();
      return Ok(user);
  }
  catch (Exception ex)
  {
      return BadRequest($"Failed to register {ex.Message}");
  }
 public async Task<ActionResult> Login(logginnUser request)
    {
        try
        {
            tools.PasswordHashing(request.Password);
            var inPassword = tools.PasswordHashing(request.Password);
            var dbUser = await _context.Users.Where(u => u.Username == request.Username && u.Password == inPassword)
                .FirstOrDefaultAsync();

            if (dbUser == null) return BadRequest("username or password are incorrect");
            var authClaim = new List<Claim>
            {
                new("UserId", dbUser.Id.ToString()),
                new(ClaimTypes.Name, dbUser.Username),
                new("Username", dbUser.Username),
                new("Email", dbUser.Email),
                new(ClaimTypes.Role, dbUser.Role)
            };


            var loggedInUser = new User
            {
                Id = dbUser.Id,
                Username = dbUser.Username,
                Email = dbUser.Email,
                Role = dbUser.Role,
                Password = dbUser.Password
            };
            //get our token 
            var token = GetToken(authClaim);

            //return our token 
            
                return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
               request,
                Exception = token.ValidTo

            });
            return Ok(new
            {
                username = loggedInUser.Username,
                email = loggedInUser.Email,
                role = loggedInUser.Role,
                //  Password =request.Password,
                token = new JwtSecurityTokenHandler().WriteToken(token)
            });
        }
        catch (Exception ex)
        {
    return BadRequest($"Failed to login {ex.Message}");
}
    }



}*/