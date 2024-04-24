// Constructor
function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

const library = {
  books: [],
  init() {
    this.cacheDom();
    this.bindEventsStatic();
  },
  cacheDom() {
    this.showModal = document.querySelector('.show-modal');
    this.form = document.querySelector('.form');
    this.modal = document.querySelector('.modal');
    this.submit = document.querySelector('.submit');
    this.cancel = document.querySelector('.cancel');
    this.template = document.querySelector('.template').innerHTML;
    this.booksContainer = document.querySelector('.book-cards-container');
    this.formTitle = document.getElementById('title');
    this.formAuthor = document.getElementById('author');
    this.formPages = document.getElementById('pages');
    this.formReadStatus = document.getElementById('readStatus');
  },
  bindEventsStatic() {
    this.showModal.addEventListener('click', () => {
      this.modal.showModal();
    });
    this.submit.addEventListener('click', () => {
      this.modal.close();
    });
    this.cancel.addEventListener('click', () => {
      this.modal.close();
      this.form.reset();
    });
    this.form.addEventListener('submit', this.addToLibrary.bind(this));
  },
  bindEventsDynamic() {
    this.booksContainer.querySelectorAll('.remove').forEach((btn) => {
      btn.addEventListener('click', this.removeFromLibrary.bind(this));
    });
  },
  render() {
    const finalMarkup = this.books
      .map(({
        title, author, pages, readStatus,
      }) => this.template
        .replaceAll('{title}', title)
        .replace('{author}', author)
        .replace('{pages}', pages)
        .replace('{readStatus}', readStatus));
    this.booksContainer.innerHTML = finalMarkup;
    this.bindEventsDynamic();
  },
  addToLibrary(e) {
    e.preventDefault();
    const book = new Book(
      this.formTitle.value,
      this.formAuthor.value,
      this.formPages.value,
      this.formReadStatus.value,
    );
    this.books.push(book);
    this.render();
    this.modal.close();
    this.form.reset();
  },
  removeFromLibrary(e) {
    const target = e.target.parentNode.dataset.title;
    const index = this.books.findIndex((x) => x.title === target);
    this.books.splice(index, 1);
    this.render();
  },
};

library.init();

// function removeBookFromLibrary(title) {
//   console.log(myLibrary);
//   const target = myLibrary.indexOf(title);
//   myLibrary.splice(target, 1);
//   console.log(target);
//   displayBooks(myLibrary);
// }

// function initRemoveButtons() {
//   console.log('did it run?');
//   document.querySelectorAll('.remove').forEach((btn) => {
//     btn.addEventListener('click', (e) => {
//       console.log(e.target.parentNode.dataset.title);
//       removeBookFromLibrary(e.target.parentNode.dataset.title);
//     });
//   });
// }

// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const title = document.getElementById('title').value;
//   const author = document.getElementById('author').value;
//   const pages = document.getElementById('pages').value;
//   const readStatus = document.getElementById('readStatus').value;
//   addBookToLibrary(title, author, pages, readStatus);
//   displayBooks(myLibrary);
//   form.reset();
// });
// Event Listeners
// showButton.addEventListener('click', () => {
//   dialog.showModal();
// });

// submitButton.addEventListener('click', () => {
//   dialog.close();
// });

// closeButton.addEventListener('click', () => {
//   dialog.close();
//   form.reset();
// });

// function displayBooks(obj) {
//   const htmlTemplate = template.innerHTML;

//   const targetNode = document.querySelector('.book-cards-container');
//   const finalMarkup = obj
//     .map(({
//       title, author, pages, readStatus,
//     }) => htmlTemplate
//       .replaceAll('{title}', title)
//       .replace('{author}', author)
//       .replace('{pages}', pages)
//       .replace('{readStatus}', readStatus));
//   targetNode.innerHTML = finalMarkup;
//   initRemoveButtons();
// }

// const myLibrary = [];

// const form = document.querySelector('.form');
// const dialog = document.querySelector('dialog');
// const showButton = document.querySelector('.show-modal');
// const submitButton = document.querySelector('.submit');
// const closeButton = document.querySelector('.close');

// const template = document.querySelector('.template');

// console.log(template.innerHTML);

// function addBookToLibrary(...args) {
//   const book = new Book(...args);
//   myLibrary.push(book);
// }

// function displayBooks(obj) {
//   const htmlTemplate = template.innerHTML;

//   const targetNode = document.querySelector('.book-cards-container');
//   const finalMarkup = obj
//     .map(({
//       title, author, pages, readStatus,
//     }) => htmlTemplate
//       .replaceAll('{title}', title)
//       .replace('{author}', author)
//       .replace('{pages}', pages)
//       .replace('{readStatus}', readStatus));
//   targetNode.innerHTML = finalMarkup;
//   initRemoveButtons();
// }

// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const title = document.getElementById('title').value;
//   const author = document.getElementById('author').value;
//   const pages = document.getElementById('pages').value;
//   const readStatus = document.getElementById('readStatus').value;
//   addBookToLibrary(title, author, pages, readStatus);
//   displayBooks(myLibrary);
//   form.reset();
// });
