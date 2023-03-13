
using BetAPI;
using BetAPI.Data;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Windows.System;
using Windows.UI;
using User = Domain.User;

namespace BetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase {

        private readonly IConfiguration _conf;
        private Context _context;
      
        public AuthenticationController(Context context, IConfiguration conf)
        {
            _context = context;
            _conf = conf;
           
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ActionResult> Register(RegisterDTO Request)
        {
            try
            {
                var dbUser = await _context.users.Where(u => u.username == Request.Username).FirstOrDefaultAsync();
                if (dbUser != null)
                {
                    return BadRequest("username exsist already");
                }

                //hash the password
                Request.Password = tools.PasswordHashing(Request.Password);

                User user = new User
                {
                    username = Request.Username,
                    Password = Request.Password,
                    email = Request.email,
                    roles = "USER"
                };

                _context.users.Add(user);

                await _context.SaveChangesAsync();




                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to register {ex.Message}");
            }

        }








   //logginn 
   [HttpPost("logginn")]
    [AllowAnonymous]

    public async Task<ActionResult> logginn(logginnUser request)
    {
        try
        {tools.PasswordHashing(request.Password);
            string Innpassword = tools.PasswordHashing(request.Password);
            var dbUser = await _context.users.Where(u => u.username == request.Username && u.Password == Innpassword).FirstOrDefaultAsync();

            if (dbUser == null)
            {
                return BadRequest("username or password are incorect");
            }
            List<Claim> authClaim = new List<Claim>
        {
            new Claim("UserId",dbUser.Id.ToString()),
            new Claim(ClaimTypes.Name, dbUser.username),
            new Claim("userName", dbUser.username),
            new Claim("email",dbUser.email),
            new Claim(ClaimTypes.Role,dbUser.roles )
        };


                var LogdInUser = new User
                {
                    Id = dbUser.Id,
                    username = dbUser.username,
                    email = dbUser.email,
                    roles = dbUser.roles,
                    Password=dbUser.Password

                };
            //get our token 
            var token = this.GetToken(authClaim);





                //return our token 
                /*
                    return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                   request,
                    Exception = token.ValidTo

                });*/


                return Ok(new
                {
                    username = LogdInUser.username,
                    email = LogdInUser.email,
                    role = LogdInUser.roles,
                  //  Password =request.Password,
                    token = new JwtSecurityTokenHandler().WriteToken(token)


                }
                    );
               
        }
        catch (Exception ex)
        {
            return BadRequest($"Failed to login {ex.Message}");
        }
    }



    //create our token 
    private JwtSecurityToken GetToken(List<Claim> AuthClaim)
    {
        //get the signing key
        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_conf["JWT:Secret"]));


        //create our tokens
        var token = new JwtSecurityToken(
            issuer: _conf["JWT:ValidIssuer"],
            audience: _conf["JWT:ValidAudience"],
            expires: DateTime.Now.AddMinutes(30),
            claims: AuthClaim,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );
        return token;
        //now you can create your token in the log in
    }

}

}




/*



        //logginn 
        [HttpPost("logginn")]
        [AllowAnonymous]

public async Task<authenticationRequest> logginn(authenticationRequest request)
{
    tools.PasswordHashing(request.Password);
    string Innpassword = tools.PasswordHashing(request.Password);
    var user = await _context.users.Where(u => u.username == request.username && u.Password == Innpassword).FirstOrDefaultAsync();

    // return null if user not found
    if (user == null) return null;

    // authentication successful so generate jwt token
    var token = generateJwtToken(user);

    return new authenticationRequest(user, token);



}



public User GetById(int id)
{
    return _context.users.Where(u => u.Id == id).FirstOrDefault();
}




// helper methods

private string generateJwtToken(User user)
{
    // generate token that is valid for 7 days
    var tokenHandler = new JwtSecurityTokenHandler();
    var key =Encoding.ASCII.GetBytes(_appSettings.Secret);
    var tokenDescriptor = new SecurityTokenDescriptor 
    {
        Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
        Expires = DateTime.UtcNow.AddDays(7),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
    };
    var token = tokenHandler.CreateToken(tokenDescriptor);
    return tokenHandler.WriteToken(token);
}


    }

   
    
}

*/