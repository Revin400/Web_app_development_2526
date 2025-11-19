using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Services.Interfaces;


namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IAuthService service) : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Email) || string.IsNullOrWhiteSpace(req.Password))
            return BadRequest(new { message = "Vul alle velden in." });

        var employee = await service.LoginAsync(req.Email, req.Password);

        if (employee == null)
            return Unauthorized(new { message = "Email of wachtwoord klopt niet." });

        return Ok(new { message = "Login successful", name = employee.Name });
    }



    [HttpGet("session")]
    public IActionResult CheckSession()
    {
        var role = HttpContext.Session.GetString("Role");
        var name = HttpContext.Session.GetString("Name");

        if (string.IsNullOrEmpty(role))
        {
            return Ok(new
            {
                isLoggedIn = false,
                name = (string?)null,
                role = (string?)null
            });
        }

        return Ok(new
        {
            isLoggedIn = true,
            name = name,
            role = role
        });
    }


    [HttpPost("Register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest req)
    {

        if (string.IsNullOrWhiteSpace(req.Name) ||
            string.IsNullOrWhiteSpace(req.Email) ||
            string.IsNullOrWhiteSpace(req.Password))
        {
            return BadRequest(new { message = "Please fill in all fields." });
        }

        try
        {
            await service.RegisterAsync(req.Name, req.Email, req.Password);
            return Ok(new { message = "Registration successful" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        HttpContext.Session.Clear();
        return Ok(new { message = "Logout successful" });
    }

}
public class LoginRequest
{
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
}

public class RegisterRequest
{
    public string Name { get; set; } = "";
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
}