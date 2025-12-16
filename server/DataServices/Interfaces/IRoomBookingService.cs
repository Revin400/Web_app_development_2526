using Server.Models;

namespace Server.Services.Interfaces;

public interface IRoomBookingService
{
    Task<IEnumerable<RoomBooking>> GetAllAsync();
    Task<RoomBooking> GetByIdAsync(int bookingId);
    Task<RoomBooking> CreateBookingAsync(RoomBooking booking);
    Task<RoomBooking> EditBookingAsync(RoomBooking booking);
    Task<bool> DeleteBookingAsync(int bookingId);
}
