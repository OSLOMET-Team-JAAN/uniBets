using BetAPI.Data;
using BetAPI.repositories.Contracts;
using Domain;
using Microsoft.Extensions.Configuration;

using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace BetAPI.repositories
{
    public class betRepo : Irepo
    {
        BetEntity bets = new BetEntity();

        private readonly IConfiguration _configuration;
        public betRepo(IConfiguration configuration)
        {
            _configuration = configuration;
        }






        public List<BetEntity> GetAll_July_4()
        {
            string connString = _configuration.GetConnectionString("ConnectionAPIConeectionString");
            SqlConnection con = new SqlConnection(connString);

            SqlDataAdapter da = new SqlDataAdapter("usp_GetAll_July4", con);
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
                    bet.BET_PLACED_DATE = Convert.ToDateTime(dt.Rows[i]["BET_PLACED_DATE"]);
                    bet.OVER_1000_SEK = dt.Rows[i]["OVER_1000_SEK"].ToString();
                    bet.EVENT_NAME = dt.Rows[i]["EVENT_NAME"].ToString();
                    bet.LEAGUE = dt.Rows[i]["LEAGUE"].ToString();
                    bet.BET_OFFER_TYPE = dt.Rows[i]["BET_OFFER_TYPE"].ToString();
                    bet.CRITERIA_NAME = dt.Rows[i]["CRITERIA_NAME"].ToString();
                    bet.IS_LIVE = dt.Rows[i]["IS_LIVE"].ToString();
                    bet.BET_LABEL = dt.Rows[i]["BET_LABEL"].ToString();
                    bet.ODDS = dt.Rows[i]["ODDS"].ToString();
                    bet.BET_OUTCOME = dt.Rows[i]["BET_OUTCOME"].ToString();

                    list.Add(bet);
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


