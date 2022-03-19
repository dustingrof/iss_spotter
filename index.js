const { fetchMyIP, fetchCoordsByIP } = require("./iss");

// fetchMyIP(fetchCoordsByIP);
// let currentIP = fetchMyIP();
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   return ip;
// });

fetchCoordsByIP("173.180.183.10", (error, coordinates) => {
  if (error) {
    console.log("It didn't work!", error);
    return; //not catching the above error properly... hmm
  }
  console.log("It worked! Returned coordinates: ", coordinates);
});
