using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.RegularExpressions;
using WebApplication3.Models;

namespace WebApplication3.Models
{
  public class Hydrograph : Graph
  {
    [Key]
    public int Id { get; set; }

    [MaxLength]
    public string Time { get; set; }

    [MaxLength]
    public string Value { get; set; }

    [Required(ErrorMessage = "User ID is required")]
    public string UserID { get; set; }

    [MaxLength(48)]
    public string CatchmentName { get; set; }

    [MaxLength(48)]
    public string StormName { get; set; }

    [MaxLength(30)]
    public string DateInserted { get; set; }

    [NotMapped]
    public double TimeStep { get; set; }
    [NotMapped]
    public double TimeToPeak { get; set; }
    [NotMapped]
    public double KinematicWaveK { get; set; }
    [NotMapped]
    public double[] EffectiveRunoff { get; set; }
    [NotMapped]
    public double[] Convolutions { get; set; }
    [NotMapped]
    public double TotalRunoff { get; set; }
    [NotMapped]
    public Storm CurrentStorm { get; set; }
    [NotMapped]
    public Catchment CurrentCatchment { get; set; }


      public Hydrograph(Storm storm, Catchment catchment)
    {
    CurrentStorm = storm;
    CurrentCatchment = catchment;
    }

    public double CalculateKinematicWaveK()
    {
     return (Math.Pow(CurrentCatchment.FlowLength,0.6) * Math.Pow(CurrentCatchment.RoughnessCoefficient, 0.6)) / (Math.Pow(CurrentStorm.PrecipitationDataIntensity.Max(),0.4) * Math.Pow(CurrentCatchment.SlopePercent / 100,0.3));
    }

    public double[] SCSLosses()
    {
      List<double> cumulativeLosses = new List<double>();

      double CumulativeLoss(double dataPoint)
      {
        return Math.Pow(dataPoint - 0.2*CurrentCatchment.SParameter,2) / (dataPoint + 0.8*CurrentCatchment.SParameter);
      }

            foreach (var value in CurrentStorm.CumulativePrecipitation)
            {
        cumulativeLosses.Add(CumulativeLoss(value));
            }

            return cumulativeLosses.ToArray();
        }

    /// <summary>
    ///  need a convolution type now......
    /// </summary>
    public convoluteRural()
    {
      List<Dictionary<double,double>> AllUnitHydrographs;

            for (var i = 0; i < EffectiveRunoff.Length; i++)
            {
              Dictionary<double, double> singleGraph = new Dictionary<double, double>;
              while (new InstantaneousUnitResponse(this).NASH(EffectiveRunoff[i], TimeStep * (i + 1)) > 0.0005)
              {
                  
                singleGraph.Add((TimeStep * (i + 1)), new InstantaneousUnitResponse(this).NASH(EffectiveRunoff[i], TimeStep * (i + 1)));

              }

              AllUnitHydrographs.Add(singleGraph)

            }

        
    
    }

public class InstantaneousUnitResponse
{

    public Hydrograph Hydrograph { get; set; }

    public InstantaneousUnitResponse(Hydrograph hydrograph)
    {
      Hydrograph = hydrograph;
    }

  // Urban Catchments
  public double SCS(string flowState, double flowRate, double time)
  {
     if ( flowState == "Post")
    {
        return (flowRate * Math.Exp( - ( time - Hydrograph.TimeStep) / Hydrograph.KinematicWaveK));
    } else if ( flowState == "Pre")
    {
        return (Hydrograph.TimeStep / Hydrograph.TimeStep * flowRate);
    } else if ( flowState == "Peak")
    {
        return (flowRate - Math.Exp(-(Hydrograph.TimeStep / Hydrograph.KinematicWaveK))) / Hydrograph.TimeStep;
    } else
    {
      throw new Exception("Stateless Flow");
    }
  }
    // Rural Catchments
    public double NASH(double flowRate, double time)
    {
      return (flowRate * (Math.Pow((time / Hydrograph.CurrentCatchment.TimeToPeak),(1-Hydrograph.CurrentCatchment.NumberOfReservoirs)) * Math.Exp((1-Hydrograph.CurrentCatchment.NumberOfReservoirs)*((1/Hydrograph.TimeToPeak) - 1))));
    }
}
}