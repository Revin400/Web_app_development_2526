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
    [HttpPost]
    public async Task<Employee> LoginAsync()
    {
        string email = HttpContext.Request.Headers["email"];
        string password = HttpContext.Request.Headers["password"];
        return await service.LoginAsync(email, password);
    }


}
