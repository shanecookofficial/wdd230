const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const apiKey = 'fe02b3f5d845399f215fd3243dea6312';

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

function capitalizeWords(str) {
  return str.split(' ').map(word => {
    if (word.length > 0) {
      return word[0].toUpperCase() + word.slice(1);
    }
    return word;
  }).join(' ');
}

function displayResults(data) {
  const fahrenheitTemp = data.main.temp;
  const capitalizedDescription = data.weather.map(event => capitalizeWords(event.description)).join(', ');

  currentTemp.innerHTML = `${Math.round(fahrenheitTemp)}&deg;F`;
  const iconCode = data.weather[0].icon;
  const iconSrc = `https://openweathermap.org/img/w/${iconCode}.png`;

  weatherIcon.setAttribute('src', iconSrc);
  captionDesc.textContent = capitalizedDescription;
}

apiFetch();