using Server.Models;

namespace Server.Services.Interfaces
{
    public interface IOfficeAttendanceService
    {
        Task<IEnumerable<OfficeAttendance>> GetAllAsync();
        Task<OfficeAttendance?> GetByIdAsync(int id);
        Task<OfficeAttendance> CreateAsync(OfficeAttendance attendance);
        Task<OfficeAttendance> AddAsync(OfficeAttendance attendance);
        Task<bool> UpdateAsync(OfficeAttendance attendance);
        Task<bool> DeleteAsync(int id);

    }
}
