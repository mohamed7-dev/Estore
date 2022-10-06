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
    mode = mode != undefined? mode : "recent";
    parent.innerHTML = "";
    allData.map((item , index) => {
        parent.innerHTML += `
        <div class="product-card ${mode} swiper-slide">
            <div class="image-container" onclick="addProductID(${item.id})">
                <img src="${item.image}" alt="">
            </div>
            <i class="fa-regular fa-heart fav-icon-${item.id}" style="font-weight:${item.like == true? "bold" : "normal"}" onclick="userAddToFavouriteAbility(${item.id})"></i>
            <div class="describtion" onclick="addProductID(${item.id})">
                <span class="p-name">${item.title}</span>
                <div class="cat-price-row">
                    <small class="p-category">${item.category}</small>
                    <samp class="p-price">${item.price}</samp>
                </div>
            </div>
            <div class="button">
                <button class="add-to-cart" onclick="userAddToCartAbility(${item.id})">add to cart</button>
            </div>
        </div> 
        `   
    })
}

//function to filter cats and sidplay them
function DisplayElectroCat(){
    let AllDataFromLS = JSON.parse(localStorage.getItem("productDB"));
    let filtered = AllDataFromLS.filter((item) => {
        return item.mainCategory == "electronics";
    })
    let electroParent = document.querySelector(".products-container.electronics");
    let mode = "electro";
    displayProducts(filtered , electroParent ,mode); 
}

//display elecrtro cat after running the display function 
DisplayElectroCat();


function displayClothesCat(){
    let AllDataFromLS = JSON.parse(localStorage.getItem("productDB"));
    let filteredClothes = AllDataFromLS.filter((item) => {
        return item.mainCategory == "clothes";
    })
    let clothesParent = document.querySelector(".products-container.clothes");
    let mode = "clothes";
    displayProducts(filteredClothes, clothesParent,mode);
}

//display clothes cat after running the display electro cat 
displayClothesCat();








