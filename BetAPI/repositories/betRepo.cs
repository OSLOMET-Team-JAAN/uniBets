using BetAPI.Data;

using BetAPI.repositories.Contracts;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging.Abstractions;
using Newtonsoft.Json.Converters;
using NuGet.Protocol.Plugins;

using System.Data;
using SqlCommand = Microsoft.Data.SqlClient.SqlCommand;
using SqlConnection = Microsoft.Data.SqlClient.SqlConnection;
using SqlDataAdapter = Microsoft.Data.SqlClient.SqlDataAdapter;

namespace BetAPI.repositories
{
    public class betRepo : Irepo
    {


        private readonly IConfiguration _configuration;
        private readonly Context _db;
        public betRepo(IConfiguration configuration, Context db)
        {
            _configuration = configuration;
            _db = db;
        }

        public List<BetEntity> GetAll_July_25()
        {

            //Connection
            string connString = _configuration.GetConnectionString("ConnectionAPIConeectionString");
            SqlConnection con = new SqlConnection(connString);

            //read the sql data
            SqlDataAdapter da = new SqlDataAdapter("july_25", con);

            //create a table and add the data
            DataTable dt = new DataTable();
            da.Fill(dt);

            //create a list of data from the table
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


        public List<BetEntity> GetAll_July_18()
        {
            string connString = _configuration.GetConnectionString("ConnectionAPIConeectionString");
            SqlConnection con = new SqlConnection(connString);

            SqlDataAdapter da = new SqlDataAdapter("july_18", con);
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
        public List<BetEntity> GetAll_July_11()
        {
            string connString = _configuration.GetConnectionString("ConnectionAPIConeectionString");
            SqlConnection con = new SqlConnection(connString);

            SqlDataAdapter da = new SqlDataAdapter("july_11", con);
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





        public List<BetEntity> GetAll_July_4()
        {
            string connString = _configuration.GetConnectionString("ConnectionAPIConeectionString");
            SqlConnection con = new SqlConnection(connString);

            SqlDataAdapter da = new SqlDataAdapter("july_4", con);
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



        //just for the admin
        public async Task saveBetEntity_4(List<BetEntity> betList)
        {

            if (betList == null)
            {
                return;
            }



            string insertQuery = @"IF NOT EXISTS
(
    SELECT *
    FROM BetEntities
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
    INSERT INTO BetEntities
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
END;
";
            using (SqlConnection destinationConnection = new SqlConnection(_configuration.GetConnectionString("ConnectionAPIConeectionString")))
            using (var insertCommand = new SqlCommand(insertQuery, destinationConnection))
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



        public List<BetEntity> getSavedBetEntities()
        {
            string connString = _configuration.GetConnectionString("ConnectionAPIConeectionString");
            SqlConnection con = new SqlConnection(connString);
            SqlCommand cmd = new SqlCommand("SELECT * FROM BetEntities", con);
            string selectQuery = "SELECT *  FROM BetEntities";

            SqlDataAdapter da = new SqlDataAdapter(selectQuery, con);
            DataTable dt = new DataTable();
            da.Fill(dt);


            //create a list of data from the table
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













/*
                       DataTable dt = new DataTable();

                       // dt.Columns.Add("ItemId");
                       dt.Columns.Add("Player_no");
                       dt.Columns.Add("PLAYER_BET_NUMBER");

                       dt.Columns.Add("BET_PLACED_DATE");
                       dt.Columns.Add("OVER_1000_SEK");
                       dt.Columns.Add("EVENT_NAME");
                       dt.Columns.Add("LEAGUE");
                       dt.Columns.Add("BET_OFFER_TYPE");
                       dt.Columns.Add("CRITERIA_NAME");
                       dt.Columns.Add("IS_LIVE");
                       dt.Columns.Add("BET_LABEL");
                       dt.Columns.Add("ODDS");
                       dt.Columns.Add("BET_OUTCOME");



                       if (betList != null && betList.Count > 0)
                       {
                           foreach (var item in betList)
                           {
                               DataRow dr = dt.NewRow();
                               dr["Player_no"] = item.Player_no;
                               dr["PLAYER_BET_NUMBER"] = item.PLAYER_BET_NUMBER;
                               dr["BET_PLACED_DATE"] = item.BET_PLACED_DATE;
                               dr["OVER_1000_SEK"] = item.OVER_1000_SEK;
                               dr["EVENT_NAME"] = item.EVENT_NAME;
                               dr["LEAGUE"] = item.LEAGUE;
                               dr["BET_OFFER_TYPE"] = item.BET_OFFER_TYPE;
                               dr["CRITERIA_NAME"] = item.CRITERIA_NAME;
                               dr["IS_LIVE"] = item.IS_LIVE;
                               dr["BET_LABEL"] = item.BET_LABEL;
                               dr["ODDS"] = item.ODDS;
                               dr["BET_OUTCOME"] = item.BET_OUTCOME;

                               dt.Rows.Add(dr);
                           }

                           for (int i = 0; i < dt.Rows.Count; i++)
                           {
                               string InsertQuery = string.Empty;
                               InsertQuery =
                                   "WHERE NOT EXISTS (SELECT * FROM BetEntities  WHERE Player_no =dt.Rows[i][\"Player_no\"].ToString()   BEGIN" +
                                   "INSERT INTO BetEntities " +
                                   "(Player_no, PLAYER_BET_NUMBER, BET_PLACED_DATE, OVER_1000_SEK, EVENT_NAME," +
                                   " LEAGUE, BET_OFFER_TYPE, CRITERIA_NAME, IS_LIVE, BET_LABEL, ODDS, BET_OUTCOME) " +
                                   "VALUES ('" + dt.Rows[i]["Player_no"].ToString() + "','" + dt.Rows[i]["PLAYER_BET_NUMBER"].ToString() + "','" + dt.Rows[i]["BET_PLACED_DATE"].ToString()
                                   + "','" + dt.Rows[i]["OVER_1000_SEK"].ToString() + "','" + dt.Rows[i]["EVENT_NAME"].ToString() + "','" + dt.Rows[i]["LEAGUE"].ToString() +
                                   "','" + dt.Rows[i]["BET_OFFER_TYPE"].ToString() + "','" + dt.Rows[i]["CRITERIA_NAME"].ToString() + "','" + dt.Rows[i]["IS_LIVE"].ToString() +
                                   "','" + dt.Rows[i]["BET_LABEL"].ToString() + "','" + dt.Rows[i]["ODDS"].ToString() + "','" + dt.Rows[i]["BET_OUTCOME"].ToString() + "')" +
                                   " WHERE NOT EXISTS ( SELECT * FROM BetEntities WHERE Player_no =dt.Rows[i][\"Player_no\"].ToString()" +
                                   "  AND PLAYER_BET_NUMBER = dt.Rows[i][\"PLAYER_BET_NUMBER\"].ToString()  " +
                                   "  AND BET_PLACED_DATE =dt.Rows[i][\"BET_PLACED_DATE\"].ToString()" +
                                   " AND OVER_1000_SEK =dt.Rows[i][\\\"OVER_1000_SEK\\\"].ToString()\"" +
                                    " AND EVENT_NAME =dt.Rows[i][\\\"EVENT_NAME\\\"].ToString()\"" +
                                     " AND  LEAGUE =dt.Rows[i][\\\" LEAGUE\\\"].ToString()\"" +
                                      " AND BET_OFFER_TYPE =dt.Rows[i][\\\"BET_OFFER_TYPE\\\"].ToString()\"" +
                                       " AND CRITERIA_NAME =dt.Rows[i][\\\"CRITERIA_NAME\\\"].ToString()\"" +
                                        " AND  IS_LIVE =dt.Rows[i][\\\" IS_LIVE\\\"].ToString()\"" +
                                         " AND BET_LABEL =dt.Rows[i][\\\"BET_LABEL\\\"].ToString()\"" +

                                          " AND  BET_OUTCOME=dt.Rows[i][\\\" BET_OUTCOME\\\"].ToString()\"" +
                                   ");";

                               using (SqlConnection destinationConnection = new SqlConnection(_configuration.GetConnectionString("ConnectionAPIConeectionString")))
                               using (var BetEntities = new SqlCommand(InsertQuery, destinationConnection))
                               {
                                   destinationConnection.Open();
                                   BetEntities.ExecuteNonQuery();
                               }
                           }


                       }
                       await Task.CompletedTask;

                   }*/











/*
 * 
 *  dt.TableName = "tblItem";
    DataSet ds = new DataSet("ds");
    ds.Tables.Add(dt);


public DataTable saveTable(DataSet dsXML)
{
    DataTable dt = new DataTable();
    string connString = _configuration.GetConnectionString("ConnectionAPIConeectionString");
    SqlConnection con = new SqlConnection(connString);
    SqlDataAdapter da = new SqlDataAdapter();

    SqlCommand smd = new SqlCommand("SP_new_Bet_Table", con);
    smd.CommandType = CommandType.StoredProcedure;
    smd.Parameters.Add(new SqlParameter("@cell_name", "My_table"));
    smd.Parameters.Add("@dsXML", SqlDbType.Xml).Value = (dsXML == null ? null : dsXML.GetXml());
    da = new SqlDataAdapter(smd);
    da.Fill(dt);

    return dt;

}*/




/*
 *  cmd.Parameters.AddWithValue("@Cbets_type", dt);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
 */
/*
 *  DataTable dt = new DataTable();

   // dt.Columns.Add("ItemId");
    dt.Columns.Add("Player_no");
    dt.Columns.Add("PLAYER_BET_NUMBER");

    dt.Columns.Add("BET_PLACED_DATE");
    dt.Columns.Add("OVER_1000_SEK");
    dt.Columns.Add("EVENT_NAME");
    dt.Columns.Add("LEAGUE");
    dt.Columns.Add("BET_OFFER_TYPE");
    dt.Columns.Add("CRITERIA_NAME");
    dt.Columns.Add("IS_LIVE");
    dt.Columns.Add("BET_LABEL");
    dt.Columns.Add("ODDS");
    dt.Columns.Add("BET_OUTCOME");



    if(betList!=null && betList.Count > 0)
    {
        foreach(var item in betList)
        {
            DataRow dr= dt.NewRow();
            dr["Player_no"] = item.Player_no;
            dr["PLAYER_BET_NUMBER"] = item.PLAYER_BET_NUMBER;
            dr["BET_PLACED_DATE"] = item.BET_PLACED_DATE;
            dr["OVER_1000_SEK"] = item.OVER_1000_SEK;
            dr["EVENT_NAME"] = item.EVENT_NAME;
            dr["LEAGUE"] = item.LEAGUE;
            dr["BET_OFFER_TYPE"] = item.BET_OFFER_TYPE;
            dr["CRITERIA_NAME"] = item.CRITERIA_NAME;
            dr["IS_LIVE"] = item.IS_LIVE;
            dr["BET_LABEL"] = item.BET_LABEL;
            dr["ODDS"] = item.ODDS;
            dr["BET_OUTCOME"] = item.BET_OUTCOME;

            dt.Rows.Add(dr);
        }
        string connString = _configuration.GetConnectionString("ConnectionAPIConeectionString");
        SqlConnection con = new SqlConnection(connString);
        con.Open();
        string sql = "Create Table abcd (";
        foreach (DataColumn column in dt.Columns)
        {
            sql += "[" + column.ColumnName + "] " + "nvarchar(50)" + ",";
        }
        sql = sql.TrimEnd(new char[] { ',' }) + ")";
        SqlCommand cmd = new SqlCommand(sql, con);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        cmd.ExecuteNonQuery();
        using (var adapter = new SqlDataAdapter("SELECT * FROM abcd", con))
        using (var builder = new SqlCommandBuilder(adapter))
        {
            adapter.InsertCommand = builder.GetInsertCommand();
            adapter.Update(dt);
            // adapter.Update(ds.Tables[0]); (Incase u have a data-set)
        }
        con.Close();


    }
    return;

}
 * 
 */









/*
 * create proc my_table
@cell_name nchar(100)= '',
@dsXML xml =null

as 

if @cell_name= 'my_table' goto Save_Table

return 
save_Table:
begin 

select t.value('Player_no[1]', 'nvarchar(100)') as Player_no,
 t.value('PLAYER_BET_NUMBER[1]', 'nvarchar(100)') as PLAYER_BET_NUMBER,
 t.value('BET_PLACED_DATE[1]', 'nvarchar(100)') as BET_PLACED_DATE,
 t.value('OVER_1000_SEK[1]', 'nvarchar(100)') as OVER_1000_SEK,
 t.value('EVENT_NAME[1]', 'nvarchar(100)') as EVENT_NAME,
t.value('LEAGUE[1]', 'nvarchar(100)') as LEAGUE,
t.value('BET_OFFER_TYPE[1]', 'nvarchar(100)') as BET_OFFER_TYPE,
t.value('CRITERIA_NAME[1]', 'nvarchar(100)') as CRITERIA_NAME,
t.value('IS_LIVE[1]', 'nvarchar(100)') as IS_LIVE,
t.value('BET_LABEL[1]', 'nvarchar(100)') as BET_LABEL,
t.value('ODDS[1]', 'nvarchar(100)') as ODDS,
t.value('BET_OUTCOME[1]', 'nvarchar(100)') as BET_OUTCOME
into #tbl1
from @dsXML.nodes('/ds/tblItem')
as template(t)

insert into [dbo].[BetEntities]
(Player_no, PLAYER_BET_NUMBER, BET_PLACED_DATE, OVER_1000_SEK,
 EVENT_NAME, LEAGUE, BET_OFFER_TYPE, CRITERIA_NAME, IS_LIVE,
  BET_LABEL, ODDS, BET_OUTCOME) 
  Select Player_no, PLAYER_BET_NUMBER, BET_PLACED_DATE, OVER_1000_SEK,
 EVENT_NAME, LEAGUE, BET_OFFER_TYPE, CRITERIA_NAME, IS_LIVE,
  BET_LABEL, ODDS, BET_OUTCOME from #tbl1

  drop table #tbl1
end 
return 
 */

































/*
       using (var command = new SqlCommand("InsertTable") { CommandType = CommandType.StoredProcedure })
       {

           command.Parameters.Add(new SqlParameter("@myTableType", dt));
           SqlHelper.Exec(command);
       }
       */

/*
        public DataTable saveTable( DataSet dsXML)
        {
            DataTable dt = new DataTable();
            string connString = _configuration.GetConnectionString("ConnectionAPIConeectionString");
            SqlConnection con = new SqlConnection(connString);


            SqlCommand smd = new SqlCommand("Save_Table", con);
            smd.CommandType = CommandType.StoredProcedure;
            smd.Parameters.Add(new SqlParameter("@cell_name", "save_Table"));
            smd.Parameters.Add("@dsXML", SqlDbType.Xml).Value=(dsXML==null?null : dsXML.GetXml());
            SqlDataAdapter db =new SqlDataAdapter(smd);
            db.Fill(dt);

            return dt;

        }
*/



// Convert to list 

/*
 * var list = (from item in db.Table
select item).ToList();


List<BetEntity> list = new List<BetEntity>();
list = (from DataRow dr in dt.Rows
           select new BetEntity()
{
Player_no = Convert.ToInt32(dr["Player_no"]),
PLAYER_BET_NUMBER = Convert.ToInt32(dr["PLAYER_BET_NUMBER"]),
BET_PLACED_DATE = dr["BET_PLACED_DATE"].ToString(),
OVER_1000_SEK= dr["OVER_1000_SEK"].ToString(),
EVENT_NAME = dr["EVENT_NAME"].ToString(),
LEAGUE = dr["LEAGUE"].ToString(),
BET_OFFER_TYPE = dr["BET_OFFER_TYPE"].ToString(),
CRITERIA_NAME = dr["CRITERIA_NAME"].ToString(),
IS_LIVE = dr["IS_LIVE"].ToString(),
BET_LABEL = dr["BET_LABEL"].ToString(),
ODDS = Convert.ToDecimal (dr["ODDS"]),
BET_OUTCOME = dr["BET_OUTCOME"].ToString()
           }).ToList();


return list;
}*/





