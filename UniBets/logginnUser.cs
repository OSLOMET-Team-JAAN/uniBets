using System.ComponentModel.DataAnnotations;

namespace Domain;

public class logginnUser
{
    [Required] public string Username { get; set; }

    [Required] public string Password { get; set; }
}