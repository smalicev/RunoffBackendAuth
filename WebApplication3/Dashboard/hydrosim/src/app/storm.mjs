import {
    cumulate,
    incrementCumulative,
    calculateAverage,
} from "./numericalMethods.mjs";

class Storm {
    constructor(
        id = null,
        name,
        timeData = [0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180],
        precipitationDataIntensity = [
            5, 8, 12, 55, 74, 112, 78, 56, 55, 32, 4, 2, 1,
        ]
    ) {
        this.timeData = timeData;
        this.timeStep = timeData[1] - timeData[0];
        this.precipitationDataIntensity = precipitationDataIntensity;
        this.precipitationData = this.intensityToValues(
            this.precipitationDataIntensity
        );
        this.cumulativePrecipitation = cumulate(this.precipitationData);
        /// precipitation in mm/hr - can we use the IUH just using this? or we have to convert to the timestep.
        //// when do we go from cumulative precipitation to incremental? cumulative runoff to incremental? runoff in terms of what? per hour?
        this.name = name;
        this.id = id;
    }

    intensityToValues(intensityArray) {
        let valueArray = [];

        intensityArray.forEach((intensity, idx) => {
            // assumption - each intensity is mm/hr so a 60 minute duration for the intensity value
            valueArray.push(intensity * (this.timeStep / 60));
        });
        return valueArray;
    }
}
export { Storm as default };
