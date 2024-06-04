using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace WebApplication3.Models
{
  public class Catchment
  {
    [Key]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }

    [Required]
    public double AreaHectares { get; set; }

    [Required(ErrorMessage = "User ID is required")]
    public string UserID { get; set; }

    [MaxLength(48)]
    public string CatchmentDescription { get; set; }

    [MaxLength(30)]
    public string DateInserted { get; set; }

    [NotMapped]
    public double TimeToPeak { get; set; }

    [NotMapped]
    public double NumberOfReservoirs { get; set; }

    [NotMapped]
    public double FlowLength { get; set; }
    [NotMapped]
    public double RoughnessCoefficient { get; set; }
    [NotMapped]
    public double SlopePercent { get; set; }
    [NotMapped]
    public double SParameter { get; set; }

    public Catchment (string name, double areaHectares)
    {
      Name = name;
      AreaHectares = areaHectares; 
    }
  }

}