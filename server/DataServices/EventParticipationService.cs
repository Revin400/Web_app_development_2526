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

    public async Task<List<ParticipateResponse>> GetAllParticipationsAsync()
    {
        return await db.EventParticipations
            .Select(ep => new ParticipateResponse
            {
                EventId = ep.EventId,
                UserId = ep.UserId,
            })
            .ToListAsync();
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

        var now = DateTime.Now;
        var eventStart = ev.EventDate;

        if (eventStart <= now.AddHours(-1))
            throw new Exception("Cannot participate in past events");

        if (eventStart <= now)
            throw new Exception("Cannot participate in ongoing events");

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

    public async Task<List<ParticipateResponse>> RemoveParticipationAsync(int eventId, int userId)
    {
        var participations = await db.EventParticipations
            .FirstOrDefaultAsync(ep =>
                ep.EventId == eventId &&
                ep.UserId == userId);

        var ev = await _eventService.GetEventByIdAsync(eventId);

        if (ev == null)
            throw new Exception("Event not found");

        if (participations == null)
            throw new Exception("User is not participating in this event");

        if (participations.Event.EventDate <= DateTime.Now)
            throw new Exception("Cannot cancel participation for past or ongoing events");


        db.EventParticipations.Remove(participations);
        await db.SaveChangesAsync();

        return await GetAllParticipationsAsync();
    }

    public async Task<string> GetParticipationStatusAsync(int eventId, int userId)
    {
        var participation = await db.EventParticipations
            .FirstOrDefaultAsync(ep =>
                ep.EventId == eventId &&
                ep.UserId == userId);

        return participation.Status;
    }
}

