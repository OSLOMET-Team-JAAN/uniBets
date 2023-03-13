using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain
{
    public class User
    {
        public int Id { get; set; }
        public string username { get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;

    
        public string Password { get; set; } = string.Empty;
        public string roles { get; set; } = string.Empty;
    }
}
