function getApi(city) {

    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=8dc431793fa117a46c92a939890cc1fc"
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })

      .then(function (data) {
        // Use the console to examine the response
        // console.log(data);

        // create a variable for the current date and change it to YYYY-MM-DD format without the time on the end
        var currentDate = new Date();
        currentDate = currentDate.toISOString().split('T')[0];

        // change the name of the city (and add the current date to it) in the top right container that holds current weather conditions for that city
        var cityName = $('#current-city').text(data.name + " (" + currentDate + ")");

        // find the coordinates for longitude and latitude
        var longitude = data.coord.lon;
        // console.log(longitude);
  
        var latitude = data.coord.lat;
        // console.log(latitude);

        // create new api url that pulls more detailed info (such as UV Index)
        var longLatUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly,minutely&units=imperial&appid=8dc431793fa117a46c92a939890cc1fc"

        // fetch new data from newly generated api url
        fetch(longLatUrl)
            .then(function (response) {
            return response.json();
            })

            .then(function (data) {
            // Use the console to examine the response
            console.log(data);

            currentForecast(data)

            futureForecast(data);

            })

      })

};

$("#load-button").click(function () {

    // retrieve the item from local storage    
    var cityHistory = JSON.parse(localStorage.getItem("cityInfo"));

    for (var i=0; i < cityHistory.length; i++) {

        // if the loop is resarting, erase the old buttons and re-add from scratch with additional buttons
        if (i===0) {
            $("#city-buttons").empty();
        }

        // save the new city as a button
        var newCity = $('<button type="button">' + cityHistory[i] + '</button>');

        // when the button is clicked, get the city's info to display again
        newCity.attr( "onclick", "getApi(city)" );

        // append the new city to the list of city buttons
        $("#city-buttons").append(newCity);
        
    }
});

$("#clear-button").click(function () {
    localStorage.clear();
    $("#city-buttons").empty();
});

$("#search-button").click(function () {

    // save the value of the search bar to a variable
    var city = $("#search-bar").val();

    console.log(city);

    // get all api info to display
    getApi(city);

    // retrieve the item from local storage    
    var cityHistory = JSON.parse(localStorage.getItem("cityInfo"));
    
     // if there is nothing in local storage, create an empty array for cities to be stored in
    if (!cityHistory){
        var cityHistory = [];
    }
    
    // add the city searched by user to an array
    cityHistory.push(city);
    
    // save the city that was typed into local storage
    localStorage.setItem("cityInfo", JSON.stringify(cityHistory));

    for (var i=0; i < cityHistory.length; i++) {

        // if the loop is resarting, erase the old buttons and re-add from scratch with additional buttons
        if (i===0) {
            $("#city-buttons").empty();
        }

        // save the new city as a button
        var newCityButton = $('<button type="button" class="city-click">' + cityHistory[i] + '</button>');

        // set a unique attribute to the buttons to call when clicked
        newCityButton.attr("data-event", cityHistory[i]);

        // when the button is clicked, get the city's info to display again
        newCityButton.click(function() {

            console.log(cityHistory);

        });

        // append the new city to the list of city buttons
        $("#city-buttons").append(newCityButton);
        
    }

});

function futureForecast (data) {

    // set variables to get month/year
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    // set variables to get each of the next 5 days
    var dayOne = new Date().getDate() + 1;
    var dayTwo = new Date().getDate() + 2;
    var dayThree = new Date().getDate() + 3;
    var dayFour = new Date().getDate() + 4;
    var dayFive = new Date().getDate() + 5;

    // set the current weather icon for the respective day to a url
    var icon1 = "http://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon +  "@2x.png";
    var icon2 = "http://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon +  "@2x.png";
    var icon3 = "http://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon +  "@2x.png";
    var icon4 = "http://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon +  "@2x.png";
    var icon5 = "http://openweathermap.org/img/wn/" + data.daily[5].weather[0].icon +  "@2x.png";


    // find the forecast card elements

        // card for 1 day out
        $('#day-1-date').text(month + "/" + dayOne + "/" + year);
        
        $("#icon-1-url").attr("src", icon1);

        $('#day-1-temp').text("Temp: " + data.daily[1].temp.day + " °F");

        $('#day-1-wind').text("Wind: " + data.daily[1].wind_speed + " MPH");

        $('#day-1-humid').text("Humidity: " + data.daily[1].humidity + " %");

        // card for 2 days out
        $('#day-2-date').text(month + "/" + dayTwo + "/" + year);
        
        $("#icon-2-url").attr("src", icon2);

        $('#day-2-temp').text("Temp: " + data.daily[2].temp.day + " °F");

        $('#day-2-wind').text("Wind: " + data.daily[2].wind_speed + " MPH");

        $('#day-2-humid').text("Humidity: " + data.daily[2].humidity + " %");

        // card for 3 days out
        $('#day-3-date').text(month + "/" + dayThree + "/" + year);
        
        $("#icon-3-url").attr("src", icon3);

        $('#day-3-temp').text("Temp: " + data.daily[3].temp.day + " °F");

        $('#day-3-wind').text("Wind: " + data.daily[3].wind_speed + " MPH");

        $('#day-3-humid').text("Humidity: " + data.daily[3].humidity + " %");
  
        // card for 4 days out
        $('#day-4-date').text(month + "/" + dayFour + "/" + year);
        
        $("#icon-4-url").attr("src", icon4);

        $('#day-4-temp').text("Temp: " + data.daily[4].temp.day + " °F");

        $('#day-4-wind').text("Wind: " + data.daily[4].wind_speed + " MPH");

        $('#day-4-humid').text("Humidity: " + data.daily[4].humidity + " %");
  
        // card for 5 days out
        $('#day-5-date').text(month + "/" + dayFive + "/" + year);
        
        $("#icon-5-url").attr("src", icon5);

        $('#day-5-temp').text("Temp: " + data.daily[5].temp.day + " °F");

        $('#day-5-wind').text("Wind: " + data.daily[5].wind_speed + " MPH");

        $('#day-5-humid').text("Humidity: " + data.daily[5].humidity + " %");
  

};

function currentForecast (data) {

    // set the current weather icon
    var currentIcon = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon +  "@2x.png";

    // make a new element to attach to header h2 and set the current weather icon to it
    $("#current-icon").attr("src", currentIcon );

    // make a new list item to attach to unordered list and set the current Temp in Farenheit to it
    $('#current-temp').text("Temperature: " + data.current.temp + " °F");

    // make a new list item to attach to unordered list and set the current Wind Speed to it
    $('#current-wind').text("Wind Speed: " + data.current.wind_speed + " MPH");

    // make a new list item to attach to unordered list and set the current Humidity percentage to it
    $('#current-humid').text("Humidity: " + data.current.humidity + " %");

    // make a new list item to attach to unordered list and set the current UV Index to it
    $('#style-uv').text(data.current.uvi);

        // if the UV is at or below 4, background is green
        if ( data.current.uvi <=4 ){
            $('#style-uv').css("background-color", "lightgreen");
        }

        // if the UV is between 4 and 8 (including 8) background is yellow
        else if ( datadata.current.uvi > 4 && data.current.uvi <=8 ) {
            $('#style-uv').css("background-color", "yellow");
        }

        // if the UV is above 8, background is red
        else {
            $('#style-uv').css("background-color", "lightred");
        }
};

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Denver");
