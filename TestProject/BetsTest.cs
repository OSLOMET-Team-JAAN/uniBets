using BetAPI.Data;
using BetAPI.repositories;
using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Moq;

namespace TestProject
{
    public class BetsTest
    {
        private readonly IConfiguration _configuration;
        private readonly DbContextOptions<Context> _dbContextOptions;

      /*  public BetsTest()
        {
            var mockConfiguration = new Mock<IConfiguration>();
            mockConfiguration.Setup(x => x["ConnectionAPIConnectionString"])
                .Returns("Server = LAPTOP - JLAA7SHR\\SQLEXPRESS; Database = BachelorProject; Trusted_Connection = True; MultipleActiveResultSets = True; TrustServerCertificate = True"
               );

            _configuration = mockConfiguration.Object;

            _dbContextOptions = new DbContextOptionsBuilder<Context>()
                .UseSqlServer(_configuration.GetConnectionString("ConnectionAPIConnectionString"))
                .Options;
        }
      */
         public BetsTest()
         {
             _configuration = new ConfigurationBuilder()
                 .AddInMemoryCollection(new Dictionary<string, string>
                 {
                 {"ConnectionStrings:ConnectionAPIConnectionString", "Server=(localdb)\\mssqllocaldb;Database=TestDB;Trusted_Connection=True;MultipleActiveResultSets=true"}
                 })
                 .Build();

             _dbContextOptions = new DbContextOptionsBuilder<Context>()
                 .UseSqlServer(_configuration.GetConnectionString("ConnectionAPIConnectionString"))
                 .Options;
         }

       




        [Fact]
        public async Task SaveTable_InsertsDataIntoDatabase()
        {
            // Arrange
            var betList = new List<BetEntity>
    {
        new BetEntity
        {
            Player_no = 1,
            PLAYER_BET_NUMBER = 1,
            BET_PLACED_DATE = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"),
            OVER_1000_SEK = "Yes",
            EVENT_NAME = "Event 1",
            LEAGUE = "League 1",
            BET_OFFER_TYPE = "Offer 1",
            CRITERIA_NAME = "Criteria 1",
            IS_LIVE = "Yes",
            BET_LABEL = "Label 1",
            ODDS = 1.23M,
            BET_OUTCOME = "Win"
             }
           };

            using (var context = new Context(_dbContextOptions))
            {
                context.BetEntity.RemoveRange(context.BetEntity); // empty the context
                await context.SaveChangesAsync();

                var betRepo = new BetRepo(_configuration, context);

                // Act
                await betRepo.SaveTable(betList);

                // Assert
                var count = await context.BetEntity.CountAsync();
                Assert.Equal(1, count);
            }
        }




        [Fact]
        public async Task SaveTable_InsertsMultipleRecordsIntoDatabase()
        {
            // Arrange
            var betList = new List<BetEntity>
    {
        new BetEntity
        {
            Player_no = 1,
            PLAYER_BET_NUMBER = 1,
            BET_PLACED_DATE = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"),
            OVER_1000_SEK = "Yes",
            EVENT_NAME = "Event 1",
            LEAGUE = "League 1",
            BET_OFFER_TYPE = "Offer 1",
            CRITERIA_NAME = "Criteria 1",
            IS_LIVE = "Yes",
            BET_LABEL = "Label 1",
            ODDS = 1.23M,
            BET_OUTCOME = "Win"
        },
        new BetEntity
        {
            Player_no = 2,
            PLAYER_BET_NUMBER = 2,
            BET_PLACED_DATE = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"),
            OVER_1000_SEK = "No",
            EVENT_NAME = "Event 2",
            LEAGUE = "League 2",
            BET_OFFER_TYPE = "Offer 2",
            CRITERIA_NAME = "Criteria 2",
            IS_LIVE = "No",
            BET_LABEL = "Label 2",
            ODDS = 2.34M,
            BET_OUTCOME = "Loss"
        }
    };

            using (var context = new Context(_dbContextOptions))
            {
                context.BetEntity.RemoveRange(context.BetEntity); // empty the context
                await context.SaveChangesAsync();

                var betRepo = new BetRepo(_configuration, context);

                // Act
                await betRepo.SaveTable(betList);

                // Assert
                var count = await context.BetEntity.CountAsync();
                Assert.Equal(2, count);
            }
        }






        [Fact]
        public async Task SaveTable_UpdatesExistingRecordInDatabase()
        {
            // Arrange
            var betList = new List<BetEntity>
    {
        new BetEntity
        {
            Player_no = 144,
            PLAYER_BET_NUMBER = 5,
            BET_PLACED_DATE ="2022-07-03 15:31:53",
            OVER_1000_SEK = "Yes",
            EVENT_NAME = "Djurg?rdens IF - Hammarby IF",
            LEAGUE = "Allsvenskan",
            BET_OFFER_TYPE = "Asian Over/Under",
            CRITERIA_NAME = "Asian Total 1.5",
            IS_LIVE = "Y",
            BET_LABEL = "Over",
            ODDS = 1.72M,
            BET_OUTCOME = "Bet Lost"
        }
    };

            using (var context = new Context(_dbContextOptions))
            {
                context.BetEntity.RemoveRange(context.BetEntity); // empty the context
                await context.SaveChangesAsync();

                // Create a new BetRepo object
                var betRepo = new BetRepo(_configuration, context);

                // Save the initial record
                await betRepo.SaveTable(betList);

                // Update the record in the list
                var updatedBet = betList.FirstOrDefault();
                updatedBet.BET_OUTCOME = "Bet Lost";

                // Act
                await betRepo.SaveTable(betList);

                // Assert
                using (var updatedContext = new Context(_dbContextOptions))
                {
                    var updatedBetEntity = updatedContext.BetEntity.FirstOrDefault();
                    Assert.NotNull(updatedBetEntity);
                    Assert.Equal("Bet Lost", updatedBetEntity.BET_OUTCOME);
                }
            }
        }



        [Fact]
        public void GetAll_ReturnsAllBetsInDatabase()
        {


            // Arrange
            var optionsBuilder = new DbContextOptionsBuilder<Context>();
            optionsBuilder.UseSqlServer("Server=LAPTOP-JLAA7SHR\\SQLEXPRESS; Database=BachelorProject;Trusted_Connection=True; MultipleActiveResultSets=True; TrustServerCertificate=True");

            using var context = new Context(optionsBuilder.Options);
            context.BetEntity.AddRange(new List<BetEntity>()
    {
        new BetEntity()
        {
            Player_no = 1,
            PLAYER_BET_NUMBER = 1,
            BET_PLACED_DATE = "2022-05-09",
            OVER_1000_SEK = "Yes",
            EVENT_NAME = "Event 1",
            LEAGUE = "League 1",
            BET_OFFER_TYPE = "Offer Type 1",
            CRITERIA_NAME = "Criteria 1",
            IS_LIVE = "No",
            BET_LABEL = "Label 1",
            ODDS = 1.5M,
            BET_OUTCOME = "Win"
        },
        new BetEntity()
        {
            Player_no = 2,
            PLAYER_BET_NUMBER = 2,
            BET_PLACED_DATE = "2022-05-10",
            OVER_1000_SEK = "No",
            EVENT_NAME = "Event 2",
            LEAGUE = "League 2",
            BET_OFFER_TYPE = "Offer Type 2",
            CRITERIA_NAME = "Criteria 2",
            IS_LIVE = "Yes",
            BET_LABEL = "Label 2",
            ODDS = 2.5M,
            BET_OUTCOME = "Lose"
        }
    });
            context.SaveChanges();

            var configuration = new ConfigurationBuilder()
    .AddInMemoryCollection(new List<KeyValuePair<string, string>>
    {
        new KeyValuePair<string, string>("ConnectionStrings:ConnectionAPIConnectionString",  "Server=LAPTOP-JLAA7SHR\\SQLEXPRESS; Database=BachelorProject;Trusted_Connection=True; MultipleActiveResultSets=True; TrustServerCertificate=True")
    })
    .Build();

            var repository = new BetRepo(configuration,context);

            // Act
            var bets = repository.GetAll();

            // Assert
            Assert.NotNull(bets);
           // Assert.Equal(2, bets.Count);
            Assert.All(bets, bet =>
            {
                Assert.NotNull(bet);
                Assert.NotEqual(0, bet.Player_no);
                Assert.NotEqual(0, bet.PLAYER_BET_NUMBER);
            });
        }

    }
}