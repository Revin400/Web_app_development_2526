using System.Security.Cryptography.Xml;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
    using Server.Services.Interfaces;

namespace Server.Services;

public class AuthService(ApplicationDbContext db) : IAuthService
{
    public async Task<Employee?> LoginAsync(string email, string password)
    {
        if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
        {
            return null;
        }
        return await db.Employees.FirstOrDefaultAsync(e => e.Email == email && e.Password == password);
    }
}
