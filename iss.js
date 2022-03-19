// const args = process.argv.slice(2, process.argv.length);
// const fs = require("fs");
const request = require("request");
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const jsonIPObject = "https://api.ipify.org/?format=json";
const fetchMyIP = (IPcallback) => {
  // use request to fetch IP address from JSON API
  request(jsonIPObject, (error, response, body) => {
    if (error) {
      IPcallback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      IPcallback(
        Error(`Status Code ${response.statusCode} when fetching IP: ${body}`),
        null
      );
      return;
    }
    // console.log(response, body);
    const ip = JSON.parse(body).ip;
    // console.log(data.ip);
    return ip; //might want to check with a mentor about this line.. used to be IPcallback(ip)
  });
};

const jsonLatLongObject = "https://freegeoip.app/json/";
const fetchCoordsByIP = (ip, coordsCallback) => {
  request(jsonLatLongObject + ip, (error, response, body) => {
    if (error) {
      coordsCallback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      coordsCallback(
        Error(
          `Status Code ${response.statusCode} when fetching Lat/Long: ${body}`
        ),
        null
      );
      return;
    }
    const latitude = JSON.parse(body).latitude;
    const longitude = JSON.parse(body).longitude;
    // console.log("latitude", latitude);
    // console.log("ip", ip);
    coordsCallback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = (coords, flyoverCallback) => {
  request(
    `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`,
    (error, response, body) => {
      if (error) {
        flyoverCallback(error, null);
        return;
      }
      if (response.statusCode !== 200) {
        flyoverCallback(
          Error(
            `Status Code ${response.statusCode} when fetching Lat/Long: ${body}`
          ),
          null
        );
        return;
      }
      const nextPasses = JSON.parse(body).response;
      // console.log("nextpasses", nextPasses);
      // console.log("ip", ip);
      flyoverCallback(null, nextPasses);
    }
  );
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
