using Domain;
using System.Security.Cryptography;
using System.Text;

namespace BetAPI.Data
{
    public class seed
    {
        public static async Task SeedData(Context context)
        {
            if (context.users.Any()) return;

      

            var Seeddata = new List<User>
            {
                new User
                {
                  username="ADMIN",
                  email="ADMIN@ADMIN.com",
                 Password=tools.PasswordHashing("ADMIN"),
                 roles ="ADMIN"
                     
                },
                new User
                {
                   
                     username="USER",
                     email="USER@hotmail.com",
                      Password=tools.PasswordHashing("USER"),
                     roles ="USER"
                }

            };
              

            await context.users.AddRangeAsync(Seeddata);
            await context.SaveChangesAsync();
        }
    }
}

