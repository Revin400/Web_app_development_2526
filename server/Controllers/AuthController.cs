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

    var employee = await service.LoginAdminAsync(req.Email, req.Password);

    if (employee == null)
        return Unauthorized(new { message = "Email of wachtwoord klopt niet." });

    return Ok(new { message = "Login successful", name = employee.Name });
}



    [HttpGet("session")]
    public IActionResult CheckSession()
    {
        var (isLoggedIn, name) = service.CheckSession();
        return Ok(new { isLoggedIn, name });
    }
}
public class LoginRequest
{
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
}
