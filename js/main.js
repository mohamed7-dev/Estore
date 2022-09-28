//fetch data from the json file
let url = "./js/productsDB.json";

async function fetchData(url) {
    let resolved = await fetch(url);
    let data = await resolved.json();
    if(localStorage.getItem("productDB")){
        JSON.parse(localStorage.getItem("productDB"))
    }else{
        localStorage.setItem("productDB" , JSON.stringify(data))
    }
    let retrieveDataFromLS = JSON.parse(localStorage.getItem("productDB"));
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
        <div class="product-card">
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


// search for products 
let searchInput = document.querySelector("#search");
let searchBtn = document.querySelector("#search-btn");

    //when press enter and keyup
searchInput.addEventListener("keyup" , (e) => {
    if(e.keyCode === 13){
        searchProducts(e.target.value , JSON.parse(localStorage.getItem("productDB")));
    }

    if(e.target.value === ""){
        displayProducts(JSON.parse(localStorage.getItem("productDB")));
    }
})
    // when clicking search 
searchBtn.addEventListener("click" , () => {
    searchProducts(searchInput.value , JSON.parse(localStorage.getItem("productDB")));
    window.location = "search.html";
})

function searchProducts(inputValue , array ){
    let searchResult = array.filter((item) => item.title == inputValue);
    displayProducts(searchResult)
}