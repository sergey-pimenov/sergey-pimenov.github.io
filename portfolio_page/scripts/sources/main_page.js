// Work for mobile

var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var works = document.getElementById('works');
var page_lang = document.getElementsByTagName('body');

if(w <= '1024' && page_lang[0].classList.contains('ru_version')) {
	works.setAttribute('href', 'Portfolio_page/pages/work/index.html');
}

if(w <= '1024' && page_lang[0].classList.contains('eng_version')
	||
	w <= '1024' && page_lang[0].classList.contains('ua_version')) {
	works.setAttribute('href', 'work.html');
}



// For old browsers

function vwVhCalcSupportDetect() {
	var computedHeight, 
	test_elem = document.createElement('div');
    test_elem.style.height = 'calc(10vh + 10vw)';
    document.body.appendChild(test_elem);
    computedHeight = window.getComputedStyle(test_elem).height;
    document.body.removeChild(test_elem);

    return computedHeight == '0px';
}

if(vwVhCalcSupportDetect()) {
	var for_old_browsers_block = document.getElementsByClassName('for_old_browsers');
	for_old_browsers_block[0].style.display = 'block';
}


// Scripts init

window.addEventListener('load', scriptInit);

function scriptInit() {

// Works

if(w > '1024') {

	var works_frame = document.getElementById('works_frame');

	works.addEventListener('click', openWorks);

	function openWorks() {
		if ( page_lang[0].classList.contains('eng_version') ) {
			works_frame.setAttribute('src', 'work.html');
		} else if ( page_lang[0].classList.contains('ua_version') ) {
			works_frame.setAttribute('src', 'work.html');
		} else if ( page_lang[0].classList.contains('ru_version') ) {
			works_frame.setAttribute('src', 'Portfolio_page/pages/work/index.html');
		}
		works_frame.style.display = 'block';
		works_frame.classList.toggle('display_this_block');
		introduction.classList.toggle('opacity_to_intro');
	}

	window.addEventListener('click', worksClose);

	function worksClose(e) {
		var target = e.target;
		if (target.id != 'works') {
			while(target.tagName != 'HTML') {
				if (target.id == 'works_frame' ) {
					return;
				}
				if(target.tagName == 'BODY') {
					works_frame.setAttribute('src', '');
					works_frame.style.display = 'none';
					works_frame.style.zIndex = '-10';
					works_frame.classList.remove('display_this_block');
					introduction.classList.remove('opacity_to_intro');
					return;
				}
			target = target.parentNode;
			}
		}
	}

}

var cloud = document.getElementsByClassName('clouds');


// IE transformX(-1) solving problem
if (document.documentMode || /Edge/.test(navigator.userAgent)) {
	cloud[1].style.transform = 'translateX(0) scaleX(1)';
	cloud[1].style.animation = 'clouds_2_ie 50s linear infinite, clouds_opacity 5.5s linear';
}


// Clouds animation
for( i = 0; cloud.length > i; i++ ) {
	cloud[i].style.opacity = '1';
}


// About
var about = document.getElementById('about');
var about_block = document.getElementById('about_block');
var introduction = document.getElementById('introduction');
var close_about_icon = document.getElementsByClassName('close_about_icon');

about.addEventListener('click', aboutOpen);

function aboutOpen() {
	about_block.classList.toggle('display_this_block');
	introduction.classList.toggle('opacity');
	contact_block.classList.remove('display');
}

window.addEventListener('click', aboutClose);
close_about_icon[0].addEventListener('click', closeAboutIcon);

function closeAboutIcon() {
	about_block.classList.remove('display_this_block');
	introduction.classList.remove('opacity');
}

function aboutClose(e) {
	var target = e.target;
	if (target.id != 'about') {
		while(target.tagName != 'HTML') {
			if (target.id == 'about_block' ) {
				return;
			}
			if(target.tagName == 'BODY') {
				about_block.classList.remove('display_this_block');
				introduction.classList.remove('opacity');
				return;
			}
		target = target.parentNode;
		}
	}
}


// Contact
var contact = document.getElementById('contact');
var contact_block = document.getElementById('contact_block');

contact.addEventListener('click', openContact);

function openContact() {
	contact_block.classList.toggle('display');
}

window.addEventListener('click', contactClose);

function contactClose(e) {
	var target = e.target;
	if (target.id != 'about') {
		while(target.tagName != 'HTML') {
			if (target.id == 'contact' ) {
				return;
			}
			if (target.id == 'contact_block' ) {
				return;
			}
			if(target.tagName == 'BODY') {
				contact_block.classList.remove('display');
				return;
			}
		target = target.parentNode;
		}
	}
}

};