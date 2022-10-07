let getStartedButn = document.querySelector("#get-started");
let formSection = document.querySelector(".add-product");

getStartedButn.addEventListener("click" , () => {
    window.scrollTo({
        top:700,
        behavior:"smooth"
    })
})


let langHeader = document.querySelector(".selected-lang");
let signedUserHeader = document.querySelector(".signed .show-user-info");
let notSigneduserHeader = document.querySelector(".not-signed .show-user-info");
let headerRTSection =Array.from(document.querySelectorAll(".container .header-right > div"));
let landingOverlay = document.querySelector(".landing .overlay");

function dropdownToggle (){
    if(this.parentElement.classList.contains("active")){
        this.parentElement.classList.remove("active");
        landingOverlay.classList.remove("active");
        this.classList.remove("active");
    }else{
        headerRTSection.forEach((div) => {
            div.classList.remove("active");
            div.children[0].classList.remove("active");
        })
        this.parentElement.classList.add("active");
        landingOverlay.classList.add("active");
        this.classList.add("active");
    }
}

langHeader.addEventListener("click",dropdownToggle);
signedUserHeader.addEventListener("click",dropdownToggle);
notSigneduserHeader.addEventListener("click" , dropdownToggle);


//get elemenst to add product
let pTitle = document.querySelector("#title");
let pBrand = document.querySelector("#brand");
let pPrice = document.querySelector("#price");
let pSeller = document.querySelector("#seller");
let pQty = document.querySelector("#qty");
let pImage = document.querySelector("#img");
let pThumb = document.querySelector("#thumb");
let pMainCatSelect = document.querySelector("#main-cat");
let pSubCatSelect = document.querySelector("#sub-cat");
let pDescArea = document.querySelector("#desc");
let pSubmit = document.querySelector("#submit");
let pForm = document.querySelector("#add-product-form");
let container = document.querySelector(".cart-items-container");
let mainContainer = document.querySelector(".main-wrapper .container");
let cartEmpty = document.querySelector(".empty");
let itemsCount = document.querySelector(".items-count span");
let previewImage = document.querySelector(".upload-image img");
let label = document.querySelector(".upload-image label");
let previewThumbs = document.querySelector(".upload-thumbs div");
let labelOfThumbs = document.querySelector(".upload-thumbs label");

let catValue;
let mainCatValue;
let imageValue;
let thumbsObject = {};
let mode = "add";
let tmp;

//get cat from select menu
pSubCatSelect.addEventListener("change" , getProductCat)
function getProductCat(e){
    catValue = e.target.value;
}

pMainCatSelect.addEventListener("change" , getMainProductCat)
function getMainProductCat(e){
    mainCatValue = e.target.value;
}

//get image of the product
pImage.addEventListener("change" , addImage)
function addImage(){
    console.log(this.files[0])
    let image = this.files[0];
    let permittedFormats = ["image/png" , "image/jpg" , "image/jpeg"];
    if(permittedFormats.indexOf(image.type) === -1){
        alert("image format is not supported");
        return;
    }

    if(image.size > 2* 1024 * 1024){
        alert("image size must not exceed 2MB");    
        return;
    }

    let imageReader = new FileReader();
    imageReader.readAsDataURL(image);
    imageReader.onload = function () {
        imageValue = imageReader.result;
        previewImage.src = imageValue;
        previewImage.style.cssText = "opacity:1; pointer-events:auto;"
    }
}

//get thumbs of the product
pThumb.addEventListener("change" , addThumbs)
let thumbsImages = [];
function addThumbs(){
    let image = this.files[0];
    thumbsImages.push(image);
    console.log(thumbsImages)
    thumbsImages.forEach((img,index,Arr) => {
        let imageReader = new FileReader();
        imageReader.readAsDataURL(img);
        imageReader.onload = function () {
            thumbUrl = imageReader.result;
            thumbsObject[`thumb-${index + 1}`] = thumbUrl;
        }
    })

    previewThumbs.innerHTML = "";
    for(let item in thumbsObject){
        previewThumbs.innerHTML += `
            <img src="${thumbsObject[item]}">
        `
    }
}

pForm.addEventListener("submit" , addNewProduct)
function addNewProduct(e){
    //get all products from ls
    let productsFromLS = JSON.parse(localStorage.getItem("productDB"));
    //get the highest value of id to add upon
    let filtered = productsFromLS.map((item , i , Arr) => {
        return item.id;
    }).reduce((acc , current) => {
        return acc > current? acc : current;
    })

    //get all thumbs in one object
    let thumbsObj = Object.assign({} , thumbsObject );
    if(localStorage.getItem("signupUser")){
        e.preventDefault();
        console.log(filtered)

        let pObject = {
            id:filtered + 1,
            title: pTitle.value,
            brand: pBrand.value,
            category: catValue,
            mainCategory:mainCatValue,
            price: pPrice.value + "$",
            seller:pSeller.value,
            image: imageValue,
            thumbs: thumbsObj,
            describtion:pDescArea.value,
            quantity:1,
            NofPieces:pQty.value,
            addedByMe:"true"
        }

        if(mode == "add"){
            if(pObject.id != undefined && pTitle.value != "" && catValue != "" && pPrice.value != "" && pSeller.value!="" && pDescArea.value != "" && pQty.value != ""){
                cartEmpty.classList.remove("active");
                mainContainer.style.display = "flex";
                let AllProducts = [...productsFromLS , pObject];
                localStorage.setItem("productDB" , JSON.stringify(AllProducts));
                clearInputs()

                //scroll to bottom
                scrollTo({
                    top:1800,
                    behavior:"smooth"
                })
                getCreatedProducts(AllProducts);
            }else{
                alert("all fields should be filled correctly");
            }
        }else{
            let filtered = productsFromLS.find((item) => item.id == tmp);
            console.log(tmp , filtered)
            pObject.id = filtered.id;
            pObject.image = imageValue || filtered.image;
            pObject.category = pObject.category != undefined? catValue : filtered.category;
            pObject.mainCategory = pObject.mainCategory != undefined? catValue : filtered.mainCategory;
            
            //add changes to local storage after remove from array
            let remove = productsFromLS.indexOf(filtered);
            productsFromLS.splice(remove , 1)
            let AllProducts = [...productsFromLS , pObject];
            localStorage.setItem("productDB" , JSON.stringify(AllProducts));
            //reset innerhtml of createbtn
            pSubmit.value = "add product";
            clearInputs();
            //scroll to bottom
            scrollTo({
                top:1800,
                behavior:"smooth"
            })
            //recall display function to update ui in realtime
            let dataFromLS = JSON.parse(localStorage.getItem("productDB"));
            getCreatedProducts(dataFromLS);
        }

    }else{
        window.location = "signinup.html"
    }
}

function clearInputs(){
    pTitle.value = "";
    pBrand.value = "";
    pPrice.value = "";
    pSeller.value = "";
    imageValue = "";
    previewImage.style.cssText = "opacity:0; pointer-events:none;"
    previewThumbs.innerHTML = "";
    thumbsObject = "";
    pDescArea.value = "";
    pQty.value = "";
    pSubCatSelect.value = "";
    pMainCatSelect.value = "";
}

window.onload = function (){
    //clear all inputs after reloading the page
    clearInputs()
}
//add products that created by you to the sell on estore page
let AllProductsFromLS = JSON.parse(localStorage.getItem("productDB"));
function getCreatedProducts(allProducts){    
    let filtered  = allProducts.filter((item) => {
        return item.addedByMe == "true";
    })

    displayMyProducts(filtered);
}

getCreatedProducts(AllProductsFromLS);


function displayMyProducts(products){
    handleEmptyCart(products);
    itemsCount.innerHTML = `your products (${products.length} items)`;
    container.innerHTML = "";
    products.map((product , index , arr) => {
        container.innerHTML += `
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
                <button class="action-btn" onclick="deleteProduct(${product.id})">delete product</button>
                <button class="action-btn" onclick="updateProduct(${product.id})">edit product</button>
            </div>
        </div> 
        ` 
})
}

function updateProduct(id){
    scrollTo({
        top:900,
        behavior:"smooth"
    })

    let data = JSON.parse(localStorage.getItem("productDB"));

    let filtered = data.find((item) => item.id == id);

    // console.log(filtered , filtered+index)
    pTitle.value = filtered.title;
    pBrand.value = filtered.brand;
    pPrice.value = filtered.price;
    pSeller.value = filtered.seller;
    pDescArea.value = filtered.describtion;
    pQty.value = filtered.quantity;
    pSubCatSelect.value = filtered.category;
    pMainCatSelect.value = filtered.mainCategory;
    pImage.src = filtered.image;
    previewImage.style.cssText = "opacity:1; pointer-events:auto;left:30px;";
    previewImage.src = filtered.image;
    //change innerhtml of createbtn
    pSubmit.value = "update product";
    //change mode to update 
    mode = "update";
    // make id global
    tmp = id;
}

//function to delete product
function deleteProduct(id){
    let data = JSON.parse(localStorage.getItem("productDB"));
    let filtered = data.find((item , i , Arr) => {
        return item.id == id;
    })

    let indexOfFiltered = data.indexOf(filtered);

    data.splice(indexOfFiltered , 1);
    localStorage.setItem("productDB" , JSON.stringify(data));
    getCreatedProducts(data);
}

//function to handle the visibility of empty product div when the div is empty
function handleEmptyCart(products){
    if(products.length == 0){
        cartEmpty.classList.add("active");
        mainContainer.style.display = "none";
    }
}


//get user data from ls
let dataFromLS = JSON.parse(localStorage.getItem("signupUser"));

function getCurrentUserInfo(){
    let users =JSON.parse(localStorage.getItem("signupUser"))
    if(users != null){
        let currentUserID = JSON.parse(localStorage.getItem("currentUserID"));
        let filtered = users.find((user) => user.id == currentUserID);
        return filtered;
    }
}

//onclick on signout button go back to the sign in page
function handleSignOut(){
    let signOutBtn = document.querySelector("#signout")
    let userInfo = getCurrentUserInfo();
    let userIndex = dataFromLS.indexOf(userInfo);
    signOutBtn.addEventListener("click" , () => {
        userInfo["sign"] = "out";
        dataFromLS.splice(userIndex,1,userInfo);
        localStorage.setItem("signupUser" , JSON.stringify(dataFromLS));
        setTimeout(() => {
            window.location = "signinup.html#login";
        },500);
    })
}

handleSignOut();

//constrol the user settings menu in the nav of the home page
let signedUserAccount = document.querySelector(".header-right .signed");
let notSignedUserAccount = document.querySelector(".header-right .not-signed");
let homeUserName = document.querySelector("#signed-user-name");
let userImage = document.querySelector("#user-image");

//function to handle user info in the header bar
function handleUserInfo(){
    //get current user info
    let userInfo = getCurrentUserInfo();
    if(userInfo != undefined){
        homeUserName.innerHTML = userInfo.username;
        userImage.src = userInfo.avatar;
    }else{
        signedUserAccount.style.display = "none";
        notSignedUserAccount.style.display = "flex";
    }
}
handleUserInfo();

//handle the nav in the mobile screens
let targetFromLS = JSON.parse(localStorage.getItem("currentTarget"));
console.log(targetFromLS)
document.querySelectorAll(".mobile-nav li").forEach((item) => item.classList.remove("active"));
document.querySelector(`li.${targetFromLS}`).classList.add("active");

//lower nav bar
const items = document.querySelectorAll(".mobile-nav li");

//targets in html
let routes = {
    index:"index.html",
    cart: "cart.html",
    favourites :"favourites.html",
    settings :"settings.html",
    addproduct:"addproduct.html",
}

items.forEach((i) => {
i.onclick = function (e) {
    items.forEach((i) => {
        i.classList.remove("active");
    });
    let currentTabTarget = i.dataset.target;
    console.log(i.dataset.target) 
    localStorage.setItem("currentTarget" , JSON.stringify(currentTabTarget));
    let pageTarget = JSON.parse(localStorage.getItem("currentTarget"));
    console.log(pageTarget)
    setTimeout(() => {
        window.location = routes[pageTarget];
    },1000)
    i.classList.add("active");
};
});