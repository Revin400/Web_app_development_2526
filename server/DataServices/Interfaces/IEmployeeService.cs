using Server.Models;

namespace Server.Services.Interfaces;

public interface IEmployeeService
{
    Task<IEnumerable<Employee>> GetAllAsync();
    Task<Employee> GetByIdAsync(int employee_id);

    Task <Employee> EditEmployeeAsync(Employee employee);

    // Task<Employee> GetByIdAsync(Employee employee);

    // i want to be able to change my own password
    Task<bool> ChangePasswordAsync(int userId, string oldPassword, string newPassword);
    
}
