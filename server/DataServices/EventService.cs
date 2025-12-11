using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Data;

    public class EventService: IEventService
    {
        private readonly ApplicationDbContext _context;


        public EventService(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task<List<Event>> GetAllEventsAsync()
        {
            return await _context.Events.ToListAsync();
        }

        public async Task<Event> GetEventByIdAsync(int eventId)
        {
            return await _context.Events.FirstOrDefaultAsync(e => e.Id == eventId);
        }

        public async Task<Event> CreateEventAsync(Event newEvent)
        {
            _context.Events.Add(newEvent);
            await _context.SaveChangesAsync();
            return newEvent;
        }

        public async Task<Event> UpdateEventAsync(Event updatedEvent)
        {
            var existing = await _context.Events.FirstOrDefaultAsync(e => e.Id == updatedEvent.Id);
            if (existing == null)
                return null;

            existing.Title = updatedEvent.Title;
            existing.Description = updatedEvent.Description;
            existing.EventDate = updatedEvent.EventDate;
            existing.CreatedBy = updatedEvent.CreatedBy;

            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> DeleteEventAsync(int eventId)
        {
            var existing = await _context.Events.FirstOrDefaultAsync(e => e.Id == eventId);
            if (existing == null)
                return false;

            _context.Events.Remove(existing);
            await _context.SaveChangesAsync();
            return true;
        }
        
    }