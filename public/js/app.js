console.log("Client side Javascript files is loaded");
console.log("Client side Javascript files is loaded");

//test

//FETCH API
fetch("/weather?address=Montreal").then((response) => {
  //on the javascript side we use the then function which will fire off when we get the resonse object back from the api call.

  console.log(response);

  if (response.status == 200) {
    response.json().then((data) => {
      //this function is going to run when the data has arrive and been parsed

      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data.data);
        console.log(data.location);

        fetch("http://puzzle.mead.io/puzzle").then((response) => {
          // after then gets resolved the callback function will fire
          // enter the code here since you are in the callback function right now
          response.json().then((data2) => {
            console.log(data2, data.data);
          });
        });
      }
    });
  }
});

// put the element inside of a variable
const weatherForm = document.querySelector("form");

const searchElement = document.querySelector("input");

const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const message3 = document.querySelector("#message-3");
const message4 = document.querySelector("#message-4");
const message5 = document.querySelector("#message-5");

messageOne.textContent = "From Javascript";
messageTwo.textContent = "From Javascript 2";

// add even listener to lookout for a change in the form
weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // put a placeholder loading message
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  //add the search value from the search element that was the input
  const location = searchElement.value;

  fetch("/weather?address=" + location).then((response) => {
    console.log(response); //this is promise type object
    console.log(
      response.json().then((value) => {
        if (value.error) {
          messageOne.textContent = value.error;
        } else {
          console.log(value.data.temperature);
          console.log(value.data.weather_code);
          console.log(value.data.observation_time);

          messageOne.textContent = value.location;
          messageTwo.textContent = value.data.weather_descriptions[0];
          message3.textContent =
            "The temperature is: " + value.data.temperature;
          message4.textContent =
            "The weather code is: " + value.data.weather_code;
          message5.textContent =
            "The observation time is: " + value.data.observation_time;
        }
      })
    );
  });

  console.log(location);
});
