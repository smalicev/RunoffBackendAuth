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
    public string name { get; set; }
    [NotMapped]
    public double[] timeData { get; set; }
    [NotMapped]
    public double[] precipitationDataIntensity { get; set; }
    [NotMapped]
    private int timeStep = timeData[1] - timeData[0];
    [NotMapped]
    public double[] precipitationData = intensityToValues(precipitationDataIntensity);
    [NotMapped]
    public double[] cumulativePrecipitation = this.cumulate(precipitationData);
    public double[] intensityToValues(double[] intensity)
    {
      var valueArray = intensity.Select(intensity => intensity * (this.timeStep / 60)).ToArray();

      return valueArray;
    }
    public double[] cumulate(double[] incrementalArray)
    {
      List<double> cumulativeValues = new List<double>();
      double currentTotal = 0;

      foreach ( double value in incrementalArray )
      {
        currentTotal = currentTotal + value;
        cumulativeValues.Add(currentTotal);
      }

      return cumulativeValues.ToArray();
    }
    }
}
