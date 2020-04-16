// API key
var apiKey = 'b3d4ffb82a70ee7f0cd14ee1afcc08c9';
var weatherKey = '&units=imperial&APPID=b3d4ffb82a70ee7f0cd14ee1afcc08c9';
// pull current date from moment
var today = moment().format('MM/DD/YYYY');
// city search array
var cities = ["Seattle", "Munich", "Honolulu", " Washington DC", " San Diego", "Kansas CIty", "Chicago", "Nashville"];

function alertCityName() {
    var cityName = $(this).attr("data-name");

    alert(cityName);
}

function displayCityWeather(city) {
    $("#currentWeather").empty();

    var city = $(this).attr("data-name");
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=b3d4ffb82a70ee7f0cd14ee1afcc08c9";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var iconCode = response.weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";

        $("#current-city").text("City: " + response.name + " (" + today + ")" + "<img src=" + iconUrl + "/>");
        $("#current-temp").text("Temperature: " + response.main.temp + "°F");
        $("#current-hum").text("Humidity: " + response.main.humidity + "%");
        $("#current-wind").text("Wind Speed: " + response.wind.speed + "MPH");
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

function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < cities.length; i++) {

        var a = $("<button>");
        a.attr("type", "button");
        a.addClass("list-group-item list-group-item-action");
        a.addClass("city");
        a.attr("data-name", cities[i]);
        a.text(cities[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-city").on("click ", function (event) {
    event.preventDefault();
    var city = $("#city-input").val().trim();
    cities.push(city);
    renderButtons();
    console.log("#add-city was clicked");
})

$(document).on("click", ".city", displayCityWeather);
renderButtons();

// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).then(function (response) {
//     console.log(response);
// });