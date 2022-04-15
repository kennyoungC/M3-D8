`use strict`;
const headers = new Headers({
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxN2M1ZWU3ODE4NzAwMTVjMjY3YTgiLCJpYXQiOjE2NDk5Njc2NjEsImV4cCI6MTY1MTE3NzI2MX0.bJ-a8RydRHuvCgXmMewdmveQbMkVWZnCshZjuA2SYwQ",
});
const productId = new URLSearchParams(window.location.search).get("productId");
const endpoint = productId
  ? "https://striveschool-api.herokuapp.com/api/product/" + productId
  : "https://striveschool-api.herokuapp.com/api/product/";
const method = productId ? "PUT" : "POST";
window.onload = () => {
  handleEdit();
};
const handleSubmit = async (event) => {
  event.preventDefault();

  const myDetail = {
    name: document.getElementById("name").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("image").value,
    description: document.getElementById("product-description").value,
    price: document.getElementById("price").value,
  };
  try {
    const response = await fetch(endpoint, {
      method,
      body: JSON.stringify(myDetail),
      headers,
    });
    if (response.ok) {
      const products = await response.json();
      if (productId) {
        showAlert(
          "info",
          `Item with the ID of ${products._id} was successfully EDITED`
        );
        setTimeout(() => {
          window.location.assign("/");
        }, 3000);
      } else {
        showAlert("success", `New item added with the ID of ${products._id}`);
        setTimeout(() => {
          window.location.assign("/");
        }, 3000);
      }
    }
  } catch (error) {
    showAlert("danger", err.message);
  }
};
const handleEdit = async () => {
  try {
    if (productId) {
      const response = await fetch(endpoint, {
        headers,
      });
      const { name, brand, imageUrl, price, description } =
        await response.json();
      document.getElementById("name").value = name;
      document.getElementById("brand").value = brand;
      document.getElementById("image").value = imageUrl;
      document.getElementById("product-description").value = description;
      document.getElementById("price").value = price;
      const submitBtn = document.querySelector("button[type='submit']");
      const delBtn = document.querySelector(".del-btn");
      const h1 = document.querySelector("h1");
      h1.innerText = " Edit Item";
      submitBtn.className = "btn btn-info";
      submitBtn.innerText = "Edit";
      delBtn.classList.remove("d-none");
    }
  } catch (err) {
    showAlert("danger", err.message);
  }
};
const validate = (event) => {
  event.target.form.classList.add("validated");
};

const showAlert = (type, msg) => {
  const alertContainer = document.querySelector(".alert-box");
  alertContainer.innerHTML = `
  <div class="alert alert-${type}" role="alert">
  ${msg}
  </div>
  `;
  setTimeout(() => {
    alertContainer.innerHTML = "";
  }, 3000);
};

const handleDelete = async () => {
  const accepted = confirm("do you want to delete?");

  console.log("Confirmed? ", accepted);

  if (accepted) {
    try {
      let response = await fetch(endpoint, {
        method: "DELETE",
        headers,
      });

      if (response.ok) {
        let deletedObj = await response.json();
        showAlert(
          "danger",
          "Product: " + deletedObj.name + "  successfully deleted"
        );
        setTimeout(() => window.location.assign("/"), 3000);
      } else {
        throw new Error("Fail to delete product");
      }
    } catch (err) {
      showAlert("danger", err.message);
    }
  }
};
