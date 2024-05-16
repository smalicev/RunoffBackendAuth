// https://civi.ca/wp-content/uploads/2018/09/Reference-Guide-VO5_1.pdf
// http://www.alanasmith.com/downloads/manuals/MIDUSSv2Reference.pdf
//// finish init storm, finish hydrograph object
class Catchment {
    constructor(id = null, name, areaHectares = 1) {
        this.name = name;
        this.areaHectares = areaHectares;
        this.id = id;
    }
}

class UrbanCatchment extends Catchment {
    constructor(
        id = null,
        name,
        areaHectares = 1,
        imperviousPercent = 30,
        slopePercent = 1,
        curveNumber = 85,
        flowLength = 40
    ) {
        super(id, name, areaHectares);
        this.imperviousPercent = imperviousPercent;
        this.slopePercent = slopePercent;
        this.curveNumber = curveNumber;
        this.sParameter = (25400 / curveNumber) - 254;
        this.flowLength = flowLength;
        this.roughnessCoeff = this.imperviousPercent <= 20 ? 0.013 : 0.25;
        this.timeToPeak = this.kinematicWaveK;
        this.perviousArea = new RuralCatchment(null)
    }
}

class RuralCatchment extends Catchment {
    constructor(
        id = null,
        name,
        areaHectares = 1,
        initialAbstraction = 1,
        slopePercent = 1,
        curveNumber = 30,
        flowLength = 40,
        runoffCoefficient = 0.2,
        numberOfReservoirs = 3
    ) {
        super(id, name, areaHectares);
        this.initialAbstraction = initialAbstraction;
        this.runoffCoefficient = runoffCoefficient;
        this.slopePercent = slopePercent;
        this.curveNumber = curveNumber;
        this.sParameter = (25400 / curveNumber) - 254;
        this.flowLength = flowLength;
        this.roughnessCoeff = 0.013;
        this.timeOfConcentration =
            runoffCoefficient >= 0.4
                ? this.bransbyWilliamsMethod()
                : this.airportMethod();
        this.numberOfReservoirs = numberOfReservoirs;
        this.timeToPeak = (((this.numberOfReservoirs - 1) /this.numberOfReservoirs) * this.timeOfConcentration)
    }

    airportMethod() {
        return (
            (3.26 * (1.1 - this.runoffCoefficient) * this.flowLength ** 0.5) /
            this.slopePercent ** (1 / 3)
        );
    }

    bransbyWilliamsMethod() {
        return (
            (0.057 * this.flowLength) /
            (this.slopePercent * this.areaHectares ** 0.1)
        );
    }
}

export { Catchment, RuralCatchment, UrbanCatchment };
