//toggle the active class on the pickup order header in the home page 
let pickupOrderHeader = document.querySelector(".shipping .shipping-header");
let pickupOrderDetails = document.querySelector(".shipping-mode-picking .shipping-mode-details");

pickupOrderHeader.addEventListener("click" , () => {
    pickupOrderDetails.classList.toggle("active");
    mainWrapperOverlay.classList.toggle("active");
})