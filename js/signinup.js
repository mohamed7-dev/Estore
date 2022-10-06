//get elements  to control show and hide of password 
let showHide = document.querySelectorAll(".visibility");
let passwd = document.querySelectorAll(`.input-field input[type ="password"]`);
let text = document.querySelectorAll(`.input-field input[type ="text"]`);

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
let signupForm = document.querySelector("#signup");
let signupBtn = document.querySelector("#signup");
let signupUserName = document.querySelector("#signup-username");
let signupEmail = document.querySelector("#signup-email");
let signupPasswd = document.querySelector("#signup-passwd");
let signupPasswdConfirm = document.querySelector("#signup-passwd-confirm");
let rememberMeSignup = document.querySelector("#checkbox-signup");

//retrieve data from local storage
let signupArray = localStorage.getItem("signupUser") != null? JSON.parse(localStorage.getItem("signupUser")) : [];

//add to local storage when click on signup button
signupForm.addEventListener("submit" , (e) => {
    //prevent submit on click
    e.preventDefault();

    //regular expressions to match username , email and password
    let passwdRegex =/[A-Z][A-Za-z0-9]{7,}/; 
    let usernameRegex = /[A-Za-z0-9@_]{3,}/;
    let emailRegex = /[A-Za-z0-9]{1,}@[A-Za-z]{1,}.[A-Za-z]{1,}/;
            
    let signupObj = {
        id: signupArray.length,
        rememberMe:rememberMeSignup.checked == true? "true" : "false",
        avatar:"./images/default-avatar.png",
        username: signupUserName.value.match(usernameRegex) && signupUserName.value != "" ? signupUserName.value.match(usernameRegex)[0] : "false",
        email: signupEmail.value.match(emailRegex) && signupEmail.value != "" ? signupEmail.value.match(emailRegex)[0] : "false",
        password: signupPasswd.value.match(passwdRegex) && signupPasswd.value != ""? signupPasswd.value.match(passwdRegex)[0] : "false",
        passwordMatch:function (){
            return signupPasswd.value == signupPasswdConfirm.value && signupPasswdConfirm.value != ""? "true" : "false";
        }
    }
        
    signuphandleErrors(signupObj);

    if(signupObj.username != "false" && signupObj.email != "false" && signupObj.password != "false" && signupObj.passwordMatch() != "false"){
        //push object to array and add array to local storage
        signupArray.push(signupObj);
        window.localStorage.setItem("signupUser" ,JSON.stringify(signupArray));
        //call function to go to sign in mode
        setTimeout(activateSigninMode ,500);
        remeberMeCheck(signupObj.id);
    }
})

//clear inputs 
function clearInputs(){
    window.onload = function () {
        document.querySelectorAll(`input:not(input[type="submit"])`).forEach((input) => {
            input.value = "";
        })
        document.querySelectorAll(`input[type="checkbox"]`).forEach((box) => {
            box.checked = false;
        })
    }
}

//get elements to control signin functionality
let signinForm = document.querySelector("#login");
let signinBtn = document.querySelector("#signin");
let signinEmail = document.querySelector("#signin-email");
let signinPasswd= document.querySelector("#signin-passwd");
let rememberMeLogin = document.querySelector("#checkbox-login");

//handle auto fill the inputs after reload if user has remeber me key
function handleFillInputs(){
    let userInfoFromLS = JSON.parse(localStorage.getItem("signupUser")) || [];
    let userCurrentID = JSON.parse(localStorage.getItem("currentUserID"));
    if(userInfoFromLS != []){
        let filteredUser = userInfoFromLS.find((user) => {
            return user.id == userCurrentID;
        })

        if(filteredUser != undefined && filteredUser.rememberMeLogin == "true"){
            signinEmail.value = filteredUser.email;
            signinPasswd.value = filteredUser.password;
        }else{
            clearInputs();
        }
    }
}
handleFillInputs()


function remeberMeCheck(id){
    let userInfoFromLS = JSON.parse(localStorage.getItem("signupUser")) || [];
    if(userInfoFromLS != []){
        let filtered = userInfoFromLS.find((user) => {
            return user.id == id;
        })

        if(filtered != undefined && filtered.rememberMe == "true"){
            signinEmail.value = filtered.email;
            signinPasswd.value = filtered.password;
        }
    }
}


signinForm.addEventListener("submit" , (e) => {
    //prevent default 
    e.preventDefault();
    
    //get user from LS
    let userInfoFromLS = JSON.parse(localStorage.getItem("signupUser"));

    //filter user from the ls
    if(userInfoFromLS != null){
        let filtered = userInfoFromLS.find((item) => {
            return signinEmail.value === item.email && signinPasswd.value === item.password;
        })

        //add true if user clciked remeber me box
        if(filtered != undefined){
            filtered["rememberMeLogin"] = rememberMeLogin.checked == true? "true" : filtered.rememberMeLogin == undefined? "false" : filtered.rememberMeLogin;
            filtered["sign"] = "in";
            let filteredIndex = userInfoFromLS.indexOf(filtered);
            userInfoFromLS.splice(filteredIndex,1,filtered);
            localStorage.setItem("signupUser" , JSON.stringify(userInfoFromLS));
        }

        //if user info is valid
        if(localStorage.getItem("signupUser") !== null && filtered != undefined){
            localStorage.setItem("currentUserID" , JSON.stringify(filtered.id));
            window.location = "./index.html";
        }else{
            //call handle error function
            loginhandleErrors(userInfoFromLS);
        }
    }
})

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

//function to handle focus after error
function handleFocus(){
    this.parentElement.nextElementSibling.classList.remove("show-error");
    this.parentElement.nextElementSibling.value = "";
}


//function to handle error of login form
function loginhandleErrors(users){
    if(users.length > 0){
        users.forEach(element => {
            if(element.email !== signinEmail.value){
                emailError.classList.add("show-error");
                signinEmail.addEventListener("focus" , handleFocus);
            }
            if (element.password !== signinPasswd.value){
                passwdError.classList.add("show-error");
                signinPasswd.addEventListener("focus" , handleFocus);
            }
        })
    }else{
        emailError.classList.add("show-error");
        signinEmail.addEventListener("focus" , handleFocus);
        passwdError.classList.add("show-error");
        signinPasswd.addEventListener("focus" , handleFocus);
    }
}




