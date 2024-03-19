import { cumulate, incrementCumulative, calculateAverage, addAllLikeProperties } from "./numericalMethods.mjs";

class Hydrograph {
  constructor(id = null, storm, catchment) {
    this.timeStep =  storm.timeStep;
    this.timeToPeak = this.timeStep;
    this.storm = storm;
    this.catchment = catchment;
    this.kinematicWaveK = this.calcKinematicWaveK()
    this.effectiveRunoff = incrementCumulative(this.scsLosses(this.storm.cumulativePrecipitation));
    this.Value = null;
    this.Time = null;
    this.convolutions = this.convolute(this.linearIUH());
    this.name = `${storm.name} on ${catchment.name}`
    this.generateTimeSeriesandIncRunoff();
    this.id = id;
    this.totalRunoff = (this.storm.precipitationData.reduce(
      (accumulator, currentValue) => accumulator + currentValue) / 1000) * (this.catchment.areaHectares * 10000); // metres cubed
    this.totalLosses = (this.effectiveRunoff.reduce(
      (accumulator, currentValue) => accumulator + currentValue) / 1000) * (this.catchment.areaHectares * 10000); // metres cubed
  }

  valuesToIntensity(valueArray) {
    let intensityArray = [];
    console.log(this.storm.cumulativePrecipitation)

    valueArray.forEach((value, idx) => {
      intensityArray.push(value / (this.timeStep / 60))
    })

    return intensityArray
  }

  // kinmateic wave k might need a redo look at alan smith docs
  calcKinematicWaveK() {
    let maxIntensity = Math.max(...this.storm.precipitationDataIntensity)
    console.log(maxIntensity)
    return ((this.catchment.flowLength**0.6) * (this.catchment.roughnessCoeff)**0.6) / (((maxIntensity)**0.4) * (this.catchment.slopePercent/100)**0.3)
  }

  // the output of this results in the cumulative excess (Pe) at time t... given cumulative precipitation
  // sometimes, the second or third number is lower than the first - initial abstraction
  scsLosses(cumulativePrecipitation) {
    let cumulativeLosses = [];
    let s = this.catchment.sParameter;

    function cumulativeLoss(dataPoint) {
      return (((dataPoint - 0.2*s)**2) / (dataPoint + 0.8*s))
    }
    
    cumulativePrecipitation.forEach((dataPoint, idx) => {
      cumulativeLosses.push(cumulativeLoss(dataPoint));
    })

    return cumulativeLosses;
  }

  // instantaneous unit hydrograph
  // how to go from hyetograph to hydrograph https://learn.hydrologystudio.com/hydrology-studio/knowledge-base/scs-nrcs-hydrographs-2/
  // is the end of the design storm always the peak of the hydrograph ? - no each hyetograph point is processed through all 3 of these functions. the peak is determined by adding them all together
  // in the URBHYD routine, delta t = time to peak. so in prepeak flow, we only have one time step - useless to calculate? it ends up being (0,0)  then (Tp, peakFlow)
/*
prePeakFlowFunc: (peakFlow) => (this.storm.timeStep/this.storm.timeStep * (peakFlow)), // I set peak time to computational time step - therefore peak flow is found immediately - no need for this func
      peakFlowFunc: (peakFlow) => peakFlow * (this.storm.timeStep / this.timeToPeak),
      postPeakFlowFunc: (peakFlow, time) => peakFlow * (Math.exp(-(time - this.storm.timeStep) / this.kinematicWaveK))
*/
  linearIUH() {
    return {
      prePeakFlowFunc: (peakFlow) => (this.storm.timeStep/this.storm.timeStep * (peakFlow)), // I set peak time to computational time step - therefore peak flow is found immediately - no need for this func
      peakFlowFunc: (peakFlow) => (((peakFlow - Math.exp(-(this.storm.timeStep / this.kinematicWaveK))) / this.storm.timeStep)),
      postPeakFlowFunc: (peakFlow, time) => peakFlow * (Math.exp(-(time - this.storm.timeStep) / this.kinematicWaveK))

    }
  }

  convolute(unitHydrograph) {
    const MINIMUM_RUNOFF = 0.005;
    let allHydrographs = [];

    this.effectiveRunoff.forEach((dataPoint, idx) => {
      let individualHydrograph = {};
      let hydrographTime = this.timeStep;

      individualHydrograph[this.timeStep * (idx + 1)] = unitHydrograph.peakFlowFunc(dataPoint);
      let iterations = 0;

      console.log(unitHydrograph.peakFlowFunc(dataPoint) + 'peak flow')
      while (unitHydrograph.postPeakFlowFunc(dataPoint, hydrographTime) > MINIMUM_RUNOFF && iterations < 1000) {
        iterations ++;
        individualHydrograph[hydrographTime + (this.timeStep * (idx + 1))] = unitHydrograph.postPeakFlowFunc(dataPoint, hydrographTime + this.timeStep)
        hydrographTime = hydrographTime + this.timeStep;
      }

      
      allHydrographs.push(individualHydrograph);
    })

    console.log(allHydrographs)
    return addAllLikeProperties(allHydrographs);
    
  }

  generateTimeSeriesandIncRunoff() {
    this.Time = [0];
    this.Value = [0];

    for (const property in this.convolutions) {
      this.Time.push(property);
      this.Value.push(((this.convolutions[property] / 100) * this.catchment.areaHectares*10000) / (this.storm.timeStep * 60))
    }
  }


}


export { Hydrograph as default }