
using Server.Models;

namespace Server.Services.Interfaces;

public interface IAuthService
{
    Task<Employee> LoginAsync(string email, string password);
    (bool isLoggedIn, string? name, string? role) CheckSession();

    Task RegisterAsync(string name, string email, string password);
}
