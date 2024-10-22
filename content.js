let contentTitle;

function dynamicClothingSection(ob) {
  let boxDiv = document.createElement("div");
  boxDiv.id = "box";

  let boxLink = document.createElement("a");
  boxLink.href = "/contentDetails.html?" + ob.id;

  let imgTag = document.createElement("img");
  imgTag.src = ob.preview;

  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  let h3 = document.createElement("h3");
  h3.appendChild(document.createTextNode(ob.name));

  let h4 = document.createElement("h4");
  h4.appendChild(document.createTextNode(ob.brand));

  let h2 = document.createElement("h2");
  h2.appendChild(document.createTextNode("Rs " + ob.price));

  // Add to Cart Button
  // Add to Cart Button
  let addToCartButton = document.createElement("button");
  addToCartButton.textContent = "Add to Cart";
  addToCartButton.className = "add-to-cart-button"; // Add the CSS class
  addToCartButton.onclick = () => addToCart(ob);


  boxDiv.appendChild(boxLink);
  boxLink.appendChild(imgTag);
  boxLink.appendChild(detailsDiv);
  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(h4);
  detailsDiv.appendChild(h2);
  boxDiv.appendChild(addToCartButton);

  return boxDiv;
}

function addToCart(item) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(cartItem => cartItem.id === item.id);
  if (existingItem) {
    existingItem.quantity += 1; // Increase quantity if item exists
  } else {
    cart.push({ ...item, quantity: 1 }); // Add new item to cart
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("badge").innerText = totalItems; // Make sure you have an element with id="badge"
}

// Fetch products and initialize the cart badge on page load
window.onload = function () {
  let httpRequest = new XMLHttpRequest();

  httpRequest.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status == 200) {
        contentTitle = JSON.parse(this.responseText);
        updateCartBadge(); // Update cart badge on page load
        contentTitle.forEach(item => {
          if (item.isAccessory) {
            containerAccessories.appendChild(dynamicClothingSection(item));
          } else {
            containerClothing.appendChild(dynamicClothingSection(item));
          }
        });
      } else {
        console.log("Failed to fetch products!");
      }
    }
  };

  httpRequest.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/product", true);
  httpRequest.send();
};
