const myLibrary = [];

const form = document.querySelector('.form');
const dialog = document.querySelector('dialog');
const showButton = document.querySelector('.show-modal');
const submitButton = document.querySelector('.submit');
const closeButton = document.querySelector('.close');

const template = document.querySelector('.template');

console.log(template.innerHTML);


// Constructor
function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

// Event Listeners
showButton.addEventListener('click', () => {
  dialog.showModal();
});

submitButton.addEventListener('click', () => {
  dialog.close();
});

closeButton.addEventListener('click', () => {
  dialog.close();
  form.reset();
});

function addBookToLibrary(...args) {
  const book = new Book(...args);
  myLibrary.push(book);
}

function displayBooks(obj) {
  const htmlTemplate = template.innerHTML;

  const targetNode = document.querySelector('.book-cards-container');
  const finalMarkup = obj
    .map(({
      title, author, pages, readStatus,
    }) => htmlTemplate
      .replaceAll('{title}', title)
      .replace('{author}', author)
      .replace('{pages}', pages)
      .replace('{readStatus}', readStatus));
  targetNode.innerHTML = finalMarkup;
  initRemoveButtons();
}

function removeBookFromLibrary(title) {
  console.log(myLibrary);
  const target = myLibrary.indexOf(title);
  myLibrary.splice(target, 1);
  console.log(target);
  displayBooks(myLibrary);
}

function initRemoveButtons() {
  console.log('did it run?');
  document.querySelectorAll('.remove').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      console.log(e.target.parentNode.dataset.title);
      removeBookFromLibrary(e.target.parentNode.dataset.title);
    });
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const readStatus = document.getElementById('readStatus').value;
  addBookToLibrary(title, author, pages, readStatus);
  displayBooks(myLibrary);
  form.reset();
});
