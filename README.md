# Online Book Store

A simple book store built with **HTML5, CSS3, Bootstrap 5, JavaScript (ES6)** and a **Node.js + Express REST API** that stores data in a JSON file.

## How to run
```
npm install
npm start
```
Open http://localhost:3000

## Project structure
```
bookstore/
├── server.js          -> Node.js REST API
├── data/books.json    -> book data (acts as our database)
├── public/
│   ├── index.html     -> home page (book cards, search, sort)
│   ├── add-book.html  -> add book form
│   ├── cart.html      -> shopping cart
│   ├── css/style.css  -> custom CSS
│   └── js/
│       ├── common.js    -> cart helper functions
│       ├── app.js       -> home page logic
│       ├── add-book.js  -> form validation + POST
│       └── cart.js      -> cart page logic
└── postman/           -> Postman collection to test APIs
```

## REST APIs
| Method | URL          | Description        |
|--------|--------------|--------------------|
| GET    | /books       | Get all books      |
| POST   | /books       | Add a new book     |
| DELETE | /books/:id   | Delete a book      |

## Testing with Postman
1. Start the server (`npm start`).
2. Import `postman/Bookstore.postman_collection.json` into Postman.
3. Run the three requests.

## JavaScript concepts used
- **Form validation**: `add-book.js` -> `validateForm()`
- **DOM manipulation**: `innerHTML`, `classList.toggle`, `textContent`
- **Events**: `submit`, `click`, `input`, `change`
- **Arrays & methods**: `map`, `filter`, `find`, `sort`, `reduce`, `some`
- **Functions**: normal functions and arrow functions
- **ES6**: `const/let`, arrow functions, template literals, spread `...`, destructuring, `async/await`
- **Shopping cart**: `common.js` + `cart.js` (saved in localStorage)
