function fetch_Data(url) {
    return fetch(url)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            createProcucts(data.ProductType.clothes, ClothesProducts);
            createProcucts(data.ProductType.mobiles, MobileProducts);

            let allBoxes = document.querySelectorAll(".feature-boxes .box");
            let mobileBoxes = document.querySelectorAll(".mobile-Boxes .box");

            initPagination(allBoxes, "feature-boxes", productsPerPage.clothes_perPage);
            initPagination(mobileBoxes, "mobile-Boxes", productsPerPage.mobiles_PerPage);

            // Show the first page by default
            showPage(1, allBoxes, productsPerPage.clothes_perPage);
            showPage(1, mobileBoxes, productsPerPage.mobiles_PerPage);

            megaMenu()
             
          
        });
}







export function createProcucts(data, boxParent) {
    if (!boxParent) {
        return;
    }

    for (let i = 0; i < data.length; i++) {
        let box = document.createElement("div");
        box.className = "box";

        let image = document.createElement("div");
        image.className = "img";

        let icon = document.createElement("i");
        icon.className = "fa-solid fa-cart-plus";
        let img = document.createElement("img");
          img.className = "feature-image";
        img.src = data[i].imgSrc;
        image.append(icon, img);

        let product = document.createElement("div");
        product.className = "product-details";

        let brand_name = document.createElement("h4");
        brand_name.className = "brand";
        brand_name.textContent = data[i].brand;

        let product_name = document.createElement("span");
        product_name.className = "product-name";
        product_name.textContent = data[i].productName;

        let starIcons = document.createElement("div");
        starIcons.className = "rate-icons";
        for (let x = 0; x < 5; x++) {
            let stricon = document.createElement("i");
            stricon.className = "fa-solid fa-star";
            starIcons.append(stricon);
        }

        let price_info = document.createElement("div");
        price_info.className = "price-details";

        let newPrice = document.createElement("span");
        newPrice.className = "price";
        newPrice.textContent = data[i].price;

        let newCurrency = document.createElement("span");
        newCurrency.className = "currency";
        newCurrency.textContent = data[i].currency;

        let oldPrice = document.createElement("span");
        oldPrice.className = "old-price";
        let delPrice = document.createElement("del");
        delPrice.textContent = data[i].oldPrice;
        oldPrice.append(delPrice);

        let oldCurrency = document.createElement("span");
        oldCurrency.className = "old-currency";
        oldCurrency.textContent = data[i].oldCurrency;

        price_info.append(newPrice, newCurrency, oldPrice, oldCurrency);

        product.append(brand_name, product_name, starIcons, price_info);
        box.append(image, product);
        boxParent.appendChild(box);
    }
}

let ClothesProducts = document.getElementsByClassName("feature-boxes")[0];
let MobileProducts = document.getElementsByClassName("mobile-Boxes")[0];

export const productsPerPage = {
    clothes_perPage: 8,
    mobiles_PerPage: 4,
};




export function initPagination(boxes, categoryName, productPerPages) {
    let pagination = document.querySelectorAll(`.pagination[data-name="${categoryName}"]`);
    let totalPages = Math.ceil(boxes.length / productPerPages);

    pagination.forEach(paginations => {
        paginations.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            let b = document.createElement("button");
            b.className = i === 1 ? "page-button active" : "page-button";
            b.textContent = i;
            b.dataset.pageNum = i;
            paginations.appendChild(b);
        }

        paginations.addEventListener("click", function(e) {
            if (e.target.classList.contains("page-button")) {
                handleButton(e.target, boxes, productPerPages);
            }
        });
    });
}

export function handleButton(button, boxes, productPerPages) {
    let container = button.parentElement;
    let buttons = container.querySelectorAll(".page-button");
    buttons.forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    showPage(button.dataset.pageNum, boxes, productPerPages);
}

export function showPage(pageNum, boxes, productPerPages) {
    boxes.forEach(function(product) {
        product.style.display = "none";
    });

    const start_index = (pageNum - 1) * productPerPages;
    const end_index = Math.min(start_index + productPerPages, boxes.length);

    for (let j = start_index; j < end_index; j++) {
        boxes[j].style.display = "block";
    }
}

const PromiseA = new Promise(function(resolve, reject) {
    fetch_Data("/json/homePage.json")
        .then(function() {
            resolve(); // Resolve the promise when fetch_Data is done
        })
        .catch(function(error) {
            reject(error); // Reject the promise if there's an error
        });
}).then(function(){
    let boxes=document.querySelectorAll(".box")
    console.log(boxes)
    return boxes
}).then(function(boxes){


    boxes.forEach(function(box) {
        box.addEventListener("click", function() {
            let productName = box.querySelector(".product-name").textContent;
            let productPrice = box.querySelector(".price").textContent;
            let productImageSrc = box.querySelector(".feature-image").src;

            localStorage.setItem('selectedProductName', productName);
            localStorage.setItem('selectedProductPrice', productPrice);
            localStorage.setItem('selectedProductImage', productImageSrc);

            window.location.href = "cart.html"; // Redirect to cart page
        });
    });
});



/***clicked of categories */

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

document.querySelector('.menu-option').addEventListener('click', function() {
    document.querySelector('.toggle').classList.toggle('active');
});