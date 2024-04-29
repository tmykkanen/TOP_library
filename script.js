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
  // bookshelf array
  const bookshelf = [];

  // add book function
  const addBookToShelf = (...args) => {
    // [ ] TODO: ADD CHECK FOR EXISTING BOOK
    const book = new Book(...args);
    bookshelf.push(book);
  };

  // remove book function
  const removeBookFromShelf = (target) => {
    const index = bookshelf.findIndex((x) => x.title === target);
    bookshelf.splice(index, 1);
  };

  const toggleReadStatus = (target) => {
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
  const bookCardsContainer = document.querySelector('.book-cards-container');
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
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToShelf(
      formTitle.value,
      formAuthor.value,
      formPages.value,
      formReadStatus.checked,
    );
    render();
    modal.close();
    form.reset();
  });

  const bindEventsDynamic = () => {
    bookCardsContainer.querySelectorAll('.remove').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        removeBookFromShelf(e.target.parentNode.dataset.title);
        render();
      });
    });

    bookCardsContainer.querySelectorAll('.toggle-switch span').forEach((toggle) => {
      toggle.addEventListener('click', () => {
        const target = e.target.parentNode.parentNode.parentNode.dataset.title;
        toggleReadStatus(target);
      });
    });
  };

  // const renderOLD = () => {
  //   const finalMarkupArray = bookshelf
  //     .map(({
  //       title, author, pages, readStatus,
  //     }) => template
  //       .replaceAll('{title}', title)
  //       .replace('{author}', author)
  //       .replace('{pages}', pages)
  //       .replace('{readStatus}', () => {
  //         return readStatus === true ? 'checked' : '';
  //       }));

  //   const finalMarkup = finalMarkupArray.join('');
  //   bookCardsContainer.innerHTML = finalMarkup;

  //   bindEventsDynamic();
  // };

  const render = () => {
    bookCardsContainer.innerHTML = '';
    for (let book = 0; book < bookshelf.length; book += 1) {
      // parent node: bookCardsContainer
      console.log(book);
      console.log(bookshelf);
      console.log(bookshelf[book]);
      const {
        title,
        author,
        pages,
        status,
      } = bookshelf[book];

      console.log(title);

      const div = document.createElement('div');
      div.classList.add('book-card');
      div.dataset.title = title;

      const removeBtn = document.createElement('a');
      removeBtn.classList.add('remove-btn');
      removeBtn.href = '#';

      const titleHTML = document.createElement('h4');
      titleHTML.textContent = title;

      const authorHTML = document.createElement('p');
      authorHTML.textContent = author;

      const pagesHTML = document.createElement('p');
      pagesHTML.textContent = pages;

      const statusHTML = document.createElement('button');
      statusHTML.classList.add('button', status);
      statusHTML.type = 'button';
      statusHTML.textContent = status;

      div.appendChild(removeBtn);
      div.appendChild(titleHTML);
      div.appendChild(authorHTML);
      div.appendChild(pagesHTML);
      div.appendChild(statusHTML);
      bookCardsContainer.appendChild(div);
    }
  };

  // <div class="book-card" data-title="{title}">
  //     <a href="#" class="remove-btn"></a>
  //     <h4>Dune</h4>
  //     <p>by Frank Herbert</p>
  //     <p>754 pages</p>
  //     <button class="button read" type="button">Read</button>
  //   </div>

  // const renderHeader = (gameState) => {
  //   headerContainer.innerHTML = '';

  //   const h1 = document.createElement('h1');
  //   h1.classList.add();
  //   h1.textContent = 'TIC TAC TOE';
  //   headerContainer.appendChild(h1);

  //   if (gameState === 'before') {
  //     const elem = document.createElement('button');
  //     elem.type = 'button';
  //     elem.classList.add('center');
  //     elem.textContent = 'Begin Game';
  //     // eslint-disable-next-line no-use-before-define
  //     elem.addEventListener('click', () => GameController.playGame());
  //     headerContainer.appendChild(elem);
  //   }
  //   if (gameState === 'during') {
  //     const activePlayer = players.find((e) => e.active);
  //     const elem = document.createElement('h2');
  //     elem.classList.add('center');
  //     elem.textContent = `${activePlayer.name} (${activePlayer.mark}), your turn.`;
  //     headerContainer.appendChild(elem);
  //   }
  //   if (gameState === 'over') {
  //     let winMsg = 'Tie!';

  //     if (players[0].winner) {
  //       winMsg = 'Player 1 (X) wins!';
  //     } else if (players[1].winner) {
  //       winMsg = 'Player 2 (O) wins!';
  //     }

  //     const msg = document.createElement('h2');
  //     msg.classList.add('left-justify');
  //     msg.textContent = winMsg;
  //     headerContainer.appendChild(msg);

  //     const btn = document.createElement('button');
  //     btn.type = 'button';
  //     btn.classList.add('right-justify');
  //     btn.textContent = 'Play Again';
  //     // eslint-disable-next-line no-use-before-define
  //     btn.addEventListener('click', () => GameController.playGame());
  //     headerContainer.appendChild(btn);
  //   }
  // };

  // const render = (gameState) => {
  //   renderHeader(gameState);

  //   boardContainer.innerHTML = '';

  //   for (let cell = 0; cell < board.length; cell += 1) {
  //     const div = document.createElement('div');
  //     div.setAttribute('id', cell);
  //     div.classList.add('board-cell');
  //     div.textContent = board[cell];
  //     if (board[cell] === 'X') div.classList.add('X');
  //     if (board[cell] === 'O') div.classList.add('O');
  //     boardContainer.appendChild(div);
  //     if (gameState === 'during') {
  //       div.addEventListener('click', (e) => GameController.takePlayerTurn(e));
  //       div.addEventListener('mouseover', () => {
  //         if (board[cell] === '') {
  //           div.classList.add('open-cell-hover');
  //           const activePlayer = players.find((player) => player.active);
  //           div.innerHTML = activePlayer.mark;
  //         }
  //       });
  //       div.addEventListener('mouseout', () => {
  //         div.innerHTML = board[cell];
  //         div.classList.remove('open-cell-hover');
  //       });
  //     }
  //   }
  // };


  return { render };
}());
