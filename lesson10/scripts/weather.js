
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.74887243430156&lon=6.636601954295584&appid=fe02b3f5d845399f215fd3243dea6312&units=imperial';

async function apiFetch() {
try {
    const response = await fetch(url);

    if (response.ok) {
    const data = await response.json();
    console.log(data); // For testing, you can remove this later
    displayResults(data); // Call the displayResults function
    } else {
    throw Error(await response.text());
    }
} catch (error) {
    console.log(error);
}
}

function displayResults(data) {
    const fahrenheitTemp = data.main.temp; // Temperature is already in Fahrenheit when using 'units=imperial'
  
    currentTemp.innerHTML = `${Math.round(fahrenheitTemp)}&deg;F`; // Display temperature in Fahrenheit
    const iconCode = data.weather[0].icon;
    const iconSrc = `https://openweathermap.org/img/w/${iconCode}.png`;
    const description = data.weather[0].description;
  
    weatherIcon.setAttribute('src', iconSrc);
    captionDesc.textContent = `${capitalizeWords(description)}`;
  }
  
  
  

apiFetch(); // Call the apiFetch function to fetch data when the page loads