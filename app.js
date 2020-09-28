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

    //when search button is clicked then read the text input by user
    function getWeather(cityName) {
        //get request from Open Weather Map API
        //axiosis a promise based HTTP client thsat sports and easy to use API
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey;
        axios.get(queryURL)
            .then(function(response) {
                var currentDate = new Date(response.data.dt * 1000);
                console.log(currentDate);
                var day = currentDate.getDate();
                var month = currentDate.getMonth();
                var year = currentDate.getFullYear();
                //uses the DOM to input weather icons and description, temp, humidity and windspeed
                nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ")";
                var weatherPic = response.data.weather[0].icon;
                currentPicEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
                currentPicEl.setAttribute("alt", response.data.weather[0].description);
                currentTempEl.innerHTML = "Temperature:" + (response.data.main.temp) + '&#176C';
                currentHumidityEl.innerHTML = "Humidity:" + response.data.main.humidity + '%';
                currentWindEl.innerHTML - "Wind Speed:" + response.data.main.wind.speed + "KMPH";
                //DOM to get lat and long
                var lat = response.data.coord.lat;
                var lon = response.data.coord.lon;
                //retrieving UV index from API, creates a span element to put the UV index into and appends the current UVIndex to the UVIndex HTML
                var UVQueryURL = "https://api.openweathermap.org/data/2.5/forcast?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey + "&cnt=1";
                axios.get(UVQueryURL)
                    .then(function(response) {
                        let UVIndex = document.createElement("span");
                        UVIndex.setAttribute("class", "badge badge-danger");
                        currentUVEl.innerHTML = "UV Index: ";
                        currentUVEl.append(UVIndex);
                    });
                var cityID = response.data.id;
                var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityID + "&appid=" + APIkey;
                axios.get(forecastQueryURL)
                    .then(function(response) {
                        var forecastEls = document.querySelectorAll(".forecast");
                        //for loop to loop through forecast for 5 days
                        for (i = 0; i < forecastEls.length; i++) {
                            forecastEls[i].innerHTML = "";
                            var forecastIndex = i * 8 + 4;
                            var forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                            var forecastDay = forecastDate.getDate();
                            var forecastMonth = forecastDate.getMonth();
                            var forecastYear = forecastDate.getFullYear();
                            var forecastDateEl = document.createElement("p");
                            forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                            forecastDateEl.innerHTML = forecastDay + "/" + forecastMonth + "/" + forecastYear;
                            forecastEls[i].append(forecastDateEl);
                            var forecastWeatherEl = document.createElement("img");
                            forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                            forecastWeatherEl.setAttribute("alt", response.data.list[forecastIndex].weather[0].desciption);
                            forecastEls[i].append(forecastWeatherEl);
                            var forecastTempEl = document.createElement("p");
                            forecastTempEl.innerHTML = "Temp: " + (response.data.list[forecastIndex].main.temp) + "&#176C";
                            forecastEls[i].append(forecastTempEl);
                            var forecastHumidity = document.createElement("p");
                            forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                            forecastEls[i].append(forecastHumidityEl);
                        }
                    })
            });
    }
    //on click events for search button
    searchEl.addEventListener("click", function() {
            var searchTerm = inputEl.value;
            getWeather(searchTerm);
            searchHistory.push(searchItem);
            localStorage.setItem("search", JSON.stringify(searchHistory));
            renderSearchHistory();
        })
        //on click event for clearing search history
    clearEl.addEventListener("click", function() {
            searchHistory = [];
            renderSeachHistory();
        })
        //renders search history
    function renderSearchHistory() {
        historyEl.innerHTML = "";
        for (var i; i < searchHistory.length; i++) {
            var historyItem = document.createElement("input");
            historyItem.setAttribute("type", "text");
            historyItem.setAttribute("readonly", true);
            historyItem.setAttribute("class", "form-control d-block bg-white");
            historyItemm.setAttribute("value", searchHistory[i]);
            historyItem.addEventListener("click", function() {
                getWeather(historyItem.value);
            })
            history.append(historyItem);
        }
    }
    renderSearchHistory();
    if (searchHistory.length > 0) {
        getWeather(searchHistory[searchHistory.length - 1]);
    }
    initPage();
}