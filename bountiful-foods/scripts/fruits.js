// Function to fetch fruits data from JSON file
async function fetchFruitsData() {
    try {
        const response = await fetch('data/fruits.json'); // Corrected path
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching fruits data:', error);
        return [];
    }
}


// Function to populate dropdown options
function populateDropdowns(fruitsData) {
    const dropdowns = document.querySelectorAll('select');
    dropdowns.forEach(dropdown => {
        fruitsData.forEach(fruit => {
            const option = document.createElement('option');
            option.value = fruit.name;
            option.textContent = fruit.name;
            dropdown.appendChild(option);
        });
    });
}

// Function to calculate and update nutritional information
function updateNutrition(fruitsData) {
    let totalCalories = 0, totalProtein = 0, totalCarbs = 0, totalFat = 0, totalSugar = 0;

    document.querySelectorAll('select').forEach(select => {
        const selectedFruit = fruitsData.find(fruit => fruit.name === select.value);
        if (selectedFruit) {
            totalCalories += selectedFruit.nutritions.calories;
            totalProtein += selectedFruit.nutritions.protein;
            totalCarbs += selectedFruit.nutritions.carbohydrates;
            totalFat += selectedFruit.nutritions.fat;
            totalSugar += selectedFruit.nutritions.sugar;
        }
    });

    document.getElementById('calories').textContent = parseFloat(totalCalories.toFixed(2));
    document.getElementById('protein').textContent = parseFloat(totalProtein.toFixed(2));
    document.getElementById('carbs').textContent = parseFloat(totalCarbs.toFixed(2));
    document.getElementById('fat').textContent = parseFloat(totalFat.toFixed(2));
    document.getElementById('sugar').textContent = parseFloat(totalSugar.toFixed(2));
}


// Event listener for dropdown changes
function setupDropdownListeners(fruitsData) {
    document.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', () => updateNutrition(fruitsData));
    });
}

// Initialize the script
async function init() {
    const fruitsData = await fetchFruitsData();
    populateDropdowns(fruitsData);
    setupDropdownListeners(fruitsData);
    updateNutrition(fruitsData); // To update initially with default selections
}

// Call init on window load
window.onload = init;
