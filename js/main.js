//get elemsnts to control show and hido of dropdown menus
let langheader = document.querySelector(".selected-lang");
let userheader = document.querySelector(".show-user-info");
let cartheader = document.querySelector(".cart-icon");
let headerRTSection =Array.from(document.querySelectorAll(".container .header-right > div"));

function dropdownToggle (){
    this.parentElement.classList.toggle("active");
}

langheader.addEventListener("click",dropdownToggle);
userheader.addEventListener("click",dropdownToggle);
cartheader.addEventListener("click",dropdownToggle);


let toggleIcon = document.querySelector("#vert-bar-icon");
let verticalHeader = document.querySelector("#mobile-vertical-header");
let verticalHeaderCloseBtn = document.querySelector("#close-btn i")
console.log(verticalHeaderCloseBtn)

toggleIcon.addEventListener("click" , () => {
    verticalHeader.style.left = "0";
})

verticalHeaderCloseBtn.addEventListener("click" , () => {
    verticalHeader.style.left = "-100%";
})