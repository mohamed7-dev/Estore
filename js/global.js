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
        this.classList.remove("active");
    }else{
        headerRTSection.forEach((div) => {
            div.classList.remove("active");
            div.children[0].classList.remove("active");
        })
        this.parentElement.classList.add("active");
        mainWrapperOverlay.classList.add("active");
        navbarOverlay.classList.add("active");
        this.classList.add("active");
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
    mainWrapperOverlay.classList.toggle("active");
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


// get elements to add to cart
let CartItemsArray = localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")) : []; 
let cartItemsContainer = document.querySelector(".cart-content .items-container"); 
let numberBadge = document.querySelector(".badge");
let resultsFromLS = JSON.parse(window.localStorage.getItem("productDB"));
console.log(CartItemsArray)

//add to cart globally
if(CartItemsArray){
    CartItemsArray.map((item) => {
        cartItemsContainer.innerHTML += `
        <li class="cart-item">
            <span class="item-title">${item.title}</span>
            <span class="item-qty">${item.quantity}</span>
        </li>
        `
    })

    numberBadge.innerHTML = CartItemsArray.length;
}

//function to check if the user is existen in the data base or not and based on that add to cart or not 
function userAddToCartAbility (id){
    let resultsFromLS = JSON.parse(window.localStorage.getItem("productDB"));
    let CartItemsArray = localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")) : []; 
    let cartItemsContainer = document.querySelector(".cart-content .items-container"); 
    let numberBadge = document.querySelector(".badge");

    if(localStorage.getItem("signupUser")){
        let filtered = resultsFromLS.find(element => element.id == id);
        let isRepeatedItem = CartItemsArray.some(item => item.id == filtered.id); //returns true if repeated
        
        if(isRepeatedItem){
            
            CartItemsArray.map((item) => {
                if(item.id === filtered.id){
                    item.quantity += 1;
                }else{
                    return item;
                }
            })

        }else{
            CartItemsArray.push(filtered);
        }
        
        cartItemsContainer.innerHTML = "";
        CartItemsArray.forEach((item) => {
            cartItemsContainer.innerHTML += `
                <li class="cart-item">
                <span class="item-title">${item.title}</span>
                <span class="item-qty">${item.quantity}</span>
                </li>
            `
        })
        //add item to local storage
        window.localStorage.setItem("cart" , JSON.stringify(CartItemsArray));

        //get all items in the cart to add number to the badge
        let ElementsInsideCart = document.querySelectorAll(".cart-content li");
        numberBadge.innerHTML = ElementsInsideCart.length;

    }else{
        window.location = "signinup.html"
    }
}

//function to add to favourite
let favItemsArray = localStorage.getItem("fav")? JSON.parse(localStorage.getItem("fav")) : [];
function userAddToFavouriteAbility (id){
    if(localStorage.getItem("signupUser")){
        let filtered = resultsFromLS.find(element => element.id == id);     
        filtered.like = true;   
        favItemsArray.push(filtered);
        //add item to local storage
        window.localStorage.setItem("fav" , JSON.stringify(favItemsArray));
        resultsFromLS.map((item) => {
            if(item.id === filtered.id){
                item.like = true;
            }
        })
        localStorage.setItem("productDB" , JSON.stringify(resultsFromLS))
        displayProducts(resultsFromLS)
    }else{
        window.location = "signinup.html"
    }
}

