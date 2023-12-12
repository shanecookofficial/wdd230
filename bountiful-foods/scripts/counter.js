document.addEventListener('DOMContentLoaded', (event) => {
    const drinksOrderedElement = document.getElementById('drinks-ordered');
    const drinksOrdered = localStorage.getItem('drinksOrdered') || 0;
    drinksOrderedElement.textContent = drinksOrdered;
});
