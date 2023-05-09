

using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Contact
    {

        public int Id { get; set; }
        [Required]
        
        public string Email { get; set; }

        [Required]
        public string Subject { get; set; }

        [Required]
        public string message { get; set; }
    }
}
