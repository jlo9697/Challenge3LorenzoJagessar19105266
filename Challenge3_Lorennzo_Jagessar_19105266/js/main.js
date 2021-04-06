//LOCATION API (MAPBOX)/////////////////////////////////////////////////////////////////////////////////////////////////////
mapboxgl.accessToken = 'pk.eyJ1IjoiamxvOTY5NyIsImEiOiJja214dWFqd3cwczh5MnJxc2o1YW52NHR2In0.Rs5eKeKeCGIFLvY20KlBYA';
var map = new mapboxgl.Map({
    container: 'map', //container ID
    style: 'mapbox://styles/mapbox/navigation-preview-night-v4', //style URL
    center: [4.468063,52.059803],
    zoom: 10
});

map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
)

var homemarker = new mapboxgl.Marker()
    .setLngLat([4.468063,52.059803])
    .addTo(map);

var floridamarker = new mapboxgl.Marker({color: 'orange'})
    .setLngLat([-80.191788, 25.761681])
    .addTo(map);

var nevadamarker = new mapboxgl.Marker({color: 'green'})
    .setLngLat([-116.424558,38.807611])
    .addTo(map);

var arabiamarker = new mapboxgl.Marker({color: 'yellow'})
    .setLngLat([45.782902,24.006326])
    .addTo(map);

var tokyomarker = new mapboxgl.Marker({color: 'purple'})
    .setLngLat([139.839478,35.652832])
    .addTo(map);

var popupgreenland = new mapboxgl.Popup({ closeOnClick: false})
    .setLngLat([-42.604301, 71.706940])
    .setHTML('<h3>Low population, higher risk of dying</h3>')
    .addTo(map);

var popupantarctica = new mapboxgl.Popup({ closeOnClick: false})
    .setLngLat([22.362884, -78.903929])
    .setHTML('<h3>Very low population, highest risk of dying</h3>')
    .addTo(map);

var popupnorthkorea = new mapboxgl.Popup({ closeOnClick: false})
    .setLngLat([126.604968, 39.232253])
    .setHTML('<h3>Danger Zone!</h3>')
    .addTo(map);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//WEATHER API (OPENWEATHERMAP)//////////////////////////////////////////////////////////////////////////////////////////////////////////
function weatherapi(){
    var key = 'http://api.openweathermap.org/data/2.5/weather?appid=2f4c13e4bd5b3aad42fb93627ad78734&q=';
    var cityinput = document.getElementById('place').value;

    var req = key + cityinput;

    fetch(req)

    .then(function(response){
        if(!response.ok) throw Error(response.statusText);
        return response.json();
    })

    .then(function(response){
        apiweather(response);
    })

    .catch(function(error){
        apifault(error);
    });
}

function apiweather(response){
    var cityname = response.name;
    var countryname = response.sys.country;
    var tempcel = Math.floor(response.main.temp - 273.15);
    var feelslike = Math.floor(response.main.feels_like - 273.15);
    var descr = response.weather[0].description;
    var showstatus = document.getElementById('weatherstatus');

    showstatus.innerHTML = cityname + ',' + ' ' + countryname + '<br>' + tempcel + ' ' + '&#176;C <br>' + 'Feels like' + ' ' + feelslike + ' ' + '&#176;C <br>' + descr;
}

function apifault(error){
    var showstatus = document.getElementById('weatherstatus');
    showstatus.innerHTML = 'This city does not exist <br> Try again'
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//ANIME QUOTATION API (ANIMECHAN)///////////////////////////////////////////////////////////////////////
function quoteapi(){
    var key2 = 'https://animechan.vercel.app/api/random';
    
    fetch(key2)

    .then(function(response){
        return response.json();
    })

    .then(function(quote){
        console.log(quote);

        var anime = quote.anime;
        var kwoot = quote.quote;
        var character = quote.character;

        document.getElementById('quote').innerHTML = '"' + kwoot + '"';
        document.getElementById('character').innerHTML = '-' + ' ' + character;
        document.getElementById('anime').innerHTML = 'From' + ' ' + anime;
    })
}
quoteapi();
//////////////////////////////////////////////////////////////////////////////////