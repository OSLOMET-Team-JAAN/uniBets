namespace Domain;

public class BetEntity
{
    public int Id { get; set; }
    public int Player_no { get; set; }
    public int PLAYER_BET_NUMBER { get; set; }
    public string BET_PLACED_DATE { get; set; }
    public string OVER_1000_SEK { get; set; }
    public string EVENT_NAME { get; set; }
    public string LEAGUE { get; set; }
    public string BET_OFFER_TYPE { get; set; }
    public string CRITERIA_NAME { get; set; }
    public string IS_LIVE { get; set; }
    public string BET_LABEL { get; set; }
    public decimal ODDS { get; set; }
    public string BET_OUTCOME { get; set; }
}