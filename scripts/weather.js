document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "fe02b3f5d845399f215fd3243dea6312";
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Rexburg,US&units=imperial&appid=${apiKey}`;

    const weatherIconElement = document.getElementById("weather-icon");
    const currentTempElement = document.getElementById("current-temp");
    const weatherFeelElement = document.getElementById("weather-feel");

    // Function to capitalize the first letter of each word
    function capitalizeWords(str) {
        return str.replace(/\b\w/g, (match) => match.toUpperCase());
    }

    // Fetch weather data from OpenWeatherMap
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // Extract relevant weather information from the API response
            const temperature = Math.round(data.main.temp); // Round temperature to nearest whole number
            const weatherDescription = data.weather[0].description;
            const weatherIcon = data.weather[0].icon;

            // Capitalize the first letter of each word in weather description
            const capitalizedWeatherDescription = capitalizeWords(weatherDescription);

            // Update the HTML elements with weather data
            currentTempElement.textContent = `${temperature}°F`;
            weatherFeelElement.textContent = capitalizedWeatherDescription;

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
