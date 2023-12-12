document.addEventListener("DOMContentLoaded", async function() {
    // Function to get the value of a query parameter by name
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    function formatDrinkName(fruit1, fruit2, fruit3) {
        let drinkName = '';
    
        // Check if all three fruits are the same
        if (fruit1 === fruit2 && fruit2 === fruit3) {
            drinkName = 'Triple ' + fruit1;
        }
        // Check if two fruits are the same
        else if (fruit1 === fruit2) {
            drinkName = fruit3 + ' Double ' + fruit1;
        }
        else if (fruit1 === fruit3) {
            drinkName = fruit2 + ' Double ' + fruit1;
        }
        else if (fruit2 === fruit3) {
            drinkName = fruit1 + ' Double ' + fruit2;
        }
        // If all three fruits are different
        else {
            let fruits = [fruit1, fruit2, fruit3];
            fruits.sort(); // Sort fruits alphabetically
            drinkName = fruits.join(', ');
        }
    
        return drinkName;
    }
    
    // Fetch fruit choices from URL parameters
    const fruit1 = getQueryParam('fruit1');
    const fruit2 = getQueryParam('fruit2');
    const fruit3 = getQueryParam('fruit3');
    
    // Format and set the drink name
    if (fruit1 && fruit2 && fruit3) {
        const drinkName = formatDrinkName(fruit1, fruit2, fruit3);
        document.getElementById('drink-name').textContent = drinkName;
    }

    if (fruit1) {
        document.getElementById("fruit-1").textContent = fruit1;
    }
    if (fruit2) {
        document.getElementById("fruit-2").textContent = fruit2;
    }
    if (fruit3) {
        document.getElementById("fruit-3").textContent = fruit3;
    }

    const fullName = getQueryParam('name');
    if (fullName) {
        const firstName = fullName.split(' ')[0];
        document.getElementById("customer-first-name").textContent = firstName;
        document.getElementById("customer-name").textContent = fullName;
    }

    const email = getQueryParam('email');
    if (email) {
        document.getElementById('email').textContent = email;
    }

    const phone = getQueryParam('phone');
    if (phone) {
        const formattedPhone = '(' + phone.slice(0, 3) + ') ' + phone.slice(3, 6) + '-' + phone.slice(6);
        document.getElementById('phone').textContent = formattedPhone;
    }
    
    const specialInstructions = getQueryParam('special_instructions');
    if (specialInstructions) {
        document.getElementById("special_instructions").textContent = specialInstructions;
    }

    // New function to fetch fruits data from JSON file
    async function fetchFruitsData() {
        try {
            const response = await fetch('./data/fruits.json'); // Adjust the path as needed
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching fruits data:', error);
            return [];
        }
    }

    // Function to calculate and display total nutritional values
    async function displayNutritionalValues() {
        const fruitsData = await fetchFruitsData();
        
        let totalNutrition = {
            calories: 0,
            fat: 0,
            sugar: 0,
            carbohydrates: 0,
            protein: 0
        };

        [fruit1, fruit2, fruit3].forEach(fruitName => {
            const fruitNutrition = fruitsData.find(fruit => fruit.name === fruitName)?.nutritions;
            if (fruitNutrition) {
                totalNutrition.calories += fruitNutrition.calories;
                totalNutrition.fat += fruitNutrition.fat;
                totalNutrition.sugar += fruitNutrition.sugar;
                totalNutrition.carbohydrates += fruitNutrition.carbohydrates;
                totalNutrition.protein += fruitNutrition.protein;
            }
        });

        document.getElementById('calories').textContent = parseFloat(totalNutrition.calories.toFixed(2));
        document.getElementById('protein').textContent = parseFloat(totalNutrition.protein.toFixed(2));
        document.getElementById('carbs').textContent = parseFloat(totalNutrition.carbohydrates.toFixed(2));
        document.getElementById('fat').textContent = parseFloat(totalNutrition.fat.toFixed(2));
        document.getElementById('sugar').textContent = parseFloat(totalNutrition.sugar.toFixed(2));
    }

    // Call the displayNutritionalValues function to update the nutritional information
    await displayNutritionalValues();

    // Function to get the current time in PST
    function getCurrentTimeInPST() {
        // Create a date object for the current time in UTC
        const nowUTC = new Date();

        // Convert it to PST (UTC-7 hours for PDT)
        const offset = 7;
        const nowPST = new Date(nowUTC.getUTCFullYear(), nowUTC.getUTCMonth(), nowUTC.getUTCDate(), 
                                nowUTC.getUTCHours() - offset, nowUTC.getUTCMinutes(), nowUTC.getUTCSeconds());

        return nowPST;
    }

    // Function to check if current time is within the given ranges
    function isWithinTimeRange(currentTime) {
        // Define the time ranges
        const morningStart = new Date(currentTime);
        morningStart.setHours(7, 30, 0); // 7:30 AM

        const morningEnd = new Date(currentTime);
        morningEnd.setHours(9, 0, 0); // 9:00 AM

        const afternoonStart = new Date(currentTime);
        afternoonStart.setHours(11, 30, 0); // 11:30 AM

        const afternoonEnd = new Date(currentTime);
        afternoonEnd.setHours(13, 30, 0); // 1:30 PM

        return (currentTime >= morningStart && currentTime <= morningEnd) || 
               (currentTime >= afternoonStart && currentTime <= afternoonEnd);
    }

    // Function to generate a random number within a given range
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const currentTime = getCurrentTimeInPST();
    let waitTime;

    if (isWithinTimeRange(currentTime)) {
        // If within the busy hours, set wait time between 13 and 30 minutes
        waitTime = getRandomNumber(13, 30);
    } else {
        // Otherwise, set wait time between 3 and 10 minutes
        waitTime = getRandomNumber(3, 10);
    }

    document.getElementById('order-time').textContent = waitTime;
});
