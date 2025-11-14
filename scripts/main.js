let myCities = [];


const inputCity = document.querySelector('.inputCity');
const btnAddCity = document.querySelector('.btnAddCity');

btnAddCity.addEventListener('click', addCity);


// console.log("API Key is: " + API_KEY);


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


function addCity() {
    const cityName = inputCity.value.trim();

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
                    wind_speed: weatherData.current.wind_speed,
                    temp: weatherData.current.temp,
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
        
        changeCity();

        });
    })

}




