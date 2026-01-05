public interface IGroupMembershipService
{
    Task<bool> AddAsync(int userId, int groupId);
    Task<bool> RemoveAsync(int userId, int groupId);
    Task<List<int>> GetGroupsForUserAsync(int userId);
    Task<List<int>> GetUsersForGroupAsync(int groupId);
}