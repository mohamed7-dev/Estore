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



editButtons.forEach((item) => {
    item.addEventListener("click" , (e) => {
        e.preventDefault();
        // console.log(item.previousElementSibling.children[1].removeAttribute("disabled"))
            item.previousElementSibling.children[1].disabled = false;
            item.previousElementSibling.children[1].focus();
            item.style.cssText = "background-color:var(--secondary-color); color:var(--text-color)";
    })
})

//get data from local storage
let user =JSON.parse(localStorage.getItem("signupUser"))
console.log(user)
function handleInputs(){
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

    user.splice(0,1,userObj);
    localStorage.setItem("signupUser" , JSON.stringify(user));

    editButtons.forEach((item) => {
        item.style.cssText = "background-color:#fff; color:var(--main-color)";
    })

    location.reload();
} )

