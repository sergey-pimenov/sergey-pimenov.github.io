window.onload = function() {

var swiper = new Swiper('.swiper-container', {
	    nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 4,
        spaceBetween: 10,
        grabCursor: true,
        breakpoints: {
            1024: {
                slidesPerView: 4
            },
            768: {
                slidesPerView: 3
            },
            640: {
                slidesPerView: 2
            },
            320: {
                slidesPerView: 1
            }
        },
	    onSlideNextStart: function(swiper) {
	    	var swiper_button_prev = document.querySelectorAll('.swiper-button-prev');
	    	swiper_button_prev[0].style.opacity = '1';
	    }, 
	    onReachBeginning: function(swiper) {
	    	var swiper_button_prev = document.querySelectorAll('.swiper-button-prev');
	    	swiper_button_prev[0].style.opacity = '0';
	    }
});



var swiper2 = new Swiper('.swiper2', {
	    nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 4,
        spaceBetween: 10,
        grabCursor: true,
        breakpoints: {
            1024: {
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
        },
	    onSlideNextStart: function(swiper) {
	    	var swiper_button_prev = document.querySelectorAll('.swiper-button-prev');
	    	swiper_button_prev[1].style.opacity = '1';
	    }, 
	    onReachBeginning: function(swiper) {
	    	var swiper_button_prev = document.querySelectorAll('.swiper-button-prev');
	    	swiper_button_prev[1].style.opacity = '0';
	    }
});


 

}