namespace Server.Models;

public class Employee
{
    public int UserId { get; set; }

    public string Name { get; set; }
    public string Email { get; set; }

    public string Role { get; set; }

    public string Password { get; set; }
}
