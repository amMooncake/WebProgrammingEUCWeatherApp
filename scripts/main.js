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
        console.log(cityData)
        console.log(cityData[0])
        console.log(cityData[0].country)
        
        

    })

}




