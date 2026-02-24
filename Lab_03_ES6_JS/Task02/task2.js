let cart = [];

function addToCart(...items) {
  cart.push(...items);
  const clonedCart = [...cart];
  const [firstItem, ...remainingItems] = clonedCart;

  document.getElementById("cart-info").innerHTML = `
    <h2>Cart Summary</h2>
    <p><strong>Total Items:</strong> ${clonedCart.length}</p>
    <p><strong>First Item:</strong> ${firstItem}</p>
    <p><strong>Remaining Items:</strong> ${remainingItems.join(", ")}</p>
  `;
}

addToCart("T-Shirt", "Maxi", "Co-ord Set", "Sari");
