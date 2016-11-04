window.onload = function() {


var swiper2 = new Swiper('.swiper-about', {
	    nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 6,
        spaceBetween: 0,
        grabCursor: true,
        breakpoints: {
            1324: {
                slidesPerView: 6
            },
            1100: {
                slidesPerView: 4
            },
            768: {
                slidesPerView: 3
            },
            640: {
                slidesPerView: 2
            },
            400: {
                slidesPerView: 1
            }
        }
});


}