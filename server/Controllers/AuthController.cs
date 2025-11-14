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
    public async Task<ActionResult<Employee>> LoginAsync([FromBody] LoginRequest req)
    {
        var employee = await service.LoginAsync(req.Email, req.Password);

        if (employee is null)
            return Unauthorized("Invalid email or password.");

        return Ok(employee);
    }
}
public class LoginRequest
{
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
}
