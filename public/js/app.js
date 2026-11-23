const bookList = document.getElementById('bookList');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');

let books = [];   // all books from the server

// 1. Get books from the REST API
async function loadBooks() {
  const response = await fetch('/books');
  books = await response.json();
  showBooks(books);
}

// 2. Show books as Bootstrap cards (DOM manipulation)
function showBooks(list) {
  if (list.length === 0) {
    bookList.innerHTML = '<p class="text-muted">No books found.</p>';
    return;
  }

  // map() converts every book object into a card (HTML string)
  bookList.innerHTML = list.map(book => `
    <div class="col-12 col-sm-6 col-lg-3">
      <div class="card h-100 shadow-sm">
        <img src="${getImage(book)}" class="card-img-top book-img" alt="${book.title}">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text mb-1">by ${book.author}</p>
          <span class="badge bg-secondary">${book.category}</span>
          <p class="fw-bold mt-2">$${book.price}</p>
        </div>
        <div class="card-footer d-flex gap-2">
          <button class="btn btn-primary btn-sm flex-grow-1" data-action="add" data-id="${book.id}">Add to Cart</button>
          <button class="btn btn-outline-danger btn-sm" data-action="delete" data-id="${book.id}">Delete</button>
        </div>
      </div>
    </div>
  `).join('');
}

// 3. Search + sort (uses filter() and sort())
function applyFilters() {
  const text = searchInput.value.toLowerCase();

  // filter() keeps only books matching the search text
  let result = books.filter(book =>
    book.title.toLowerCase().includes(text) ||
    book.author.toLowerCase().includes(text)
  );

  // sort() orders by price. [...result] makes a copy first
  if (sortSelect.value === 'low') {
    result = [...result].sort((a, b) => a.price - b.price);
  } else if (sortSelect.value === 'high') {
    result = [...result].sort((a, b) => b.price - a.price);
  }

  showBooks(result);
}

// 4. Delete a book using the REST API
async function deleteBook(id) {
  if (!confirm('Delete this book?')) return;
  await fetch(`/books/${id}`, { method: 'DELETE' });
  loadBooks();   // reload list
}

// ---------- Events ----------
searchInput.addEventListener('input', applyFilters);
sortSelect.addEventListener('change', applyFilters);

// One click listener for all buttons (event delegation)
bookList.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  const id = Number(button.dataset.id);

  if (button.dataset.action === 'add') {
    const book = books.find(b => b.id === id);   // find() gets one book
    addToCart(book);
    button.textContent = 'Added ✓';
    setTimeout(() => (button.textContent = 'Add to Cart'), 1000);
  }

  if (button.dataset.action === 'delete') {
    deleteBook(id);
  }
});

loadBooks();
