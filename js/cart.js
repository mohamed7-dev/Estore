let productsContainer = document.querySelector(".products-container .cart-items-container");
let headerBadge = document.querySelector(".badge")
let cartMenuInHeader = document.querySelector(".cart-content");
let cartEmpty = document.querySelector(".cart-empty");
let mainSectionContainer = document.querySelector(".main-section-container");
let itemsCount = document.querySelector(".items-count span");

function displayProductsInCart(cartProducts = []){
    let products = JSON.parse(localStorage.getItem("cart")) || cartProducts;
    headerBadge.innerHTML = products.length;
    itemsCount.innerHTML = `cart (${products.length} items)`;
    //call handleEmptycart function
    handleEmptyCart();

    productsContainer.innerHTML = "";
    products.map((product) => {
        productsContainer.innerHTML += `
        <div class="product-card">
            <div class="image-container">
                <img src="${product.image}" alt="">
            </div>
            <div class="describtion-container">
                <div class="describtion-product-info">
                    <span class="product p-name">${product.title}</span>
                    <span class="product p-category">${product.category}</span>
                    <span class="product p-quantity">qunatity: ${product.quantity}</span>
                    <button class="add-to-cart" onclick="removeFromCart(${product.id})">remove from cart</button>
                </div>
                <div class="describtion-product-price">
                    <span class="product p-price">${product.price}</span>
                </div>
            </div>
        </div> 
        `   
    })
}

displayProductsInCart();

//function to handle the visibility of empty cart div when the cart is empty
function handleEmptyCart(){
    if(JSON.parse(localStorage.getItem("cart")).length === 0){
        cartEmpty.classList.add("active");
        mainSectionContainer.style.display = "none";
    }
}

//function to remove items from cart
function removeFromCart(id){
    if(window.localStorage.getItem("cart")){
        let LSCartItems = JSON.parse(localStorage.getItem("cart"));
        let filteredItems = LSCartItems.filter(item => item.id !== id);
        window.localStorage.setItem("cart" , JSON.stringify(filteredItems));
        displayProductsInCart(filteredItems);
    }
}