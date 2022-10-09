//get elements to manipulate the personal settings
let editButtons =Array.from(document.querySelectorAll(".field-container button"));
let submitBtn = document.querySelector("#submit-btn");
let form = document.querySelector("#settings-form");
let uName = document.querySelector("#uname");
let uPasswd = document.querySelector("#passwd");
let uEmail = document.querySelector("#email");
let uAvatarImage = document.querySelector("#avatar");
let uAvatarInput = document.querySelector("#img");
let imageValue;

//switch between settings modes
let settingsTypes = document.querySelectorAll(".settings-item");
let settingsForms = document.querySelectorAll("form.settings");

settingsTypes.forEach((item) => {
    item.addEventListener("click" , (e) =>{
        settingsTypes.forEach((item) => item.style.cssText = "background-color: var(--secondary-color);");
        settingsForms.forEach((item) => {
            item.style.display = "none";
        })
        document.querySelector(`.${e.target.dataset.type}`).style.display = "block";
        item.style.cssText = "background-color: #fff;";
    })
})

//get user data from ls
let users =JSON.parse(localStorage.getItem("signupUser"))
function getCurrentUserData(){
    let users =JSON.parse(localStorage.getItem("signupUser"))
    if(users != null){
        let currentUserID = JSON.parse(localStorage.getItem("currentUserID"));
        let filtered = users.find((user) => user.id == currentUserID);
        return filtered;
    }
}

//onclick on edit button
function handleEditBtn(){
    let userInfo = getCurrentUserData();
    editButtons.forEach((item) => {
        item.addEventListener("click" , (e) => {
            e.preventDefault();
            if(users != null){
                if(userInfo.sign == "in"){
                    item.previousElementSibling.children[1].disabled = false;
                    item.previousElementSibling.children[1].focus();
                    if(item.previousElementSibling.children[1].type == "file"){
                        item.previousElementSibling.children[1].click();
                    }

                    //get shipping mode 
                    let shippingModes = document.querySelectorAll(".shipping-field .shipping-mode");
                    shippingModes.forEach((mode) => {
                        mode.style.cssText = "pointer-events:auto;";
                    })

                    if(item.previousElementSibling.children[1].classList.contains("shipping-mode")){
                        item.previousElementSibling.children[1]
                    }
                    item.style.cssText = "background-color:var(--secondary-color); color:var(--text-color)";
                }else{
                    window.location = "signinup.html";
                }
            }else{
                window.location = "signinup.html";
            }
        })
    })   
}

handleEditBtn();


//fill inputs with user data from ls
function handleInputs(){
    let userinfo = getCurrentUserData();
        uName.value =userinfo == undefined? "" : userinfo.sign == "out"? ""  : userinfo.username || "";
        uPasswd.value =userinfo == undefined? "" : userinfo.sign == "out"? ""  : userinfo.password || "";
        uEmail.value =userinfo == undefined? "" : userinfo.sign == "out"? ""  : userinfo.email || "";
        uAvatarImage.src = userinfo == undefined? "" : userinfo.sign == "out"? ""  : userInfo.avatar || "./images/default-avatar.png";
}
handleInputs()

//change avatar
uAvatarInput.addEventListener("change" , changeAvatar) 
function changeAvatar(){
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
        uAvatarImage.src = imageValue;
    }
}

//submit personal settings from
form.addEventListener("submit" , (e) => {
    e.preventDefault();
    if(users != null){
        //run function to get user info 
        let currentUserInfo = getCurrentUserInfo();
        //add user avatar
        let userAvatar = {
            avatar : imageValue || currentUserInfo.avatar
        }
        //assign user avatar to the user info in local storage
        let user =JSON.parse(localStorage.getItem("signupUser"));
        let userIndex = user.indexOf(currentUserInfo);
        let newUserObj = Object.assign(currentUserInfo , userAvatar);
        user.splice(userIndex,1,newUserObj);
        localStorage.setItem("signupUser" , JSON.stringify(user));
    
        //on click on edit button
        editButtons.forEach((item) => {
            item.style.cssText = "background-color:#fff; color:var(--main-color)";
        })
    
        location.reload();
    }else{
        window.location = "signinup.html";
    }

} )


//get elements to control address form
let fName = document.querySelector("#f-name");
let lName = document.querySelector("#l-name");
let city = document.querySelector("#city");
let aprt = document.querySelector("#aprt");
let street = document.querySelector("#street");
let phone = document.querySelector("#phone");
let addressForm = document.querySelector("form.address");
let submitAddressBtn = document.querySelector("#submit-address-btn");


//onsubmit change address info in local storage
addressForm.addEventListener("submit" , (e) => {
    e.preventDefault();
    let currentUserInfo = getCurrentUserData();
    console.log(currentUserInfo)
    if(users != null){
        let addressObj = {
            userName : currentUserInfo.username,
            email : currentUserInfo.email,
            fName :   fName.value || "",
            lName :   lName.value || "",
            city :   city.value || "cairo",
            street :  street.value || "NA",
            aprt :  aprt.value || "NA",
            phone : phone.value || "NA",
        }
    
        //upadte info in ls
        let user =JSON.parse(localStorage.getItem("signupUser"));
        let userIndex = user.indexOf(currentUserInfo);
        let newUserObj = Object.assign(currentUserInfo , addressObj);
        user.splice(userIndex,1,newUserObj);
        localStorage.setItem("signupUser" , JSON.stringify(user));
    
        editButtons.forEach((item) => {
            item.style.cssText = "background-color:#fff; color:var(--main-color)";
        })
        // location.reload();
    }else{
        window.location = "signinup.html"
    }
})


// show address info when reloading 
function retrieveAddressInfo(){
    let userinfo = getCurrentUserData();
        fName.value = userinfo == undefined? "" : userinfo.sign == "out"? ""  : userinfo.fName || "";
        lName.value =userinfo == undefined? "" : userinfo.sign == "out"? ""  : userinfo.lName || "";
        city.value =userinfo == undefined? "cairo" : userinfo.sign == "out"? "cairo"  : userinfo.city || "cairo";
        street.value =userinfo == undefined? "NA" : userinfo.sign == "out"? "NA"  : userinfo.street || "NA";
        aprt.value =userinfo == undefined? "NA" : userinfo.sign == "out"? "NA"  : userinfo.aprt || "NA";
        phone.value =userinfo == undefined? "NA" : userinfo.sign == "out"? "NA"  : userinfo.phone || "NA";
}
retrieveAddressInfo();


//call signout function
let mobileMediaNav = window.matchMedia("(max-width:995px)");
if(mobileMediaNav.matches){
    let signOutMobile = document.querySelector("#logout-mobile");
    handleSignOut(signOutMobile,userInfo)
}
