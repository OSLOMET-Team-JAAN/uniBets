using System.Data;
using BetAPI.Data;
using Domain;
using Microsoft.Data.SqlClient;

namespace BetAPI.extra;

public class FurtherDev : IFurtherDev
{
    private readonly IConfiguration _configuration;
    private readonly Context _db;

    public FurtherDev(IConfiguration configuration, Context db)
    {
        _configuration = configuration;
        _db = db;
    }

    public List<BetEntity> GetAll_July_25()
    {
        //Connection
        var connString = _configuration.GetConnectionString("ConnectionAPIConnectionString");
        var con = new SqlConnection(connString); //read the sql data
        var da = new SqlDataAdapter("july_25", con); //create a table and add the data
        var dt = new DataTable();
        da.Fill(dt); //create a list of data from the table
        var list = new List<BetEntity>();
        if (dt.Rows.Count > 0)
        {
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
        }

        return null;
    }

    public List<BetEntity> GetAll_July_11()
    {
        var connString = _configuration.GetConnectionString("ConnectionAPIConnectionString");
        var con = new SqlConnection(connString);
        var da = new SqlDataAdapter("july_11", con);
        var dt = new DataTable();
        da.Fill(dt);
        var list = new List<BetEntity>();
        if (dt.Rows.Count > 0)
        {
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
        }

        return null;
    }

    public List<BetEntity> GetAll_July_4()
    {
        var connString = _configuration.GetConnectionString("ConnectionAPIConnectionString");
        var con = new SqlConnection(connString);
        var da = new SqlDataAdapter("july_4", con);
        var dt = new DataTable();
        da.Fill(dt);
        var list = new List<BetEntity>();
        if (dt.Rows.Count > 0)
        {
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
        }

        return null;
    }

    public List<BetEntity> GetAll_July_18()
    {
        var connString = _configuration.GetConnectionString("ConnectionAPIConnectionString");
        var con = new SqlConnection(connString);
        var da = new SqlDataAdapter("july_18", con);
        var dt = new DataTable();
        da.Fill(dt);
        var list = new List<BetEntity>();
        if (dt.Rows.Count > 0)
        {
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
        }

        return null;
    }
}