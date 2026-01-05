using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Services.Interfaces;

namespace Server.Services;

public class AuthService: IAuthService
{

    private readonly ApplicationDbContext _db;
    private readonly IHttpContextAccessor _http;
    private readonly IEmailService _emailService;

    public AuthService(ApplicationDbContext db, IHttpContextAccessor http, IEmailService emailService)
    {
        _db = db;
        _http = http;
        _emailService = emailService;
    } 

public async Task<Employee?> LoginAsync(string email, string password)
{
    if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
        return null;

    var employee = await _db.Employees
        .FirstOrDefaultAsync(e => e.Email == email && e.Password == password);

    if (employee == null)
        return null;

    var admin = await _db.Admins.FirstOrDefaultAsync(a => a.UserId == employee.UserId);

    if (admin != null)
    {
        _http.HttpContext!.Session.SetInt32("UserId", admin.UserId);
        _http.HttpContext.Session.SetString("Role", "Admin");
        _http.HttpContext.Session.SetString("Name", employee.Name);
    }
    else
    {
        _http.HttpContext!.Session.SetInt32("UserId", employee.UserId);
        _http.HttpContext.Session.SetString("Role", "Employee");
        _http.HttpContext.Session.SetString("Name", employee.Name);
    }

    return employee;
}


    public async Task RegisterAsync(string name, string email, string password)
    {
        var existingEmployee = await _db.Employees.FirstOrDefaultAsync(e => e.Email == email);
        if (existingEmployee != null)
        {
            throw new Exception("An employee with this email already exists.");
        }

        if (password.Length < 8)
        {
            throw new Exception("Password must be at least 8 characters long.");
        }

        if (!System.Text.RegularExpressions.Regex.IsMatch(password, @"[A-Z]"))
        {
            throw new Exception("Password must contain at least one uppercase letter.");
        }

        if (!System.Text.RegularExpressions.Regex.IsMatch(password, @"[a-z]"))
        {
            throw new Exception("Password must contain at least one lowercase letter.");
        }

        if (!System.Text.RegularExpressions.Regex.IsMatch(password, @"[!@#$%^&*()_+\-=\[\]{};':""\\|,.<>\/?]"))
        {
            throw new Exception("Password must contain at least one special character.");
        }

        var newEmployee = new Employee
        {
            Name = name,
            Email = email,
            Role = "Employee",
            Password = password

        };

        _db.Employees.Add(newEmployee);
        await _db.SaveChangesAsync();

        _http.HttpContext!.Session.SetInt32("UserId", newEmployee.UserId);
        _http.HttpContext.Session.SetString("UserName", name);
        _http.HttpContext.Session.SetString("Role", "Employee");

        // Probeer een welkomstmail te versturen (niet-blokkerend voor registratie)
        try
        {
            await _emailService.SendEmailWithTemplateAsync(
                newEmployee.Email,
                "Welkom bij Calendify",
                "WelcomeEmail",
                new Dictionary<string, string>
                {
                    { "Name", name }
                }
            );
        }
        catch
        {
            // Email fouten worden gelogd in EmailService; registratie blijft succesvol
        }
    }

    public (bool isLoggedIn, string? name, string? role) CheckSession()
    {
        var id = _http.HttpContext!.Session.GetInt32("UserId");
        var name = _http.HttpContext.Session.GetString("UserName");
        var role = _http.HttpContext.Session.GetString("Role");
        return (id != null, name, role);
    }
}

