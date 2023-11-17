window.onload = function() {
    // Check if the 'page_visit_count' key exists in localStorage
    var visitCount = localStorage.getItem('page_visit_count');

    // If it exists, convert it to an integer and increment it
    if (visitCount) {
        visitCount = parseInt(visitCount) + 1;
    } else {
        // If it doesn't exist, start with 1
        visitCount = 1;
    }

    // Update the localStorage with the new count
    localStorage.setItem('page_visit_count', visitCount);

    // Display the visit count on the page
    document.getElementById('total-visits').textContent = visitCount;
}
