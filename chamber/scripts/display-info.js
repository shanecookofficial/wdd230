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
