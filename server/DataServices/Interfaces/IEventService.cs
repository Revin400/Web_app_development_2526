using Server.Models;
using System.Collections.Generic;

    public interface IEventService
    {
        Task<List<Event>> GetAllEventsAsync();
        Task<Event> GetEventByIdAsync(int eventId);
        Task<Event> CreateEventAsync(Event newEvent);
        Task<Event> UpdateEventAsync(Event updatedEvent);
        Task<bool> DeleteEventAsync(int eventId);

        
    }