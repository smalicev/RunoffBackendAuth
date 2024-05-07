using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApplication3.Models;

public class UrbanCatchmentDbContext : DbContext
{
    public DbSet<UrbanCatchment> UrbanCatchments { get; set; }

    public UrbanCatchmentDbContext() : base("name=DefaultConnection")
    {

    }
}