using BetAPI.repositories.Contracts;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol.Core.Types;
using System.Collections.Generic;
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



    [HttpGet ("july_4")]

      
        public ActionResult<List<BetEntity>> GetAll_july4()
        {
            try
            {
               
                var result=_repository.GetAll_July_4();
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


        [HttpPost("saveTable")]
        [Authorize(Policy = roles.MustBeTheOwner)]
        public ActionResult saveTable(List<BetEntity> betList)
        {
            try
            {

                var result = _repository.saveBetEntity_4(betList);
                if (result == null)
                {
                    _logger.LogError("the POST call to /api/saveTable fieled");
                    return NotFound();

                }

                _logger.LogInformation("POST: api/Bets");
                return Ok(result);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "the POST call to /api/saveTable fieled");
                return StatusCode(StatusCodes.Status500InternalServerError,
                     "Error getting data from the database"
                     );
            }

        }



        [HttpGet ("getAll")]

        public ActionResult<List<BetEntity>> GetAll()
        {
            try
            {

                var result = _repository.getSavedBetEntities();
                if (result == null)
                {
                    _logger.LogError("the GET call to /api/getSavedEntities fieled");
                    return NotFound();

                }

                _logger.LogInformation("Get: api/Bets");
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "the GET call to /api/getSavedEntities fieled");
                return StatusCode(StatusCodes.Status500InternalServerError,
                     "Error getting data from the database"
                     );
            }
        }
    }
}

