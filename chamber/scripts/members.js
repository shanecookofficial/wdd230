document.addEventListener('DOMContentLoaded', () => {
    let isGridView = true;
    let membersData; // Declare this variable outside the fetch block
    const membersContainer = document.getElementById('members');
    const toggleViewBtn = document.getElementById('toggleView');

    // Load Members Data
    fetch('../chamber/data/members.json')
        .then(response => response.json())
        .then(data => {
            membersData = data.businesses; // Store the data in the membersData variable
            displayMembers(membersData, isGridView);
            updateToggleButton(isGridView); // Set the initial icon
        });

    // Toggle View Event
    toggleViewBtn.addEventListener('click', () => {
        isGridView = !isGridView;
        displayMembers(membersData, isGridView); // Use membersData here
        updateToggleButton(isGridView); // Update the button icon
    });

    // Function to update the button icon
    function updateToggleButton(isGrid) {
        toggleViewBtn.innerHTML = isGrid ? '<i class="fa fa-th-large"></i>' : '<i class="fa fa-list"></i>';
    }
    

    // Function to display members
    function displayMembers(members, isGrid) {
        membersContainer.innerHTML = '';
        membersContainer.className = isGrid ? 'grid-view' : 'list-view';

        members.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.className = isGrid ? 'member-card-grid' : 'member-card-list';

            memberCard.innerHTML = `
                <img src="${member.image_url}" alt="${member.name}" class="member-image">
                <div class="member-info">
                    <h3 class="member-name">${member.name}</h3>
                    <p class="member-address">${member.address}</p>
                    <p class="member-phone">${member.phone_number}</p>
                    <a href="${member.website_url}" class="member-website">Website</a>
                    <p class="member-level">${member.membership_level}</p>
                </div>
            `;

            membersContainer.appendChild(memberCard);
        });
    }
});
