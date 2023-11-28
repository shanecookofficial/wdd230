const apiKey = 'fe02b3f5d845399f215fd3243dea6312';
const city = 'Carlsbad,US-CA'; // US state code added for clarity

// Current weather API URL
const currentWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=imperial`;
// Forecast API URL
const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=imperial`;

function updateWeatherCard(data) {
    if (!data || !data.weather || !data.weather[0] || !data.main) {
        console.error('Invalid data received from weather API:', data);
        return;
    }

    document.getElementById('current-weather-icon').src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    document.getElementById('current-weather-condition-description').textContent = data.weather[0].main;
    document.getElementById('humidity').innerHTML = `<span>${data.main.humidity}</span>% Humidity`;
    document.getElementById('current-temperature').innerHTML = `<span>${Math.round(data.main.temp)}</span>°F`;
    document.getElementById('todays-temperature-range').innerHTML = `<span id="todays-high">${Math.round(data.main.temp_max)}</span>°F / <span id="todays-low">${Math.round(data.main.temp_min)}</span>°F`;
}

function updateThreeDayForecast(data) {
    if (!data || !data.list) {
        console.error('Invalid forecast data received:', data);
        return;
    }

    for (let i = 0; i < 3; i++) {
        const forecast = data.list[i * 8]; // 8 intervals of 3 hours = 24 hours
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        let iconCode = forecast.weather[0].icon;

        // Ensure the icon is for daytime
        if (iconCode.endsWith('n')) {
            iconCode = iconCode.replace('n', 'd');
        }

        document.getElementById(`forecast-day-${i+1}`).textContent = dayName;
        document.getElementById(`day-weather-icon-${i+1}`).src = `http://openweathermap.org/img/w/${iconCode}.png`;
        document.getElementById(`day-high-${i+1}`).textContent = Math.round(forecast.main.temp_max);
        document.getElementById(`day-low-${i+1}`).textContent = Math.round(forecast.main.temp_min);
    }
}


// Fetch current weather data
fetch(currentWeatherApiUrl)
    .then(response => response.json())
    .then(data => updateWeatherCard(data))
    .catch(error => console.error('Error fetching current weather data:', error));

// Fetch weather forecast data
fetch(forecastApiUrl)
    .then(response => response.json())
    .then(data => updateThreeDayForecast(data))
    .catch(error => console.error('Error fetching forecast data:', error));
