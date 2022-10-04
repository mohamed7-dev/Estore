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
        navbarOverlay.classList.remove("active");
        mainWrapperOverlay.classList.remove("active");
        this.classList.remove("active");
        //enable scrolling after removing active
        function enableScroll() {
            window.onscroll = function() {};
        }
        enableScroll();
    }else{
        headerRTSection.forEach((div) => {
            div.classList.remove("active");
            div.children[0].classList.remove("active");
        })
        navbarOverlay.classList.add("active");
        mainWrapperOverlay.classList.add("active");
        this.parentElement.classList.add("active");
        this.classList.add("active");
        //disable scrolling after adding active
        window.onscroll = () => { window.scroll(0, 0); };
    }
}


langHeader.addEventListener("click",dropdownToggle);
signedUserHeader.addEventListener("click",dropdownToggle);
notSigneduserHeader.addEventListener("click" , dropdownToggle);
cartHeader.addEventListener("click",dropdownToggle);


//vertical nav in mobile phone
const linkItems = document.querySelectorAll(".link-item");

linkItems.forEach((linkItem, index) => {
    linkItem.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        linkItem.classList.add("active");

        const indicator = document.querySelector(".indicator");

        indicator.style.left = `${index * 85 + 43}px`;
    })
})

let sideNav = document.querySelector("#side-nav");
let sideNavClose = document.querySelector("#close-btn");
let bars = document.querySelector("#bars-icon");

bars.addEventListener("click" , () => {
    sideNav.style.left = "0";
    sideNavClose.style.right = "20px"; 
})

sideNavClose.addEventListener("click" , ()=> {
    sideNav.style.left = "-100%";
    sideNavClose.style.right = "-100%"; 
})



//constrol the user settings menu in the nav of the home page
let signedUserAccount = document.querySelector(".header-right .signed");
let notSignedUserAccount = document.querySelector(".header-right .not-signed");
let homeUserName = document.querySelector("#signed-user-name");
let userImage = document.querySelector("#user-image");

let dataFromLS = JSON.parse(localStorage.getItem("signupUser"));
if(dataFromLS){
    homeUserName.innerHTML = dataFromLS[0].username;
    userImage.src = dataFromLS[0].avatar;
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


//add to cart globally
function handleCartHeader (){
    let Data  = JSON.parse(localStorage.getItem("cart"));
    if(Data != []){
        cartItemsContainer.innerHTML = "";
        Data.map((item) => {
            cartItemsContainer.innerHTML += `
            <li class="cart-item">
                <span class="item-title">${item.title}</span>
                <span class="item-qty">${item.quantity}</span>
            </li>
            `
        })
    
        numberBadge.innerHTML = Data.length;
    }
}

handleCartHeader();

//handle address in navbar 
let choosedAddressInfo = document.querySelector(".show-choosed-info");
let shippingWay = document.querySelectorAll(".shipping-way");
let locationInNav = document.querySelector(".nav-address-item.location-in-nav");
let addressInNav = document.querySelector(".nav-address-item.address-in-nav");
console.log(shippingWay)

function handleShippingWay(){
    let userInfoFromLS = JSON.parse(localStorage.getItem("signupUser"));
    shippingWay.forEach((item) => {
        item.addEventListener("click" , () => {
            let pickedWay = {
                userName : userInfoFromLS[0].username,
                email : userInfoFromLS[0].email,
                shippingWay : item.dataset.way
            }
            userInfoFromLS.splice(2,1,pickedWay);
            localStorage.setItem("signupUser" , JSON.stringify(userInfoFromLS));

            handleAddressInNav();
        })
    })
}

handleShippingWay();


function handleAddressInNav(){
    let userAuth = JSON.parse(localStorage.getItem("signupUser"));
    choosedAddressInfo.innerHTML = `
    <div class="choosed-address">
        <i class="fa-solid fa-house-user"></i>
        <span>${userAuth[1].city}<span>
    </div>
    <div class="choosed-shipping">
        <span>${userAuth[2].shippingWay}</span>
    </div>
    `

    locationInNav.innerHTML = `
        <span><i class="fa-solid fa-location-dot"></i>${userAuth[1].city}</span>
    `

    addressInNav.innerHTML = `
        <span><i class="fa-solid fa-house-user"></i>${userAuth[1].aprt} , ${userAuth[1].street}</span>
    `
}

handleAddressInNav();

//function to check if the user is existen in the data base or not and based on that add to cart or not 
function userAddToCartAbility (id){
    let CartItemsArray = localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")) : []; 
    let Data =JSON.parse(localStorage.getItem("productDB")); 
    let cartItemsContainer = document.querySelector(".cart-content .items-container"); 
    let numberBadge = document.querySelector(".badge");

    if(localStorage.getItem("signupUser")){
        let filtered = Data.find((item , i , Arr) => item.id == id);
        let isRepeatedItem = CartItemsArray.some((item , i , Arr) => item.id == filtered.id); //returns true if repeated        
        if(isRepeatedItem){
            
            CartItemsArray.map((item, i , Arr) => {
                if(item.id == filtered.id){
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
function userAddToFavouriteAbility (id){
    let favItemsArray = localStorage.getItem("fav")? JSON.parse(localStorage.getItem("fav")) : [];
    let Data =JSON.parse(localStorage.getItem("productDB")); 
    let favIcons = document.querySelectorAll(`.fav-icon-${id}`);
    console.log(favIcons)
    if(localStorage.getItem("signupUser")){
        let filtered = Data.find((item , i , Arr) => item.id == id);
        let isRepeatedItem = favItemsArray.some((item , i , Arr) => item.id == filtered.id); //returns true if repeated
        if(isRepeatedItem){ 
            favIcons.forEach((icon) => {
                icon.style.cssText = "font-weight:normal"
            })  
            favItemsArray.map((item , index , arr) => {
                if(item.id == filtered.id){
                    arr.splice(index , 1);
            }else{
                return item;
            }
            });

        }else{
            filtered.like = true;
            favIcons.forEach((icon) => {
                icon.style.cssText = "font-weight:bold"
            })
            favItemsArray.push(filtered);
        }
        //add item to local storage
        window.localStorage.setItem("fav" , JSON.stringify(favItemsArray));
        Data.map((item) => {
            if(isRepeatedItem){
                if(item.id == filtered.id){
                    delete item.like;
                }else{
                    return item;
                }
            }else{
                filtered.like = true;
            }

        })
        localStorage.setItem("productDB" , JSON.stringify(Data))
        // displayProducts(Data)
    }else{
        window.location = "signinup.html"
    }
}

//handle clicking on nav categories links
let navCategories = document.querySelectorAll(".nav-cat-menu .cat-item");

function handleClickingOnCat(){
    navCategories.forEach((item) => {
        item.addEventListener("click" , () => {
            let clickedCat = item.dataset.cat;
            localStorage.setItem("clickedCat" , JSON.stringify(clickedCat));
        })
    })
}

handleClickingOnCat()


//function to add product id to local storage and redirect to the product page
function addProductID(id){
    window.localStorage.removeItem("productIndex");
    window,localStorage.setItem("productId" , JSON.stringify(id));
    window,location = "product.html";
}

//handle empty pages
function handleEmptyPage(products){
    let pageEmpty = document.querySelector(".empty");
    let mainSectionContainer = document.querySelector(".main-wrapper .container");
    let itemsCount = document.querySelector(`.items-count span:last-child`);
    itemsCount.innerHTML = `(${products.length} items)`;
    if(products.length === 0){
        pageEmpty.classList.add("active");
        mainSectionContainer.style.display = "none";
    }
}