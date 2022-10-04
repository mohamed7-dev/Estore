let productsContainer = document.querySelector(".products-container .cart-items-container");
let headerBadge = document.querySelector(".badge")
let cartMenuInHeader = document.querySelector(".cart-content .items-container");


function displayProductsInCart(cartProducts = []){
    let products = JSON.parse(localStorage.getItem("cart")) || cartProducts;
    headerBadge.innerHTML = products.length;
    
    //call handleEmptycart function
    handleEmptyPage(products);

    productsContainer.innerHTML = "";
    products.map((product , index , arr) => {
        productsContainer.innerHTML += `
        <div class="product-card">
            <div class="info-wrapper" onclick="addProductID(${product.id})">
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
                <button class="action-btn" onclick="removeFromCart(${product.id})">remove from cart</button>
            </div>
        </div> 
        `   
    })
}

displayProductsInCart();



//function to remove items from cart
function removeFromCart(id){
    let LSCartItems = JSON.parse(localStorage.getItem("cart"));
    let filtered = LSCartItems.find((item) => item.id == id);
    LSCartItems.splice(filtered , 1);
    localStorage.setItem("cart" , JSON.stringify(LSCartItems));
    displayProductsInCart(LSCartItems);
    handleCartHeader();
}