function paginate(list) {
    const SUBLISTLENGTH = 5;
    let totalArray = [];

    if (list.length > SUBLISTLENGTH) {
        for (let j = 1; j <= list.length / SUBLISTLENGTH; j++) {
            totalArray.push([]);

            for (let i = 0; i < SUBLISTLENGTH; i++) {
                totalArray[j - 1].push(list[i * j]);
            }
        }
    } else {
        return [list];
    }
    return totalArray;
}

function interpolate(xOne, xTwo, yOne, yTwo, xInt) {
    let linearFactor = (yTwo - yOne) / (xTwo - xOne);
    return linearFactor * xInt;
}

function incrementCumulative(cumulativeArray) {
    let incrementalArray = [];

    for (let i = cumulativeArray.length - 1; i > 0; i--) {
        incrementalArray.push(cumulativeArray[i] - cumulativeArray[i - 1]);
    }

    incrementalArray.push(cumulativeArray[0]);

    return incrementalArray.reverse();
}

function calculateAverage(array) {
    const sum = array.reduce((acc, curr) => acc + curr, 0);
    const average = sum / array.length;
    return average;
}

function cumulate(incrementalArray) {
    let cumulativeArray = [];

    incrementalArray.forEach((dataPoint, idx) => {
        let currentTotal = 0;

        for (let i = 0; i <= idx; i++) {
            currentTotal += incrementalArray[i];
        }

        cumulativeArray.push(currentTotal);
    });

    return cumulativeArray;
}

function addAllLikeProperties(arrayOfObjects) {
    let newObject = {};

    arrayOfObjects.forEach((object, idx) => {
        for (const property in object) {
            if (newObject[property] === undefined) {
                newObject[property] = object[property];
            } else {
                newObject[property] += object[property];
            }
        }
    });

    return newObject;
}

export {
    cumulate,
    incrementCumulative,
    calculateAverage,
    addAllLikeProperties,
    paginate,
};
