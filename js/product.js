
function previewProduct(){
    let LSproductsDB = JSON.parse(localStorage.getItem("productDB"));
    let LSProductID = JSON.parse(localStorage.getItem("productID"));
    let clickedItem = LSproductsDB.filter((item) => item.id == LSProductID);
    displayProductDetails(clickedItem);
}

previewProduct();

function displayProductDetails(product){
    let productParent = document.querySelector(".main-section-container");
    productParent.innerHTML = `
    <div class="left-side">
        <div class="image-container">
            <div class="thumb-container"></div>
            <img src="${product[0].image}" alt="">
        </div>
        <div class="product-describtion">
            <h2>about this product</h2>
            <div class="product-details">
                <div class="accordion-header">
                    <span>product details</span>
                    <i class="fa-solid fa-plus"></i>
                </div>
                <p class="desc">${product[0].describtion}</p>
            </div> 
        </div>
    </div>
    <div class="right-side">
        <div class="product-fav">
            <span class="p-cat">${product[0].category}</span>
            <i class="fa-regular fa-heart" style="font-weight:${product[0].like == true? "bold" : "normal"}" onclick="AddToFavourite(${product})"></i>
        </div>
        <div class="product-title">
            <span class="p-title">${product[0].title}</span>
            <span class="p-review">
                Reviews
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
            </span>
            <span class="p-price">${product[0].price}</span>
            <button onclick="userAddToCartAbility(${product[0].id})">add to cart</button>
        </div>
    </div>
    `
    console.log(product)
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
    let thumbs = product[0].thumbs;
    let thumbsLength = Object.keys(thumbs).length;
    let thumbsContainer = document.querySelector(".thumb-container");
    thumbsContainer.innerHTML = `<img src="${product[0].image}" alt="">`;
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

function AddToFavourite(product){
    if(localStorage.getItem("signupUser")){
        let isRepeatedItem = favItemsArray.some(item => item.id == product.id); //returns true if repeated
        if(isRepeatedItem){   
            favItemsArray.map((item , index , arr) => {
                if(item.id == product.id){
                    arr.splice(index , 1);
            }else{
                return item;
            }
            });

        }else{
            product.like = true;
            favItemsArray.push(product);
        }
        //add item to local storage
        window.localStorage.setItem("fav" , JSON.stringify(favItemsArray));
        resultsFromLS.map((item) => {
            if(isRepeatedItem){
                if(item.id == product.id){
                    delete item.like;
                }else{
                    return item;
                }
            }else{
                product.like = true;
            }

        })
        localStorage.setItem("productDB" , JSON.stringify(resultsFromLS))
        displayProductDetails(product)
    }else{
        window.location = "signinup.html"
    }
}
