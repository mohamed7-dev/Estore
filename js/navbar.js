//get elemsnts to control show and hido of dropdown menus in header bar
let langHeader = document.querySelector(".selected-lang");
let signedUserHeader = document.querySelector(".signed .show-user-info");
let notSigneduserHeader = document.querySelector(".not-signed .show-user-info");
let cartHeader = document.querySelector(".cart-icon");
let headerRTSection =Array.from(document.querySelectorAll(".container .header-right > div"));
//overlay elemnts
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

//toggle the active class on the pickup order nav in the home page 
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
    if(pickupOrderDetails.classList.contains("active")){
        if(e.target.className != "shipping-header" 
        && e.target.tagName != "SPAN" && e.target.tagName != "I" 
        && e.target.className !== "shipping-mode-details"
        && e.target.className !== "show-user-info active"
        && e.target.className !== "cart-icon active"
        && e.target.className !== "selected-lang active"){
            pickupOrderDetails.classList.remove("active");
            mainWrapperOverlay.classList.remove("active");
            //enable scrolling after removing active
            function enableScroll() {
                window.onscroll = function() {};
            }
            enableScroll();
        }
    }
})    



//constrol the user settings menu in the header of the home page
let signedUserAccount = document.querySelector(".header-right .signed");
let notSignedUserAccount = document.querySelector(".header-right .not-signed");
let homeUserName = document.querySelector("#signed-user-name");
let userImage = document.querySelector("#user-image");
let dataFromLS = JSON.parse(localStorage.getItem("signupUser"));


//get user data from ls
function getCurrentUserInfo(){
    let users =JSON.parse(localStorage.getItem("signupUser"))
    if(users != null){
        let currentUserID = JSON.parse(localStorage.getItem("currentUserID"));
        let filtered = users.find((user) => user.id == currentUserID);
        return filtered;
    }
}

let userInfoFromLS = getCurrentUserInfo();

//function to handle user info in the header bar
function handleUserInfo(){
    if(userInfoFromLS != undefined){
        if(userInfoFromLS.sign == "in"){
            homeUserName.innerHTML = userInfoFromLS.username;
            userImage.src = userInfoFromLS.avatar;
        }else{
            signedUserAccount.style.display = "none";
            notSignedUserAccount.style.display = "flex";
        }
        //signout in big screens
        let signoutBtn = document.querySelector("#signout");
        handleSignOut(signoutBtn,userInfoFromLS);
    }else{
        signedUserAccount.style.display = "none";
        notSignedUserAccount.style.display = "flex";
    }
}
handleUserInfo();


//onclick on signout button go back to the sign in page
function handleSignOut(target,currentUser){
    target.addEventListener("click" , () => {
        if(dataFromLS != null){
            let userIndex = dataFromLS.indexOf(currentUser);
            currentUser["sign"] = "out";
            dataFromLS.splice(userIndex,1,currentUser);
            localStorage.setItem("signupUser" , JSON.stringify(dataFromLS));
            setTimeout(() => {
                window.location = "signinup.html#login";
            },500);
        }else{
            window.location = "signinup.html"
        }
    })
}


//function to handle address in navbar
let choosedAddressInfo = document.querySelector(".show-choosed-info");
let locationInNav = document.querySelector(".nav-address-item.location-in-nav");
let addressInNav = document.querySelector(".nav-address-item.address-in-nav");

function handleAddressInNav(){
    //get user info
    let user = userInfoFromLS;
    choosedAddressInfo.innerHTML = `
    <div class="choosed-address">
        <i class="fa-solid fa-house-user"></i>
        <span>${user == undefined? "cairo" : user.sign == "out"? "cairo" : user.city || "cairo"}<span>
    </div>
    <div class="choosed-shipping">
        <span>${user == undefined? "delivery" : user.sign == "out"? "delivery" : user.shippingWay || "delivery"}</span>
    </div>
    `

    locationInNav.innerHTML = `
        <span><i class="fa-solid fa-location-dot"></i>${user == undefined? "cairo" : user.sign == "out"? "cairo" : user.city || "cairo"}</span>
    `

    addressInNav.innerHTML = `
        <span><i class="fa-solid fa-house-user"></i>${user == undefined? "NA" : user.sign == "out"? "NA" : user.aprt || "NA"} , ${user == undefined? "NA" : user.sign == "out"? "NA" : user.street || "NA"}</span>
    `
}
handleAddressInNav();

//navbar in mobile phones
let mobileScreenNav = window.matchMedia("(max-width:995px)");
    if(mobileScreenNav.matches){
        //top header search bar
        let sideNav = document.querySelector("#side-nav");
        let sideNavClose = document.querySelector("#close-btn");
        let bars = document.querySelector("#bars-icon");

        window.onload = function (){
            bars.addEventListener("click" , () => {
                sideNav.style.cssText ="transition:left 0.3s ease";
                sideNav.style.left = "0";
                sideNavClose.style.right = "20px"; 
            })
            
            sideNavClose.addEventListener("click" , ()=> {
                sideNav.style.cssText ="transition:left 0.3s ease";
                sideNav.style.left = "-100%";
                sideNavClose.style.right = "-100%"; 
            })
    
            document.addEventListener("click" , (e) => {
                if(e.target.tagName !== "I"){
                    sideNav.style.left = "-100%";
                    sideNavClose.style.right = "-100%"; 
                }
            })
        }

        //lower header address bar
        let address = document.querySelector(".lower-header .address-details");
        let actions = document.querySelector(".nav-actions");
        let userInfo = userInfoFromLS;

        address.innerHTML = "";
        address.innerHTML = `
            <i class="fa-solid fa-location-dot"></i>
            <span>${userInfo == undefined? "cairo" : userInfo.sign == "out"? "cairo" : userInfo.city || "cairo"} | </span>
            <span>${userInfo == undefined? "NA" : userInfo.sign == "out"? "NA" : userInfo.street || "NA"}</span>
        `

        actions.innerHTML += `
            <button><a href="settings.html">update address<a></button>
        `
} 

//handle shipping in way navbar 
let shippingWay = document.querySelectorAll(".shipping-way");
function handleShippingWay(){
    let userInfo = userInfoFromLS;
    shippingWay.forEach((item) => {
        item.addEventListener("click" , () => {
            if(dataFromLS != null){
                shippingWay.forEach((way) => {
                    way.style.cssText = "background-color:var(--main-color);"
                    way.children[0].style.cssText = "color:var(--secondary-color)"
                    way.children[1].style.cssText = "color:#fff"
                })
                item.style.cssText = "background-color:var(--secondary-color); padding:5px; align-items:center;border-radius:5px"
                item.children[0].style.cssText = "color:#fff"
                item.children[1].style.cssText = "color:#fff"
                
                let pickedWay = {
                    shippingWay : item.dataset.way
                }
                //upadte info in ls
                let user =JSON.parse(localStorage.getItem("signupUser"));
                let userIndex = user.indexOf(userInfo);
                let newUserObj = Object.assign(userInfo , pickedWay);
                user.splice(userIndex,1,newUserObj);
                localStorage.setItem("signupUser" , JSON.stringify(user));
    
                handleAddressInNav();
            }else{
                window.location = "signinup.html"
            }
        })
    })
}
handleShippingWay();
