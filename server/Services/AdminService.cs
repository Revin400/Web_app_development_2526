using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;

namespace Server.Services;

public class AdminService(ApplicationDbContext db)
{
    public async Task<IEnumerable<Admin>> GetAllAsync()
    {
        return await db.Admins.ToListAsync();
    }

}
