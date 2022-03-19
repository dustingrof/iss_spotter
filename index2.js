const {
  nextISSTimesForMyLocation,
  // fetchMyIP,
  // fetchCoordsByIP,
  // fetchISSFlyOverTimes,
} = require("./iss_promised");

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then((body) => console.log(body));

nextISSTimesForMyLocation()
  .then((passTimes) => {
    console.log(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });

// nextISSTimesForMyLocation((error, passTimes) => {
//   if (error) {
//     return console.log("It didn't work!", error);
//   }
//   console.log(passTimes);
// });
