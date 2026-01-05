using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Services;
using Server.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddScoped<IAdminService, AdminService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IEventService, EventService>();
builder.Services.AddScoped<IOfficeAttendanceService, OfficeAttendanceService>();
builder.Services.AddScoped<IEventParticipationService, EventParticipationService>();
builder.Services.AddScoped<IEmailService, EmailService>();


builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession();
builder.Services.AddHttpContextAccessor();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()          
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.EnsureCreated();
}

app.Urls.Add("http://localhost:5000");

app.UseCors("AllowFrontend");
app.UseSession();
app.MapControllers();


app.Run();
