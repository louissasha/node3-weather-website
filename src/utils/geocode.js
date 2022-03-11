//code the will get us the Geocode of a named location

const request = require("request");

const geocode = (address, callback) => {
  // make the URL dynamic so that we can use the parameters inside the function and make it dynamic.
  const URL =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibG91aXNzYXNoYSIsImEiOiJjbDBnemsyNjAwM3BnM2RxYmJsbmVhYTl4In0.c8o2EOWS84tQ_gBYhIGEsA&limit=1";

  request({ url: URL, json: true }, (error, { body }) => {
    if (error) {
      //this is where we can log a message back to the user if there is an error
      //this is the first place we can use the callback fuction, rememeber the callback function is just a parameter like any other since it
      // was added as a parameter at the top of the function and therefore is withing its entire scope
      callback("Unable to connect to the location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location! Try another search", undefined);
    } else {
      //callback that will call into the next api in order to get the actual weather
      //longitude
      const longitude = body.features[0].center[0];
      //latitude
      const latitude = body.features[0].center[1];

      //location property of the API call

      const location = body.features[0].place_name;

      //setup the callback function
      // when we setup the callback we are essentially passing it arguments to call back to the top of the function so that the top of the function that will actually
      //do somehting witht the arguments can have access to them, so its like we are passing arguments to be used later essentially
      callback((error = undefined), {
        latitude: latitude,
        longitude: longitude,
        placeName: location,
      });
    }
  });
};

module.exports = geocode;
