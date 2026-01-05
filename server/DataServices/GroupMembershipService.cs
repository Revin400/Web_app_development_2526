using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Services.Interfaces;


public class GroupMembershipService : IGroupMembershipService
{
    private readonly ApplicationDbContext db;

    public GroupMembershipService(ApplicationDbContext db) => this.db = db;

    public async Task<bool> AddAsync(int userId, int groupId)
    {
        // Ensure employee + group exist
        var exists = await db.Employees.AnyAsync(e => e.UserId == userId)
                  && await db.Groups.AnyAsync(g => g.Id == groupId);
        if (!exists) return false;

        // Prevent duplicates
        var already = await db.GroupMemberships.AnyAsync(m => m.userId == userId && m.GroupId == groupId);
        if (already) return true;

        db.GroupMemberships.Add(new GroupMembership { userId = userId, GroupId = groupId });
        await db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> RemoveAsync(int userId, int groupId)
    {
        var existing = await db.GroupMemberships
            .FirstOrDefaultAsync(m => m.userId == userId && m.GroupId == groupId);

        if (existing is null) return false;

        db.GroupMemberships.Remove(existing);
        await db.SaveChangesAsync();
        return true;
    }

    public Task<List<int>> GetGroupsForUserAsync(int userId) =>
        db.GroupMemberships.AsNoTracking()
            .Where(m => m.userId == userId)
            .Select(m => m.GroupId)
            .ToListAsync();

    public Task<List<int>> GetUsersForGroupAsync(int groupId) =>
        db.GroupMemberships.AsNoTracking()
            .Where(m => m.GroupId == groupId)
            .Select(m => m.userId)
            .ToListAsync();
}