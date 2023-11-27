document.addEventListener('DOMContentLoaded', function() {
    // Fetch and populate member spotlights
    fetch('../chamber/data/members.json')
        .then(response => response.json())
        .then(data => populateSpotlights(data.businesses))
        .catch(error => console.error('Error loading members data:', error));

    function populateSpotlights(members) {
        const shuffledMembers = members.sort(() => 0.5 - Math.random()).slice(0, 3);
        const spotlightContainer = document.getElementById('member-spotlights');

        spotlightContainer.innerHTML = '';
        shuffledMembers.forEach(member => {
            const section = document.createElement('section');
            section.className = 'spotlight';

            const img = document.createElement('img');
            img.src = member.image_url;
            img.alt = member.name;

            const phoneLink = document.createElement('a');
            phoneLink.href = `tel:${member.phone_number}`;
            phoneLink.textContent = member.phone_number;

            const websiteLink = document.createElement('a');
            websiteLink.href = member.website_url;
            websiteLink.textContent = 'Website';

            section.appendChild(img);
            section.appendChild(phoneLink);
            section.appendChild(websiteLink);

            spotlightContainer.appendChild(section);
        });
    }
});
