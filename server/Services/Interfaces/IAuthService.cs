
using Server.Models;

namespace Server.Services.Interfaces;

public interface IAuthService
{
    Task<Employee> LoginAdminAsync(string email, string password);
    (bool isLoggedIn, string? name) CheckSession();
}
