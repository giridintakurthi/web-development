let cart = [];
let total = 0;

function addToCart(bookName, price) {
  cart.push({ name: bookName, price: price });
  total += price;
  updateCart();
  alert(`Added ${bookName} to the cart!`);

  fetch('http://localhost:3000/addToCart', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: bookName, price: price }),
})
.then(response => response.text())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
}

function loadCart() {
  fetch('/getCart')
    .then(response => response.json())
    .then(data => {
      cart = data.items;
      total = data.total;
      updateCart();
    })
    .catch(error => console.error('Error:', error));
}

function removeFromCart(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  let cartItemsElement = document.getElementById("cart-items");
  let totalElement = document.getElementById("total");
  cartItemsElement.innerHTML = '';

  cart.forEach((item, index) => {
    let itemElement = document.createElement("tr");
    itemElement.innerHTML = `
        <td>${item.name}</td>
        <td>${item.price.toFixed(2)} Rs</td>
        <td><button class="remove-button" onclick="removeFromCart(${index})">Remove</button></td>
    `;
    cartItemsElement.appendChild(itemElement);
  });

  totalElement.textContent = `Total: ${total.toFixed(2)} Rs`;
}

const books = [
  { title: "Nature Kingdom", price: 150, image: "2.jpeg" },
  { title: "boat earbuds", price: 2299, image: "3.jpeg" },

  { title: "vivo v27pro", price: 37999, image: "4.jpeg" },

  { title: "smartwatchs", price: 2250, image: "5.jpeg" },

  { title: "speakers", price: 4599, image: "6.jpeg" },

  { title: "apples", price: 199, image: "7.jpeg" },

  { title: "potatos", price: 50, image: "8.jpeg" },

  { title: "shrit", price: 450, image: "9.jpeg" },

  { title: "pant", price: 1480, image: "10.jpeg" },

  { title: "Awake", price: 299, image: "11.jpeg" },
];

function initializeBookstore() {
  let bookContainer = document.getElementById("book-container");
  books.forEach(book => {
    let bookElement = document.createElement("div");
    bookElement.classList.add("book");
    bookElement.innerHTML = `
        <img src="${book.image}" alt="${book.title}">
        <h3>${book.title}</h3>
        <p> ${book.price.toFixed(2)} Rs</p>
        <button onclick="addToCart('${book.title}', ${book.price})">Add to Cart</button>
    `;
    bookContainer.appendChild(bookElement);
  });
}

window.onload = function () {
  initializeBookstore();
};
