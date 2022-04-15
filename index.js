`use strict`;

window.onload = () => {
  displayProducts();
};
const option = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxN2M1ZWU3ODE4NzAwMTVjMjY3YTgiLCJpYXQiOjE2NDk5Njc2NjEsImV4cCI6MTY1MTE3NzI2MX0.bJ-a8RydRHuvCgXmMewdmveQbMkVWZnCshZjuA2SYwQ",
  },
};
const displayProducts = async () => {
  const url = "https://striveschool-api.herokuapp.com/api/product/";
  const response = await fetch(url, option);
  const products = await response.json();
  const row = document.querySelector(`.row`);
  row.innerHTML = ``;
  products.forEach((product) => {
    const col = document.createElement("div");
    col.classList.add("col-sm-6", "col-md-3", "mb-2");
    col.innerHTML = `<div class="card">
    <img src="${product.imageUrl}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${product.name}</h5>
    <p class="card-text">${product.brand}</p>
    <p class="card-text">${product.description}</p>
    <a href="#" class="fw-bold fs-4 text-decoration-none">${product.price}€</a>
    <a href="./backoffice.html?productId=${product._id}" class="btn btn-primary float-end">Edit</a>
    </div>
    </div>`;
    row.appendChild(col);
  });
};
