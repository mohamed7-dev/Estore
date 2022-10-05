//get elements to manipulate the settings
let editButtons =Array.from(document.querySelectorAll(".field-container button"));
let submitBtn = document.querySelector("#submit-btn");
let form = document.querySelector("#settings-form");
let uName = document.querySelector("#uname");
let uPasswd = document.querySelector("#passwd");
let uEmail = document.querySelector("#email");
let uAvatarImage = document.querySelector("#avatar");
let uAvatarInput = document.querySelector("#img");
let imageValue;


if(localStorage.getItem("signupUser")){
    editButtons.forEach((item) => {
        item.addEventListener("click" , (e) => {
            e.preventDefault();
                item.previousElementSibling.children[1].disabled = false;
                item.previousElementSibling.children[1].focus();
                item.style.cssText = "background-color:var(--secondary-color); color:var(--text-color)";
        })
    })
}else{
    window.location = "signinup.html";
}


//get data from local storage
function handleInputs(){
let user =JSON.parse(localStorage.getItem("signupUser"))
    uName.value = user[0].username;
    uPasswd.value = user[0].password;
    uEmail.value = user[0].email;
    uAvatarImage.src = user[0].avatar;
}
handleInputs()


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

form.addEventListener("submit" , (e) => {
    e.preventDefault();
    let userObj = {
        username : uName.value,
        email : uEmail.value,
        password : uPasswd.value,
        avatar : imageValue
    }
let user =JSON.parse(localStorage.getItem("signupUser"));
    user.splice(0,1,userObj);
    localStorage.setItem("signupUser" , JSON.stringify(user));

    editButtons.forEach((item) => {
        item.style.cssText = "background-color:#fff; color:var(--main-color)";
    })

    location.reload();
} )


//switch between settings
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
    let user =JSON.parse(localStorage.getItem("signupUser"));
    e.preventDefault();
    let addressObj = {
        userName : user[0].username,
        email : user[0].email,
        fName :   fName.value,
        lName :   lName.value,
        city :   city.value,
        street :  street.value,
        aprt :  aprt.value,
        phone : phone.value,
    }

    user[1] = addressObj;
    localStorage.setItem("signupUser" , JSON.stringify(user));

    editButtons.forEach((item) => {
        item.style.cssText = "background-color:#fff; color:var(--main-color)";
    })

    location.reload();
    handleAddressInNav();
} )

//show address info when reloading 
function retrieveAddressInfo(){
let user =JSON.parse(localStorage.getItem("signupUser"))
    fName.value = user[1].fName;
    lName.value = user[1].lName;
    city.value = user[1].city;
    street.value = user[1].street;
    aprt.value = user[1].aprt;
    phone.value = user[1].phone;
}

retrieveAddressInfo();