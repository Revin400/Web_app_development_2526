using Server.Models;
using System.ComponentModel.DataAnnotations;

public class GroupMembership
{
    [Key]
    public int userId { get; set;}
    public int GroupId { get; set;}

    public Employee? employee { get; set;} = null! ;
    public Group? group { get; set;} = null!;
}