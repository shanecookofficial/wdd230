// Step 4: JavaScript for handling the input and list
document.addEventListener('DOMContentLoaded', function () {
    const input = document.querySelector('#favchap');
    const button = document.querySelector('button');
    const list = document.querySelector('#list');

    button.addEventListener('click', function() {
        if (input.value.trim() !== '') { // Check if the input is not empty or just whitespace
            // Create a new list item
            const li = document.createElement('li');
            
            // Create a delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '❌'; // Adding an 'X' symbol to the button
            
            // Set the text of the list item to the input value
            li.textContent = input.value;
            
            // Append the delete button to the list item
            li.append(deleteButton);
            
            // Append the list item to the list
            list.append(li);

            // Add an event listener to the delete button to remove the item from the list
            deleteButton.addEventListener('click', function () {
                list.removeChild(li);
                input.focus(); // Put focus back to the input element
            });

            // Clear the input field and refocus on the input field for new entries
            input.value = '';
            input.focus();
        } else {
            // If input is empty, just focus back to the input, or you can show an alert/message
            input.focus();
        }
    });
});
