// https://civi.ca/wp-content/uploads/2018/09/Reference-Guide-VO5_1.pdf
// http://www.alanasmith.com/downloads/manuals/MIDUSSv2Reference.pdf
//// finish init storm, finish hydrograph object
class Catchment {
  constructor(id = null, name, areaHectares = 1, imperviousPercent = 30, slopePercent = 1, curveNumber = 85, flowLength = 40) {
    this.name = name;
    this.areaHectares = areaHectares;
    this.imperviousPercent = imperviousPercent;
    this.slopePercent = slopePercent;
    this.curveNumber = curveNumber;
    this.sParameter = (1000/curveNumber) + 10;
    this.flowLength = flowLength;
    this.roughnessCoeff = this.imperviousPercent <= 20 ? 0.013:0.25;
    this.timeToPeak = this.imperviousPercent <= 20? null : this.kinematicWaveK;
    this.id = id;
  }

}

export { Catchment as default }