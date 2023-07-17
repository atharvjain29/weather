
//Weather Application 

    function setWeather(latitude, longitude){
        const pResult = document.querySelector('#weatherFinder p')

    
    let searcher = new XMLHttpRequest();

    searcher.open('get', `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`, true);
    
    searcher.responseType= 'text';

    searcher.addEventListener('load', function(){
        if(searcher.status === 200)
        {
            var jsonObj = JSON.parse(searcher.responseText);

            pResult.innerHTML = "Location: " + jsonObj.name + "<br>";
            pResult.innerHTML += "Wind Speed: " + Math.floor(jsonObj.wind.speed) + " mph <br>";
            pResult.innerHTML += "Latitude: " + jsonObj.coord.lat + "<br>";
            pResult.innerHTML += "Longitude: " + jsonObj.coord.lon + "<br>";
            pResult.innerHTML += "Temperature: " + Math.round(jsonObj.main.temp - 273) + "&#176C";
        }
        else
        {
            pResult.textContent = "error: " + searcher.status
        }
    }, false);

    searcher.send();

}



var key = '9d6cdb403c31b3320414a60e12ac368c';

//Geolocation starts here

document.querySelector('#findLocation').addEventListener('click', geoLookUp, false)

function geoLookUp(){
    const status = document.querySelector('#status')

    function success (position){
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        status.innerHTML = ` latitude: ${latitude} and longitude: ${longitude}`;
        setWeather(latitude, longitude)

        
    }

    function error(err){
        status.innerHTML = `Unable to get your location. Error: ${err.code}. ${err.message}`
    }
    if (!navigator.geolocation){
        status.innerHTML = "Geolocation is not supported here"
    }else{
        status.innerHTML = "..."
        navigator.geolocation.getCurrentPosition(success,error)
    }
}



//part*//

//Global Variables
var searcher1 = new XMLHttpRequest();
var key = "9d6cdb403c31b3320414a60e12ac368c";

function BtnClick(){
    var city = document.getElementById("city").value;
    loadJSON(city);
}


function loadJSON(cityName){
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" +cityName+ "&appid="+ key;

    searcher1.abort();

    searcher1.open("get", url, true);

    searcher1.send();

    searcher1.onreadystatechange = data;


}

function data()
{
    if(searcher1.readyState === 4)
    {
        if(searcher1.status === 200)
        {
            var jsonObj1 = JSON.parse(searcher1.responseText);

            var pResult1 = document.getElementById("weather");

            pResult1.innerHTML = "Location: " + jsonObj1.name + "<br>";
            pResult1.innerHTML += "Wind Speed: " + Math.floor(jsonObj1.wind.speed) + " mph <br>";
            pResult1.innerHTML += "Latitude: " + jsonObj1.coord.lat + "<br>";
            pResult1.innerHTML += "Longitude: " + jsonObj1.coord.lon + "<br>";
            pResult1.innerHTML += "Temperature: " + Math.floor(jsonObj1.main.temp - 273) + "&#176C"; 
            


        }
        else{
            //Error
            var jsonObj1 = JSON.parse(searcher1.responseText);

            var pResult1 = document.getElementById("weather");

            pResult1.innerHTML = "Error:" + jsonObj1.messgae;
        }
    }
}

//locations


// global variables
var waitForUser;

function geoTest() {
   waitForUser = setTimeout(fail, 10000);
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(createMap, fail, {timeout: 10000});
   } else {
      fail();
   }
}
function createMap(position) {
   var Lat;
   var Lng;
   clearTimeout(waitForUser);
   if (position.coords) {
      Lat = position.coords.latitude;
      Lng = position.coords.longitude;
   } 
   var mapOptions = {
      center: new google.maps.LatLng(Lat, Lng),
      zoom: 10
   };
   var map = new google.maps.Map(document.getElementById("map"), mapOptions);
   new google.maps.Marker({
      position: new google.maps.LatLng(Lat, Lng),
      map,
      title: "Here!",
    });
}
function fail() {
   document.getElementById("map").innerHTML = "Unable to access your current location.";
}



// setUpPage() function 
if (window.addEventListener) {
   window.addEventListener("load", setUpPage, false);
}