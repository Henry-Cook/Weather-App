//This program grabs weather data from an api using geolocation and displays it for the user.

//Select elements:
const icon = document.querySelector(".weather-icon");
const temp = document.querySelector(".temperature");
const description = document.querySelector(".description");

//Weather data that pulled form api:
const weather = {};

//Api key & Kelvin(used since temp data from api returns kelvin):
const key = "a49cd5d13210a3857dd22a130c762b15";
const kelvin = 273.15;

//Do geolocation services exist? If so get users long and lat:
if ("geolocation" in navigator) {
    console.log("Geolocation is available");
    navigator.geolocation.getCurrentPosition(function (position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        //Call the function to get weather:
        getWeather(latitude, longitude);
    });
} else {
    console.log("Geolocation is not available");
}

//Get weather data from api provider - "Open Weather Maps":
function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    console.log(api);

    //Fetch api data and store it:
    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            weather.temperature = Math.floor(data.main.temp - kelvin);
            weather.description = firstLetter(data.weather[0].description);
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function () {
            displayWeather();
        });
}

// Displays weather for the user:
function displayWeather() {
    //Fahrenheit converter:
    fahrenheit = Math.floor((weather.temperature / 5) * 8 + 32);
    //JavaScript HTML changes based on the data from api:
    icon.innerHTML = '<img src="icons/' + weather.iconId + '.png"/>';
    temp.innerHTML =
        "<p>" + weather.temperature + "°C/" + fahrenheit + "°F" + "</p>";
    description.innerHTML =
        "<p>" +
        weather.description +
        "<br>" +
        weather.city +
        ", " +
        weather.country +
        "</p>";
}

//Function to capitalize first letter of the description
function firstLetter(description) {
    let arr = description.split("");
    let arrTwo = arr[0].toUpperCase();
    arr[0] = arrTwo;
    console.log(arr);
    let text = arr.join("");
    return text;
}
