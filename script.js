/* eslint-disable arrow-body-style */

// [ ] Clean up console logs + eslint overrides
// [X] Message for invalid forms
// [ ] Clean up class names (esp for buttons)

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
  // bookshelf array
  const bookshelf = [];

  // add book function
  const addBookToShelf = (...args) => {
    const book = new Book(...args);
    bookshelf.push(book);
  };

  // remove book function
  const removeBookFromShelf = (target) => {
    const index = bookshelf.findIndex((x) => x.title === target);
    bookshelf.splice(index, 1);
  };

  const toggleReadStatus = (target) => {
    // console.log(target);
    const index = bookshelf.findIndex((x) => x.title === target.parentNode.dataset.title);
    // console.log(bookshelf[index]);
    // console.log(bookshelf[index].status);
    bookshelf[index].status = bookshelf[index].status === 'read' ? 'unread' : 'read';
    // bookshelf[index].readStatus = !bookshelf[index].readStatus;
    // console.log(bookshelf[index].status);
    return bookshelf[index].status;
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
  const addBookButton = document.querySelector('#add-book-button');
  const form = document.querySelector('.form');
  const modal = document.querySelector('.modal');
  const submit = document.querySelector('.submit');
  const cancel = document.querySelector('.cancel');
  const bookCardsContainer = document.querySelector('.book-cards-container');
  const formTitle = document.getElementById('title');
  const formAuthor = document.getElementById('author');
  const formPages = document.getElementById('pages');
  const formReadStatus = document.getElementById('status');

  // bindEventsStatic
  addBookButton.addEventListener('click', () => {
    modal.showModal();
  });
  submit.addEventListener('click', (e) => {
    e.preventDefault();
    const existingWarning = document.querySelector('.form-warning');
    if (bookshelf.find((book) => book.title === formTitle.value)) {
      e.preventDefault();
      if (existingWarning) existingWarning.remove();
      const warningHTML = document.createElement('p');
      warningHTML.textContent = 'This book is already in your library.';
      warningHTML.classList.add('form-warning');
      form.insertBefore(warningHTML, formAuthor);
      return;
    }

    if (form.checkValidity()) {
      e.preventDefault();
      const { checked } = formReadStatus;
      const status = checked === true ? 'read' : 'unread';

      addBookToShelf(
        formTitle.value,
        formAuthor.value,
        formPages.value,
        status,
      );
      // eslint-disable-next-line no-use-before-define
      render();
      modal.close();
      form.reset();
      if (existingWarning) existingWarning.remove();
    }
  });

  cancel.addEventListener('click', () => {
    const existingWarning = document.querySelector('.form-warning');
    modal.close();
    form.reset();
    if (existingWarning) existingWarning.remove();
    console.log(existingWarning);
  });

  const render = () => {
    bookCardsContainer.innerHTML = '';
    for (let book = 0; book < bookshelf.length; book += 1) {
      // parent node: bookCardsContainer
      const {
        title,
        author,
        pages,
        status,
      } = bookshelf[book];

      const div = document.createElement('div');
      div.classList.add('book-card');
      div.dataset.title = title;

      const removeBtn = document.createElement('a');
      removeBtn.classList.add('remove-btn');
      removeBtn.href = '#';
      removeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // console.log('Remove Button');
        removeBookFromShelf(e.target.parentNode.dataset.title);
        render();
      });

      const titleHTML = document.createElement('h4');
      titleHTML.textContent = title;

      const authorHTML = document.createElement('p');
      authorHTML.textContent = author;

      const pagesHTML = document.createElement('p');
      pagesHTML.textContent = pages;

      const statusHTML = document.createElement('button');
      statusHTML.classList.add('button', status);
      statusHTML.type = 'button';
      if (status === 'read') statusHTML.textContent = 'Read';
      if (status === 'unread') statusHTML.textContent = 'Not Read';
      statusHTML.addEventListener('click', (e) => {
        // console.log('toggle status');
        // console.log(e.target.parentNode.dataset.title);
        const { target } = e;
        if (toggleReadStatus(target) === 'read') {
          target.classList.remove('unread');
          target.classList.add('read');
          statusHTML.textContent = 'Read';
        } else {
          target.classList.remove('read');
          target.classList.add('unread');
          statusHTML.textContent = 'Not Read';
        }
      });

      div.appendChild(removeBtn);
      div.appendChild(titleHTML);
      div.appendChild(authorHTML);
      div.appendChild(pagesHTML);
      div.appendChild(statusHTML);
      bookCardsContainer.appendChild(div);
    }
  };

  return { render };
}());
