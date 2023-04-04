using System.ComponentModel.DataAnnotations;

namespace Domain;

public class RegisterDTO
{
    [Required] 
    //[MinLength(8)] 
    public string Username { get; set; } = string.Empty;

    [Required] 
    //[EmailAddress] 
    public string Email { get; set; } = string.Empty;


    [Required]
    //[RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "create a complex password")]
    public string Password { get; set; } = string.Empty;
}