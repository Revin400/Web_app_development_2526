using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Data;

public class OfficeAttendanceService : IOfficeAttendanceService
{
    private readonly ApplicationDbContext _context;

    public OfficeAttendanceService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<OfficeAttendance>> GetAllAsync()
    {
        return await _context.OfficeAttendance.ToListAsync();
    }

    public async Task<OfficeAttendance?> GetByIdAsync(int id)
    {
        return await _context.OfficeAttendance
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<OfficeAttendance> CreateAsync(OfficeAttendance attendance)
    {
        _context.OfficeAttendance.Add(attendance);
        await _context.SaveChangesAsync();
        return attendance;
    }

    public async Task<bool> UpdateAsync(OfficeAttendance attendance)
    {
        var existing = await _context.OfficeAttendance
            .FirstOrDefaultAsync(x => x.Id == attendance.Id);

        if (existing == null)
            return false;

        existing.user_id = attendance.user_id;
        existing.date = attendance.date;
        existing.status = attendance.status;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var existing = await _context.OfficeAttendance
            .FirstOrDefaultAsync(x => x.Id == id);

        if (existing == null)
            return false;

        _context.OfficeAttendance.Remove(existing);
        await _context.SaveChangesAsync();
        return true;
    }
}
