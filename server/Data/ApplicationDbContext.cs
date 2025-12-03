using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    public DbSet<Employee> Employees => Set<Employee>();
    public DbSet<Admin> Admins => Set<Admin>();
    public DbSet<Event> Events { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Employee>().ToTable("employees");
        modelBuilder.Entity<Admin>().ToTable("admins");

        modelBuilder.Entity<Employee>()
            .HasKey(e => e.UserId);

        modelBuilder.Entity<Admin>()
            .HasKey(a => a.AdminId);



        modelBuilder.Entity<Employee>().HasData(new Employee
        {
            UserId = 1,
            Name = "System Administrator",
            Email = "admin@calendify.local",
            Role = "Admin",
            Password = "admin123" 
        });

        modelBuilder.Entity<Admin>().HasData(new Admin
        {
            AdminId = 1,
            UserId = 1,
            Permissions = "Full"
        });
    }
}
