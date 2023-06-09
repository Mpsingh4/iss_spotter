const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    // handle errors
    if (error) return callback(error, null);
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }
    // parse IP address from JSON response
    const ip = JSON.parse(body).ip;
    //callback(null, ip);
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status code: ${response.statusCode} during fetching \n Response: ${body}`;
      return callback(Error(msg), null);
    } else {
      const data = JSON.parse(body);
      const coordinates = {
        latitude: data.latitude,
        longitude: data.longitude
      };
      callback(null, coordinates);
    }
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };
//module.exports = { fetchCoordsByIP };