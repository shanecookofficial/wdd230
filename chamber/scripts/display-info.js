document.querySelectorAll('.info-title').forEach(title => {
    title.addEventListener('click', () => {
        const content = title.nextElementSibling;
        const indicator = title.querySelector('.toggle-indicator');
        // Check if display is not set or is none, then toggle
        if (!content.style.display || content.style.display === 'none') {
            content.style.display = 'block';
            indicator.textContent = '-';
        } else {
            content.style.display = 'none';
            indicator.textContent = '+';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const visitMessageElement = document.getElementById('visitMessage');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentDate = new Date();
    
    if (lastVisit) {
        const lastVisitDate = new Date(lastVisit);
        const differenceInTime = currentDate - lastVisitDate;
        const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

        if (differenceInDays < 1) {
            visitMessageElement.textContent = "Back so soon! Awesome!";
        } else {
            let dayText = differenceInDays === 1 ? "day" : "days";
            visitMessageElement.textContent = `You last visited ${differenceInDays} ${dayText} ago.`;
        }
    } else {
        visitMessageElement.textContent = "Welcome! Let us know if you have any questions.";
    }

    localStorage.setItem('lastVisit', currentDate.toISOString());

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

document.getElementById('dateTime').value = Date.now();