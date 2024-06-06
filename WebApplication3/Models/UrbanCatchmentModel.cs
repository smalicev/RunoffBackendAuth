using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApplication3.Models
{
  public class UrbanCatchment : Catchment
  {

    [Required]
    public double ImperviousPercent { get; set; }

    [Required]
    public override double SlopePercent { get; set; }

    [Required]
    public double CurveNumber { get; set; }

    [Required]
    public override double FlowLength { get; set; }


    [NotMapped]
    public override double SParameter { get; set; }
    [NotMapped]
    public override double RoughnessCoefficient { get; set; }
    [NotMapped]
    public override double TimeToPeak { get; set; }
    [NotMapped]
    public double PerviousArea { get; set; }


    public UrbanCatchment(string name, double areaHectares, double imperviousPercent, double slopePercent, double curveNumber, double flowLength) : base(name, areaHectares)
    {
      ImperviousPercent = imperviousPercent;
      SlopePercent = slopePercent;
      CurveNumber = curveNumber;
      FlowLength = flowLength;
      RoughnessCoefficient = ImperviousPercent <= 20 ? 0.013 : 0.25;
      SParameter = (254000 / curveNumber) - 254;
    }

  }
}
