using BetAPI.Data;
using BetAPI.repositories.Contracts;

namespace BetAPI.repositories;

public class AuthenticationRepo : IAuthenticationIrepo
{
    private readonly Context _context;

    public AuthenticationRepo(Context context)
    {
        _context = context;
    }
}