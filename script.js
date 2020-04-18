// API key
var apiKey = 'b3d4ffb82a70ee7f0cd14ee1afcc08c9';
var weatherKey = '&units=imperial&APPID=b3d4ffb82a70ee7f0cd14ee1afcc08c9';
// pull current date from moment
var today = moment().format('MM/DD/YYYY');
// city search array
var cities = ["Seattle", "Munich", "Honolulu", "Washington DC", "San Diego", "Kansas CIty", "Chicago", "Nashville"];

function alertCityName() {
    var cityName = $(this).attr("data-name");
    alert(cityName);
};

function displayCityWeather(city) {
    $("#currentWeather").empty();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=b3d4ffb82a70ee7f0cd14ee1afcc08c9";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var iconCode = response.weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
        var currentTemp = Math.round(response.main.temp);
        var currentHumid = Math.round(response.main.humidity);

        $("#current-city").html(("City: " + response.name + " (" + today + ")" + "<img src=" + iconUrl + ">"));
        $("#current-temp").text(`Temperature: ${currentTemp}°F`);
        $("#current-hum").text("Humidity: " + currentHumid + " %");
        $("#current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var queryURL = "http://api.openweathermap.org/data/2.5/uvi?&APPID=b3d4ffb82a70ee7f0cd14ee1afcc08c9&lat=" + lat + "&lon=" + lon;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("#current-uv").text("UV Index: " + response.value);
        });
    });
};

function renderFiveDayForecast(city) {

    $("#five-day-forecast").empty();

    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&APPID=b3d4ffb82a70ee7f0cd14ee1afcc08c9";
    console.log(queryURL + " is OpenWeatherMap City 5 day forecast info");

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        $("#five-day-forecast").empty();

        for (var i = 0; i <= 4; i++) {
            console.log(i);

            var nextDay = moment().add(1 + i, 'days').format("MM/DD/YYY");
            var cityIconForecastCode = response.list[i].weather[0].icon;
            var iconForecastURL = "http://openweathermap.org/img/wn/" + cityIconForecastCode + "@2x.png";
            var cityTemperatureForecast = Math.round(response.list[i].main.temp);
            var cityHumidityForecast = response.list[i].main.humidity;

            $("#five-day-forecast")
                .append($("<div>").addClass("card text-white bg-secondary float-left")
                    .attr("id", "forecast-card")
                    .attr("style", "max-width: 15 rem; margin-left: 15px")
                    .append($("<p>").html(nextDay))
                    .append($("<img src=" + iconForecastURL + ">"))
                    .append($("<p>").html("Temperature: " + cityTemperatureForecast + " °F"))
                    .append($("<p>").html("Humidity: " + cityHumidityForecast + " %"))

                );
            $("#five-day-forecast").append;
            console.log(nextDay + ", " + cityTemperatureForecast + ", " + cityHumidityForecast)
        };
    });
};

function renderButtons() {
    //var cities = ["Seattle", "Munich", "Honolulu", "Washington DC", "San Diego", "Kansas CIty", "Chicago", "Nashville"];
    const cities = JSON.parse(localStorage.getItem("cities"))
    if (!localStorage.getItem("cities")) {
        localStorage.setItem("cities", JSON.stringify([]))
    }
    $("#buttons-view").empty();
    for (var i = 0; i <= 10; i++) {
        var a = $("<button>");
        a.attr("type", "button");
        a.addClass("list-group-item list-group-item-action");
        a.addClass("city");
        a.attr("data-name", cities[i]);
        a.text(cities[i]);
        $("#buttons-view").prepend(a);
    }
};

$("#add-city").on("click ", function (event) {
    event.preventDefault();
    var city = $("#city-input").val().trim();
    const cities = JSON.parse(localStorage.getItem("cities"));
    cities.push(city);
    localStorage.setItem("cities", JSON.stringify(cities));
    displayCityWeather(city);
    renderFiveDayForecast(city);
    renderButtons();
    console.log("#add-city was clicked");
});

$(document).on("click", ".city", function () {
    var city = $(this).attr("data-name");
    displayCityWeather(city);
    renderFiveDayForecast(city);
})

function start() {
    renderButtons();
    const stored_cities = JSON.parse(localStorage.getItem("cities"));
    displayCityWeather(stored_cities[stored_cities.length - 1]);
    renderFiveDayForecast(stored_cities[stored_cities.length - 1]);
}

start()