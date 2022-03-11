//load in request
const request = require("request");

const path = require("path");

const geocode = require("./utils/geocode.js");

const forecast = require("./utils/forecast");

//load in express module
const express = require("express");

//load in HBS
const hbs = require("hbs");

//first step is to create an app from the express function called express()
//this is the top level function created by the module
const app = express();

const publicDirPath = path.join(__dirname, "../public");

const viewsPath = path.join(__dirname, "../templates/views");

const partialsPath = path.join(__dirname, "../templates/partials");

//SETTINGS
//setup a view engine setting for the template engine
app.set("view engine", "hbs");
//setting path to tell express where to get the views specifically if other than the views folder
app.set("views", viewsPath);

//settings for HBS partials
hbs.registerPartials(partialsPath);

//app.use is used to customize the server it, first argument is where the static files will live
//we use the express.static function with the directory of the static files as the argument to let
//express know where to go get the necessary static files.
//STATIC FILES ARE HERE LIKE CSS AND JAVASCRIPT
app.use(express.static(publicDirPath));

//ENVIRONMENT VARIABLES NECESSARY FOR WEB SERVERS
console.log(__dirname); //DIRECTORY/
console.log(path.join(__dirname, "../public"));

console.log(__filename); //COMPLETE PATH TO FILE

//CORE NODE MODULE TO GET THE PATH

//we create the server by using methods on the app application.

/***
 * 
 * Example of routes
//app.com
//app.com/help
//app.com/about

*/

//this is going to tell the server what to do when the users hit a certain url.

app.get("", (req, res) => {
  //because we used handlebars instead of using res.send we will use res.render to render dynamic content
  //first argument is the name of the veiw to render and the second is an oject you wan to view to eb able to access
  res.render("index", {
    title: "Weather App dynamic",
    name: "Sasha",
    text: "This is the footer of the page",
  });

  //res.send("index");
});

app.get("/about", (req, res) => {
  //because we used handlebars instead of using res.send we will use res.render to render dynamic content
  //first argument is the name of the veiw to render and the second is an oject you wan to view to eb able to access
  res.render("about", {
    title: "About page dynamic",
    name: "Sasha Louis",
    text: "This is the footer of the page",
  });
});

app.get("/help", (req, res) => {
  //because we used handlebars instead of using res.send we will use res.render to render dynamic content
  //first argument is the name of the veiw to render and the second is an oject you wan to view to eb able to access
  res.render("help", {
    title: "Help page dynamic",
    name: "Sash",
    message: "If you need some help go to this page",
    text: "This is the footer of the page",
  });
});

app.get("/weather", (req, res) => {
  //to send something back we use the method called send()
  console.log(req.query);
  console.log(req.query.address);
  if (!req.query.address) {
    //log error message
    return res.send({
      error: "need to provide an address",
    });
  } else {
    // add the geocode here

    //if the user entered a value for city the rn the code otherwise dont run and exit
    geocode(
      req.query.address,
      (error, { latitude, longitude, placeName } = {}) => {
        console.log("error", error);
        //console.log("data", data);

        if (error) {
          return res.send({ error });
        }

        //we can chain callback functions into one function before we not have access to the response since its within the scope of the first/top function

        forecast(latitude, longitude, (error, forecastData) => {
          //console.log(data.longitude, data.latitude);
          console.log("Error", error);
          console.log("Data", forecastData);

          if (error) {
            return res.send({ error });
          }

          res.send({
            location: placeName,
            data: forecastData,
          });

          console.log(placeName);
          console.log(forecastData);
        });
      }
    );

    // return res.send({
    //   address: req.query.address,
    // });
  }
});

app.get("/products", (req, res) => {
  console.log(req.query);
  console.log(req.query.search);

  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }
  res.send({
    products: [],
  });
  //to send something back we use the method called send()
});

app.get("/help/*", (req, res) => {
  //the wildcard caracther will match on anything that didnt match in the previous routes
  res.render("error", {
    title: "Help page error page",
    text: "Sasha",
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  //the wildcard caracther will match on anything that didnt match in the previous routes
  res.render("error", {
    title: "404 Error Page",
    text: "Sasha",
    message: "Page not found",
  });
  //   res.send("My 404 page");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
