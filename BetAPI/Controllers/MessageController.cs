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

        [HttpPost("sendMessage")]
        public IActionResult SendMessage(Contact request)
        {
            try
            {

                var result = _meesage.SendMessage(request);
                if (result == null)
                {
                    _logger.LogError("the POST call to /api/sendMessage failed");
                    return NotFound();
                }

                _logger.LogInformation("POST: api/message");
                return Ok("saved");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "the POST call to /api/sendMessage failed");
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error sending a message"
                );
            }
        }


        [HttpGet ("messages")]
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
