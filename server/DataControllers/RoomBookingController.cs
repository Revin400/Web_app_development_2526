using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services.Interfaces;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RoomBookingController(IRoomBookingService service) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<RoomBooking>>> GetBookings()
    {
        var bookings = await service.GetAllAsync();
        return Ok(bookings);
    }

    [HttpGet("{bookingId}")]
    public async Task<ActionResult<RoomBooking>> GetBooking(int bookingId)
    {
        var booking = await service.GetByIdAsync(bookingId);
        if (booking == null)
            return NotFound();
        return Ok(booking);
    }

    [HttpPost]
    public async Task<ActionResult<RoomBooking>> CreateBooking(RoomBooking booking)
    {
        var createdBooking = await service.CreateBookingAsync(booking);
        return Ok(createdBooking);
    }

    [HttpPut]
    public async Task<ActionResult<RoomBooking>> EditBooking(RoomBooking booking)
    {
        var updatedBooking = await service.EditBookingAsync(booking);
        if (updatedBooking == null)
            return NotFound();
        return Ok(updatedBooking);
    }

    [HttpDelete("{bookingId}")]
    public async Task<ActionResult> DeleteBooking(int bookingId)
    {
        var deleted = await service.DeleteBookingAsync(bookingId);
        if (!deleted)
            return NotFound();
        return NoContent();
    }
}
