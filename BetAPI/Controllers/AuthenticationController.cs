using BetAPI.Data;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using User = Domain.User;

namespace BetAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthenticationController : ControllerBase
{
    private readonly IConfiguration _conf;
    private Context _context;

    public AuthenticationController(Context context, IConfiguration conf)
    {
        _context = context;
        _conf = conf;
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<ActionResult> Register(RegisterDTO request)
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
    }

    //Login 
    [HttpPost("login")]
    [AllowAnonymous]
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
            /*
                return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
               request,
                Exception = token.ValidTo

            });*/
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

    //create our token 
    private JwtSecurityToken GetToken(List<Claim> authClaim)
    {
        //get the signing key
        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_conf["JWT:Secret"]));


        //create our tokens
        var token = new JwtSecurityToken(
            _conf["JWT:ValidIssuer"],
            _conf["JWT:ValidAudience"],
            expires: DateTime.Now.AddMinutes(1),
            claims: authClaim,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
        );
        return token;
        //now you can create your token in the log in
    }
}