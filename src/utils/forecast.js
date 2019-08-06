const request = require("request");
const darksky = (lattitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/665a569e72f512e27e54f7b5ef5de50c/${lattitude},${longitude}`;
  request({
    url: url,
    json: true
  }, (err, res) => {
    if (err) {
      callback("Unable to connect to weather service", undefined);
    } else if (res.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        temperature: res.body.currently.temperature,
        summary: res.body.currently.summary,
        precipType: res.body.currently.precipType,
        precipProbability: res.body.currently.precipProbability
      });
    }
  });
};
module.exports = darksky;