using BetAPI.repositories.Contracts;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol.Core.Types;
using System.Data;
using System.Data.SqlClient;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BetsController : ControllerBase
    {

       private readonly ILogger<BetsController> _logger;

       private readonly Irepo _repository;
        public BetsController(Irepo repository, ILogger<BetsController> logger)
        {
            _repository = repository;
            _logger = logger;

        }
       
        [HttpGet]

        public ActionResult<List<BetEntity>> GetAll()
        {
            try
            {
               
                var result=_repository.GetAll_July_4();
                if (result == null)
                {
                    _logger.LogError("the GET call to /api/getAll fieled");
                    return NotFound();

                }

                _logger.LogInformation("Get: api/movie");
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "the GET call to /api/getAll fieled");
                return StatusCode(StatusCodes.Status500InternalServerError,
                     "Error getting data from the database"
                     );
            }

        }

        }
    }

