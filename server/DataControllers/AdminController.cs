using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Services.Interfaces;


namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AdminController : ControllerBase
{
    private readonly IAdminService _service;
    private readonly IEmailService _emailService;

    public AdminController(IAdminService service, IEmailService emailService)
    {
        _service = service;
        _emailService = emailService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Admin>>> GetAdmins()
    {
        var admins = await _service.GetAllAsync();
        return Ok(admins);
    }

    [HttpPost("send-email")]
    public async Task<ActionResult> SendEmail([FromBody] SendEmailRequest request)
    {
        if (string.IsNullOrEmpty(request.ToEmail) || string.IsNullOrEmpty(request.Subject) || string.IsNullOrEmpty(request.Body))
        {
            return BadRequest("Email, onderwerp en bericht zijn verplicht");
        }

        var result = await _emailService.SendEmailAsync(request.ToEmail, request.Subject, request.Body);
        
        if (result)
        {
            return Ok(new { message = "Email succesvol verzonden" });
        }
        
        return StatusCode(500, new { message = "Fout bij verzenden email" });
    }

    [HttpPost("send-email-to-employee/{employeeId}")]
    public async Task<ActionResult> SendEmailToEmployee(int employeeId, [FromBody] SendEmailContentRequest request)
    {
        if (string.IsNullOrEmpty(request.Subject) || string.IsNullOrEmpty(request.Body))
        {
            return BadRequest("Onderwerp en bericht zijn verplicht");
        }

        var result = await _emailService.SendEmailToEmployeeAsync(employeeId, request.Subject, request.Body);
        
        if (result)
        {
            return Ok(new { message = $"Email succesvol verzonden naar werknemer {employeeId}" });
        }
        
        return StatusCode(500, new { message = "Fout bij verzenden email" });
    }

    [HttpPost("send-email-to-multiple")]
    public async Task<ActionResult> SendEmailToMultipleEmployees([FromBody] SendEmailToMultipleRequest request)
    {
        if (request.EmployeeIds == null || !request.EmployeeIds.Any())
        {
            return BadRequest("Werknemers lijst is verplicht");
        }

        if (string.IsNullOrEmpty(request.Subject) || string.IsNullOrEmpty(request.Body))
        {
            return BadRequest("Onderwerp en bericht zijn verplicht");
        }

        var result = await _emailService.SendEmailToMultipleEmployeesAsync(request.EmployeeIds, request.Subject, request.Body);
        
        if (result)
        {
            return Ok(new { message = $"Email succesvol verzonden naar {request.EmployeeIds.Count} werknemers" });
        }
        
        return StatusCode(500, new { message = "Fout bij verzenden email naar één of meer werknemers" });
    }

    [HttpPost("send-template-email")]
    public async Task<ActionResult> SendTemplateEmail([FromBody] SendTemplateEmailRequest request)
    {
        if (string.IsNullOrEmpty(request.ToEmail) || string.IsNullOrEmpty(request.Subject) || string.IsNullOrEmpty(request.TemplateName))
        {
            return BadRequest("Email, onderwerp en template naam zijn verplicht");
        }

        var result = await _emailService.SendEmailWithTemplateAsync(request.ToEmail, request.Subject, request.TemplateName, request.TemplateData ?? new Dictionary<string, string>());
        
        if (result)
        {
            return Ok(new { message = "Email met template succesvol verzonden" });
        }
        
        return StatusCode(500, new { message = "Fout bij verzenden email met template" });
    }

    [HttpPost("send-template-email-to-employee/{employeeId}")]
    public async Task<ActionResult> SendTemplateEmailToEmployee(int employeeId, [FromBody] SendTemplateEmailContentRequest request)
    {
        if (string.IsNullOrEmpty(request.Subject) || string.IsNullOrEmpty(request.TemplateName))
        {
            return BadRequest("Onderwerp en template naam zijn verplicht");
        }

        var result = await _emailService.SendEmailToEmployeeWithTemplateAsync(employeeId, request.Subject, request.TemplateName, request.TemplateData ?? new Dictionary<string, string>());
        
        if (result)
        {
            return Ok(new { message = $"Email met template succesvol verzonden naar werknemer {employeeId}" });
        }
        
        return StatusCode(500, new { message = "Fout bij verzenden email met template" });
    }
}

public record SendEmailRequest(string ToEmail, string Subject, string Body);
public record SendEmailContentRequest(string Subject, string Body);
public record SendEmailToMultipleRequest(List<int> EmployeeIds, string Subject, string Body);
public record SendTemplateEmailRequest(string ToEmail, string Subject, string TemplateName, Dictionary<string, string>? TemplateData);
public record SendTemplateEmailContentRequest(string Subject, string TemplateName, Dictionary<string, string>? TemplateData);
