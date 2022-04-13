`use strict`;

window.onload = () => {
  displayProducts();
};
const option = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxN2M1ZWU3ODE4NzAwMTVjMjY3YTgiLCJpYXQiOjE2NDk4NTMxNjgsImV4cCI6MTY1MTA2Mjc2OH0.1WzzjhdVLCI-oAC04FAgoyI6jktTW5H14e1Y3LTXc2Y",
  },
};
const displayProducts = async () => {
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/product/",
    option
  );
  const products = await response.json();
  console.log(products);
  const row = document.querySelector(`.row`);
  row.innerHTML = ``;
  products.forEach((product) => {
    const col = document.createElement("div");
    col.classList.add("col-4", "mb-2");
    col.innerHTML = `<div class="card">
    <img src="${product.imageUrl}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${product.name}</h5>
    <p class="card-text">${product.brand}</p>
    <p class="card-text">${product.description}</p>
    <a href="#" class="btn btn-primary">${product.price}</a>
    </div>
    </div>`;
    row.appendChild(col);
  });
};
