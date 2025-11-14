using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
    using Server.Services.Interfaces;

namespace Server.Services;

public class AdminService(ApplicationDbContext db) : IAdminService
{
    public async Task<IEnumerable<Admin>> GetAllAsync()
    {
        return await db.Admins.ToListAsync();
    }
}
