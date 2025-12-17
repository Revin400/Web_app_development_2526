namespace Server.Models;

public class EventParticipation
{
    public int EventId { get; set; }
    public Event Event { get; set; } = null!;

    public int UserId { get; set; }
    public Employee User { get; set; } = null!;

    public string Status { get; set; }
}

public class ParticipateRequest
{
    public int EventId { get; set; }
    public int UserId { get; set; }
}

public class ParticipateResponse
{
    public int EventId { get; set; }
    public int UserId { get; set; }
}
