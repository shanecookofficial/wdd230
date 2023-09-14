// Get the current year
const currentYear = new Date().getFullYear();

// Find the <span> element with the id "year"
const yearSpan = document.getElementById("year");

// Update the content of the <span> element with the current year
yearSpan.textContent = currentYear;

// Get the last modification date of the current web page
const lastModified = document.lastModified;

// Find the <span> element with the id "lastModified"
const lastModifiedSpan = document.getElementById("lastModified");

// Update the content of the <span> element with the last modification date
lastModifiedSpan.textContent = lastModified;