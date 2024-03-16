using System.Data.Entity;
using WebApplication3.Models;


public class HydrographDbContext : DbContext
{
    public DbSet<Hydrograph> Hydrographs { get; set; }

    public HydrographDbContext() : base("name=DefaultConnection")
    {

    }
}