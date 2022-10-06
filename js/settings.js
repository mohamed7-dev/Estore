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

//onclick on edit button
editButtons.forEach((item) => {
    item.addEventListener("click" , (e) => {
        e.preventDefault();
        if(localStorage.getItem("signupUser")){
            item.previousElementSibling.children[1].disabled = false;
            item.previousElementSibling.children[1].focus();
            if(item.previousElementSibling.children[1].type == "file"){
                item.previousElementSibling.children[1].click();
            }
            item.style.cssText = "background-color:var(--secondary-color); color:var(--text-color)";
        }else{
            window.location = "signinup.html";
        }
    })
})

//get user data from ls
function getCurrentUserData(){
    let users =JSON.parse(localStorage.getItem("signupUser"))
    if(users != null){
        let currentUserID = JSON.parse(localStorage.getItem("currentUserID"));
        let filtered = users.find((user) => user.id == currentUserID);
        return filtered;
    }
}

//fill inputs with user data from ls
function handleInputs(){
    let userInfo = getCurrentUserData();
    uName.value = userInfo.username;
    uPasswd.value = userInfo.password;
    uEmail.value = userInfo.email;
    uAvatarImage.src = userInfo.avatar;
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
    if(getCurrentUserData != undefined){
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
        location.reload();
    }
})

// show address info when reloading 
function retrieveAddressInfo(){
    let userinfo = getCurrentUserData();
    fName.value = userinfo.fName;
    lName.value = userinfo.lName;
    city.value = userinfo.city;
    street.value = userinfo.street;
    aprt.value = userinfo.aprt;
    phone.value = userinfo.phone;
}
retrieveAddressInfo();