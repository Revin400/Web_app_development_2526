using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services.Interfaces;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OfficeAttendanceController : ControllerBase
    {
        private readonly IOfficeAttendanceService _service;

        public OfficeAttendanceController(IOfficeAttendanceService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] OfficeAttendance attendance)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _service.CreateAsync(attendance);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] OfficeAttendance attendance)
        {
            if (id != attendance.Id)
                return BadRequest("ID mismatch");

            var success = await _service.UpdateAsync(attendance);

            if (!success)
                return NotFound();

            return Ok(success);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteAsync(id);

            if (!success)
                return NotFound();

            return Ok(success);
        }
    }
}
