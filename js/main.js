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
function displayProducts(allData = []){
    let productsParent = document.querySelector(".products-wrapper .products-container");
    
    productsParent.innerHTML = "";
    
    allData.map((item , index) => {
        productsParent.innerHTML += `
        <div class="product-card swiper-slide">
            <div class="image-container" >
                <img src="${item.image}" alt="" onclick="addProductID(${item.id})">
                <i class="fa-regular fa-heart" style="font-weight:${item.like == true? "bold" : "normal"}" onclick="userAddToFavouriteAbility(${index})"></i>
            </div>
            <div class="describtion">
                <span class="product p-name">${item.title}</span>
                <span class="product p-category">${item.category}</span>
                <span class="product p-price">${item.price}</span>
                <button class="add-to-cart" onclick="userAddToCartAbility(${index})">add to cart</button>
            </div>
        </div> 
        `   
    })
}


//function to filter cats and sidplay them
function filterCat(){
    let AllDataFromLS = JSON.parse(localStorage.getItem("productDB"));
    let filtered = AllDataFromLS.filter((item) => {
        return item.mainCategory == "electronics";
    })

    let filteredClothes = AllDataFromLS.filter((item) => {
        return item.mainCategory == "clothes";
    })
    displayElectroCategory(filtered); 
    displayClothesCategory(filteredClothes);
}

filterCat()

function displayElectroCategory(filtered){
    console.log(filtered);
    let productsParent = document.querySelector(".products-wrapper .products-container.electronics");
    
    productsParent.innerHTML = "";
    
    filtered.map((item , index) => {
        productsParent.innerHTML += `
        <div class="product-card swiper-slide">
            <div class="image-container" >
                <img src="${item.image}" alt="" onclick="addProductID(${item.id})">
                <i class="fa-regular fa-heart" style="font-weight:${item.like == true? "bold" : "normal"}" onclick="userAddToFavouriteAbility(${index})"></i>
            </div>
            <div class="describtion">
                <span class="product p-name">${item.title}</span>
                <span class="product p-category">${item.category}</span>
                <span class="product p-price">${item.price}</span>
                <button class="add-to-cart" onclick="userAddToCartAbility(${index})">add to cart</button>
            </div>
        </div> 
        `   
    })
}

function displayClothesCategory(filtered){
    let productsParent = document.querySelector(".products-wrapper .products-container.clothes");
    
    productsParent.innerHTML = "";
    
    filtered.map((item , index) => {
        productsParent.innerHTML += `
        <div class="product-card swiper-slide">
            <div class="image-container" >
                <img src="${item.image}" alt="" onclick="addProductID(${item.id})">
                <i class="fa-regular fa-heart" style="font-weight:${item.like == true? "bold" : "normal"}" onclick="userAddToFavouriteAbility(${index})"></i>
            </div>
            <div class="describtion">
                <span class="product p-name">${item.title}</span>
                <span class="product p-category">${item.category}</span>
                <span class="product p-price">${item.price}</span>
                <button class="add-to-cart" onclick="userAddToCartAbility(${index})">add to cart</button>
            </div>
        </div> 
        `   
    })
}

//function to add product id to local storage and redirect to the product page
function addProductID(id){
    window,localStorage.setItem("productID" , JSON.stringify(id));
    window,location = "product.html";
}


var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 30,
    loop: true,
    centerSlide:"true",
    fade:"true",
    grabCursor:"true",
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets:true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    breakpoints:{
        0:{
            slidesPerView: 1,
            slidesPerGroup: 1,
        },
        650:{
            slidesPerView: 2,
            slidesPerGroup: 2,
        },
        1300:{
            slidesPerView: 4,
            slidesPerGroup: 4,
        }
    }
});
