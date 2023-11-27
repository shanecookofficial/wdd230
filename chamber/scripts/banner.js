document.addEventListener('DOMContentLoaded', function() {
    // Function to check if today is between Sunday and Wednesday
    function shouldShowBanner() {
        const today = new Date().getDay();
        // Sunday = 0, Monday = 1, Tuesday = 2, Wednesday = 3
        return today >= 0 && today <= 3;
    }

    // Select the meet and greet banner
    const meetGreetBanner = document.getElementById('meet-greet-banner');

    // Show or hide the banner based on the day
    if (shouldShowBanner()) {
        meetGreetBanner.style.display = 'block';
    } else {
        meetGreetBanner.style.display = 'none';
    }

    // Close button functionality
    const closeButton = document.getElementById('banner-close-button');
    closeButton.addEventListener('click', function() {
        meetGreetBanner.style.display = 'none';
    });
});
