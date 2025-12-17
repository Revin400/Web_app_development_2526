using Server.Models;

namespace Server.Services.Interfaces;

public interface IEventParticipationService
{
    Task<Event> ParticipateInEventAsync(int eventId, int userId);
    
}