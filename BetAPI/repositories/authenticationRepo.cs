using BetAPI.Data;
using BetAPI.repositories.Contracts;
using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BetAPI.repositories
{
    public class authenticationRepo : authenticationIrepo
    {
        private readonly Context _context;
        public authenticationRepo(Context context)
        {
            _context = context;


        }

      /*  public async Task<User> Register(userDTO Request)
        {

        }

        public async Task<User> LoggIn(userDTO Request)
        {
        }*/
    }
}
