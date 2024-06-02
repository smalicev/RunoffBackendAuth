using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using WebApplication3;
using WebApplication3.Controllers;
using WebApplication3.Models;

namespace WebApplication3.Tests
{
  [TestClass]
  public class StormModelTest
  {
    [TestMethod]
    public void All()
    {
      // Arrange
      Storm storm = new Storm("Test", new double[] { 0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180 },
        new double[] { 5, 8, 12, 55, 74, 112, 78, 56, 55, 32, 4, 2, 1 });

      // Act
     

      // Assert - cumulative and intensity to value conversion working?

     Assert.AreEqual(15, storm.TimeStep);

      Console.WriteLine("Expected: " + string.Join(", ", new double[] { 1.25, 2, 3, 13.75, 18.5, 28, 19.5, 14, 13.75, 8, 1, 0.5, 0.25 }));
      Console.WriteLine("Actual: " + string.Join(", ", storm.PrecipitationData));


      CollectionAssert.AreEqual(new double[] { 1.25, 2, 3, 13.75, 18.5, 28, 19.5, 14, 13.75, 8, 1, 0.5, 0.25 }, storm.PrecipitationData);
      CollectionAssert.AreEqual(new double[] { 1.25, 3.25, 6.25, 20, 38.5, 66.5, 86, 100, 113.75, 121.75, 122.75, 123.25, 123.5 }, storm.CumulativePrecipitation);
    }

  }
}
