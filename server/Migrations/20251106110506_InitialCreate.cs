using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "employees",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    Role = table.Column<string>(type: "TEXT", nullable: false),
                    Password = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_employees", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "admins",
                columns: table => new
                {
                    AdminId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<int>(type: "INTEGER", nullable: false),
                    Permissions = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_admins", x => x.AdminId);
                    table.ForeignKey(
                        name: "FK_admins_employees_UserId",
                        column: x => x.UserId,
                        principalTable: "employees",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "employees",
                columns: new[] { "UserId", "Email", "Name", "Password", "Role" },
                values: new object[] { 1, "admin@calendify.local", "System Administrator", "admin123", "Admin" });

            migrationBuilder.InsertData(
                table: "admins",
                columns: new[] { "AdminId", "Permissions", "UserId" },
                values: new object[] { 1, "Full", 1 });

            migrationBuilder.CreateIndex(
                name: "IX_admins_UserId",
                table: "admins",
                column: "UserId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "admins");

            migrationBuilder.DropTable(
                name: "employees");
        }
    }
}
