


using BetAPI.Controllers;

using Domain;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Moq;
namespace TestProject
{

    public class authenticationTest
    {



        [Fact]
        public async Task Register_Success()
        {
            // Arrange
            var configuration = new ConfigurationBuilder()
     .AddInMemoryCollection(new Dictionary<string, string>
     {
        {"ConnectionAPIConnectionString",  "Server=LAPTOP-JLAA7SHR\\SQLEXPRESS; Database=BachelorProject;Trusted_Connection=True; MultipleActiveResultSets=True; TrustServerCertificate=True"}
     })
     .Build();

            // Create an instance of AuthenticationController with the mock IConfiguration object
            var controller = new AuthenticationController(configuration);
            var request = new RegisterDTO
            {
                Username = "testuser",
                Password = "password",
                Email = "testuser@example.com"

            };

            // Act
            var result = await controller.Register(request);

            // Assert

            if (result is OkObjectResult okResult)
            {

                NUnit.Framework.Assert.AreEqual(request, okResult.Value);
            }


        }








        [Fact]
        public async Task Register_BadRequest_Exception()
        {
            // Arrange
            var configuration = new ConfigurationBuilder()
                .AddInMemoryCollection(new Dictionary<string, string>
                {
            {"ConnectionAPIConnectionString",  "Server=LAPTOP-JLAA7SHR\\SQLEXPRESS; Database=BachelorProject;Trusted_Connection=True; MultipleActiveResultSets=True; TrustServerCertificate=True"}
                })
                .Build();

            // Create an instance of AuthenticationController with the mock IConfiguration object
            var controller = new AuthenticationController(configuration);
            var request = new RegisterDTO
            {
                Username = "testuser",
                Password = "password",
                Email = "testuser@example.com"
            };

            // Act
            var result = await controller.Register(request) as BadRequestObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.IsAssignableFrom<BadRequestObjectResult>(result);
            Assert.Equal("Failed to register The ConnectionString property has not been initialized.", result.Value);
        }





        [Fact]

        
        public async Task Login_ReturnsOkResult_WhenUsernameAndPasswordAreCorrect()
        {
            // Arrange
            var controller = new AuthenticationController(new ConfigurationBuilder().AddJsonFile("appsettings.json").Build());
            var request = new logginnUser
            {
                Username = "ADMIN",
                Password = "ADMIN"
            };

            // Act
            var result = await controller.Login(request);

            // Assert
            Assert.IsType<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            var response = new
            {
                username = "ADMIN",
                email = "ADMIN@ADMIN.com",
                role = "ADMIN"
            };
            Assert.Equal(response.username, okResult.Value.GetType().GetProperty("username").GetValue(okResult.Value));
            Assert.Equal(response.email, okResult.Value.GetType().GetProperty("email").GetValue(okResult.Value));
            Assert.Equal(response.role, okResult.Value.GetType().GetProperty("role").GetValue(okResult.Value));
            var token = okResult.Value.GetType().GetProperty("token").GetValue(okResult.Value);
            Assert.NotNull(token);
        }



        [Fact]
        public async Task Login_ReturnsBadRequest_WhenUsernameIsIncorrect()
        {
            // Arrange
            var controller = new AuthenticationController(new ConfigurationBuilder().AddJsonFile("appsettings.json").Build());
            var request = new logginnUser
            {
                Username = "nonexistinguser",
                Password = "testpassword"
            };

            // Act
            var result = await controller.Login(request);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
            var badRequestResult = result as BadRequestObjectResult;
            Assert.Equal("username or password are incorrect", badRequestResult.Value);
        }






        [Fact]
        public async Task Login_ReturnsBadRequest_WhenPasswordIsIncorrect()
        {
            // Arrange
            var controller = new AuthenticationController (new ConfigurationBuilder().AddJsonFile("appsettings.json").Build());
            var request = new logginnUser
            {
                Username = "testuser",
                Password = "wrongpassword"
            };

            // Act
            var result = await controller.Login(request);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
            var badRequestResult = result as BadRequestObjectResult;
            Assert.Equal("username or password are incorrect", badRequestResult.Value);
        }




    }
}
