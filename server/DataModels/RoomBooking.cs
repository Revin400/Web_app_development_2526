namespace Server.Models
{
    public class RoomBooking
    {
        public int Id { get; set; }
        public int RoomId { get; set; }
        public string UserId { get; set; }  // references the logged-in user
        public DateTime BookingDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public string Purpose { get; set; }
    }
}
