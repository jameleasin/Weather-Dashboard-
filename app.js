//retrieves HTML 
function initPage() {
    var inputEl = document.getElementById("city-input");
    var searchEl = document.getElementById("search-button");
    var clearEl = document.getElementById("clear-history");
    var nameEl = document.getElementById("city-name");
    var nameEl = document.getElementById("city-input");
    var currentPicEl = document.getElementById("current-pic");
    var currentTempEl = document.getElementById("temperature");
    var currentHumidityEl = document.getElementById("humidity");
    var currentWindEl = document.getElementById("wind-speed");
    var curentUVEl = document.getElementById("UV-index");
    var historyEl = document.getElementById("history")
        //checks if item already exists in local storage, if not gives an empty string
    var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    console.log(searchHistory);

    //personal API key for Open Weather API
    var APIkey = "5d24139cd3087b3e091640cbcdec7262";

}