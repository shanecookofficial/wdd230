document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector('form');
    form.addEventListener('submit', () => {
        let counter = localStorage.getItem('drinksOrdered') || 0;
        counter = parseInt(counter) + 1;
        localStorage.setItem('drinksOrdered', counter);
    });
});
