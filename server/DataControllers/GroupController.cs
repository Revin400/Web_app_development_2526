using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class GroupController : ControllerBase
{
    private readonly IGroupService _service;
    public GroupController(IGroupService service) => _service = service;

    [HttpGet]
    public async Task<ActionResult<List<Group>>> GetAll() =>
        Ok(await _service.GetAllGroupsAsync());

    [HttpGet("{id}")]
    public async Task<ActionResult<Group>> GetById(int id)
    {
        var grp = await _service.GetGroupsByIdAsync(id);
        return grp is null ? NotFound() : Ok(grp);
    }

    [HttpPost]
    public async Task<ActionResult<Group>> Create(Group group)
    {
        var created = await _service.CreateGroupAsync(group);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Group group)
    {
        var ok = await _service.UpdateGroupAsync(id, group);
        return ok ? Ok() : NotFound();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var ok = await _service.DeleteGroupAsync(id);
        return ok ? Ok() : NotFound();
    }
}