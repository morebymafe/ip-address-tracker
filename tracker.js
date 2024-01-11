// Variables initialization
var inputValue = document.getElementById('user-input').value;
const userIp = document.getElementById('user-ip');
const userLocation = document.getElementById('user-location');
const userTimezone = document.getElementById('user-timezone');
const userIsp = document.getElementById('user-isp');
const submitBtn = document.getElementById('button');
const mainIp = document.getElementById('main-ip');
const mainLocation = document.getElementById('main-location');
const mainIsp = document.getElementById('main-isp')
const mainTimezone = document.getElementById('main-timezone')

// get location of user
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
};

//Setup the Map to display Ip Address of the Main user
// once the page loads
window.onload = function(){
    try{
    fetch(`https://api.ipify.org?format=json`)
    .then(response => response.json())
    .then(data => mainIp.innerHTML = data.ip)
    } catch(e){
        console.log(e);
    }
        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_2FHhexZT7jtulOlZ16cdmBAn92Onl&ipAddress=${mainIp.innerHTML}`)
        .then(response => response.json())
        .then(data => {
            mainIp.innerHTML = data.ip;
            mainLocation.innerHTML  = data.location.city + ", " + data.location.region + ", " + data.location.country;
            mainTimezone.innerHTML  = "UTC " + data.location.timezone;
            mainIsp.innerHTML       = data.isp;
        })
};


var map = L.map('map').setView([51.54, -0.09], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        zoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    L.circle([51.54, -0.09], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.45,
        radius:200
}).addTo(map);

// display map based requested on data
function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    //function displayMap(longitude, latitude){
        map.setView([latitude, longitude], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            zoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        L.circle([latitude, longitude], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.45,
            radius:200
    }).addTo(map);
};

searchInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter"){
        e.preventDefault();
        submitBtn.click();
    }
});

// Submit button and fetch data
// Sample IP Address: 10.60.107.7
submitBtn.addEventListener("click", function(){
    try{
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_2FHhexZT7jtulOlZ16cdmBAn92Onl&ipAddress=${inputValue}`)
    .then(response => response.json())
    .then(data => {
            userIp.innerHTML = data.ip;
            userLocation.innerHTML  = data.location.city + ", " + data.location.country;
            userTimezone.innerHTML  = "UTC " + data.location.timezone;
            userIsp.innerText       = data.isp;
            longitude               = Number(data.location.lng);
            latitude                = Number(data.location.lat);
        }
    )
        showPosition(position);
    } catch(error){
        console.log(error);
    }
});