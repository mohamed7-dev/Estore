//fetch data from the json file
let url = "./js/productsDB.json";

async function fetchData(url) {
    let resolved = await fetch(url);
    let data = await resolved.json();
    
    let retrieveDataFromLS;
    if(localStorage.getItem("productDB") != null){
        retrieveDataFromLS = JSON.parse(localStorage.getItem("productDB"));
    }else{
        localStorage.setItem("productDB" , JSON.stringify(data));
        retrieveDataFromLS = JSON.parse(localStorage.getItem("productDB"));
    }
    displayProducts(retrieveDataFromLS);
    return retrieveDataFromLS;
}
fetchData(url);

//function to display products in the index.html page from the productsDB.json
function displayProducts(allData , parent ,mode){
    parent = parent != undefined? parent : document.querySelector(".products-container.recently-added");
    mode = mode != undefined? mode : "recently-added";
    parent.innerHTML = "";
    
    allData.map((item , index) => {
        parent.innerHTML += `
        <div class="product-card ${mode}">
            <div class="image-container" onclick="addProductID(${item.id})">
                <img src="${item.image}" alt="">
            </div>
            <i class="fa-regular fa-heart" style="font-weight:${item.like == true? "bold" : "normal"}" onclick="userAddToFavouriteAbility(${index})"></i>
            <div class="describtion" onclick="addProductID(${item.id})">
                <span class="product p-name">${item.title}</span>
                <small class="product p-category">${item.category}</small>
                <samp class="product p-price">${item.price}</samp>
            </div>
            <div class="button">
                <button class="add-to-cart" onclick="userAddToCartAbility(${index})">add to cart</button>
            </div>
        </div> 
        `   
    })
}

//control slider
// let productCards = document.querySelectorAll(".products-container.recently-added .product-card");
// let nextBtn = document.querySelector("#next");
// let prevBtn = document.querySelector("#prev");
// let product_page = Math.ceil(productCards.length / 4); 

// let moveBy = 25;
// let l = 0;
// let maxMove = 203;
// console.log(productCards , nextBtn , prevBtn)

// //mobile screen 
// let mobileScreen = window.matchMedia("(max-width:768px)");
// if(mobileScreen.matches){
//     moveBy = 50;
//     maxMove = 504;
// } 

// function nextMove(){
//     l = l + moveBy;
//     if (productCards == 1){l = 0};
//     for(let item of productCards){
//         if(l > maxMove){l = l - moveBy}
//         item.style.left = "-" + l + "%";
//     }
// }

// nextBtn.onclick = () => {nextMove()};

// function prevMove(){
//     l = l - moveBy;
//     if (l <= 1){l = 0};
//     for(let item of productCards){
//         if(product_page > 1)
//         item.style.left = "-" + l + "%";
//     }
// }

// prevBtn.onclick = () => {prevMove()};


//function to filter cats and sidplay them
let AllDataFromLS = JSON.parse(localStorage.getItem("productDB"));
function DisplayElectroCat(){
    let filtered = AllDataFromLS.filter((item) => {
        return item.mainCategory == "electronics";
    })
    let electroParent = document.querySelector(".products-container.electronics");
    let mode = "electro";
    displayProducts(filtered , electroParent ,mode); 
}
DisplayElectroCat();


function displayClothesCat(){
    let filteredClothes = AllDataFromLS.filter((item) => {
        return item.mainCategory == "clothes";
    })
    let clothesParent = document.querySelector(".products-container.clothes");
    let mode = "clothes";
    displayProducts(filteredClothes, clothesParent,mode);
}
displayClothesCat();

//function to add product id to local storage and redirect to the product page
function addProductID(id){
    window,localStorage.setItem("productID" , JSON.stringify(id));
    window,location = "product.html";
}


