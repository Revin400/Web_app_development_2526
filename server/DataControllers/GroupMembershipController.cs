using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class GroupMembershipsController : ControllerBase
{
    private readonly IGroupMembershipService _service;
    public GroupMembershipsController(IGroupMembershipService service) => _service = service;

    [HttpPost("users/{userId:int}/groups/{groupId:int}")]
    public async Task<IActionResult> Add(int userId, int groupId)
    {
        var ok = await _service.AddAsync(userId, groupId);
        return ok ? NoContent() : NotFound("User or Group not found.");
    }

    [HttpDelete("users/{userId:int}/groups/{groupId:int}")]
    public async Task<IActionResult> Remove(int userId, int groupId)
    {
        var ok = await _service.RemoveAsync(userId, groupId);
        return ok ? NoContent() : NotFound();
    }

    [HttpGet("users/{userId:int}/groups")]
    public async Task<ActionResult<List<int>>> GetGroupsForUser(int userId) =>
        Ok(await _service.GetGroupsForUserAsync(userId));

    [HttpGet("groups/{groupId:int}/users")]
    public async Task<ActionResult<List<int>>> GetUsersForGroup(int groupId) =>
        Ok(await _service.GetUsersForGroupAsync(groupId));
}