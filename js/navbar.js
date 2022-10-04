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
    if(e.target.className != "shipping-header" && e.target.tagName != "SPAN" && e.target.tagName != "I" && e.target.className !== "shipping-mode-details"){
        pickupOrderDetails.classList.remove("active");
        mainWrapperOverlay.classList.remove("active");
    }
})