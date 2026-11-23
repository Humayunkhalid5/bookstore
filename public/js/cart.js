const cartBody = document.getElementById('cartBody');
const totalEl = document.getElementById('total');

// Show cart items in the table
function showCart() {
  const cart = getCart();

  if (cart.length === 0) {
    cartBody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">Your cart is empty.</td></tr>';
    totalEl.textContent = 0;
    return;
  }

  cartBody.innerHTML = cart.map(item => `
    <tr>
      <td>${item.title} <small class="text-muted">by ${item.author}</small></td>
      <td>$${item.price}</td>
      <td>
        <button class="btn btn-sm btn-outline-secondary" data-action="minus" data-id="${item.id}">-</button>
        <span class="mx-2">${item.qty}</span>
        <button class="btn btn-sm btn-outline-secondary" data-action="plus" data-id="${item.id}">+</button>
      </td>
      <td>$${item.price * item.qty}</td>
      <td><button class="btn btn-sm btn-danger" data-action="remove" data-id="${item.id}">Remove</button></td>
    </tr>
  `).join('');

  // reduce() adds up all subtotals
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  totalEl.textContent = total;
}

// Handle +, -, remove buttons (event delegation)
cartBody.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  const id = Number(button.dataset.id);
  let cart = getCart();

  if (button.dataset.action === 'plus') {
    cart.find(i => i.id === id).qty++;
  }
  if (button.dataset.action === 'minus') {
    const item = cart.find(i => i.id === id);
    if (item.qty > 1) item.qty--;
  }
  if (button.dataset.action === 'remove') {
    cart = cart.filter(i => i.id !== id);
  }

  saveCart(cart);
  showCart();
});

document.getElementById('clearBtn').addEventListener('click', () => {
  saveCart([]);
  showCart();
});

document.getElementById('checkoutBtn').addEventListener('click', () => {
  if (getCart().length === 0) {
    alert('Your cart is empty!');
    return;
  }
  alert('Thank you for your order! 🎉');
  saveCart([]);
  showCart();
});

showCart();
