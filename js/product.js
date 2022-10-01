
function previewProduct(){
    let LSproductsDB = JSON.parse(localStorage.getItem("productDB"));
    let LSProductID = JSON.parse(localStorage.getItem("productID"));
    let clickedItem = LSproductsDB.find((item) => item.id == LSProductID);
    displayProductDetails(clickedItem);
}

previewProduct();

function displayProductDetails(product){
    let productParent = document.querySelector(".main-section-container");
    productParent.innerHTML = `
    <div class="left-side">
        <div class="image-container">
            <div class="thumb-container"></div>
            <img src="${product.image}" alt="">
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
            <i class="fa-regular fa-heart fav-icon" style="font-weight:${product.like == true? "bold" : "normal"}" onclick="AddToFavourite(${product.id})"></i>
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
            <button onclick="userAddToCartAbility(${product.id})">add to cart</button>
        </div>
    </div>
    `
    handleThumbnails(product);
    // favIcon.onclick = function () {
    //     AddToFavourite(product);
    // }
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
    let mainImage = document.querySelector(".image-container > img");
    let thumbsImages = Array.from(document.querySelectorAll(".thumb-container img"));
    thumbsImages.forEach((img) => {
        img.addEventListener("click" , (e) => {
            mainImage.src = e.target.src;
        })
    })
}

function AddToFavourite(id){
    if(localStorage.getItem("signupUser")){
        let filtered = resultsFromLS.find(element => element.id == id);
        let isRepeatedItem = favItemsArray.some(item => item.id == filtered.id); //returns true if repeated
        console.log(isRepeatedItem)
        if(isRepeatedItem){   
            favItemsArray.map((item , index , arr) => {
                if(item.id == filtered.id){
                    arr.splice(index , 1);
            }else{
                return item;
            }
            });

        }else{
            filtered.like = true;
            favItemsArray.push(filtered);
        }
        //add item to local storage
        window.localStorage.setItem("fav" , JSON.stringify(favItemsArray));

            if(isRepeatedItem){
                resultsFromLS.map((item) => {
                    if(item.id == filtered.id){
                        delete item.like;
                    }else{
                        return item;
                    }
                })   
            }else{
                filtered.like = true;
            }
        localStorage.setItem("productDB" , JSON.stringify(resultsFromLS));
        displayProductDetails(filtered)
    }else{
        window.location = "signinup.html"
    }
}
