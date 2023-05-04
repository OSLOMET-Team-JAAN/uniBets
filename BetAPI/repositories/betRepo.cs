using System.Data;
using BetAPI.Data;
using BetAPI.repositories.Contracts;
using Domain;
using Microsoft.Data.SqlClient;

namespace BetAPI.repositories;

public class BetRepo : IRepo
{
    private readonly IConfiguration _configuration;
    private readonly Context _db;

    public BetRepo(IConfiguration configuration, Context db)
    {
        _configuration = configuration;
        _db = db;
    }


    //just for the admin
    public async Task SaveTable(List<BetEntity> betList)
    {
        if (betList == null) return;

        //-- Checking for data existence
        var insertQuery = @"IF NOT EXISTS
                (
                    SELECT *
                    FROM BetEntity
                    WHERE Player_no = @Player_no
                          AND PLAYER_BET_NUMBER = @PLAYER_BET_NUMBER
                          AND BET_PLACED_DATE = @BET_PLACED_DATE
                          AND OVER_1000_SEK = @OVER_1000_SEK
                          AND EVENT_NAME = @EVENT_NAME
                          AND LEAGUE = @LEAGUE
                          AND BET_OFFER_TYPE = @BET_OFFER_TYPE
                          AND CRITERIA_NAME = @CRITERIA_NAME
                          AND IS_LIVE = @IS_LIVE
                          AND BET_LABEL = @BET_LABEL
                          AND BET_OUTCOME = @BET_OUTCOME
                )
                BEGIN
                    INSERT INTO BetEntity
                    (
                        Player_no, PLAYER_BET_NUMBER, BET_PLACED_DATE,
                        OVER_1000_SEK, EVENT_NAME, LEAGUE,
                        BET_OFFER_TYPE, CRITERIA_NAME, IS_LIVE,
                        BET_LABEL, ODDS,BET_OUTCOME
                    )
                    VALUES
                    (@Player_no, @PLAYER_BET_NUMBER, @BET_PLACED_DATE, 
                    @OVER_1000_SEK, @EVENT_NAME, @LEAGUE, 
                    @BET_OFFER_TYPE, @CRITERIA_NAME, @IS_LIVE, 
                    @BET_LABEL, @ODDS, @BET_OUTCOME);
                END; ";
        await using (var destinationConnection =
                     new SqlConnection(_configuration.GetConnectionString("ConnectionAPIConnectionString")))
        await using (var insertCommand = new SqlCommand(insertQuery, destinationConnection))
        {
            //the data we add 
            insertCommand.Parameters.Add("@Player_no", SqlDbType.Int);
            insertCommand.Parameters.Add("@PLAYER_BET_NUMBER", SqlDbType.Int);
            insertCommand.Parameters.Add("@BET_PLACED_DATE", SqlDbType.NVarChar);
            insertCommand.Parameters.Add("@OVER_1000_SEK", SqlDbType.NVarChar);
            insertCommand.Parameters.Add("@EVENT_NAME", SqlDbType.NVarChar);
            insertCommand.Parameters.Add("@LEAGUE", SqlDbType.NVarChar);
            insertCommand.Parameters.Add("@BET_OFFER_TYPE", SqlDbType.NVarChar);
            insertCommand.Parameters.Add("@CRITERIA_NAME", SqlDbType.NVarChar);
            insertCommand.Parameters.Add("@IS_LIVE", SqlDbType.NVarChar);
            insertCommand.Parameters.Add("@BET_LABEL", SqlDbType.NVarChar);
            insertCommand.Parameters.Add("@ODDS", SqlDbType.Decimal);
            insertCommand.Parameters.Add("@BET_OUTCOME", SqlDbType.NVarChar);


            destinationConnection.Open();
            foreach (var item in betList)
            {
                insertCommand.Parameters["@Player_no"].Value = item.Player_no;
                insertCommand.Parameters["@PLAYER_BET_NUMBER"].Value = item.PLAYER_BET_NUMBER;
                insertCommand.Parameters["@BET_PLACED_DATE"].Value = item.BET_PLACED_DATE;
                insertCommand.Parameters["@OVER_1000_SEK"].Value = item.OVER_1000_SEK;
                insertCommand.Parameters["@EVENT_NAME"].Value = item.EVENT_NAME;
                insertCommand.Parameters["@LEAGUE"].Value = item.LEAGUE;
                insertCommand.Parameters["@BET_OFFER_TYPE"].Value = item.BET_OFFER_TYPE;
                insertCommand.Parameters["@CRITERIA_NAME"].Value = item.CRITERIA_NAME;
                insertCommand.Parameters["@IS_LIVE"].Value = item.IS_LIVE;
                insertCommand.Parameters["@BET_LABEL"].Value = item.BET_LABEL;
                insertCommand.Parameters["@ODDS"].Value = item.ODDS;
                insertCommand.Parameters["@BET_OUTCOME"].Value = item.BET_OUTCOME;
                insertCommand.ExecuteNonQuery();
            }
        }

        await Task.CompletedTask;
    }


    public List<BetEntity> GetAll()
    {
        var connString = _configuration.GetConnectionString("ConnectionAPIConnectionString");
        var con = new SqlConnection(connString);
        var cmd = new SqlCommand("SELECT * FROM BetEntity", con);
        var selectQuery = "SELECT *  FROM BetEntity";

        var da = new SqlDataAdapter(selectQuery, con);
        var dt = new DataTable();
        da.Fill(dt);


        //create a list of data from the table
        var list = new List<BetEntity>();
        if (dt.Rows.Count <= 0) return null;
        for (var i = 0; i < dt.Rows.Count; i++)
        {
            var bet = new BetEntity();
            bet.Player_no = Convert.ToInt32(dt.Rows[i]["Player_no"]);
            bet.PLAYER_BET_NUMBER = Convert.ToInt32(dt.Rows[i]["PLAYER_BET_NUMBER"]);
            bet.BET_PLACED_DATE = dt.Rows[i]["BET_PLACED_DATE"].ToString();
            bet.OVER_1000_SEK = dt.Rows[i]["OVER_1000_SEK"].ToString();
            bet.EVENT_NAME = dt.Rows[i]["EVENT_NAME"].ToString();
            bet.LEAGUE = dt.Rows[i]["LEAGUE"].ToString();
            bet.BET_OFFER_TYPE = dt.Rows[i]["BET_OFFER_TYPE"].ToString();
            bet.CRITERIA_NAME = dt.Rows[i]["CRITERIA_NAME"].ToString();
            bet.IS_LIVE = dt.Rows[i]["IS_LIVE"].ToString();
            bet.BET_LABEL = dt.Rows[i]["BET_LABEL"].ToString();
            bet.ODDS = Convert.ToDecimal(dt.Rows[i]["ODDS"]);
            bet.BET_OUTCOME = dt.Rows[i]["BET_OUTCOME"].ToString();

            list.Add(bet);
        }

        if (list.Count > 0) return list;
        return null;
    }
}


/*
 * public async Task SaveTable(List<BetEntity> betList)
{
    if (betList == null) return;

   
    foreach (var item in betList)
    {
        var existingBet = await _db.BetEntities
            .FirstOrDefaultAsync(b => b.Player_no == item.Player_no &&
                                       b.PLAYER_BET_NUMBER == item.PLAYER_BET_NUMBER &&
                                       b.BET_PLACED_DATE == item.BET_PLACED_DATE &&
                                       b.OVER_1000_SEK == item.OVER_1000_SEK &&
                                       b.EVENT_NAME == item.EVENT_NAME &&
                                       b.LEAGUE == item.LEAGUE &&
                                       b.BET_OFFER_TYPE == item.BET_OFFER_TYPE &&
                                       b.CRITERIA_NAME == item.CRITERIA_NAME &&
                                       b.IS_LIVE == item.IS_LIVE &&
                                       b.BET_LABEL == item.BET_LABEL &&
                                       b.BET_OUTCOME == item.BET_OUTCOME);
        if (existingBet == null)
        {
           _db.BetEntities.Add(item);
        }
    }

    await _db.SaveChangesAsync();
}


public List<BetEntity> GetAll()
{

    var list = _db.BetEntities.ToList();

    return list;
}
 */


