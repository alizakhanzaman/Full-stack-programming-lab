// Create Map (Key = Product ID, Value = Product Object)
const productMap = new Map();

// Add minimum 5 products
productMap.set(101, { name: "Men’s Hoodie", price: 50000, category: "Electronics" });
productMap.set(102, { name: "Women’s Abaya", price: 10000, category: "Electronics" });
productMap.set(103, { name: "Jersey Hijab", price: 2000, category: "Accessories" });
productMap.set(104, { name: "Denim Jacket", price: 6000, category: "Accessories" });
productMap.set(105, { name: "Sneakers", price: 15000, category: "Wearable" });
productMap.set(106, { name: "Frock", price: 45000, category: "Electronics" });
productMap.set(107, { name: "Co-ord Sets", price: 8000, category: "Electronics" });
productMap.set(108, { name: "Heels", price: 4000, category: "Entertainment" });


// Display all products
function displayProducts() {
    const grid = document.getElementById("productGrid");
    const total = document.getElementById("totalProducts");

    grid.innerHTML = "";

    productMap.forEach((product, id) => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <h3>${product.name}</h3>
            <p><strong>ID:</strong> ${id}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Price:</strong> Rs ${product.price}</p>
        `;

        grid.appendChild(card);
    });

    total.textContent = productMap.size; // Using .size
}

// Search by ID
function searchProduct() {
    const id = Number(document.getElementById("productID").value);
    const message = document.getElementById("message");

    if (productMap.has(id)) {
        const product = productMap.get(id);
        message.style.color = "#00ffcc";
        message.textContent = `Found: ${product.name} - Rs ${product.price}`;
    } else {
        message.style.color = "#ff6b6b";
        message.textContent = "Product not found!";
    }
}

// Delete product
function deleteProduct() {
    const id = Number(document.getElementById("productID").value);
    const message = document.getElementById("message");

    if (productMap.has(id)) {
        productMap.delete(id);
        message.style.color = "#ffd93d";
        message.textContent = "Product deleted successfully!";
        displayProducts();
    } else {
        message.style.color = "#ff6b6b";
        message.textContent = "Product ID not found!";
    }
}

// Initial load
displayProducts();