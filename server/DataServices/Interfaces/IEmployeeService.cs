using Server.Models;

namespace Server.Services.Interfaces;

public interface IEmployeeService
{
    Task<IEnumerable<Employee>> GetAllAsync();
    Task<Employee> GetByIdAsync(int employee_id);

    Task <Employee> EditEmployeeAsync(Employee employee);

    

    
    Task<bool> ChangePasswordAsync(int userId, string oldPassword, string newPassword);

    // change email adress
    Task<bool> ChangeEmailAsync(int userId, string oldEmail, string newEmail);
    

    
}
