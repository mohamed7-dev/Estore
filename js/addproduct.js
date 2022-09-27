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
