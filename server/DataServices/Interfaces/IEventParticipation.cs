using Server.Models;

namespace Server.Services.Interfaces;

public interface IEventParticipationService
{
    Task<List<ParticipateResponse>> GetAllParticipationsAsync();
    Task<Event> ParticipateInEventAsync(int eventId, int userId);
    Task<List<ParticipateResponse>> RemoveParticipationAsync(int eventId, int userId);
    Task<string> GetParticipationStatusAsync(int eventId, int userId);
}