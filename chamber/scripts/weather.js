document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "fe02b3f5d845399f215fd3243dea6312";
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Rexburg,US&units=imperial&appid=${apiKey}`;

    const weatherIconElement = document.getElementById("weather-icon");
    const currentTempElement = document.getElementById("current-temp");
    const weatherFeelElement = document.getElementById("weather-feel");
    const humidityElement = document.getElementById("humidity");
    const windChillElement = document.getElementById("wind-chill");

    // Function to capitalize the first letter of each word
    function capitalizeWords(str) {
        return str.replace(/\b\w/g, (match) => match.toUpperCase());
    }

    // Calculate the wind chill factor
    function calculateWindChill(temperature, windSpeed) {
        if (temperature <= 50 && windSpeed > 3) {
            const windChill = 35.74 + 0.6215 * temperature - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * temperature * Math.pow(windSpeed, 0.16);
            return Math.round(windChill); // Round wind chill to nearest whole number
        } else {
            return "N/A"; // Wind chill calculation not applicable
        }
    }

    // Fetch weather data from OpenWeatherMap
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // Extract relevant weather information from the API response
            const temperature = Math.round(data.main.temp); // Round temperature to nearest whole number
            const weatherDescription = data.weather[0].description;
            const weatherIcon = data.weather[0].icon;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed; // Wind speed in mph

            // Capitalize the first letter of each word in weather description
            const capitalizedWeatherDescription = capitalizeWords(weatherDescription);

            // Update the HTML elements with weather data
            currentTempElement.textContent = `${temperature}°F`;
            weatherFeelElement.textContent = capitalizedWeatherDescription;
            humidityElement.textContent = `${humidity}%`;

            // Calculate wind chill or display "N/A"
            const windChill = calculateWindChill(temperature, windSpeed);

            if (windChill === "N/A") {
                windChillElement.textContent = "N/A";
            } else {
                windChillElement.textContent = `${windChill}°F`;
            }

            // Construct the weather icon URL
            const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
            
            // Set the weather icon image source
            weatherIconElement.src = weatherIconUrl;
            weatherIconElement.alt = capitalizedWeatherDescription; // Set alt text for accessibility
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
        });
});
