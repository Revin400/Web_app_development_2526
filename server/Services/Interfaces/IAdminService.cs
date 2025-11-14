using Server.Models;

namespace Server.Services.Interfaces;

public interface IAdminService
{
    Task<IEnumerable<Admin>> GetAllAsync();
}
