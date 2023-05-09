using BetAPI.repositories.Contracts;
using Domain;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol.Core.Types;

namespace BetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : Controller
    {
        private readonly ILogger<MessageController> _logger;

        private readonly IMeassage _meesage;

        public MessageController(IMeassage meesage, ILogger<MessageController> logger)
        {
            _meesage = meesage;
            _logger = logger;
        }

        


        [HttpPost("submit")]
        public async Task<IActionResult> SendMessage(Contact request)
        {
            try
            {
                var result = await _meesage.SendMessage(request);
                if (result == "the mail was not sent")
                {
                    _logger.LogError("Failed to send email");
                    return BadRequest("Failed to send email");
                }

                _logger.LogInformation("POST: api/message");
                return Ok("Saved");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error sending message");
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error sending a message"
                );
            }
        }



        [HttpGet ("get_inbox")]
        public ActionResult<List<Contact>> GetAll()
        {
            try
            {
                var result = _meesage.GetMessages();
                if (result == null)
                {
                    _logger.LogError("the GET call to /api/getMessages failed");
                    return NotFound();
                }

                _logger.LogInformation("Get: api/Message");
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "the GET call to /api/getAll failed");
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error getting data from the database"
                );
            }
        }
    }
}
