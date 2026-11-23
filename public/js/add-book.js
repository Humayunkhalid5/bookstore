const form = document.getElementById('bookForm');
const message = document.getElementById('message');

// Show red error or remove it, using Bootstrap's "is-invalid" class
function setValid(input, isValid) {
  input.classList.toggle('is-invalid', !isValid);
}

// Form validation: returns true only if all fields are correct
function validateForm() {
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const price = document.getElementById('price');
  const category = document.getElementById('category');

  const titleOk = title.value.trim().length >= 2;
  const authorOk = author.value.trim() !== '';
  const priceOk = Number(price.value) > 0;
  const categoryOk = category.value !== '';

  setValid(title, titleOk);
  setValid(author, authorOk);
  setValid(price, priceOk);
  setValid(category, categoryOk);

  return titleOk && authorOk && priceOk && categoryOk;
}

// Send the new book to the server (POST /books)
async function addBook(book) {
  const response = await fetch('/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book)
  });
  return response.ok;
}

// Event: form submit
form.addEventListener('submit', async (event) => {
  event.preventDefault();          // stop page reload

  if (!validateForm()) return;     // stop if there are errors

  const book = {
    title: document.getElementById('title').value.trim(),
    author: document.getElementById('author').value.trim(),
    price: Number(document.getElementById('price').value),
    category: document.getElementById('category').value,
    image: document.getElementById('image').value.trim()
  };

  const success = await addBook(book);

  if (success) {
    message.innerHTML = '<div class="alert alert-success">Book added successfully!</div>';
    form.reset();
  } else {
    message.innerHTML = '<div class="alert alert-danger">Something went wrong.</div>';
  }
});
