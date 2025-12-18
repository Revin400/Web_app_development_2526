using System;
using System.Text.Json.Serialization;
namespace Server.Models;

public class Event
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime EventDate { get; set; }
    public string CreatedBy { get; set; }


    [JsonIgnore]
    public ICollection<EventParticipation> Participants { get; set; }
        = new List<EventParticipation>();
}