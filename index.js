const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

// fetchMyIP(fetchCoordsByIP);
// let currentIP = fetchMyIP();
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   return ip;
// });

// fetchCoordsByIP("173.180.183.10", (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned coordinates: ", coordinates);
// });
// fetchISSFlyOverTimes(
//   { latitude: 50.2592, longitude: -119.2714 },
//   (error, passTimes) => {
//     if (error) {
//       console.log("It didn't work!", error);
//       return;
//     }
//     console.log("It worked! Returned passtimes: ", passTimes);
//   }
// );
