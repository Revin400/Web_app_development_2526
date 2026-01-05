using Microsoft.EntityFrameworkCore;

using Server.Data;
using Server.Models;
using Server.Services.Interfaces;

public class GroupService : IGroupService
{
    private readonly ApplicationDbContext db;

    public GroupService(ApplicationDbContext db) => this.db = db;

    public async Task<List<Group>> GetAllGroupsAsync()
    {
        return await db.Groups.ToListAsync();
    }

    public Task<Group?> GetGroupsByIdAsync(int groupId) =>
        db.Groups.FirstOrDefaultAsync(x => x.Id == groupId);
    public async Task<Group> CreateGroupAsync(Group group)
    {
        db.Groups.Add(group);
        await db.SaveChangesAsync();
        return group;
    }

    public async Task<bool> UpdateGroupAsync(int groupId, Group group)
    {
        var existing = await db.Groups.FirstOrDefaultAsync(x => x.Id == groupId);
        if (existing is null) return false;

        existing.Name = group.Name;
        existing.Description = group.Description;

        await db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteGroupAsync(int groupId)
    {
        var existing = await db.Groups.FirstOrDefaultAsync(x => x.Id == groupId);
        if (existing is null) return false;

        db.Groups.Remove(existing);
        await db.SaveChangesAsync();
        return true;
    }
}