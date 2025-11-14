using System.Security.Cryptography.Xml;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
    using Server.Services.Interfaces;

namespace Server.Services;

public class AuthService: IAuthService
{

    private readonly ApplicationDbContext _db;
    private readonly IHttpContextAccessor _http;
    public AuthService(ApplicationDbContext db, IHttpContextAccessor http)
    {
        _db = db;
        _http = http;
    } 

    public async Task<Employee?> LoginAdminAsync(string email, string password)
    {
        if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
            return null;

        var employee = await _db.Employees
            .FirstOrDefaultAsync(e => e.Email == email && e.Password == password);

        if (employee == null)
            return null;

        var admin = await _db.Admins.FirstOrDefaultAsync(a => a.UserId == employee.UserId);

        if (admin == null)
            return null; 

        _http.HttpContext!.Session.SetInt32("AdminId", admin.AdminId);
        _http.HttpContext.Session.SetString("AdminName", employee.Name);

        return employee;
    }

    public (bool isLoggedIn, string? name) CheckSession()
    {
        var id = _http.HttpContext!.Session.GetInt32("AdminId");
        var name = _http.HttpContext.Session.GetString("AdminName");

        return (id != null, name);
    }
}

