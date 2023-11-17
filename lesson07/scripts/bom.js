// References to DOM elements
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// Initialize chaptersArray with data from localStorage or an empty array
let chaptersArray = getChapterList();

// Populate the displayed list of chapters
chaptersArray.forEach(({ name, id }) => {
  displayList(name, id);
});

// Button click event listener
button.addEventListener('click', () => {
  if (input.value.trim() !== '') {
    const id = Date.now(); // Unique identifier based on the current timestamp
    displayList(input.value, id);
    chaptersArray.push({ name: input.value, id: id });
    setChapterList();
    input.value = '';
    input.focus();
  }
});

// Function to display a chapter in the list
function displayList(item, id) { // id is now a parameter
  let li = document.createElement('li');
  li.dataset.id = id; // Setting the data-id attribute
  let deleteButton = document.createElement('button');

  li.textContent = item;

  deleteButton.textContent = '❌';
  deleteButton.classList.add('delete');
  li.appendChild(deleteButton);

  list.appendChild(li);

  deleteButton.addEventListener('click', function () {
    list.removeChild(li);
    deleteChapter(id); // Now passing id to deleteChapter
    input.focus();
  });
}

function setChapterList() {
  localStorage.setItem('myFavBOMList', JSON.stringify(chaptersArray));
}

function getChapterList() {
  let storedChapters = localStorage.getItem('myFavBOMList');
  return storedChapters ? JSON.parse(storedChapters) : [];
}

// Function to delete a chapter
function deleteChapter(id) {
  chaptersArray = chaptersArray.filter(item => item.id !== id);
  setChapterList();
}
