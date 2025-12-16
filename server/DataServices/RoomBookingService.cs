using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Services.Interfaces;

namespace Server.Services;

public class RoomBookingService(ApplicationDbContext db) : IRoomBookingService
{
    public async Task<IEnumerable<RoomBooking>> GetAllAsync()
    {
        return await db.RoomBookings.ToListAsync();
    }

    public async Task<RoomBooking> GetByIdAsync(int bookingId)
    {
        return await db.RoomBookings
            .FirstOrDefaultAsync(b => b.Id == bookingId);
    }

    public async Task<RoomBooking> CreateBookingAsync(RoomBooking booking)
    {
        db.RoomBookings.Add(booking);
        await db.SaveChangesAsync();
        return booking;
    }

    public async Task<RoomBooking> EditBookingAsync(RoomBooking booking)
    {
        var existing = await GetByIdAsync(booking.Id);
        if (existing == null)
            return null;

        existing.RoomId = booking.RoomId;
        existing.UserId = booking.UserId;
        existing.BookingDate = booking.BookingDate;
        existing.StartTime = booking.StartTime;
        existing.EndTime = booking.EndTime;
        existing.Purpose = booking.Purpose;

        await db.SaveChangesAsync();
        return existing;
    }

    public async Task<bool> DeleteBookingAsync(int bookingId)
    {
        var booking = await GetByIdAsync(bookingId);
        if (booking == null)
            return false;

        db.RoomBookings.Remove(booking);
        await db.SaveChangesAsync();
        return true;
    }
}
