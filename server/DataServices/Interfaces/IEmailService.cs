namespace Server.Services.Interfaces;

public interface IEmailService
{
    Task<bool> SendEmailAsync(string toEmail, string subject, string body);
    Task<bool> SendEmailToEmployeeAsync(int employeeId, string subject, string body);
    Task<bool> SendEmailToMultipleEmployeesAsync(List<int> employeeIds, string subject, string body);
    Task<bool> SendEmailWithTemplateAsync(string toEmail, string subject, string templateName, Dictionary<string, string> templateData);
    Task<bool> SendEmailToEmployeeWithTemplateAsync(int employeeId, string subject, string templateName, Dictionary<string, string> templateData);
}
