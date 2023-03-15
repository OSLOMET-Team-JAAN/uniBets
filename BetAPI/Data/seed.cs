using Domain;

namespace BetAPI.Data
{
    public class Seed
    {
        public static async Task SeedData(Context context)
        {
            if (context.Users.Any()) return;

            var seedData = new List<User>
            {
                new()
                {
                  Username="ADMIN",
                  Email="ADMIN@ADMIN.com",
                 Password=tools.PasswordHashing("ADMIN"),
                 Role ="ADMIN"
                },
                new()
                {
                    Username="USER",
                    Email="USER@hotmail.com",
                    Password=tools.PasswordHashing("USER"),
                    Role ="USER"
                }
            };
              

            await context.Users.AddRangeAsync(seedData);
            await context.SaveChangesAsync();
        }
    }
}

