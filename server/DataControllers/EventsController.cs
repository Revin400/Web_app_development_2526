using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services.Interfaces;
using Server.Filters;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventsController : ControllerBase
    {
        private readonly IEventService _service;

        public EventsController(IEventService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<Event>>> GetAll()
        {
            return Ok(await _service.GetAllEventsAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetById(int id)
        {
            var ev = await _service.GetEventByIdAsync(id);
            if (ev == null)
                return NotFound();

            return Ok(ev);
        }
        
        [HttpPost]
        [AdminOnly]
        public async Task<ActionResult<Event>> Create(Event newEvent)
        {
            var created = await _service.CreateEventAsync(newEvent);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        [AdminOnly]
        public async Task<ActionResult<Event>> Update(int id, Event updatedEvent)
        {
            updatedEvent.Id = id;

            var result = await _service.UpdateEventAsync(updatedEvent);
            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [AdminOnly]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteEventAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}