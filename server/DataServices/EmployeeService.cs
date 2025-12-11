using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Services.Interfaces;

namespace Server.Services;

public class EmployeeService(ApplicationDbContext db) : IEmployeeService
{
    public async Task<IEnumerable<Employee>> GetAllAsync()
    {
        return await db.Employees.ToListAsync();
    }

    public async Task<Employee> GetByIdAsync(int employee_id)
    {
        return await db.Employees
            .Where(e => e.UserId == employee_id)
            .FirstOrDefaultAsync();
    }
    public async Task<Employee> EditEmployeeAsync(Employee employee)
    {
        Employee emp = await GetByIdAsync(employee.UserId);
        if (emp != null)
        {
            emp.Name = employee.Name;
            emp.Role = emp.Role;
            emp.Email = employee.Email;
            emp.Password = emp.Password;
            await db.SaveChangesAsync();
        }
        return emp;
    }



        public async Task<bool> ChangePasswordAsync(int userId, string oldPassword, string newPassword)
    {
        var employee = await GetByIdAsync(userId);
        if (employee == null)
            return false;

        // Verify old password matches
        if (employee.Password != oldPassword)
            return false;

        // Update to new password
        employee.Password = newPassword;
        await db.SaveChangesAsync();
        return true;
    }





}

   