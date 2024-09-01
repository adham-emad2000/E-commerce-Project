document.addEventListener('DOMContentLoaded', function() {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  var productName = localStorage.getItem('selectedProductName');
  var productPrice = localStorage.getItem('selectedProductPrice');
  var productImageSrc = localStorage.getItem('selectedProductImage');

  const productNameElement = document.querySelector('.product_info_name');
  const productPriceElement = document.querySelector('.product_info_price');
  const productImageElement = document.querySelector('.product_image img');
  


  

  productNameElement.textContent = productName;
  productPriceElement.textContent = `${productPrice} EGP `;
  productImageElement.src = productImageSrc;

  var item_num = parseInt(localStorage.getItem("num_of_items")) || 0;
  var cart = document.querySelector(".product_book a");
  var selectElement = document.getElementById('num');
  var selectedValue = parseInt(selectElement.value);

  cart.addEventListener("click", function(add_to_cart) {
      var productName_wanted = localStorage.getItem('selectedProductName');
      var productPrice_wanted = localStorage.getItem('selectedProductPrice');
      var productImageSrc_wanted = localStorage.getItem('selectedProductImage');
      
      // Check if the product already exists in cartItems
      let existingProduct = cartItems.find(item => item.name === productName_wanted);

      if (existingProduct) {
          // If the product exists, update its quantity
          existingProduct.quantity += selectedValue;
      } else {
          // If the product doesn't exist, add it to the cart
          cartItems.push({
              name: productName_wanted,
              price: productPrice_wanted,
              image: productImageSrc_wanted,
              quantity: selectedValue
          });
      }

      // Update the local storage with the updated cartItems array
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      item_num += selectedValue;
      localStorage.setItem("num_of_items", item_num);
  });

  selectElement.addEventListener('change', function() {
      selectedValue = parseInt(selectElement.value) || 0;
      localStorage.setItem("valueoItem", selectedValue);
  });
});
