import {
  createProcucts,
  initPagination,
  handleButton,
  showPage,
  productsPerPage,
} from "./spirit.js";

/***Add dynamic productPerPageVALUE */

Object.defineProperty(productsPerPage, "tv_perPage", { value: 7 });

function fetch_Data(url) {
  return fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      createProcucts(data.ProductType.tv, TvProducts);

      let TvBoxes = document.querySelectorAll(".tv-product .box");

      initPagination(TvBoxes, "tv-boxes", productsPerPage.tv_perPage);

      // Show the first page by default
      showPage(1, TvBoxes, productsPerPage.tv_perPage);

      return TvBoxes;
    })
    .then(function (boxes) {
      boxes.forEach(function (box) {
        box.addEventListener("click", function () {
          let productName = box.querySelector(".product-name").textContent;
          let productPrice = box.querySelector(".price").textContent;
          let productImageSrc = box.querySelector(".feature-image").src;

          localStorage.setItem("selectedProductName", productName);
          localStorage.setItem("selectedProductPrice", productPrice);
          localStorage.setItem("selectedProductImage", productImageSrc);

          window.location.href = "cart.html"; // Redirect to cart page
        });
      });
    });
}

let TvProducts = document.getElementsByClassName("tv-boxes")[0];
fetch_Data("../db.json");
