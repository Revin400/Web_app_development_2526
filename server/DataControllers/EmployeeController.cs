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