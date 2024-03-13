


function calculateAverage(array) { 
  const sum = array.reduce((acc, curr) => acc + curr, 0); 
  const average = sum / array.length; 
  return average; 
}

function incrementCumulative(cumulativeArray) {
  let incrementalArray = [];
  
    for (let i = cumulativeArray.length - 1; i > 0; i --) {
      incrementalArray.push(cumulativeArray[i] - cumulativeArray[i-1])
    }

  incrementalArray.push(cumulativeArray[0])

  return incrementalArray.reverse();
}

function cumulate(incrementalArray) {
  let cumulativeArray = [];

  incrementalArray.forEach((dataPoint, idx) => {
    let currentTotal = 0;

    for (let i = 0; i <= idx; i ++) {
      currentTotal += incrementalArray[i]
    }

    cumulativeArray.push(currentTotal);
  })

  return cumulativeArray;
}

function addAllLikeProperties(arrayOfObjects) {

  let newObject = {}

  arrayOfObjects.forEach((object, idx) => {

    for (const property in object) {

      if (newObject[property] === undefined) {
        newObject[property] = object[property]
      } else {
        newObject[property] += object[property]
      }
    }
  })

  return newObject;

}


export { cumulate, incrementCumulative, calculateAverage, addAllLikeProperties }