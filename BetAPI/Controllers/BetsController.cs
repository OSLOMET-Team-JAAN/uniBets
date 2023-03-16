using BetAPI.repositories.Contracts;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BetAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BetsController : ControllerBase
{
    private readonly ILogger<BetsController> _logger;

    private readonly IRepo _repository;

    public BetsController(IRepo repository, ILogger<BetsController> logger)
    {
        _repository = repository;
        _logger = logger;
    }

    [HttpPost("saveTable")]
    [Authorize(Policy = "ADMIN")]
    public ActionResult SaveTable(List<BetEntity> betList)
    {
        try
        {
            var result = _repository.SaveTable(betList);
            if (result == null)
            {
                _logger.LogError("the POST call to /api/saveTable failed");
                return NotFound();
            }

            _logger.LogInformation("POST: api/Bets");
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "the POST call to /api/saveTable failed");
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error getting data from the database"
            );
        }
    }

    [HttpGet("getAll")]
    public ActionResult<List<BetEntity>> GetAll()
    {
        try
        {
            var result = _repository.GetAll();
            if (result == null)
            {
                _logger.LogError("the GET call to /api/getAll failed");
                return NotFound();
            }

            _logger.LogInformation("Get: api/Bets");
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