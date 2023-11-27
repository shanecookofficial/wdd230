document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "fe02b3f5d845399f215fd3243dea6312";

    // API URLs for current weather and forecast
    const currentWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Rexburg,US&units=imperial&appid=${apiKey}`;
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Rexburg,US&units=imperial&appid=${apiKey}`;

    // Elements for current weather display
    const weatherIconElement = document.getElementById("weather-icon");
    const currentTempElement = document.getElementById("current-temp");
    const weatherFeelElement = document.getElementById("weather-feel");
    const humidityElement = document.getElementById("humidity");
    const windChillElement = document.getElementById("wind-chill");

    // Function to capitalize the first letter of each word
    function capitalizeWords(str) {
        return str.replace(/\b\w/g, (match) => match.toUpperCase());
    }

    // Function to calculate the wind chill factor
    function calculateWindChill(temperature, windSpeed) {
        if (temperature <= 50 && windSpeed > 3) {
            const windChill = 35.74 + 0.6215 * temperature - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * temperature * Math.pow(windSpeed, 0.16);
            return Math.round(windChill);
        } else {
            return "N/A";
        }
    }

    // Fetch and display current weather
    fetch(currentWeatherApiUrl)
        .then(response => response.json())
        .then(data => {
            const temperature = Math.round(data.main.temp);
            const weatherDescription = data.weather[0].description;
            const weatherIcon = data.weather[0].icon;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            const capitalizedWeatherDescription = capitalizeWords(weatherDescription);
            currentTempElement.textContent = `${temperature}°F`;
            weatherFeelElement.textContent = capitalizedWeatherDescription;
            humidityElement.textContent = `${humidity}%`;

            const windChill = calculateWindChill(temperature, windSpeed);
            windChillElement.textContent = windChill === "N/A" ? windChill : `${windChill}°F`;

            const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
            weatherIconElement.src = weatherIconUrl;
            weatherIconElement.alt = capitalizedWeatherDescription;
        })
        .catch(error => {
            console.error("Error fetching current weather data:", error);
        });

    // Fetch and display 3-day forecast
    fetch(forecastApiUrl)
    .then(response => response.json())
    .then(data => {
        const forecasts = data.list;
        let dayCount = 0;
        let currentDate = new Date().getDate();

        for (let i = 0; i < forecasts.length && dayCount < 3; i++) {
            const forecastTime = new Date(forecasts[i].dt_txt);
            if (forecastTime.getDate() !== currentDate) {
                currentDate = forecastTime.getDate();
                dayCount++;

                const temperature = Math.round(forecasts[i].main.temp);
                const description = capitalizeWords(forecasts[i].weather[0].description);

                const forecastElement = document.getElementById(`forecast-day-${dayCount}`);
                forecastElement.innerHTML = `<strong>${forecastTime.toDateString()}: </strong>${temperature}°F, ${description}`;
            }
        }
    })
    .catch(error => {
        console.error("Error fetching forecast data:", error);
    });
});
