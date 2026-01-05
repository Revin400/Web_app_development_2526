using System.Net;
using System.Net.Mail;
using Server.Services.Interfaces;

namespace Server.Services;

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;
    private readonly IEmployeeService _employeeService;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IConfiguration configuration, IEmployeeService employeeService, ILogger<EmailService> logger)
    {
        _configuration = configuration;
        _employeeService = employeeService;
        _logger = logger;
    }

    public async Task<bool> SendEmailAsync(string toEmail, string subject, string body)
    {
        try
        {
            var smtpHost = _configuration["EmailSettings:SmtpHost"];
            var smtpPort = int.Parse(_configuration["EmailSettings:SmtpPort"] ?? "587");
            var smtpUser = _configuration["EmailSettings:SmtpUser"];
            var smtpPassword = _configuration["EmailSettings:SmtpPassword"];
            var fromEmail = _configuration["EmailSettings:FromEmail"];
            var fromName = _configuration["EmailSettings:FromName"] ?? "Calendify";

            if (string.IsNullOrEmpty(smtpHost) || string.IsNullOrEmpty(smtpUser) || 
                string.IsNullOrEmpty(smtpPassword) || string.IsNullOrEmpty(fromEmail))
            {
                _logger.LogError("Email configuratie ontbreekt. Controleer appsettings.json");
                return false;
            }

            using var smtpClient = new SmtpClient(smtpHost, smtpPort)
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(smtpUser, smtpPassword)
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(fromEmail, fromName),
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };

            mailMessage.To.Add(toEmail);

            await smtpClient.SendMailAsync(mailMessage);
            _logger.LogInformation($"Email succesvol verzonden naar {toEmail}");
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError($"Fout bij verzenden email: {ex.Message}");
            return false;
        }
    }

    public async Task<bool> SendEmailToEmployeeAsync(int employeeId, string subject, string body)
    {
        try
        {
            var employee = await _employeeService.GetByIdAsync(employeeId);
            if (employee == null)
            {
                _logger.LogError($"Werknemer met ID {employeeId} niet gevonden");
                return false;
            }

            if (string.IsNullOrEmpty(employee.Email))
            {
                _logger.LogError($"Werknemer {employee.Name} heeft geen email adres");
                return false;
            }

            return await SendEmailAsync(employee.Email, subject, body);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Fout bij verzenden email naar werknemer: {ex.Message}");
            return false;
        }
    }

    public async Task<bool> SendEmailToMultipleEmployeesAsync(List<int> employeeIds, string subject, string body)
    {
        var results = new List<bool>();
        foreach (var employeeId in employeeIds)
        {
            var result = await SendEmailToEmployeeAsync(employeeId, subject, body);
            results.Add(result);
        }

        return results.All(r => r);
    }

    public async Task<bool> SendEmailWithTemplateAsync(string toEmail, string subject, string templateName, Dictionary<string, string> templateData)
    {
        try
        {
            var templatePath = Path.Combine(Directory.GetCurrentDirectory(), "EmailTemplates", $"{templateName}.html");
            
            if (!File.Exists(templatePath))
            {
                _logger.LogError($"Email template niet gevonden: {templatePath}");
                return false;
            }

            var templateContent = await File.ReadAllTextAsync(templatePath);
            
            // Vervang placeholders in template
            foreach (var data in templateData)
            {
                templateContent = templateContent.Replace($"{{{{{data.Key}}}}}", data.Value);
            }

            return await SendEmailAsync(toEmail, subject, templateContent);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Fout bij verwerken email template: {ex.Message}");
            return false;
        }
    }

    public async Task<bool> SendEmailToEmployeeWithTemplateAsync(int employeeId, string subject, string templateName, Dictionary<string, string> templateData)
    {
        try
        {
            var employee = await _employeeService.GetByIdAsync(employeeId);
            if (employee == null)
            {
                _logger.LogError($"Werknemer met ID {employeeId} niet gevonden");
                return false;
            }

            if (string.IsNullOrEmpty(employee.Email))
            {
                _logger.LogError($"Werknemer {employee.Name} heeft geen email adres");
                return false;
            }

            // Voeg employee naam toe aan template data
            if (!templateData.ContainsKey("Name"))
            {
                templateData["Name"] = employee.Name;
            }

            return await SendEmailWithTemplateAsync(employee.Email, subject, templateName, templateData);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Fout bij verzenden email met template naar werknemer: {ex.Message}");
            return false;
        }
    }
}
