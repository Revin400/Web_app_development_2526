public interface IGroupService
{
    Task<List<Group>> GetAllGroupsAsync();
    Task<Group?> GetGroupsByIdAsync(int groupId);
    Task<Group> CreateGroupAsync(Group group);
    Task<bool> UpdateGroupAsync(int groupId, Group group);
    Task<bool> DeleteGroupAsync(int groupId);
}