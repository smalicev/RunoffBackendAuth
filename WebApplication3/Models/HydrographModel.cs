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
      List<Graph> AllUnitHydrographs;

            for (var i = 0; i < EffectiveRunoff.Length; i++)
            {
        Dictionary<double, double> singleGraph = new Dictionary<double, double>;
        singleGraph.Add((TimeStep * (i + 1)), new InstantaneousUnitResponse(this).NASH(EffectiveRunoff[i]));
        // algorithm isnt making sense to me... are we pushing ONE point, or an array of points? is it a graph or a point ?
            }

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
  public double SCS(Hydrograph hydrograph, string flowState, double flowRate, double time)
  {
     if ( flowState == "Post")
    {
        return (flowRate * Math.Exp( - ( time - hydrograph.TimeStep) / hydrograph.KinematicWaveK));
    } else if ( flowState == "Pre")
    {
        return (hydrograph.TimeStep / hydrograph.TimeStep * flowRate);
    } else if ( flowState == "Peak")
    {
        return (flowRate - Math.Exp(-(hydrograph.TimeStep / hydrograph.KinematicWaveK))) / hydrograph.TimeStep;
    } else
    {
      throw new Exception("Stateless Flow");
    }
  }
    // Rural Catchments
    public double NASH(double flowRate)
    {
      return (flowRate * ((Hydrograph.TimeStep / Hydrograph.CurrentCatchment.TimeToPeak);
    }
}
}