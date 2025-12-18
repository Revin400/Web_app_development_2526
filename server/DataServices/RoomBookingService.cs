using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Services.Interfaces;

namespace Server.Services;

public class RoomBookingService : IRoomBookingService
{
    private readonly ApplicationDbContext db;

    public RoomBookingService(ApplicationDbContext db)
    {
        this.db = db;
    }

    // Get all bookings
    public async Task<IEnumerable<RoomBooking>> GetAllAsync()
    {
        return await db.RoomBookings.ToListAsync();
    }

    // Get booking by ID
    public async Task<RoomBooking> GetByIdAsync(int bookingId)
    {
        return await db.RoomBookings.FirstOrDefaultAsync(b => b.Id == bookingId);
    }

    // Create new booking
public async Task<RoomBooking> CreateBookingAsync(RoomBooking booking)
{
    // Pull only same room & same date bookings
    var potentialConflicts = await db.RoomBookings
        .Where(b => b.RoomId == booking.RoomId &&
                    b.BookingDate.Date == booking.BookingDate.Date &&
                    b.UserId != booking.UserId) // exclude current user
        .ToListAsync();

    // Check for overlapping times with other users
    bool conflict = potentialConflicts
        .Any(b => booking.StartTime < b.EndTime && booking.EndTime > b.StartTime);

    if (conflict)
        return null; // conflict, cannot book

    db.RoomBookings.Add(booking);
    await db.SaveChangesAsync();
    return booking;
}


    // Edit an existing booking
public async Task<RoomBooking> EditBookingAsync(RoomBooking booking)
{
    var existing = await GetByIdAsync(booking.Id);
    if (existing == null)
        return null;

    // Check other users’ bookings for conflicts (exclude self)
    var potentialConflicts = await db.RoomBookings
        .Where(b => b.RoomId == booking.RoomId &&
                    b.BookingDate.Date == booking.BookingDate.Date &&
                    b.Id != booking.Id &&
                    b.UserId != booking.UserId) // exclude current user
        .ToListAsync();

    bool conflict = potentialConflicts
        .Any(b => booking.StartTime < b.EndTime && booking.EndTime > b.StartTime);

    if (conflict)
        return null; // conflict, cannot update

    // Update booking
    existing.RoomId = booking.RoomId;
    existing.UserId = booking.UserId;
    existing.BookingDate = booking.BookingDate;
    existing.StartTime = booking.StartTime;
    existing.EndTime = booking.EndTime;
    existing.Purpose = booking.Purpose;

    await db.SaveChangesAsync();
    return existing;
}

    // Delete a booking
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
