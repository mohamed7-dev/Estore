//navbar in mobile phones
let navInMobile = window.matchMedia("(max-width:995px)");
if(navInMobile.matches){
    //lower nav bar
    const items = document.querySelectorAll(".mobile-nav li");

    //targets in html
    let routes = {
        index:"index.html",
        cart: "cart.html",
        favourites :"favourites.html",
        settings :"settings.html",
        addproduct:"addproduct.html",
    }

    //handle clikc on nav bar in mobile
    items.forEach((i) => {
    i.onclick = function (e) {
        items.forEach((i) => {
            i.classList.remove("active");
        });
        let currentTabTarget = i.dataset.target;
        console.log(i.dataset.target) 
        localStorage.setItem("currentTarget" , JSON.stringify(currentTabTarget));
        let pageTarget = JSON.parse(localStorage.getItem("currentTarget"));
        console.log(pageTarget)
        setTimeout(() => {
            window.location = routes[pageTarget];
        },500)
        i.classList.add("active");
    };
    });

    //handle the nav in the mobile screens
    let targetFromLS = JSON.parse(localStorage.getItem("currentTarget"));
    if(targetFromLS != null){
        document.querySelectorAll(".mobile-nav li").forEach((item) => item.classList.remove("active"));
        document.querySelector(`li.${targetFromLS}`).classList.add("active");
        localStorage.removeItem("currentTarget");
    }
}