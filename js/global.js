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
let cartContent = document.querySelector(".cart-content"); 
let numberBadge = document.querySelector(".badge");

//add to cart globally
let CartItemsArray= localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")) : []; 
if(CartItemsArray){
    CartItemsArray.map((item) => {
        let cartItem = document.createElement("li");
        cartItem.className = "cart-item";
        let divInCart = document.createElement("div");
        divInCart.appendChild(document.createTextNode(`${item.title}`));
        cartItem.appendChild(divInCart);
        let imgInCart = document.createElement("img");
        imgInCart.src = `${item.image}`;
        cartItem.appendChild(imgInCart);
        cartContent.prepend (cartItem);
    })
    numberBadge.innerHTML = CartItemsArray.length;
}

//function to check if the user is existen in the data base or not and based on that add to cart or not 
function userAddToCartAbility (id){
    let resultsFromLS = JSON.parse(window.localStorage.getItem("productDB")); 
    if(localStorage.getItem("signupUser")){
        let filtered = resultsFromLS.find((element) => element.id === id);
        CartItemsArray.push(filtered);
        window.localStorage.setItem("cart" , JSON.stringify(CartItemsArray));
        
        
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

