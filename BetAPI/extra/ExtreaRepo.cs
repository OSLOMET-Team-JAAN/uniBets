using BetAPI.Data;
using Domain;

using System.Data;
using SqlConnection = Microsoft.Data.SqlClient.SqlConnection;
using SqlDataAdapter = Microsoft.Data.SqlClient.SqlDataAdapter;
namespace BetAPI.extra
{
    public class ExtreaRepo: IExtra
    {
        private readonly IConfiguration _configuration;
        private readonly Context _db;

        public ExtreaRepo(IConfiguration configuration, Context db)
        {
            _configuration = configuration;
            _db = db;
        }

        public List<BetEntity> GetAll_July_25()
        {             //Connection
            string connString = _configuration.GetConnectionString("ConnectionAPIConnectionString");
            SqlConnection con = new SqlConnection(connString);             //read the sql data
            SqlDataAdapter da = new SqlDataAdapter("july_25", con);             //create a table and add the data
            DataTable dt = new DataTable();
            da.Fill(dt);             //create a list of data from the table
            List<BetEntity> list = new List<BetEntity>();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    BetEntity bet = new BetEntity();
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
                    bet.BET_OUTCOME = dt.Rows[i]["BET_OUTCOME"].ToString(); list.Add(bet);
                }
                if (list.Count > 0)
                {
                    return list;
                }
            }
            return null;
        }
        public List<BetEntity> GetAll_July_11()
        {
            string connString = _configuration.GetConnectionString("ConnectionAPIConnectionString");
            SqlConnection con = new SqlConnection(connString); SqlDataAdapter da = new SqlDataAdapter("july_11", con);
            DataTable dt = new DataTable();
            da.Fill(dt);
            List<BetEntity> list = new List<BetEntity>();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    BetEntity bet = new BetEntity();
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
                    bet.BET_OUTCOME = dt.Rows[i]["BET_OUTCOME"].ToString(); list.Add(bet);
                }
                if (list.Count > 0)
                {
                    return list;
                }
            }
            return null;
        }
        public List<BetEntity> GetAll_July_4()
        {
            string connString = _configuration.GetConnectionString("ConnectionAPIConnectionString");
            SqlConnection con = new SqlConnection(connString); SqlDataAdapter da = new SqlDataAdapter("july_4", con);
            DataTable dt = new DataTable();
            da.Fill(dt); List<BetEntity> list = new List<BetEntity>();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    BetEntity bet = new BetEntity();
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
                    bet.BET_OUTCOME = dt.Rows[i]["BET_OUTCOME"].ToString(); list.Add(bet);
                }
                if (list.Count > 0)
                {
                    return list;
                }
            }
            return null;
        }
        public List<BetEntity> GetAll_July_18()
        {
            string connString = _configuration.GetConnectionString("ConnectionAPIConnectionString");
            SqlConnection con = new SqlConnection(connString); SqlDataAdapter da = new SqlDataAdapter("july_18", con);
            DataTable dt = new DataTable();
            da.Fill(dt);
            List<BetEntity> list = new List<BetEntity>();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    BetEntity bet = new BetEntity();
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
                    bet.BET_OUTCOME = dt.Rows[i]["BET_OUTCOME"].ToString(); list.Add(bet);
                }
                if (list.Count > 0)
                {
                    return list;
                }
            }
            return null;
        }
    }
}
