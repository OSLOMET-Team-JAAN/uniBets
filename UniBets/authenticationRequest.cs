namespace Domain;

public class authenticationRequest
{
    public authenticationRequest(User user, string token)
    {
        Id = user.Id;
        Username = user.Username;
        Email = user.Email;
        Role = user.Role;
        Password = user.Password;
        Token = token;
    }

    public int Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Role { get; set; }
    public string Password { get; set; }
    public string Token { get; set; }
}