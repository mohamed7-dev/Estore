let productsContainer = document.querySelector(".products-container .cart-items-container");

function displaySearchItemsInPage(){
    let searchDataFromLS = JSON.parse(localStorage.getItem("search")) || [];
    handleEmptyPage(searchDataFromLS);
    
    productsContainer.innerHTML = "";
    searchDataFromLS.map((product , index , arr) => {
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

    localStorage.removeItem("search");
}

displaySearchItemsInPage();
