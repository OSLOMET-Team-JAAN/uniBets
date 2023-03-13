using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BetAPI.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BetEntities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Player_no = table.Column<int>(type: "int", nullable: false),
                    PLAYER_BET_NUMBER = table.Column<int>(type: "int", nullable: false),
                    BET_PLACED_DATE = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OVER_1000_SEK = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EVENT_NAME = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LEAGUE = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BET_OFFER_TYPE = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CRITERIA_NAME = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IS_LIVE = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BET_LABEL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ODDS = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    BET_OUTCOME = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BetEntities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    username = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    roles = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BetEntities");

            migrationBuilder.DropTable(
                name: "users");
        }
    }
}
