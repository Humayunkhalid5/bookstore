// ---------- 1. Import packages ----------
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data', 'books.json');

// ---------- 2. Middleware ----------
app.use(express.json());                              // read JSON from request body
app.use(express.static(path.join(__dirname, 'public'))); // serve HTML/CSS/JS files

// ---------- 3. Helper functions to read/write the JSON file ----------
function readBooks() {
  const text = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(text);
}

function saveBooks(books) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(books, null, 2));
}

// ---------- 4. REST APIs ----------

// GET /books  -> return all books
app.get('/books', (req, res) => {
  res.json(readBooks());
});

// POST /books -> add a new book
app.post('/books', (req, res) => {
  const { title, author, price, category, image } = req.body;

  // basic validation
  if (!title || !author || !price || !category) {
    return res.status(400).json({ message: 'title, author, price and category are required' });
  }

  const books = readBooks();
  const newBook = {
    id: Date.now(),            // simple unique id
    title,
    author,
    price: Number(price),
    category,
    image: image || ''
  };

  books.push(newBook);
  saveBooks(books);
  res.status(201).json(newBook);
});

// DELETE /books/:id -> delete a book by id
app.delete('/books/:id', (req, res) => {
  const id = Number(req.params.id);
  const books = readBooks();

  const exists = books.some(book => book.id === id);
  if (!exists) {
    return res.status(404).json({ message: 'Book not found' });
  }

  saveBooks(books.filter(book => book.id !== id));
  res.json({ message: 'Book deleted' });
});

// ---------- 5. Start server ----------
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
