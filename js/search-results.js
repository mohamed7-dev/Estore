let container = document.querySelector(".cart-items-container");
let searchDataFromLS = JSON.parse(localStorage.getItem("search"));
let searchEmpty = document.querySelector(".cart-empty");
let mainSection = document.querySelector(".main-section-container");



console.log(searchDataFromLS)

function displaySearchItemsInPage(){
    handleEmptySearch();
    container.innerHTML = "";
    searchDataFromLS.map((item,index,Arr) => {
        container.innerHTML += `
            <div class="product-card">
            <div class="image-container">
                <img src="${item.image}" alt="">
            </div>
            <div class="describtion-container">
                <div class="describtion-product-info">
                    <span class="product p-name">${item.title}</span>
                    <span class="product p-category">${item.category}</span>
                    <span class="product p-quantity">qunatity: ${item.quantity}</span>
                    <button class="add-to-cart" onclick="userAddToCartAbility(${index})">add to cart</button>
                </div>
                <div class="describtion-product-price">
                    <span class="product p-price">${item.price}</span>
                </div>
            </div>
        </div> 
            `
    })
}

displaySearchItemsInPage();

function handleEmptySearch(){
    if(searchDataFromLS.length === 0){
        searchEmpty.classList.add("active");
        mainSection.style.display = "none";
    }
}