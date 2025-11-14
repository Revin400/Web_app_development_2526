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

// listen to :5000


var app = builder.Build();


app.Urls.Add("http://localhost:5000");

app.UseHttpsRedirection();
app.MapControllers();

app.Run();
