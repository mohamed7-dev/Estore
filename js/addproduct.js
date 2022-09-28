let getStartedButn = document.querySelector("#get-started");
let formSection = document.querySelector(".add-product");

getStartedButn.addEventListener("click" , () => {
    window.scrollTo({
        top:915,
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
let pPrice = document.querySelector("#price");
let pQty = document.querySelector("#qty");
let pImage = document.querySelector("#img");
let pThumb = document.querySelector("#thumb");
let pCatSelect = document.querySelector("#cat");
let pDescArea = document.querySelector("#desc");
let pSubmit = document.querySelector("#submit");
let pForm = document.querySelector("#add-product-form");
let container = document.querySelector(".cart-items-container");
let cartEmpty = document.querySelector(".cart-empty");
let itemsCount = document.querySelector(".items-count span");
let catValue;
let imageValue;
let mode = "add";
let tmp;

//get cat from select menu
pCatSelect.addEventListener("change" , getProductCat)
function getProductCat(e){
    catValue = e.target.value;
}

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
    }
}

pForm.addEventListener("submit" , addNewProduct)
function addNewProduct(e){
    if(localStorage.getItem("signupUser")){
        let productsFromLS = JSON.parse(localStorage.getItem("productDB"));
        e.preventDefault();
        let pObject = {
            id: productsFromLS.length + 1,
            title: pTitle.value,
            category: catValue,
            price: pPrice.value,
            image: imageValue,
            thumbs: {},
            description:pDescArea.value,
            quantity:1,
            NofPieces:pQty.value,
            addedByMe:"true"
        }

        if(mode == "add"){
            if(pTitle.value != "" && catValue != "" && pPrice.value != "" &&  pDescArea.value != "" && pQty.value != ""){
                cartEmpty.classList.remove("active");
                container.style.display = "flex";
                let AllProducts = [...productsFromLS , pObject];
                localStorage.setItem("productDB" , JSON.stringify(AllProducts));
                clearInputs()
                // setTimeout(() => {
                //     window.location = "index.html";
                // },500)

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
            console.log(tmp)
            pObject.id = productsFromLS[tmp].id;
            pObject.image = imageValue || productsFromLS[tmp].image;
            pObject.category = pObject.category != undefined? catValue : productsFromLS[tmp].category;
            productsFromLS[tmp]  = pObject;
            localStorage.setItem("productDB" , JSON.stringify(productsFromLS));
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
    pPrice.value = "";
    imageValue = "";
    pDescArea.value = "";
    pQty.value = "";
    pCatSelect.value = "";
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
    products.map((item , index) => {
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
                <button class="add-to-cart" onclick="deleteProduct(${index})">delete product</button>
                <button class="add-to-cart" onclick="updateProduct(${index})">edit product</button>
            </div>
            <div class="describtion-product-price">
                <span class="product p-price">${item.price}</span>
            </div>
        </div>
    </div> 
    `  
    })
    
}

function updateProduct(index){
    scrollTo({
        top:900,
        behavior:"smooth"
    })

    let data = JSON.parse(localStorage.getItem("productDB"));
    let filtered = data.filter((item , i , Arr) => {
        return item.addedByMe == "false";
    }).map((item, index , Arr) => {
        return Arr.length;
    }).find((item,index,Arr) => {
        return new Set(Arr);
    })


    console.log(filtered , filtered+index)
    pTitle.value = data[filtered + index].title;
    pPrice.value = data[filtered + index].price;
    pDescArea.value = data[filtered + index].description;
    pQty.value = data[filtered + index].quantity;
    pCatSelect.value = data[filtered + index].category;
    pImage.src = data[filtered + index].image;

    //change innerhtml of createbtn
    pSubmit.value = "update product";
    //change mode to update 
    mode = "update";
    //make id global
    tmp = filtered + index;
}

//function to delete product
function deleteProduct(index){
    let data = JSON.parse(localStorage.getItem("productDB"));
    let filtered = data.filter((item , i , Arr) => {
        return item.addedByMe == "false";
    }).map((item, index , Arr) => {
        return Arr.length;
    }).find((item,index,Arr) => {
        return new Set(Arr);
    })

    data.splice(filtered + index , 1);
    localStorage.setItem("productDB" , JSON.stringify(data));
    getCreatedProducts(data);
}

//function to handle the visibility of empty product div when the div is empty
function handleEmptyCart(products){
    console.log(products)
    if(products.length == 0){
        cartEmpty.classList.add("active");
        container.style.display = "none";
    }
}

//onclick on signout button go back to the sign in page
let signoutBtn = document.querySelector("#signout");
signoutBtn.addEventListener("click" , () => {
    localStorage.clear();
    setTimeout(() => {
        window.location = "signinup.html";
    },500);
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
