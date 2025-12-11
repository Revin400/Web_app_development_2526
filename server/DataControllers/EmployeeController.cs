using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Services.Interfaces;


namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeeController(IEmployeeService service) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
    {
        var employees = await service.GetAllAsync();
        return Ok(employees);
    }

    [HttpGet("{employee_id}")]
    public async Task<ActionResult<IEnumerable<Employee>>> GetEmployee(int employee_id)
    {
        var employee = await service.GetByIdAsync(employee_id);
        return Ok(employee);
    }

    [HttpPut]
    public async Task<ActionResult<IEnumerable<Employee>>> EditEmployee(Employee employee)
    {
        var updatedEmployees = await service.EditEmployeeAsync(employee);
        return Ok(updatedEmployees);
    }
    
    [HttpPost("{userId}/change-password")]
    public async Task<ActionResult> ChangePassword(int userId, [FromBody] ChangePasswordRequest request)
    {
        if (string.IsNullOrEmpty(request.OldPassword) || string.IsNullOrEmpty(request.NewPassword))
            return BadRequest("Old password and new password are required");

        var success = await service.ChangePasswordAsync(userId, request.OldPassword, request.NewPassword);
        if (!success)
            return BadRequest("Old password is incorrect or employee not found");

        return Ok("Password changed successfully");
    }
    
    
    public class ChangePasswordRequest
    {
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }


    // [HttpDelete("{employee_id}")]
    // public async Task<ActionResult> DeleteEmployee(int employee_id)
    // {
    //     var employee = await service.GetByIdAsync(employee_id);
    //     if (employee == null)
    //     {
    //         return NotFound();
    //     }

    //     // Assuming you have a method to delete the employee
    //     await service.DeleteEmployeeAsync(employee);
    //     return NoContent();
    // }
}