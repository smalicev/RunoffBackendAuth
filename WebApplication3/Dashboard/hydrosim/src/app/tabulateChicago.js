"use strict"
import { interpolate } from "./numericalMethods.mjs";

// Tabulates a Chicago Storm distribution using the Sherman I-D equation and Chicago Method from Keifer and Chu (1957).
/// Should the results terminate at the duration, or should they adhere to the timestep? For now, it will adhere to the timestep.
class ChicagoStorm {
    constructor(timestep, duration, a, b, c, peaktime, description) {
        this.timestep = timestep;
        this.duration = duration;
        this.a = a;
        this.b = b;
        this.c = c;
        this.peaktime = peaktime
        this.time = [];
        this.intensity = [];
        this.peakRatio = peaktime / duration;
        this.description = description;
    }

    generateTab() {
        // Reverse of prepeak is by convention of the equation
        this.intensity = this.generatePrePeak().reverse().concat(this.generatePostPeak());
        this.sortTime();
        this.generateLastPoint(); /// I will leave this in here, but it is not required. 
        return this;              
    }

    generatePrePeak() {
        let intensity = [];
        //// By convention, time = 0 is the peak and this equation calculates reverse chronologically from the peak.
        //// starts at i = timestep because PostPeak is already calculating at time = 0 from the peak time. Don't want to double up on peaks.
        for (let i = this.timestep; i <= this.roundToTimestep(this.peaktime); i += this.timestep ) {
            intensity.push(((this.a * ( (i / this.peaktime) * (1 - this.c) + this.b)) 
            / ( ((i / this.peakRatio) + this.b)**(1 + this.c) )).toFixed(2))
            this.time.push(this.roundToTimestep(this.peaktime) - i);
        }

        return intensity;
    }

    roundToTimestep(number) {
        return Math.round(number/this.timestep) * this.timestep

    }

    generatePostPeak() {
        let intensity = [];
        //// By convention, time = 0 is the peak and this equation calculates chronologically from the peak.
        for (let i = 0; i <= (this.roundToTimestep(this.duration) - this.roundToTimestep(this.peaktime)); i += this.timestep ) {
            intensity.push(((this.a * ( (i / (1 - this.peakRatio)) * (1 - this.c) + this.b)) /
             ( ((i / (1 - this.peakRatio)) + this.b)**(1 + this.c) )).toFixed(2));
             this.time.push(i + this.roundToTimestep(this.peaktime));
        }

        return intensity;
    }

    sortTime() {
        this.time.sort((a,b) =>  a - b)
    }

    generateLastPoint() {
        let timeAfterPeak = this.duration - this.peaktime;

        if (this.time[this.time.length-1] < this.duration) {
            this.time.push(this.duration)
            this.intensity.push(((this.a * ( (timeAfterPeak / (1 - this.peakRatio)) * (1 - this.c) + this.b)) /
            ( ((timeAfterPeak / (1 - this.peakRatio)) + this.b)**(1 + this.c) )).toFixed(2));
        } 
    }

}

export { ChicagoStorm as default }