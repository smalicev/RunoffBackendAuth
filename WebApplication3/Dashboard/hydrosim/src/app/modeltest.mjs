import Catchment from "./catchment.mjs";
import Storm from "./storm.mjs";
import Hydrograph from "./hydrograph.mjs";

let test = new Catchment();

console.log(test.sParameter)

let stormTest = new Storm();


let testHydro = new Hydrograph(stormTest,test);

console.log(testHydro);
