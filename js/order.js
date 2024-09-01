document.addEventListener('DOMContentLoaded', function() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let maintable = document.getElementById("main-table");
    let tableBody = maintable.querySelector("tbody");

    function updateCart() {
        tableBody.innerHTML = '';
        let Subtotal = 0;
        cartItems.forEach((item, index) => {
            let row = document.createElement("tr");

            let col_one = document.createElement("td");
            let removeIcon = document.createElement("div");
            removeIcon.textContent = "X";
            removeIcon.className = "remove";
            removeIcon.dataset.index = index;
            col_one.appendChild(removeIcon);

            let col_two = document.createElement("td");
            let image_item = document.createElement("img");
            image_item.src = item.image;
            image_item.style.width = "100px";
            image_item.style.height = "auto";
            col_two.appendChild(image_item);

            let col_three = document.createElement("td");
            col_three.textContent = item.name;

            let col_four = document.createElement("td");
            col_four.textContent = `${item.price} EGP`;

            let col_five = document.createElement("td");
            col_five.textContent = item.quantity;

            let col_six = document.createElement("td");
            let itemSubtotal = parseInt(item.price) * item.quantity;
            col_six.textContent = itemSubtotal;

            Subtotal += itemSubtotal;

            row.appendChild(col_one);
            row.appendChild(col_two);
            row.appendChild(col_three);
            row.appendChild(col_four);
            row.appendChild(col_five);
            row.appendChild(col_six);

            tableBody.appendChild(row);
        });

        let subtotals = document.getElementById("Subtotal");
        let total = document.getElementById("total-price");
        subtotals.textContent = `${Subtotal} EGP`;
        total.textContent = `${Subtotal} EGP`;
    }

    updateCart();

    tableBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove')) {
            let index = event.target.dataset.index;
            cartItems.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCart();
        }
    });

    function megaMenu(){

        let buttonCategories=document.getElementById("Categories")
        let megaMenu=document.getElementsByClassName("megaMenu")[0]
        buttonCategories.addEventListener("click",function(event){
        
            event.preventDefault();
            if (megaMenu.style.display === "block") {
                megaMenu.style.display = "none";
            } else {
                megaMenu.style.display = "block";
            }
        })
        
        }

        megaMenu();

        document.querySelector('.menu-option').addEventListener('click', function() {
            document.querySelector('.toggle').classList.toggle('active');
        });
});