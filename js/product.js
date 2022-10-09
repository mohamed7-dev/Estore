
function previewProduct(){
    let LSproductsDB = JSON.parse(localStorage.getItem("productDB"));
    let LSProductId = JSON.parse(localStorage.getItem("productId"));
    let clickedItem = LSproductsDB.find((item,index,Arr) => item.id == LSProductId);
    displayProductDetails(clickedItem,LSProductId);
}

previewProduct();

function displayProductDetails(product,id){
    let userInfo = getCurrentUserSettings();

    let productParent = document.querySelector(".main-wrapper .container");
    productParent.innerHTML = `
    <div class="left-side">
        <div class="image-container">
            <div class="thumb-container"></div>
            <img src="${product.image}" class="main-img" alt="" id="mainImage">
            <div class="modal">
                <span class="close">&times;</span>
                <img class="modal-content" src="" id="img01">
            </div>
        </div>
        <div class="product-describtion">
            <h2>about this product</h2>
            <div class="product-details">
                <div class="accordion-header">
                    <span>product details</span>
                    <i class="fa-solid fa-plus"></i>
                </div>
                <p class="desc">${product.describtion}</p>
            </div> 
        </div>
    </div>
    <div class="right-side">
        <div class="product-fav">
            <span class="p-cat">${product.category}</span>
            <i class="fa-regular fa-heart fav-icon-${id}" style="font-weight:${product.like == true? "bold" : "normal"}" onclick="userAddToFavouriteAbility(${id})"></i>
        </div>
        <div class="product-title">
            <span class="p-title">${product.title}</span>
            <span class="p-review">
                Reviews
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
            </span>
            <span class="p-price">${product.price}</span>
            <button class="action-btn" onclick="userAddToCartAbility(${id})">add to cart</button>
        </div>
        <div class="product-address">
            <div class="address-details">
                <i class="fa-solid fa-truck-arrow-right"></i>
                <span>${userInfo == undefined? "delivery" : userInfo.sign == "out"? "delivery" : userInfo.shippingWay || "cairo"}</span>
                <span>arrives to ${userInfo == undefined? "cairo" : userInfo.sign == "out"? "cairo" :  userInfo.city || "cairo"}</span>
            </div>
            <div class="seller-details">
                <span><i class="fa-solid fa-store"></i> <span>sold by : </span>${product.seller}</span>
                <span><i class="fa-solid fa-truck-ramp-box"></i><span>shipped by : </span>E store</span>
            </div>
            <div class="update-address">
                <button class="action-btn">
                    <a href="settings.html">update address information</a>
                </button>
            </div>
        </div>
        <div class="add-to-fav">
            <i class="fa-regular fa-heart fav-icon-${id}" style="font-weight:${product.like == true? "bold" : "normal"}" onclick="userAddToFavouriteAbility(${id})"></i>
            <a href="" onclick="AddToFavourite(${product.id}">add to favourites</a>
        </div>
    </div>
    `
    handleThumbnails(product);
}

//accordion
let productAccordion = document.querySelector(".product-describtion .product-details");
let accordionHeader = document.querySelector(".product-details .accordion-header");
let plusIcon = document.querySelector(".product-details .accordion-header i")
let accordionDesc = document.querySelector(".product-details .desc")

accordionHeader.addEventListener("click",() => {
    productAccordion.classList.toggle("active");
    if(productAccordion.classList.contains("active")){
        accordionDesc.style.height = `${accordionDesc.scrollHeight}px`;
        plusIcon.classList.replace("fa-plus","fa-minus")
    }else{
        accordionDesc.style.height = `0px`;
        plusIcon.classList.replace("fa-minus","fa-plus")
    }
})


function handleThumbnails(product) {
    let thumbs = product.thumbs;
    let thumbsLength = Object.keys(thumbs).length;
    let thumbsContainer = document.querySelector(".thumb-container");
    thumbsContainer.innerHTML = `<img src="${product.image}" alt="">`;
    for(item in thumbs){
        thumbsContainer.innerHTML += `
            <img src="${thumbs[item]}">
        `
    }
    handleImageSrc(product);
}

function handleImageSrc(product){
    let mainImage = document.querySelector("#mainImage");
    let thumbsImages = Array.from(document.querySelectorAll(".thumb-container img"));
    thumbsImages.forEach((img) => {
        img.addEventListener("click" , (e) => {
            mainImage.src = e.target.src;
        })
    })
}


// handle modal image 
// Get the modal
let modal = document.querySelector(".modal");
let modalImg = document.querySelector("#img01");
let mainImg = document.querySelector("#mainImage");
let span = document.querySelector("span.close");

mainImg.onclick = function handleModal(){
    modal.style.display = "block";
    modalImg.src = this.src;
}

document.addEventListener("click" , (e) => {
    if(e.target.className != "modal-content" && e.target.tagName != "IMG"){
        modal.style.display = "none";
    }
})

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
    modal.style.display = "none";
}