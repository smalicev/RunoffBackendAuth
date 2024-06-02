using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApplication3.Models
{
    public class Storm
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
    public string StormDescription { get; set; }

    [MaxLength(30)]
    public string DateInserted { get; set; }

    [NotMapped]
    public string Name { get; set; }

    [NotMapped]
    public double[] TimeData { get; set; }
    [NotMapped]
    public double[] PrecipitationDataIntensity { get; set; }
    [NotMapped]
    public double TimeStep { get; set; }
    [NotMapped]
    public double[] PrecipitationData;
    [NotMapped]
    public double[] CumulativePrecipitation;
    public double[] IntensityToValues(double[] intensity)
    {
      var valueArray = intensity.Select(inten => inten * (TimeStep / 60)).ToArray();

      return valueArray;
    }
    public static double[] Cumulate(double[] incrementalArray)
    {
      List<double> cumulativeValues = new List<double>();
      double currentTotal = 0;

      foreach ( double value in incrementalArray )
      {
        currentTotal += value;
        cumulativeValues.Add(currentTotal);
      }

      return cumulativeValues.ToArray();
    }

    public Storm(string name, double[] timeData, double[] precipitationDataIntensity)
    {
      Name = name;
      TimeData = timeData;
      PrecipitationDataIntensity = precipitationDataIntensity;
      TimeStep = TimeData[1] - TimeData[0];
      PrecipitationData = IntensityToValues(precipitationDataIntensity);
      CumulativePrecipitation = Cumulate(PrecipitationData);
    }
   
  }
}
