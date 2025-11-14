using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Services.Interfaces;


namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AdminController(IAdminService service) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Admin>>> GetAdmins()
    {
        var admins = await service.GetAllAsync();
        return Ok(admins);
    }


}
