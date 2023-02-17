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

      
        
        /*
        
        //to avoid getting primary key error
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BetEntity>().ToTable("entity_table");
            base.OnModelCreating(modelBuilder);
        }
        */
        
    }
   
}
