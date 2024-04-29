/* eslint-disable arrow-body-style */

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

// eslint-disable-next-line no-unused-vars
const library = (function library() {
  const { render } = display;

  // bookshelf array
  const bookshelf = [];

  // add book function
  const addBookToShelf = (e) => {
    e.preventDefault();
    const book = new Book(
      // TODO: MOVE TO DISPLAY AND PASS VARIABLES TO FUNCTION
      formTitle.value,
      formAuthor.value,
      formPages.value,
      formReadStatus.checked,
    );
    bookshelf.push(book);
    render();
    modal.close();
    form.reset();
  };

  // remove book function
  const removeBookFromShelf = (e) => {
    const target = e.target.parentNode.dataset.title;
    const index = bookshelf.findIndex((x) => x.title === target);
    bookshelf.splice(index, 1);
    render();
  };

  const toggleReadStatus = (e) => {
    const target = e.target.parentNode.parentNode.parentNode.dataset.title;
    const index = bookshelf.findIndex((x) => x.title === target);
    bookshelf[index].readStatus = !bookshelf[index].readStatus;
  };

  return {
    addBookToShelf,
    removeBookFromShelf,
    toggleReadStatus,
    bookshelf,
  };
}());

// eslint-disable-next-line no-unused-vars
const display = (function display() {
  const {
    addBookToShelf,
    removeBookFromShelf,
    toggleReadStatus,
    bookshelf,
  } = library;

  // cacheDom
  const showModal = document.querySelector('.show-modal');
  const form = document.querySelector('.form');
  const modal = document.querySelector('.modal');
  const submit = document.querySelector('.submit');
  const cancel = document.querySelector('.cancel');
  const template = document.querySelector('.template').innerHTML;
  const booksContainer = document.querySelector('.book-cards-container');
  const formTitle = document.getElementById('title');
  const formAuthor = document.getElementById('author');
  const formPages = document.getElementById('pages');
  const formReadStatus = document.getElementById('readStatus');

  // bindEventsStatic
  showModal.addEventListener('click', () => {
    modal.showModal();
  });
  submit.addEventListener('click', () => {
    modal.close();
  });
  cancel.addEventListener('click', () => {
    modal.close();
    form.reset();
  });
  form.addEventListener('submit', addBookToShelf);

  const bindEventsDynamic = () => {
    booksContainer.querySelectorAll('.remove').forEach((btn) => {
      btn.addEventListener('click', removeBookFromShelf);
    });

    booksContainer.querySelectorAll('.toggle-switch span').forEach((toggle) => {
      toggle.addEventListener('click', toggleReadStatus);
    });
  };

  const render = () => {
    const finalMarkupArray = bookshelf
      .map(({
        title, author, pages, readStatus,
      }) => template
        .replaceAll('{title}', title)
        .replace('{author}', author)
        .replace('{pages}', pages)
        .replace('{readStatus}', () => {
          return readStatus === true ? 'checked' : '';
        }));

    const finalMarkup = finalMarkupArray.join('');
    booksContainer.innerHTML = finalMarkup;

    bindEventsDynamic();
  };

  return { render };
}());
