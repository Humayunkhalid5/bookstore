// Cart helper functions (shared by all pages)
// The cart is saved in localStorage so it stays after refresh.

const getCart = () => JSON.parse(localStorage.getItem('cart')) || [];

const saveCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
};

// Show total quantity on the navbar badge
const updateCartCount = () => {
  const badge = document.getElementById('cartCount');
  const total = getCart().reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = total;
};

// Add a book to the cart (or increase quantity if already there)
const addToCart = (book) => {
  const cart = getCart();
  const item = cart.find(i => i.id === book.id);

  if (item) {
    item.qty++;
  } else {
    cart.push({ ...book, qty: 1 });   // spread operator copies the book
  }
  saveCart(cart);
};

// Use a placeholder image if book has no image
const getImage = (book) =>
  book.image || `https://placehold.co/300x220?text=${encodeURIComponent(book.title)}`;

updateCartCount();
