using Domain;
using Microsoft.EntityFrameworkCore;


namespace BetAPI.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {

        }

        public DbSet<BetEntity> BetEntities { get; set; }
        public DbSet<User> users { get; set; }

      
        
        
        
    }
   
}
