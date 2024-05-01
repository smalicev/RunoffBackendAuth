using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApplication3.Models;

public class StormDbContext : DbContext
{
    public DbSet<Storm> Storms { get; set; }

    public StormDbContext() : base("name=DefaultConnection")
    {

    }
}