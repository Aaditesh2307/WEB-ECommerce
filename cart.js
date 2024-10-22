window.onload = function () {
    displayCart();
};

function displayCart() {
    const cartContainer = document.getElementById("cartContainer");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItemElement = document.getElementById("totalItem");

    cartContainer.innerHTML = ""; // Clear existing items

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalItemElement.innerText = "Total Items: 0";
        return;
    }


    cart.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";

        const name = document.createElement("h3");
        name.innerText = item.name;

        const quantity = document.createElement("h4");
        quantity.innerText = "Quantity: " + item.quantity;

        const price = document.createElement("h2");
        price.innerText = "Rs " + (item.price * item.quantity);

        itemDiv.appendChild(name);
        itemDiv.appendChild(quantity);
        itemDiv.appendChild(price);
        cartContainer.appendChild(itemDiv);
    });

    // Update total items count
    totalItemElement.innerText = "Total Items: " + cart.reduce((sum, item) => sum + item.quantity, 0);
}
