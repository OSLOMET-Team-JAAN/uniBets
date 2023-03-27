using BetAPI.Controllers;
using BetAPI.repositories.Contracts;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BetAPI.extra
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoredProcedureController : ControllerBase
    {
        private readonly ILogger<StoredProcedureController> _logger;

        private readonly IExtra _repository;

        public StoredProcedureController(IExtra repository, ILogger<StoredProcedureController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet("july_4")]
        public ActionResult<List<BetEntity>> GetAll_july4()
        {
            try
            {
                var result = _repository.GetAll_July_4();
                if (result == null)
                {
                    _logger.LogError("the GET call to /api/getAll fieled");
                    return NotFound();
                }
                _logger.LogInformation("Get: api/Bets");
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




        [HttpGet("july_11")]
        public ActionResult<List<BetEntity>> GetAll_july11()
        {
            try
            {
                var result = _repository.GetAll_July_11();
                if (result == null)
                {
                    _logger.LogError("the GET call to /api/getAll fieled");
                    return NotFound();
                }
                _logger.LogInformation("Get: api/Bets");
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




        [HttpGet("july_18")]
        public ActionResult<List<BetEntity>> GetAll_july18()
        {
            try
            {
                var result = _repository.GetAll_July_18();
                if (result == null)
                {
                    _logger.LogError("the GET call to /api/getAll fieled");
                    return NotFound();
                }
                _logger.LogInformation("Get: api/Bets");
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


        [HttpGet("july_25")]
        public ActionResult<List<BetEntity>> GetAll_july25()
        {
            try
            {
                var result = _repository.GetAll_July_25();
                if (result == null)
                {
                    _logger.LogError("the GET call to /api/getAll fieled");
                    return NotFound();
                }
                _logger.LogInformation("Get: api/Bets");
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
