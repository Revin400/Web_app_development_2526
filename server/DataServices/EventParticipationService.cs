using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Services.Interfaces;

namespace Server.Services;

public class EventParticipationService : IEventParticipationService
{

    private readonly ApplicationDbContext db;
    private readonly IEventService _eventService;
    private readonly IHttpContextAccessor _http;


    public EventParticipationService(
        ApplicationDbContext db,
        IEventService eventService,
        IHttpContextAccessor http)
    {
        this.db = db;
        _eventService = eventService;
        _http = http;
    }

    public async Task<Event> ParticipateInEventAsync(int eventId, int userId)
    {
        var ev = await _eventService.GetEventByIdAsync(eventId);

        var existing = await db.EventParticipations
            .FirstOrDefaultAsync(ep =>
                ep.EventId == eventId &&
                ep.UserId == userId);

        
        if (ev == null)
            throw new Exception("Event not found");
    
        if (existing != null)
            throw new Exception("User is already participating in this event");
        

        var participation = new EventParticipation
        {
            EventId = eventId,
            UserId = userId,
            Status = "Attending"
        };

        db.EventParticipations.Add(participation);
        await db.SaveChangesAsync();
        return await _eventService.GetEventByIdAsync(eventId);
    }

}