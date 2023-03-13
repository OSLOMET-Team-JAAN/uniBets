using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Domain
{

    public class authenticationRequest
    {
      

        public int Id { get; set; }
        public string username { get; set; }
        public string email { get; set; }
        public string roles { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }



        public authenticationRequest(User user,string token)
        {
            Id = user.Id;
            username = user.username;
            email = user.email;
            roles =user.roles;
            Password = user.Password;
            Token = token;
        }

      
    }


}
