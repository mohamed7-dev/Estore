let productsContainer = document.querySelector(".products-container .cart-items-container");


function displayFavourites(allFav = []){
    let favItemsFromLS = JSON.parse(localStorage.getItem("fav")) || allFav;
    handleEmptyPage(favItemsFromLS);
    
    productsContainer.innerHTML = "";
    
    favItemsFromLS.map((product) => {
        productsContainer.innerHTML += `
        <div class="product-card">
        <div class="info-wrapper" onclick="addProductID(${product.id})">
            <div class="image-container">
                <img src="${product.image}" alt="">
            </div>
            <div class="describtion-product-info">
                <span class="product p-name">${product.title}</span>
                <span class="product p-category">${product.category}</span>
            </div>
        </div>
        <div class="describtion-product-price">
            <div class="product p-price">${product.price}</div>
            <button class="action-btn" onclick="userAddToCartAbility(${product.id})">add to cart</button>
            <button class="action-btn" onclick="removeFromFav(${product.id})">remove from favourite</button>
        </div>
        </div> 
        `   
    })
}

displayFavourites()

//remove items from favourites
function removeFromFav(id){
    if(window.localStorage.getItem("fav")){
        let LSfavItems = JSON.parse(localStorage.getItem("fav"));
        let filteredItems = LSfavItems.filter(item => item.id !== id);
        window.localStorage.setItem("fav" , JSON.stringify(filteredItems));
        resultsFromLS.map((item) => {
            if(item.id == id){
                delete item.like;
            }else{
                return item;
            }
        })
        window.localStorage.setItem("productDB" , JSON.stringify(resultsFromLS));
        displayFavourites(filteredItems);
    }
}

