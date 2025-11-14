let myCities = [];

const inputCity = document.querySelector('.inputCity');
const btnAddCity = document.querySelector('.btnAddCity');

btnAddCity.addEventListener('click', addCity);

// console.log("API Key is: " + API_KEY);

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}


function geoCodeCity(cityName) {
    if (!cityName) return;

    const geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`

    return fetch(geoApiUrl).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }).then(data => {
        return data;
    })
}


function changeCity(cityName) {
    const idx = myCities.findIndex(city => city.name === cityName);

    document.querySelector('.name').textContent = myCities[idx].name;

    document.querySelector('.description').innerHTML = `${capitalizeFirstLetter(myCities[idx].current.weather_description)} <span class="wind">Wind ${myCities[idx].current.wind_speed}km/h</span>`;

    document.querySelector('.currentTemp').textContent = `${Math.round(myCities[idx].current.temp)}°`;

    document.querySelector('.days').innerHTML = myCities[idx].nextDays.map(day => `<td>${day.name}</td>`).join('');

    document.querySelector('.nextDaysMaxTemp').innerHTML = myCities[idx].nextDays.map(day => `<td>${day.max}°</td>`).join('');

    document.querySelector('.nextDaysMinTemp').innerHTML = myCities[idx].nextDays.map(day => `<td>${day.min}°</td>`).join('');


    document.querySelector('#wicon').src = `https://openweathermap.org/img/wn/${myCities[idx].current.icon}@4x.png`
}

function addCity() {
    const cityName = inputCity.value.trim() || 'nicosia';


    geoCodeCity(cityName).then(cityData => {
        const lat = cityData[0].lat;
        const lon = cityData[0].lon;
        const name = cityData[0].name;

        const exclude = 'minutely,hourly'

        const weatherApiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&units=metric&appid=${API_KEY}`

        return fetch(weatherApiUrl).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }).then(weatherData => {
            console.log(`Weather data for ${name}:`, weatherData);
            myCities.push({
                name: name,
                current: {
                    weather_description: weatherData.current.weather[0].description,
                    wind_speed: weatherData.current.wind_speed,
                    temp: weatherData.current.temp,
                    icon: weatherData.current.weather[0].icon
                },
                nextDays: (weatherData.daily || []).slice(1, 6).map(day => {
                    const date = new Date(day.dt * 1000);
                    const name = date.toLocaleDateString('en-US', { weekday: 'short' }); // e.g. "Tue"
                    return {
                        name,
                        max: Math.round(day.temp.max),
                        min: Math.round(day.temp.min)
                    };
                })
            });
            console.log(myCities);

            changeCity(name);

        });
    })

}


if (inputCity) {
    inputCity.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addCity();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    addCity();
});