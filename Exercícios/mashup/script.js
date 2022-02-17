var weatherIcon;
var submitButton;
var cityText;

function main() {
    weatherIcon = document.getElementById("weather-icon");
    submitButton = document.getElementById("submit-button");
    cityText = document.getElementById("city");

    submitButton.onclick = () => changeCity(cityText.value)
}

let weatherSVG = {
    "SKC": "e/e7/Gnome-weather-clear", 
    "FEW": "5/57/Gnome-weather-few-clouds", 
    "SCT" : "b/b9/Gnome-weather-showers-scattered", 
    "BNK" : "6/66/Weather-fog", 
    "OVC" : "6/61/Gnome-weather-overcast",
    "CAVOK": "5/57/Gnome-weather-few-clouds"
};

function changeIcon(code) {
    weatherIcon.src = "https://upload.wikimedia.org/wikipedia/commons/" + weatherSVG[code] + ".svg";
}

function sendRequest(url, callback, request=null) {
    let promise;
    if (request) promise = fetch(url, request);
    else promise = fetch(url);
    
    promise
    .then(callback)
    .catch(function(error) {console.log("Not working 1")});
}

async function processWeatherRequest(response) {
    if(response.ok) {
        let message = await response.json();
        changeIcon(message["weatherObservation"]["cloudsCode"]);
     } else
        console.log("Not working 2");
}

function changeWeather(lat, long) {
    let url = `http://api.geonames.org/findNearByWeatherJSON?formatted=true&lat=${lat}&lng=${long}&username=twlab&style=full`;
    
    sendRequest(url, processWeatherRequest);
}

async function processCityRequest(response) {
    if(response.ok) {
        let message = await response.json();
        changeWeather(message["geonames"][0]["lat"], message["geonames"][0]["lng"]);
     } else
        console.log("Not working 3");
}

function changeCity(city) {
   let url = `http://api.geonames.org/searchJSON?formatted=true&q=${city}&lang=pt&username=twlab&style=full`;
   
   sendRequest(url, processCityRequest);
}

window.onload = main;