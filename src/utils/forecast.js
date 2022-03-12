const request = require("request");

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (longitude, latitude, callback) => {
  //long
  const long = longitude;

  //lat
  const lat = latitude;

  //longlat
  const longlat = long + "," + lat;

  //define my base URL
  const URL =
    "http://api.weatherstack.com/current?access_key=a46fdce36a0a765965555f1b84b9776b&query=" +
    longlat +
    "&units=f";

  //make the api request
  request({ url: URL, json: true }, (error, { body }) => {
    //error handling
    if (error) {
      //if we cant connect to the api
      callback("There was an error getting to the API", undefined);
    } else if (body.error) {
      callback("There was an error witht he search parameters", undefined);
      //do something with the error inside the response
    } else {
      //do something with the data
      //callback(error, response.body);
      console.log("This is the body of the response from the weatherstack");
      console.log(body);

      callback(
        error,
        body.current
        // body.current.weather_descriptions[0] +
        //   ". The current temperature is " +
        //   body.current.temperature +
        //   " degrees out. It feels like " +
        //   body.current.feelslike +
        //   " degrees out. " +
        //   "The overall pressure is " +
        //   body.current.pressure +
        //   " And the visibility is " +
        //   body.current.visibility
      );
    }
  });
};

module.exports = forecast;
