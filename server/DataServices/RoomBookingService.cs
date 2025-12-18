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
    var dayStart = booking.BookingDate.Date;
    var dayEnd = dayStart.AddDays(1);

    bool conflict = await db.RoomBookings
        .Where(b =>
            b.RoomId == booking.RoomId &&
            b.BookingDate >= dayStart &&
            b.BookingDate < dayEnd
        )
        .AnyAsync(b =>
            booking.StartTime < b.EndTime &&
            booking.EndTime > b.StartTime
        );

    if (conflict)
        return null;

    db.RoomBookings.Add(booking);
    await db.SaveChangesAsync();
    return booking;
}


    public async Task<RoomBooking> EditBookingAsync(RoomBooking booking)
    {
        var existing = await GetByIdAsync(booking.Id);
        if (existing == null)
            return null;

        // Check for conflicts excluding this booking itself
        bool conflict = await db.RoomBookings
            .Where(b => b.RoomId == booking.RoomId 
                        && b.BookingDate.Date == booking.BookingDate.Date && b.Id != booking.Id)
            .AnyAsync(b => (booking.StartTime < b.EndTime) && (booking.EndTime > b.StartTime));

        if (conflict)
            return null; // conflict, can't update

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
