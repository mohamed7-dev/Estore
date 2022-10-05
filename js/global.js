//onclick on signout button go back to the sign in page
let signoutBtn = document.querySelector("#signout");
signoutBtn.addEventListener("click" , () => {
    localStorage.clear();
    setTimeout(() => {
        window.location = "signinup.html";
    },500);
})



// get elements to add to cart
let cartItemsContainer = document.querySelector(".cart-content .items-container"); 
let numberBadge = document.querySelector(".badge");

function handleCartHeader (){
    let Data  = JSON.parse(localStorage.getItem("cart")) || [];
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

let mobileScreenNavMatch = window.matchMedia("(max-width:995px)");
if(mobileScreenNavMatch.matches){
    let navCategoriesMobile = document.querySelectorAll(".cat-target");
    handleClickingOnCat(navCategoriesMobile);
}

let bigScreenNav = window.matchMedia("(min-width:995px)");
if(bigScreenNav.matches){
    let navCategories = document.querySelectorAll(".nav-cat-menu .cat-item");
    handleClickingOnCat(navCategories)
}

function handleClickingOnCat(navCats){
    navCats.forEach((item) => {
        item.addEventListener("click" , () => {
            let clickedCat = item.dataset.cat;
            localStorage.setItem("clickedCat" , JSON.stringify(clickedCat));
        })
    })
}


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
