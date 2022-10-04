//swiper js
let swiper = new Swiper(".mySwiper", {
    slidesPerView: 5,
    spaceBetween: 10,
    slidesPerGroup: 2,
    loop: false,
    grabCursor:true,
    fade: true,
    centerSlide: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        0: {
            slidesPerView:1,
            slidesPerGroup: 1,
        },
        520:{
            slidesPerView:2,
            slidesPerGroup: 2,
        },
        950:{
            slidesPerView:3,
            slidesPerGroup: 2,
        },
        1100:{
            slidesPerView:4,
            slidesPerGroup: 2,
        },
        1400:{
            slidesPerView:5,
            slidesPerGroup: 2,
        }
    }
});