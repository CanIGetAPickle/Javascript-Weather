if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        loadWeather(position.coords.latitude + ',' + position.coords.longitude);
    });
} else {
    loadWeather("London,UK", "");
}

$(document).ready(function() {
    setInterval(getWeather, 10000);
});

function loadWeather(location, woeid) {
    $.simpleWeather({
        location: location,
        woeid: woeid,
        unit: 'F',
        success: function(weather) {
            city = weather.city;
            temp = weather.temp + '&deg;';
            altTemp = Math.round((weather.temp - 32) * (5 / 9)) + '&deg;';
            wcode = '<img class="weathericon" src="images/weathericons/' + weather.code + '.svg">';
            wind = '<p>' + weather.wind.speed + '</p><p>' + weather.units.speed + '</p>';
            altWind = '<p>' + Math.round(weather.wind.speed * 1.6) + '</p><p>kph</p>';
            humidity = weather.humidity + ' %';
            $(".location").text(city);
            $(".temperature").html(temp).show();
            $(".alt-temperature").html(altTemp).hide();
            $(".climate_bg").html(wcode);
            $(".windspeed").html(wind).show();
            $(".alt-windspeed").html(altWind).hide();
            $(".humidity").text(humidity);
        },
        error: function(error) {
            $(".error").html('<p>' + error + '</p>');
        }

    });
}

$("button").click(function() {
    $(".temperature").toggle();
    $(".alt-temperature").toggle();
    $(".windspeed").toggle();
    $(".alt-windspeed").toggle();
});
