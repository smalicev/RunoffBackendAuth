using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApplication3.Models
{
  public class RuralCatchment : Catchment
  {

    [Required]
    public double InitialAbstraction { get; set; }

    [Required]
    public double SlopePercent { get; set; }

    [Required]
    public double CurveNumber { get; set; }

    [Required]
    public double FlowLength { get; set; }
    [Required]
    public double RunoffCoefficient { get; set; }

    [NotMapped]
    public double TimeOfConcentration { get; set; }

    [NotMapped]
    public double NumberOfReservoirs { get; set; }
    [NotMapped]
    public double TimeToPeak { get; set; }

    [NotMapped]
    public double SParameter { get; set; }
    [NotMapped]
    public double RoughnessCoefficient { get; set; }

    public double AirportMethod()
    {
      return (3.26 * (1.1 - RunoffCoefficient) * Math.Pow(FlowLength, 0.5)) / Math.Pow(SlopePercent, 1/3);

    }

    public double BransbyWilliamsMethod()
    {
      return (0.057 * FlowLength) / (SlopePercent * Math.Pow(AreaHectares,0.1));
    } 

    public RuralCatchment(string name, double areaHectares, double initialAbstraction, double slopePercent, double curveNumber, double flowLength, double runoffCoefficient, double numberOfReservoirs) : base(name, areaHectares)
    {
      InitialAbstraction = initialAbstraction;
      SlopePercent = slopePercent;
      CurveNumber = curveNumber;
      FlowLength = flowLength;
      NumberOfReservoirs = numberOfReservoirs;
      TimeOfConcentration = runoffCoefficient >= 0.4 ? BransbyWilliamsMethod() : AirportMethod();
      TimeToPeak = ((numberOfReservoirs - 1) / (numberOfReservoirs)) * TimeOfConcentration;
      RoughnessCoefficient = 0.013;
      RunoffCoefficient = runoffCoefficient;
      SParameter = (254000 / curveNumber) - 254;
    }

  }
}