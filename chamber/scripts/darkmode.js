document.addEventListener('DOMContentLoaded', (event) => {
    const sunIcon = "https://www.uplooder.net/img/image/55/7aa9993fc291bc170abea048589896cf/sun.svg";
    const moonIcon = "https://www.uplooder.net/img/image/2/addf703a24a12d030968858e0879b11e/moon.svg";
  
    const root = document.documentElement;
    const container = document.querySelector(".theme-container");
    const themeIcon = document.getElementById("theme-icon");
  
    // Automatically set theme based on time of day
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour >= 18; // Assuming night time is from 6pm to 6am
    var theme = isNight ? "dark" : "light"; // Set the default theme based on the time
  
    // Apply the default theme
    if (theme === "dark") {
      setDark();
    } else {
      setLight();
    }
  
    container.addEventListener("click", () => {
      if (theme === "dark") {
        setLight();
        theme = "light";
      } else {
        setDark();
        theme = "dark";
      }
    });
  
    function setLight() {
      // Define the light theme colors
        root.style.setProperty('--primary-color', '#003366'); // blue
        root.style.setProperty('--secondary-color', '#C6D4FF'); // light blue
        root.style.setProperty('--accent-color', '#C8FFBE'); // light green
        root.style.setProperty('--accent-color2', '#800020'); // maroon
        root.style.setProperty('--text-on-dark', 'white'); // text on dark
        root.style.setProperty('--text-on-light', '#333'); // text on light
        root.style.setProperty('--bs-dark', '#f8f9fa'); // light background
        themeIcon.src = sunIcon; // Set the icon to sun
        container.classList.replace("shadow-dark", "shadow-light");
    }
  
    function setDark() {
        // Define the dark theme colors
        root.style.setProperty('--primary-color', '#212529'); // dark grey
        root.style.setProperty('--secondary-color', '#343a40'); // even darker grey
        root.style.setProperty('--accent-color', '#495057'); // dark accent
        root.style.setProperty('--accent-color2', '#6c757d'); // another dark accent
        root.style.setProperty('--text-on-dark', 'white'); // text on dark
        root.style.setProperty('--text-on-light', '#adb5bd'); // text on light grey
        root.style.setProperty('--bs-dark', '#212529'); // dark mode background

        container.classList.replace("shadow-light", "shadow-dark");
        themeIcon.src = moonIcon; // Set the icon to moon
    }
  });
  