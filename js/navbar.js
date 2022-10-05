//toggle the active class on the pickup order header in the home page 
let pickupOrderHeader = document.querySelector(".shipping .shipping-header");
let pickupOrderDetails = document.querySelector(".shipping-mode-picking .shipping-mode-details");
let cartIcon = document.querySelector(".caret-icon");

pickupOrderHeader.addEventListener("click" , () => {
    if(cartIcon.classList.contains("fa-angle-up")){
        cartIcon.classList.replace("fa-angle-up" , "fa-angle-down");
        //enable scrolling after removing active
        function enableScroll() {
            window.onscroll = function() {};
        }
        enableScroll();
    }else{
        cartIcon.classList.replace("fa-angle-down" , "fa-angle-up");
        //disable scrolling after adding active
        window.onscroll = () => { window.scroll(0, 0); };
    }
    pickupOrderDetails.classList.toggle("active");
    mainWrapperOverlay.classList.toggle("active");
})

//rmove active onclick on window
document.addEventListener("click" , (e) => {
    if(e.target.className != "shipping-header" 
    && e.target.tagName != "SPAN" && e.target.tagName != "I" 
    && e.target.className !== "shipping-mode-details"
    && e.target.className !== "show-user-info active"
    && e.target.className !== "cart-icon active"
    && e.target.className !== "selected-lang active"){
        pickupOrderDetails.classList.remove("active");
        mainWrapperOverlay.classList.remove("active");
    }
})


//handle address in navbar 
let choosedAddressInfo = document.querySelector(".show-choosed-info");
let shippingWay = document.querySelectorAll(".shipping-way");
let locationInNav = document.querySelector(".nav-address-item.location-in-nav");
let addressInNav = document.querySelector(".nav-address-item.address-in-nav");

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
if(JSON.parse(localStorage.getItem("signupUser")) > 1){
    handleShippingWay();
}



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

//navbar in mobile phones
let mobileScreenNav = window.matchMedia("(max-width:995px)");
    if(mobileScreenNav.matches){
        //top header search bar
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

        //lower header address bar
        let address = document.querySelector(".lower-header .address-details");
        let addressFromLS = JSON.parse(localStorage.getItem("signupUser"))
        address.innerHTML = "";
        address.innerHTML = `
        <div class="address-info">
            <span>${addressFromLS.length>1? addressFromLS[1].city : "cairo"} ,</span>
            <span>${addressFromLS.length>1? addressFromLS[1].street : "NA"}</span>
        </div>
        <button><a href="settings.html">update address<a></button>
        `

        //lower nav bar
        const items = document.querySelectorAll(".mobile-nav li");

        items.forEach((i) => {
        i.onclick = function (e) {
            items.forEach((i) => {
                i.classList.remove("active");
            });

            i.classList.add("active");
        };
        });
} 

// console.log(retrieve)

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

function handleAddressInNav(){
    let userAuth = JSON.parse(localStorage.getItem("signupUser"));
    choosedAddressInfo.innerHTML = `
    <div class="choosed-address">
        <i class="fa-solid fa-house-user"></i>
        <span>${userAuth[1] == undefined? "cairo" : userAuth[1].city}<span>
    </div>
    <div class="choosed-shipping">
        <span>${userAuth[2] == undefined? "delivery" : userAuth[2].shippingWay }</span>
    </div>
    `

    locationInNav.innerHTML = `
        <span><i class="fa-solid fa-location-dot"></i>${userAuth[1] == undefined? "cairo" : userAuth[1].city}</span>
    `

    addressInNav.innerHTML = `
        <span><i class="fa-solid fa-house-user"></i>${userAuth[1] == undefined? "NA" : userAuth[1].aprt} , ${userAuth[1] == undefined? "NA" : userAuth[1].street}</span>
    `
}
handleAddressInNav();
