const allFruitsUrl = 'https://fruityvice.com/api/fruit/all';

function populateFruits() {
    fetch(allFruitsUrl)
        .then(response => response.json())
        .then(data => {
            if (data && Array.isArray(data)) {
                updateDropdowns(data);
            }
        })
        .catch(error => console.error('Error fetching fruit data:', error));
}

function updateDropdowns(fruits) {
    const dropdowns = document.querySelectorAll('select');
    dropdowns.forEach(dropdown => {
        // Clear existing options
        dropdown.innerHTML = '';

        fruits.forEach(fruit => {
            const option = document.createElement('option');
            option.value = fruit.name.toLowerCase();
            option.textContent = fruit.name;
            dropdown.appendChild(option);
        });
    });
}

// Call the function to populate fruits on page load
window.onload = populateFruits;
