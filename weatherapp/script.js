const locationInput = document.getElementById('locationInput');
const city = document.getElementById('city');
const mainTemp = document.getElementById('mainTemp');
const condition = document.getElementById('condition');
const highAndLow = document.getElementById('highAndLow');
const feelsLike = document.getElementById('feelsLike');
const date = document.getElementById('date');


let api = {
    key: '95ea0f14a4a12344c615730465e0be0c',
    base: 'https://api.openweathermap.org/data/2.5/',
    units: 'imperial'
};

locationInput.addEventListener('keypress', watchPress);


function watchPress(e) {
    if (e.keyCode == 13) {
        getWeather(locationInput.value);
    }
}

async function getWeather(input) {
    const response = await fetch(`${api.base}weather?q=${input}&units=${api.units}&appid=${api.key}`);
    const data = await response.json();
    console.log(data);
    showCityResult(data);
}


function showCityResult(data) {
    city.innerHTML = `${data.name}, ${data.sys.country}`;
    mainTemp.innerHTML = `${Math.round(data.main.temp)} °c`;
    condition.innerHTML = `${data.weather[0].main}`;
    highAndLow.innerHTML = `Low ${Math.round(data.main.temp_min)}°c / High ${Math.round(data.main.temp_max)}°c `;
    feelsLike.innerHTML = `Feels like ${Math.round(data.main.feels_like)} °c`;
    const today = new Date();
    date.innerHTML = today.toLocaleString();
    locationInput.value = '';
    if (data.main.temp > 60) {
        mainTemp.style.color = "red";
    } else if (data.main.temp < 50) {
        mainTemp.style.color = "blue";
    }

}






