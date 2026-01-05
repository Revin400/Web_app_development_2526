using System.ComponentModel.DataAnnotations;

public class Group
{
    [Key]
    public int Id { get; set;}
    public string Name { get; set;}
    
    public string Description { get; set;}
    public ICollection<GroupMembership> GroupMemberships { get; set; } = new List<GroupMembership>();

}