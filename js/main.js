//get elemsnts to control show and hido of dropdown menus
let langHeader = document.querySelector(".selected-lang");
let signedUserHeader = document.querySelector(".signed .show-user-info");
let notSigneduserHeader = document.querySelector(".not-signed .show-user-info");
let cartHeader = document.querySelector(".cart-icon");
let headerRTSection =Array.from(document.querySelectorAll(".container .header-right > div"));
let mainWrapperOverlay = document.querySelector(".main-wrapper .overlay");
let navbarOverlay = document.querySelector(".navbar .overlay");
function dropdownToggle (){
    if(this.parentElement.classList.contains("active")){
        this.parentElement.classList.remove("active");
        mainWrapperOverlay.classList.remove("active");
        navbarOverlay.classList.remove("active");
        this.style.cssText = "background-color:transparent ; border-radius:0px; color:var(--text-color)";
    }else{
        headerRTSection.forEach((div) => {
            div.classList.remove("active");
        })
        this.parentElement.classList.add("active");
        mainWrapperOverlay.classList.add("active");
        navbarOverlay.classList.add("active");
        this.style.cssText = "background-color:var(--main-color); border-radius:15px;color:#fff";
    }
}

langHeader.addEventListener("click",dropdownToggle);
signedUserHeader.addEventListener("click",dropdownToggle);
notSigneduserHeader.addEventListener("click" , dropdownToggle);
cartHeader.addEventListener("click",dropdownToggle);

//toggle visibility of the side bar in the small screens
let toggleIcon = document.querySelector("#vert-bar-icon");
let verticalHeader = document.querySelector("#mobile-vertical-header");
let verticalHeaderCloseBtn = document.querySelector("#close-btn i");

toggleIcon.addEventListener("click" , () => {
    verticalHeader.style.left = "0";
})

verticalHeaderCloseBtn.addEventListener("click" , () => {
    verticalHeader.style.left = "-100%";
})

//toggle the active class on the pickup order header in the home page 
let pickupOrderHeader = document.querySelector(".shipping .shipping-header");
let pickupOrderDetails = document.querySelector(".shipping-mode-picking .shipping-mode-details");

pickupOrderHeader.addEventListener("click" , () => {
    pickupOrderDetails.classList.toggle("active");
})


//constrol the user settings menu in the nav of the home page
let signedUserAccount = document.querySelector(".header-right .signed");
let notSignedUserAccount = document.querySelector(".header-right .not-signed");
let homeUserName = document.querySelector("#signed-user-name");

let dataFromLS = JSON.parse(localStorage.getItem("signupUser"));
if(dataFromLS){
        homeUserName.innerHTML = dataFromLS[0].username;
}else{
    signedUserAccount.style.display = "none";
    notSignedUserAccount.style.display = "flex";
}


//onclick on signout button go back to the sign in page
let signoutBtn = document.querySelector("#signout");
signoutBtn.addEventListener("click" , () => {
    localStorage.clear();
    setTimeout(() => {
        window.location = "signinup.html";
    },500);
})


//fetch data from the json file
let url = "./js/productsDB.json";

async function fetchData(url) {
    let resolved = await fetch(url);
    let data = await resolved.json();
    displayProducts(data);
    return data;
}
fetchData(url);

//function to display products in the index.html page from the productsDB.json
async function displayProducts(data){
    await data;
    let productsParent = document.querySelector(".products-wrapper .products-container");
    productsParent.innerHTML = "";
    for(let i = 0; i<data.length; i++){
        productsParent.innerHTML += `
        <div class="product-card">
            <div class="image-container">
                <img src="${data[i].image}" alt="">
                <i class="fa-regular fa-star"></i>
            </div>
            <div class="describtion">
                <span class="product p-name">${data[i].title}</span>
                <span class="product p-category">${data[i].category}</span>
                <span class="product p-price">${data[i].price}</span>
                <button class="add-to-cart" id="add-cart-btn" onclick="userAddToCartAbility(${data[i].id})">add to cart</button>
            </div>
        </div> 
        `          
    }
}
//function to check if the user is existen in the data base or not and based on that add to cart or not 
// get elements to add to cart
let cartIconHeader = document.querySelector(".cart .cart-icon");
let cartContent = document.querySelector(".cart-content"); 
let numberBadge = document.querySelector(".badge");

async function userAddToCartAbility (id){
    let results = await fetchData(url);
    // console.log(results , id);
    if(localStorage.getItem("signupUser")){
        let filtered = results.find((element) => element.id === id);
        let cartItem = document.createElement("li");
        cartItem.className = "cart-item";
        cartItem.appendChild(document.createTextNode(`${filtered.title}`));
        cartContent.prepend (cartItem);
        //get all items in the cart to add number to the badge
        let ElementsInsideCart = document.querySelectorAll(".cart-content li");
        numberBadge.innerHTML = ElementsInsideCart.length;
    }else{
        window.location = "signinup.html"
    }
}