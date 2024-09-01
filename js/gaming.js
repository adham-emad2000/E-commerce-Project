



import { createProcucts,initPagination,handleButton,showPage,productsPerPage } from "./spirit.js"

Object.defineProperty(productsPerPage, "games_perPage", {value : 8});

 let gamesBoxes=document.querySelectorAll(".game-items .games-boxes .box")





 function fetch_Data(url){

    return fetch(url)
    .then(function(res){
   
     return res.json()
   
    }).then(function(data){

        createProcucts(data.ProductType.games,gamesProduct)
           
        let gamesBoxes=document.querySelectorAll(".game-items .games-boxes .box")
   
 initPagination(gamesBoxes,"games-boxes",productsPerPage.games_perPage)
 
     // Show the first page by default
     showPage(1, gamesBoxes,productsPerPage.games_perPage);

     return gamesBoxes

   
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
    

        
    })

}

let gamesProduct=document.querySelector(".games-boxes")
fetch_Data("../json/homePage.json")







/******************* */






