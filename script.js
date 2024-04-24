const library = (function () {
  // Bookshelf
  const books = [];

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

  // Book Constructor

  function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }

  // Methods
  const render = () => {
    const finalMarkup = books
      .map(({
        title, author, pages, readStatus,
      }) => template
        .replaceAll('{title}', title)
        .replace('{author}', author)
        .replace('{pages}', pages)
        .replace('{readStatus}', readStatus));
    booksContainer.innerHTML = finalMarkup;
    bindEventsDynamic();
  };

  const addToLibrary = (e) => {
    e.preventDefault();
    const book = new Book(
      formTitle.value,
      formAuthor.value,
      formPages.value,
      formReadStatus.checked,
    );
    books.push(book);
    render();
    modal.close();
    form.reset();
  };

  const removeFromLibrary = (e) => {
    const target = e.target.parentNode.dataset.title;
    const index = books.findIndex((x) => x.title === target);
    books.splice(index, 1);
    render();
  };

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
  form.addEventListener('submit', addToLibrary);

  const bindEventsDynamic = () => {
    booksContainer.querySelectorAll('.remove').forEach((btn) => {
      btn.addEventListener('click', removeFromLibrary);
    });
  };
  return {
    books,
  };
}());
