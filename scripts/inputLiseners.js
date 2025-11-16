const inputCity = document.querySelector('.inputCity');
const btnAddCity = document.querySelector('.btnAddCity');

if (inputCity) {
    inputCity.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addCityThroughInput();
        }
    });
}

btnAddCity.addEventListener('click', addCityThroughInput);

function addCityThroughInput() {
    addCity(inputCity.value.trim())
}

cityDropdown.addEventListener('change', (e) => {
    const city = e.target.value;
    console.log(city);
    addCity(city);
});

document.addEventListener('DOMContentLoaded', () => {
    addCity();
});



