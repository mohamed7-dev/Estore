let productsContainer = document.querySelector(".products-container .cart-items-container");
let headerBadge = document.querySelector(".badge")
let cartMenuInHeader = document.querySelector(".cart-content .items-container");
let cartEmpty = document.querySelector(".empty");
let mainSectionContainer = document.querySelector(".main-wrapper .container");
let itemsCount = document.querySelector(".items-count span");

function displayProductsInCart(cartProducts = []){
    let products = JSON.parse(localStorage.getItem("cart")) || cartProducts;
    headerBadge.innerHTML = products.length;
    itemsCount.innerHTML = `cart (${products.length} items)`;
    //call handleEmptycart function
    handleEmptyCart();

    productsContainer.innerHTML = "";
    products.map((product , index , arr) => {
        productsContainer.innerHTML += `
        <div class="product-card">
            <div class="info-wrapper">
                <div class="image-container">
                    <img src="${product.image}" alt="">
                </div>
                <div class="describtion-product-info">
                    <span class="product p-name">${product.title}</span>
                    <span class="product p-category">${product.category}</span>
                    <span class="product p-quantity">qunatity: ${product.quantity}</span>
                </div> 
            </div>           
            <div class="describtion-product-price">
                <span class="product p-price">${product.price}</span>
                <button class="action-btn" onclick="removeFromCart(${index})">remove from cart</button>
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
function removeFromCart(index){
    let LSCartItems = JSON.parse(localStorage.getItem("cart"));
    LSCartItems.splice(index , 1);
    localStorage.setItem("cart" , JSON.stringify(LSCartItems));
    displayProductsInCart(LSCartItems);
    handleCartHeader();
}