using System.Text.Json.Serialization;
namespace Server.Models;

public class Admin
{
    public int AdminId { get; set; }
    public int UserId { get; set; }
    public string Permissions { get; set; } = "Full";

    [JsonIgnore]
    public Employee? User { get; set; }

}