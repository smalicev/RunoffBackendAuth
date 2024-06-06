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
    public double TotalRunoff { get; set; }
    [NotMapped]
    public Storm CurrentStorm { get; set; }
    [NotMapped]
    public Catchment CurrentCatchment { get; set; }


    public Hydrograph(Storm storm, Catchment catchment)
    {
      CurrentStorm = storm;
      CurrentCatchment = catchment;
      CatchmentName = catchment.Name;
      StormName = storm.Name;
      TimeStep = storm.TimeStep;
      TimeToPeak = CurrentCatchment.TimeToPeak;
      
      EffectiveRunoff = SCSLosses();

      if (catchment is UrbanCatchment)
      {
        KinematicWaveK = CalculateKinematicWaveK();
        XValues = ToGraph(convoluteUrban()).Item1;
        YValues = ToGraph(convoluteUrban()).Item2;
      } else if (catchment is RuralCatchment)
      {
        XValues = ToGraph(convoluteRural()).Item1;
        YValues = ToGraph(convoluteRural()).Item2;
      } else
      {
        throw new Exception("Unknown Catchment Type");
      }
      




    }

    public double CalculateKinematicWaveK()
    {
      Console.WriteLine("Actualrc: " + string.Join(",", Math.Pow(CurrentCatchment.RoughnessCoefficient, 0.600)));
      Console.WriteLine("Actualrc: " + string.Join(",", Math.Pow(CurrentCatchment.FlowLength, 0.600)));
      Console.WriteLine("Actualrc: " + string.Join(",", Math.Pow(CurrentCatchment.SlopePercent, 0.600)));
      Console.WriteLine("Actualrc: " + string.Join(",", Math.Pow(CurrentStorm.PrecipitationDataIntensity.Max(), 0.600)));

      return (Math.Pow(CurrentCatchment.FlowLength, 0.600) * Math.Pow(CurrentCatchment.RoughnessCoefficient, 0.600)) / (Math.Pow(CurrentStorm.PrecipitationDataIntensity.Max(), 0.400) * Math.Pow(CurrentCatchment.SlopePercent / 100.00, 0.3));
    }

    public double[] SCSLosses()
    {
      List<double> cumulativeLosses = new List<double>();

      double CumulativeLoss(double dataPoint)
      {
        return Math.Pow(dataPoint - 0.2 * CurrentCatchment.SParameter, 2) / (dataPoint + 0.8 * CurrentCatchment.SParameter);
      }

      foreach (var value in CurrentStorm.CumulativePrecipitation)
      {
        cumulativeLosses.Add(CumulativeLoss(value));
      }

      return cumulativeLosses.ToArray();
    }

    public Dictionary<double,double> convoluteRural()
    {
      List<Dictionary<double, double>> AllUnitHydrographs = new List<Dictionary<double,double>>();

      for (var i = 0; i < EffectiveRunoff.Length; i++)
      {
        Dictionary<double, double> singleGraph = new Dictionary<double, double>();

        double hydrographTime = TimeStep;

        // Continue adding new points to the graph until the runoff response is less than 0.0005
        while (new InstantaneousUnitResponse(this).NASH(EffectiveRunoff[i], hydrographTime + TimeStep * (i + 1)) > 0.005)
        {

          singleGraph.Add(hydrographTime + (TimeStep * (i + 1)), new InstantaneousUnitResponse(this).NASH(EffectiveRunoff[i], hydrographTime + TimeStep * (i + 1)));

          hydrographTime = hydrographTime + TimeStep;
        }

        AllUnitHydrographs.Add(singleGraph);

            }

      return addLikeProperties(AllUnitHydrographs);

    }


    public Dictionary<double,double> convoluteUrban()
    {
      List<Dictionary<double, double>> AllUnitHydrographs = new List<Dictionary<double, double>>();

      for (var i = 0; i < EffectiveRunoff.Length; i++)
      {
        Dictionary<double, double> singleGraph = new Dictionary<double, double>();

        double hydrographTime = TimeStep;

        // Add the peak flow point to the graph
        // Pre peak flow is not considered. Peak flow is estimated to occur at the timestep.
        // Therefore, there are no values between 0 and the timestep calcualted by this method.
        singleGraph.Add((TimeStep * (i + 1)), new InstantaneousUnitResponse(this).SCS("Peak", EffectiveRunoff[i], TimeStep * (i + 1)));

        // Continue adding new points to the graph until the runoff response is less than 0.005
        while (new InstantaneousUnitResponse(this).SCS("Post", EffectiveRunoff[i], hydrographTime + TimeStep * (i + 1)) > 0.005)
        {

          singleGraph.Add((hydrographTime + (TimeStep * (i + 1))), new InstantaneousUnitResponse(this).SCS("Post", EffectiveRunoff[i], hydrographTime + TimeStep * (i + 1)));

          hydrographTime = hydrographTime + TimeStep;
        }

        AllUnitHydrographs.Add(singleGraph);

            }
      return addLikeProperties(AllUnitHydrographs);
    }


    public Dictionary<double, double> addLikeProperties(List<Dictionary<double, double>> graphList) 
    {

      Dictionary<double, double> finalGraph = new Dictionary<double, double>();

      foreach(var graph in graphList)
      {

        foreach(var key in graph.Keys)
        {

          if(finalGraph.ContainsKey(key))
          {
            finalGraph[key] = finalGraph[key] + graph[key];
          } else
          {
            finalGraph[key] = graph[key];
          }

        }

      }

      return finalGraph;

    }


    public (double[], double[]) ToGraph(Dictionary<double, double> graph)
    {
      double[] time = graph.Keys.ToArray();
      double[] values = graph.Values.ToArray();

      (double[], double[]) graphTuple = (time, values);

      return graphTuple;
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