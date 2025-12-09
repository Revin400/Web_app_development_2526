using System;
using System.ComponentModel.DataAnnotations;


public class OfficeAttendance
{
    [Key]
    public int Id { get; set; }
    public int user_id { get; set; }
    public DateTime date { get; set; }
    public string status { get; set; }
}
