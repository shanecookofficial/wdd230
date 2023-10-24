// hamburger.js
document.addEventListener('DOMContentLoaded', function () {
    const hamburgerButton = document.getElementById('hamburger-button');
    const navList = document.querySelector('nav ul');

    function toggleMenu() {
        const viewportWidth = window.innerWidth;
        if (viewportWidth >= 1024) {
            // Hide the hamburger button and always display the menu for larger screens
            hamburgerButton.style.display = 'none';
            navList.style.display = 'block';
        } else {
            // Show the hamburger button and toggle the menu for smaller screens
            hamburgerButton.style.display = 'block';
            if (navList.style.display === 'block') {
                navList.style.display = 'none';
                // Change the button text to '☰' (hamburger) when the menu is hidden
                hamburgerButton.innerHTML = '&#8801;';
            } else {
                navList.style.display = 'block';
                // Change the button text to '✕' (close) when the menu is visible
                hamburgerButton.innerHTML = '&#10006;';
            }
        }
    }

    hamburgerButton.addEventListener('click', () => {
        if (navList.style.display === 'block') {
            navList.style.display = 'none';
            hamburgerButton.innerHTML = '&#8801;';
        } else {
            navList.style.display = 'block';
            hamburgerButton.innerHTML = '&#10006;';
        }
    });

    // Add an event listener to hide the menu when a menu item is clicked (optional)
    const navItems = document.querySelectorAll('nav ul li a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navList.style.display = 'none';
            hamburgerButton.innerHTML = '&#8801;';
        });
    });

    // Add a resize event listener to adjust the menu based on viewport width
    window.addEventListener('resize', toggleMenu);
});
