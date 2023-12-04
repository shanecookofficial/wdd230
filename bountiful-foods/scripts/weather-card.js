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
    document.getElementById('todays-temperature-range').textContent = `${Math.round(data.main.temp_min)}°F / ${Math.round(data.main.temp_max)}°F`;
}

function updateThreeDayForecast(data) {
    if (!data || !data.list) {
        console.error('Invalid forecast data received:', data);
        return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set today's date to midnight

    const forecasts = [];

    for (let day = 1; day <= 3; day++) {
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + day);

        // Find the forecast closest to 9 AM for each day
        let closestForecast = null;
        let minimumTimeDifference = Number.MAX_VALUE;

        for (const forecast of data.list) {
            const forecastDate = new Date(forecast.dt * 1000);

            if (forecastDate.getDate() === targetDate.getDate() && forecastDate.getMonth() === targetDate.getMonth() && forecastDate.getFullYear() === targetDate.getFullYear()) {
                const timeDifference = Math.abs(forecastDate.getHours() - 9);
                if (timeDifference < minimumTimeDifference) {
                    minimumTimeDifference = timeDifference;
                    closestForecast = forecast;
                }
            }
        }

        if (closestForecast) {
            forecasts.push(closestForecast);
        }
    }

    // Update HTML elements
    if (forecasts.length < 3) {
        console.error('Not enough forecast data for 3 days.');
        return;
    }

    forecasts.forEach((forecast, index) => {
        const dayName = new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
        document.getElementById(`forecast-day-${index + 1}`).textContent = dayName;
        document.getElementById(`day-weather-icon-${index + 1}`).src = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
        document.getElementById(`day-${index + 1}-temp`).textContent = Math.round(forecast.main.temp);
    });
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
