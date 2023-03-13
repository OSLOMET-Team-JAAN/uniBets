using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
   public class userDTO
    {
        public string Username { get; set;}
        public string Password { get; set; }
        public string email { get; set; } = string.Empty;
        public string roles { get; set; } = string.Empty;
    }
}
