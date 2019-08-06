const request = require("request");
const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
    address
  )}.json?access_token=pk.eyJ1IjoibWlocmFibWlhaCIsImEiOiJjanl2NWNrM2MwaWh0M2dwOTh3d2s0bTcyIn0.8XCxPHcpWoHEgnTYYpK4eA`;


  request({
    url: url,
    json: true
  }, (err, res) => {
    if (err) {
      callback("Unable to connect to location services!", undefined);
    } else if (res.body.features.length === 0) {
      callback("Unable to find location", undefined);
    } else if ((res.body.features[0].text).toLowerCase() != address.toLowerCase()) {
      callback(undefined, {
        error: "Location not found"
      });
    } else {
      callback(undefined, {
        lattitude: res.body.features[0].center[1],
        longitude: res.body.features[0].center[0],
        location: res.body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;