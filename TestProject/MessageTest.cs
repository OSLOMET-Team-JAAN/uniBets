

using BetAPI.Controllers;
using BetAPI.repositories.Contracts;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;

namespace TestProject
{
    public class MessageTest
    {
        private readonly Mock<ILogger<MessageController>> _loggerMock;
        private readonly Mock<IMeassage> _messageMock;
        private readonly MessageController _controller;

        public MessageTest()
        {
            _loggerMock = new Mock<ILogger<MessageController>>();
            _messageMock = new Mock<IMeassage>();
            _controller = new MessageController(_messageMock.Object, _loggerMock.Object);
        }

        [Fact]
        public async Task SendMessage_ValidContact_ReturnsSuccessMessage()
        {
            // Arrange
            var contact = new Contact
            {
                Email = "nourhat.hasan@hotmail.com",
                Subject = "Test Subject",
                message = "Test message"
            };

            _messageMock.Setup(x => x.SendMessage(contact)).ReturnsAsync("the mail was sent");

            // Act
            var result = await _controller.SendMessage(contact);

            // Assert
            Assert.IsType<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;
            Assert.Equal("Saved", okResult.Value);
           
        }

        [Fact]
        public async Task SendMessage_InvalidContact_ReturnsBadRequest()
        {
            // Arrange
            var contact = new Contact
            {
                Email = "nourhat.hasan@hotmail.com",
                Subject = "Test Subject",
                message = "Test message"
            };

            _messageMock.Setup(x => x.SendMessage(contact)).ReturnsAsync("the mail was not sent");

            // Act
            var result = await _controller.SendMessage(contact);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
            var badRequestResult = (BadRequestObjectResult)result;
            Assert.Equal("Failed to send email", badRequestResult.Value);
          
        }

        [Fact]
        public async Task SendMessage_ExceptionThrown_ReturnsInternalServerError()
        {
            // Arrange
            var contact = new Contact
            {
                Email = "nourhat.hasan@hotmail.com",
                Subject = "Test Subject",
                message = "Test message"
            };

            _messageMock.Setup(x => x.SendMessage(contact)).ThrowsAsync(new Exception("Test Exception"));

            // Act
            var result = await _controller.SendMessage(contact);

            // Assert
            Assert.IsType<ObjectResult>(result); // changed to ObjectResult
            var objectResult = (ObjectResult)result; // cast to ObjectResult
            Assert.Equal(StatusCodes.Status500InternalServerError, objectResult.StatusCode);
            Assert.Equal("Error sending a message", objectResult.Value); // verify the response body
           
        }


        [Fact]
        public void GetAll_ReturnsOkResult_WithListOfMessages()
        {
            // Arrange
            var messages = new List<Contact>
        {
            new Contact { Id = 1, Email = "nourhat.hasan@hotmail.com", Subject = "Test1", message = "Test message 1" }
            
        };
            _messageMock.Setup(x => x.GetMessages()).Returns(messages);

            // Act
            var result = _controller.GetAll();

            // Assert
            var actionResult = Assert.IsType<ActionResult<List<Contact>>>(result);
            Assert.IsType<OkObjectResult>(actionResult.Result);

            var okResult = actionResult.Result as OkObjectResult;
            var model = Assert.IsAssignableFrom<List<Contact>>(okResult.Value);
            Assert.Equal(1, model.Count);
        }

        [Fact]
        public void GetAll_ReturnsNotFound_WhenMessagesIsNull()
        {
            // Arrange
            _messageMock.Setup(x => x.GetMessages()).Returns((List<Contact>)null);

            // Act
            var result = _controller.GetAll();

            // Assert
          
            var actionResult = Assert.IsType<ActionResult<List<Contact>>>(result);
            Assert.Null(actionResult.Value);
        }

        [Fact]
        public void GetAll_ReturnsInternalServerError_OnException()
        {
            // Arrange
            _messageMock.Setup(x => x.GetMessages()).Throws(new Exception("Test Exception"));

            // Act
            var result = _controller.GetAll();
            var objectResult = Assert.IsType<ObjectResult>(result.Result);

            // Assert
            Assert.Equal(StatusCodes.Status500InternalServerError, objectResult.StatusCode);
            Assert.Equal("Error getting data from the database", objectResult.Value);
        }
    }
}
 

