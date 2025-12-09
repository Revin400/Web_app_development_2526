using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Services.Interfaces;

namespace Server.Services;
    public class OfficeAttendanceService : IOfficeAttendanceService
    {
        private readonly ApplicationDbContext _context;
  
        public OfficeAttendanceService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<OfficeAttendance>> GetAllAsync()
        {
            return await _context.Officeattendances.ToListAsync();
        }

        public async Task<OfficeAttendance?> GetByIdAsync(int id)
        {
            return await _context.Officeattendances
                .FirstOrDefaultAsync(x => x.Attendance_Id == id);
        }

        public async Task<OfficeAttendance> CreateAsync(OfficeAttendance attendance)
        {
            _context.Officeattendances.Add(attendance);
            await _context.SaveChangesAsync();
            return attendance;
        }
        public async Task<OfficeAttendance> AddAsync(OfficeAttendance attendance)
        {
            _context.Officeattendances.Add(attendance);
            await _context.SaveChangesAsync();
            return attendance;
        }

        public async Task<bool> UpdateAsync(OfficeAttendance attendance)
        {
            var existing = await _context.Officeattendances
                .FirstOrDefaultAsync(x => x.Attendance_Id == attendance.Attendance_Id);

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
            var existing = await _context.Officeattendances
                .FirstOrDefaultAsync(x => x.Attendance_Id == id);

            if (existing == null)
                return false;

            _context.Officeattendances.Remove(existing);
            await _context.SaveChangesAsync();
            return true;
        }
    }
