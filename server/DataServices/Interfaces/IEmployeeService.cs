using Server.Models;

namespace Server.Services.Interfaces;

public interface IEmployeeService
{
    Task<IEnumerable<Employee>> GetAllAsync();
    Task<Employee> GetByIdAsync(int employee_id);

    Task <Employee> EditEmployeeAsync(Employee employee);

    //i want to be able to delete an employee
    // Task<Employee> GetByIdAsync(Employee employee);

    // Task DeleteEmployeeAsync(Employee employee);
}
