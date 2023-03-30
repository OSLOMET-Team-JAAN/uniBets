﻿using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;



namespace Domain
{
    public class RegisterDTO
    {
        [Required]
        [MinLength(6)]
        public string Username { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string email { get; set; } = string.Empty;


        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "create a complex password")]
        public string Password { get; set; } = string.Empty;
    }
}