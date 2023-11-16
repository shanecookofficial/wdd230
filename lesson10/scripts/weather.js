const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const apiKey = process.env.WEATHER_API_KEY; // Access the API_KEY environment variable

if (!apiKey) {
  console.error('API_KEY is not defined. Make sure you have set it as a GitHub secret.');
}

const url = `https://api.openweathermap.org/data/2.5/weather?lat=49.74887243430156&lon=6.636601954295584&appid=${apiKey}&units=imperial`;

async function apiFetch() {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayResults(data) {
  const fahrenheitTemp = data.main.temp;

  currentTemp.innerHTML = `${Math.round(fahrenheitTemp)}&deg;F`;
  const iconCode = data.weather[0].icon;
  const iconSrc = `https://openweathermap.org/img/w/${iconCode}.png`;
  const description = data.weather[0].description;

  weatherIcon.setAttribute('src', iconSrc);
  captionDesc.textContent = `${capitalizeWords(description)}`;
}

apiFetch();