const request = require("request");

const jsonIPObject = "https://api.ipify.org/?format=json";
const fetchMyIP = (IPcallback) => {
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
    const ip = JSON.parse(body).ip;
    return IPcallback(null, ip);
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
      flyoverCallback(null, nextPasses);
    }
  );
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        callback(error, null);
        return;
      }
      fetchISSFlyOverTimes(coords, (error, nextPasses) => {
        if (error) {
          callback(error, null);
          return;
        }
        return callback(null, nextPasses);
      });
    });
  });
};

module.exports = {
  nextISSTimesForMyLocation,
};
