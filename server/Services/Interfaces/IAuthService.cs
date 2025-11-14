
using Server.Models;

namespace Server.Services.Interfaces;

public interface IAuthService
{
    Task<Employee> LoginAsync(string email, string password);
}
