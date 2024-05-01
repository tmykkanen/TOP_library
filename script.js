class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

const library = (function library() {
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
    const index = bookshelf.findIndex((x) => x.title === target.parentNode.dataset.title);
    bookshelf[index].status = bookshelf[index].status === 'read' ? 'unread' : 'read';
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
  const formModal = document.querySelector('.modal');
  const submit = document.querySelector('.submit');
  const cancel = document.querySelector('.cancel');
  const bookCardsContainer = document.querySelector('.book-cards-container');
  const formTitle = document.getElementById('title');
  const formAuthor = document.getElementById('author');
  const formPages = document.getElementById('pages');
  const formReadStatus = document.getElementById('status');
  let warningHTML;

  // Utility functions for eventListeners
  const resetForm = () => {
    formModal.close();
    if (warningHTML) {
      warningHTML.remove();
      warningHTML = '';
    }
    form.reset();
  };

  // bindEvents
  addBookButton.addEventListener('click', () => {
    formModal.showModal();
  });

  submit.addEventListener('click', (e) => {
    e.preventDefault();

    if (bookshelf.find((book) => book.title === formTitle.value)) {
      if (warningHTML) return;
      warningHTML = document.createElement('p');
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
      resetForm();
    }
  });

  cancel.addEventListener('click', resetForm);

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
        removeBookFromShelf(e.target.parentNode.dataset.title);
        render();
      });

      const titleHTML = document.createElement('h4');
      titleHTML.textContent = title;

      const authorHTML = document.createElement('p');
      authorHTML.textContent = `by ${author}`;

      const pagesHTML = document.createElement('p');
      pagesHTML.textContent = `${pages} pages`;

      const statusHTML = document.createElement('button');
      statusHTML.classList.add('button', status);
      statusHTML.type = 'button';
      if (status === 'read') statusHTML.textContent = 'Read';
      if (status === 'unread') statusHTML.textContent = 'Not Read';
      statusHTML.addEventListener('click', (e) => {
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
