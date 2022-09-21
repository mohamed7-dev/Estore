//get elements
let showHide = document.querySelectorAll(".visibility");
let passwd = document.querySelectorAll(`.input-field input[type ="password"]`);
let text = document.querySelectorAll(`.input-field input[type ="text"]`);

//clear inputs on reload
function clearInputs(){
    window.onload = function () {
        text.forEach((input) => {
            input.value = "";
        })
    
        passwd.forEach((input) => {
            input.value = "";
        })
    }
}
clearInputs();

//function to toggle visibility of passwd
function toggleVisibility(){
    showHide.forEach((icon) => {
        icon.addEventListener("click" , () => {
            passwd.forEach((pw) =>{
                if(pw.type == "password"){
                    pw.type = "text";
                    icon.classList.replace("fa-eye-slash" , "fa-eye");
                }else{
                    pw.type = "password";
                    icon.classList.replace("fa-eye" , "fa-eye-slash");
                }
            })
        })
    })
}

toggleVisibility();

//get elements to control sign in and up visibility
let container = document.querySelector(".container");
let signupLink = document.querySelector(".signup-link");
let loginLink = document.querySelector(".login-link");

signupLink.addEventListener("click" , activateSignupMode);
function activateSignupMode(){
    container.classList.add("active");
}

loginLink.addEventListener("click" , activateSigninMode);
function activateSigninMode(){
    container.classList.remove("active");
}


//get elements to control signup functionality
let signupBtn = document.querySelector("#signup");
let signupUserName = document.querySelector("#signup-username");
let signupEmail = document.querySelector("#signup-email");
let signupPasswd = document.querySelector("#signup-passwd");
let signupPasswdConfirm = document.querySelector("#signup-passwd-confirm");

//retrieve data from local storage
let signupArray = localStorage.getItem("signupUser") != null? JSON.parse(localStorage.getItem("signupUser")) : [];
//add to local storage when click on signup button
signupBtn.addEventListener("click" , () => {
    //regular expressions to match username , email and password
    let passwdRegex =/[A-Z][A-Za-z0-9]{7,}/g; 
    let usernameRegex = /[A-Za-z0-9@_]{5,}/g;
    let emailRegex = /[A-Za-z0-9]{1,}@[A-Za-z]{1,}.[A-Za-z]{1,}/g;
    
    let signupObj = {
        username:signupUserName.value.match(usernameRegex) && signupUserName.value != "" ? signupUserName.value.match(usernameRegex)[0] : "false",
        email:signupEmail.value.match(emailRegex) && signupEmail.value != "" ? signupEmail.value.match(emailRegex)[0] : "false",
        password:signupPasswd.value.match(passwdRegex) && signupPasswd.value != ""? signupPasswd.value.match(passwdRegex)[0] : "false",
        passwordMatch:function (){
            return signupPasswd.value == signupPasswdConfirm.value && signupPasswdConfirm.value != ""? "true" : "false";
        }
    }    
    signuphandleErrors(signupObj);

    if(!(signupObj.username == "false" && signupObj.email == "false" && signupObj.password == "false" && signupObj.passwordMatch() == "false")){
        signupArray.push(signupObj);
        window.localStorage.setItem("signupUser" ,JSON.stringify(signupArray));
        //call function to go to sign in mode
        setTimeout(activateSigninMode ,500);
    }
})

//get elements to control signin functionality
let signinBtn = document.querySelector("#signin");
let signinEmail = document.querySelector("#signin-email");
let signinPasswd= document.querySelector("#signin-passwd");



signinBtn.addEventListener("click" , validateInputs);
//function to compare input values with the values in the local storage(signupArray)
function validateInputs(){
    let filtered;
    let filteredItem;
    signupArray.find((item) => {
        filtered = signinEmail.value === item.email && signinPasswd.value === item.password;
        // if(item.email === signinEmail.value && item.password === signinPasswd.value){
        //     filteredItem = item;
        //     return filteredItem
        // }
    })

    if(localStorage.getItem("signupUser") !== null && filtered === true){
        window.location = "./index.html";
    }else{
        //call handle error function
        loginhandleErrors();
    }
}

//get elements to handle error msg
let emailError = document.querySelector("#email-err");
let passwdError = document.querySelector("#passwd-err");
let signupPasswdError = document.querySelector("#signup-passwd-err");
let signupPasswdConfirmError = document.querySelector("#signup-passwdconfirm-err");
let signupUserError = document.querySelector("#signup-username-err");
let signupEmailError = document.querySelector("#signup-email-err");

//function to handle error of signup form
function signuphandleErrors(obj){
    obj.username == "false"? signupUserError.classList.add("show-error") : "";
    obj.email == "false"? signupEmailError.classList.add("show-error") : "";
    if(obj.passwordMatch() == "false"){
        signupPasswdConfirmError.classList.add("show-error");
    }
    obj.password == "false"? signupPasswdError.classList.add("show-error") : "";
    
    signupHndleFocus();
}

//function to handle focus after error
function signupHndleFocus(){
    signupEmail.addEventListener("focus" , handleFocus);
    signupUserName.addEventListener("focus" , handleFocus);
    signupPasswd.addEventListener("focus" , handleFocus);
    signupPasswdConfirm.addEventListener("focus" , handleFocus);
}


//function to handle error of login form
function loginhandleErrors(){
    signupArray.forEach(element => {
        if(element.email !== signinEmail.value){
            emailError.classList.add("show-error");
            signinEmail.addEventListener("focus" , handleFocus);
        }
        if (element.password !== signinPasswd.value){
            passwdError.classList.add("show-error");
            signinPasswd.addEventListener("focus" , handleFocus);
        }
    });
}

//function to handle focus after error
function handleFocus(){
    this.parentElement.nextElementSibling.classList.remove("show-error");
    this.parentElement.nextElementSibling.value = "";
}


//get elements to toggle dark mode
let icon = document.querySelector(".title i");
icon.addEventListener("click" , () => {
    if(!document.body.classList.contains("dark-mode")){
        document.body.classList.add("dark-mode");
        icon.classList.replace("fa-moon" , "fa-sun");
    }else{
        document.body.classList.remove("dark-mode");
        icon.classList.replace("fa-sun" , "fa-moon");
    }
})



