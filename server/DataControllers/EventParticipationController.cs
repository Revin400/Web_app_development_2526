using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Services.Interfaces;


namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventParticipationController(IEventParticipationService service) : ControllerBase
{

[HttpGet]
    public async Task<List<ParticipateResponse>> GetAllParticipations()
    {
        return await service.GetAllParticipationsAsync();
    }

[HttpPost("participate")]
        public async Task<IActionResult> Participate([FromBody] ParticipateRequest request)
        {   
            var sessionUserId = HttpContext.Session.GetInt32("UserId");

            if (sessionUserId == null)
                return Unauthorized("User must be logged in");

            if (sessionUserId != request.UserId)
                return Unauthorized("Users can only participate on their own behalf");
            try
            {
                var ev = await service.ParticipateInEventAsync(request.EventId, sessionUserId.Value);
                return Ok(ev);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> RemoveParticipation([FromBody] ParticipateRequest request)
        {
            var sessionUserId = HttpContext.Session.GetInt32("UserId");
            if (sessionUserId == null)
                return Unauthorized("User must be logged in");

            if (sessionUserId != request.UserId)
                return Unauthorized("Users can only cancel participation on their own behalf");
            

            try 
            {
                var participations = await service.RemoveParticipationAsync(request.EventId, sessionUserId.Value);
                return Ok(participations);
            }
            
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

}
