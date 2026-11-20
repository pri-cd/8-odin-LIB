const DEBUG = true;
const ID_BTN_ADD_BOOK = "#add-book-btn";
const ID_BOOK_GRID = "#book-grid";

const ID_DIALOG = "#dialog-box";
const ID_BTN_DIA_SUB = "#submit";
const ID_BTN_DIA_CLS = "#close-dialogue";

const ID_INP_DIA_TITLE = "input[id='title']";
const ID_INP_DIA_AUTHOR = "input[id='author']";
const ID_INP_DIA_PAGES = "input[id='pages']";

const ARTCL_TITLE_CON = "#title-content";
const ARTCL_AUTHOR_CON = "#author-content";
const ARTCL_PAGES_CON = "#pages-content";

const ID_ARTCL_READ_LBL = "#read-label";
const ARTCL_READ_INP = "input[type='checkbox']";
const ID_ARTCL_DELT_BTN = "#delete-book";

const SEL_ARTCL_BOOK = ".article-book";
const ID_ARTCL_BOOK_ = "article-book";

const ARTCL_HTML =
    `<div class="book-title-cn">
        <span class="title-label sLabel">Title:</span>
        <span class="title-content" id="title-content"></span>
    </div>

    <div class="book-authr-cn">
        <span class="author-label sLabel">Author:</span>
        <span class="author-content" id="author-content"></span>
    </div>
    
    <div class="book-pages-cn">
        <span class="pages-label sLabel">Pages:</span>
        <span class="pages-content" id="pages-content"></span>
    </div>
    
    <div class="book-read-cn">
        <label class="read-label sLabel" id="read-label">Read</label>
        <input type="checkbox">
    </div>
    
    <button class="delete-book" id="delete-book">Delete</button>`;


const allBooks = [];

function debug(...args) {
    if (DEBUG === true) {
        console.log(...args);
    }
}

class book {
    constructor(author, title, pages) {
        this.ID = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = false; /** Comes by default, can be ticked later! */
    }
}
/** Factory to handle all events inside. */
const eventManager = (() => {
    'use strict';

    /**
     * 
     * @param {Event} event 
     */
    const handleDeleteEvent = (event) => {

        if (event.target instanceof HTMLElement) {
            const book_to_delete = event.target.closest(SEL_ARTCL_BOOK);

            const index = allBooks.findIndex((bookN, index, array) => {
                if (bookN instanceof book) {
                    return bookN.ID === book_to_delete.dataset.uuid;
                }
            });

            book_to_delete.remove();
            if (index !== -1) {
                allBooks.splice(index, 1);
            }
            debug(allBooks);
        }
    };

    const handleCheckEvent = (event) => {
        if (event instanceof Event) {
            if (event.target instanceof HTMLInputElement) {
                const getBook = event.target.closest(SEL_ARTCL_BOOK);
                const uuid = getBook.dataset.uuid;

                const foundBook = allBooks.find((value, index, array) => {
                    if (value instanceof book) {
                        return value.ID === uuid;
                    }
                });

                if (foundBook instanceof book) {
                    foundBook.read = event.target.checked;
                }
            }
            debug(allBooks);
        }
    };

    return {
        handleDeleteEvent,
        handleCheckEvent,
    };
})();


const DOMManager = (() => {
    'use strict';

    const ID_BOOK_GRID = "#book-grid";

    const ARTCL_TITLE_CON = "#title-content";
    const ARTCL_AUTHOR_CON = "#author-content";
    const ARTCL_PAGES_CON = "#pages-content";

    const ID_ARTCL_READ_LBL = "#read-label";
    const ARTCL_READ_INP = "input[type='checkbox']";
    const ID_ARTCL_DELT_BTN = "#delete-book";

    const ID_ARTCL_BOOK_ = "article-book";

    const ARTCL_HTML =
        `<div class="book-title-cn">
            <span class="title-label sLabel">Title:</span>
            <span class="title-content" id="title-content"></span>
        </div>

        <div class="book-authr-cn">
            <span class="author-label sLabel">Author:</span>
            <span class="author-content" id="author-content"></span>
        </div>
        
        <div class="book-pages-cn">
            <span class="pages-label sLabel">Pages:</span>
            <span class="pages-content" id="pages-content"></span>
        </div>
        
        <div class="book-read-cn">
            <label class="read-label sLabel" id="read-label">Read</label>
            <input type="checkbox">
        </div>
        
        <button class="delete-book" id="delete-book">Delete</button>`;
    /**
     * When a book is filled in the dialog, this method.
     * @param {book} newBook 
     * @returns {HTMLElement} article: newly created article object
     */
    const createBookDOM = (newBook) => {
        if (newBook instanceof book) {
            const article = document.createElement('article');

            article.classList.add(ID_ARTCL_BOOK_);

            article.dataset.uuid = newBook.ID;
            article.innerHTML = ARTCL_HTML;

            article.querySelector(ARTCL_TITLE_CON).textContent = newBook.title;
            article.querySelector(ARTCL_AUTHOR_CON).textContent = newBook.author;
            article.querySelector(ARTCL_PAGES_CON).textContent = newBook.pages;


            const readLabel = article.querySelector(ID_ARTCL_READ_LBL);
            const deleteBtn = article.querySelector(ID_ARTCL_DELT_BTN);
            const readInput = article.querySelector(ARTCL_READ_INP);

            readLabel.setAttribute("for", ("read-" + newBook.ID));
            readInput.id = "read-" + newBook.ID;

            deleteBtn.addEventListener('click', eventManager.handleDeleteEvent);
            readInput.addEventListener('click', eventManager.handleCheckEvent);
            return article;
        }
    };

    /**
     * 
     * @param {book} book_obj 
     */
    const insertBook = (book_obj) => {
        if (book_obj instanceof book) {
            const book_grid = document.querySelector(ID_BOOK_GRID);
            debug(book_grid);
            book_grid.appendChild(createBookDOM(book_obj));
        }
    };

    return {
        insertBook,
    };
})();

const eventHandlers = (() => {
    'use strict';

    const ID_BTN_ADD_BOOK = "#add-book-btn";

    const ID_DIALOG = "#dialog-box";
    const ID_BTN_DIA_SUB = "#submit";
    const ID_BTN_DIA_CLS = "#close-dialogue";

    const ID_INP_DIA_TITLE = "input[id='title']";
    const ID_INP_DIA_AUTHOR = "input[id='author']";
    const ID_INP_DIA_PAGES = "input[id='pages']";

    let is_close_dialog_btn_event_registered = false;

    /**
     * Handle submitting of the form..
     * @param {Event} event 
     */
    const submitButton_handler = (event) => {
        event.preventDefault();
        const title = document.querySelector(ID_INP_DIA_TITLE).value;
        const author = document.querySelector(ID_INP_DIA_AUTHOR).value;
        const pages = document.querySelector(ID_INP_DIA_PAGES).value;

        const target = event.target;
        if (target instanceof HTMLElement) {
            const dialog = target.closest(ID_DIALOG);
            dialog.close();
        }

        const newBook = new book(author, title, pages);
        allBooks.push(newBook);

        document.querySelector(ID_INP_DIA_TITLE).value = "";
        document.querySelector(ID_INP_DIA_AUTHOR).value = "";
        document.querySelector(ID_INP_DIA_PAGES).value = "";
        DOMManager.insertBook(newBook)
    };

    /**
     * 
     * @param {HTMLDialogElement} dialog 
     */
    const registerCloseDialogListener = (dialog) => {
        if (!is_close_dialog_btn_event_registered) {
            const closeDiaButton = document.querySelector(ID_BTN_DIA_CLS);
            closeDiaButton.addEventListener('click', (event) => {
                dialog.close();
            });
            is_close_dialog_btn_event_registered = true;
        }
    };

    /**
     * Opens the dialog.
     * @param {Event} event 
     */
    const openDialog_handler = (event) => {
        const dialog = document.querySelector(ID_DIALOG);

        if (dialog instanceof HTMLDialogElement) {
            dialog.showModal();
            registerCloseDialogListener(dialog);
        }
    };

    /**
     * This function registers: 'Add book' and, 'submit' button..
     */
    const registerEvents = () => {
        const addBookButton = document.querySelector(ID_BTN_ADD_BOOK);
        const submitButton = document.querySelector(ID_BTN_DIA_SUB);

        addBookButton.addEventListener('click', openDialog_handler);
        submitButton.addEventListener('click', submitButton_handler);

    };



    return {
        registerEvents,
    };

})();


eventHandlers.registerEvents();