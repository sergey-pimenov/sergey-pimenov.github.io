// Video frames

var video_youtube = document.getElementById("video_youtube");
var iframe_cursor_and_play = document.getElementById("iframe_cursor_and_play");

iframe_cursor_and_play.addEventListener("click", playVideo);

function playVideo() {
	video_youtube.setAttribute("src", video_in_header);
	iframe_cursor_and_play.style.zIndex = "1"
}

var blu_side_video_youtube = document.getElementById("blu_side_video_youtube");
var iframe_cursor_and_play_2 = document.getElementById("iframe_cursor_and_play_2");

iframe_cursor_and_play_2.addEventListener("click", playBlueVideo);

function playBlueVideo() {
	blu_side_video_youtube.setAttribute("src", confederation_video);
	iframe_cursor_and_play_2.style.zIndex = "1"
}

var red_side_video_youtube = document.getElementById("red_side_video_youtube");
var iframe_cursor_and_play_3 = document.getElementById("iframe_cursor_and_play_3");

iframe_cursor_and_play_3.addEventListener("click", playRedVideo);

function playRedVideo() {
	red_side_video_youtube.setAttribute("src", resistance_video);
	iframe_cursor_and_play_3.style.zIndex = "-1";
}


// Gallery

var preview_pictures = document.querySelectorAll(".preview_block article");
var current_picture = document.getElementById("current_picture");

for( i = 0; i < preview_pictures.length; i++ ) {
	preview_pictures[i].addEventListener("click", setMainPicture)
}

var picture_position = 0;

function setMainPicture(event) {
	var target = event.target;
	var styles_picture = getComputedStyle(target);
	current_picture.style.background = styles_picture.backgroundImage;
	current_picture.style.backgroundSize = "100% auto";
	current_picture.style.backgroundRepeat = "no-repeat";
	for( i = 0; i < preview_pictures.length; i++) {
		preview_pictures[i].classList.remove("shadow_add");
	}
	target.classList.add("shadow_add");
	switch (target) {
	  case preview_pictures[0]:
	    picture_position = 0;
	    break;
	  case preview_pictures[1]:
	    picture_position = 1;
	    break;
	  case preview_pictures[2]:
	    picture_position = 2;
	    break;
	  case preview_pictures[3]:
	    picture_position = 3;
	    break;
	  case preview_pictures[4]:
	    picture_position = 4;
	    break;

	  case preview_pictures[5]:
	    picture_position = 5;
	    break;
	  default:
	    alert( 'Слишком много картинок' );
	}
}

var go_to_right = document.getElementById("go_to_right");

go_to_right.addEventListener("click", goToRight);

function goToRight() {
	switch (picture_position) {
	  case 0:
	    var styles_picture_global = getComputedStyle(preview_pictures[1]);
		current_picture.style.background = styles_picture_global.backgroundImage;
		current_picture.style.backgroundSize = "100% auto";
		current_picture.style.backgroundRepeat = "no-repeat";
		for( i = 0; i < preview_pictures.length; i++) {
			preview_pictures[i].classList.remove("shadow_add");
		}
		preview_pictures[1].classList.add("shadow_add");
		picture_position = 1;
	    break;

	  case 1:
	    var styles_picture_global = getComputedStyle(preview_pictures[2]);
		current_picture.style.background = styles_picture_global.backgroundImage;
		current_picture.style.backgroundSize = "100% auto";
		current_picture.style.backgroundRepeat = "no-repeat";
		for( i = 0; i < preview_pictures.length; i++) {
			preview_pictures[i].classList.remove("shadow_add");
		}
		preview_pictures[2].classList.add("shadow_add");
		picture_position = 2;
	    break;

	  case 2:
	    var styles_picture_global = getComputedStyle(preview_pictures[3]);
		current_picture.style.background = styles_picture_global.backgroundImage;
		current_picture.style.backgroundSize = "100% auto";
		current_picture.style.backgroundRepeat = "no-repeat";
		for( i = 0; i < preview_pictures.length; i++) {
			preview_pictures[i].classList.remove("shadow_add");
		}
		preview_pictures[3].classList.add("shadow_add");
		picture_position = 3;
	    break;

	  case 3:
	    var styles_picture_global = getComputedStyle(preview_pictures[4]);
		current_picture.style.background = styles_picture_global.backgroundImage;
		current_picture.style.backgroundSize = "100% auto";
		current_picture.style.backgroundRepeat = "no-repeat";
		for( i = 0; i < preview_pictures.length; i++) {
			preview_pictures[i].classList.remove("shadow_add");
		}
		preview_pictures[4].classList.add("shadow_add");
		picture_position = 4;
	    break;

	  case 4:
	    var styles_picture_global = getComputedStyle(preview_pictures[5]);
		current_picture.style.background = styles_picture_global.backgroundImage;
		current_picture.style.backgroundSize = "100% auto";
		current_picture.style.backgroundRepeat = "no-repeat";
		for( i = 0; i < preview_pictures.length; i++) {
			preview_pictures[i].classList.remove("shadow_add");
		}
		preview_pictures[5].classList.add("shadow_add");
		picture_position = 5;
	    break;

	  case 5:
	    var styles_picture_global = getComputedStyle(preview_pictures[0]);
		current_picture.style.background = styles_picture_global.backgroundImage;
		current_picture.style.backgroundSize = "100% auto";
		current_picture.style.backgroundRepeat = "no-repeat";
		for( i = 0; i < preview_pictures.length; i++) {
			preview_pictures[i].classList.remove("shadow_add");
		}
		preview_pictures[0].classList.add("shadow_add");
		picture_position = 0;
	    break;

	  default:
	    alert( 'Слишком много картинок' );
	}
}

var go_to_left = document.getElementById("go_to_left");

go_to_left.addEventListener("click", goToLeft);

function goToLeft() {
	switch (picture_position) {
	  case 0:
	    var styles_picture_global = getComputedStyle(preview_pictures[5]);
		current_picture.style.background = styles_picture_global.backgroundImage;
		current_picture.style.backgroundSize = "100% auto";
		current_picture.style.backgroundRepeat = "no-repeat";
		for( i = 0; i < preview_pictures.length; i++) {
			preview_pictures[i].classList.remove("shadow_add");
		}
		preview_pictures[5].classList.add("shadow_add");
		picture_position = 5;
	    break;

	  case 1:
	    var styles_picture_global = getComputedStyle(preview_pictures[0]);
		current_picture.style.background = styles_picture_global.backgroundImage;
		current_picture.style.backgroundSize = "100% auto";
		current_picture.style.backgroundRepeat = "no-repeat";
		for( i = 0; i < preview_pictures.length; i++) {
			preview_pictures[i].classList.remove("shadow_add");
		}
		preview_pictures[0].classList.add("shadow_add");
		picture_position = 0;
	    break;

	  case 2:
	    var styles_picture_global = getComputedStyle(preview_pictures[1]);
		current_picture.style.background = styles_picture_global.backgroundImage;
		current_picture.style.backgroundSize = "100% auto";
		current_picture.style.backgroundRepeat = "no-repeat";
		for( i = 0; i < preview_pictures.length; i++) {
			preview_pictures[i].classList.remove("shadow_add");
		}
		preview_pictures[1].classList.add("shadow_add");
		picture_position = 1;
	    break;

	  case 3:
	    var styles_picture_global = getComputedStyle(preview_pictures[2]);
		current_picture.style.background = styles_picture_global.backgroundImage;
		current_picture.style.backgroundSize = "100% auto";
		current_picture.style.backgroundRepeat = "no-repeat";
		for( i = 0; i < preview_pictures.length; i++) {
			preview_pictures[i].classList.remove("shadow_add");
		}
		preview_pictures[2].classList.add("shadow_add");
		picture_position = 2;
	    break;

	  case 4:
	    var styles_picture_global = getComputedStyle(preview_pictures[3]);
		current_picture.style.background = styles_picture_global.backgroundImage;
		current_picture.style.backgroundSize = "100% auto";
		current_picture.style.backgroundRepeat = "no-repeat";
		for( i = 0; i < preview_pictures.length; i++) {
			preview_pictures[i].classList.remove("shadow_add");
		}
		preview_pictures[3].classList.add("shadow_add");
		picture_position = 3;
	    break;

	  case 5:
	    var styles_picture_global = getComputedStyle(preview_pictures[4]);
		current_picture.style.background = styles_picture_global.backgroundImage;
		current_picture.style.backgroundSize = "100% auto";
		current_picture.style.backgroundRepeat = "no-repeat";
		for( i = 0; i < preview_pictures.length; i++) {
			preview_pictures[i].classList.remove("shadow_add");
		}
		preview_pictures[4].classList.add("shadow_add");
		picture_position = 4;
	    break;

	  default:
	    alert( 'Слишком много картинок' );
	}
}

// Responsive

var window_width;

window_width = document.documentElement.clientWidth;

var h1 = document.getElementsByTagName("h1");

var header_mobile_video = document.getElementsByClassName("header_mobile_video");

var fractions_p = document.getElementsByClassName("fractions_p");

var mob_description = document.querySelectorAll("#mob_description p");

window.addEventListener("resize", responsiveBlock);

responsiveBlock();

function responsiveBlock() {
	window_width = document.documentElement.clientWidth;
	if(window_width <= 900) {
		h1[0].style.fontSize = window_width / 21 + "px";

		header_mobile_video[0].style.borderWidth = window_width / 95 + "px";

		fractions_p[0].style.fontSize = window_width / 28 + "px";
		fractions_p[1].style.fontSize = window_width / 28 + "px";

		mob_description[0].style.fontSize = window_width / 28 + "px";
		mob_description[1].style.fontSize = window_width / 28 + "px";

		iframe_cursor_and_play.style.height = window_width / 2.3 + "px";
		video_youtube.style.height = window_width / 2.3 + "px";

		blu_side_video_youtube.style.height = window_width / 3 + "px";
		red_side_video_youtube.style.height = window_width / 3 + "px";
		iframe_cursor_and_play_2.style.height = window_width / 3 + "px";
		iframe_cursor_and_play_3.style.height = window_width / 3 + "px";
	}
	if(window_width > 900) {
		h1[0].style.fontSize = "2.15vw";

		fractions_p[0].style.fontSize = "1.75vw";
		fractions_p[1].style.fontSize = "1.75vw";

		mob_description[0].style.fontSize = "1.75vw";
		mob_description[1].style.fontSize = "1.75vw";

		iframe_cursor_and_play.style.height = "24.719vw";
		video_youtube.style.height =  "24.719vw";

		blu_side_video_youtube.style.height = "21.91vw";
		red_side_video_youtube.style.height = "21.91vw";
		iframe_cursor_and_play_2.style.height = "21.91vw";
		iframe_cursor_and_play_3.style.height = "21.91vw";
	}
}


var mob_fraction_video = document.getElementsByClassName("mob_fraction_video");
var header_mobile_video = document.getElementsByClassName("header_mobile_video");

header_mobile_video[0].setAttribute("href", video_in_header_mobile);
mob_fraction_video[0].setAttribute("href", confederation_video_mobile);
mob_fraction_video[1].setAttribute("href", resistance_video_mobile);


// Mobile, not opera mini

var isOperaMini = Object.prototype.toString.call(window.operamini) === "[object OperaMini]";



if (!isOperaMini) {
	header_mobile_video[0].style.display = "none";
	mob_fraction_video[0].style.display = "none";
	mob_fraction_video[1].style.display = "none";
	iframe_cursor_and_play_2.classList.add("fraction_videos_mobile_show");
	blu_side_video_youtube.classList.add("fraction_videos_mobile_iframe");
}

// Opera mini

if (isOperaMini) {
	iframe_cursor_and_play.classList.add("o_mini_video_hide");
	video_youtube.classList.add("o_mini_video_hide");
	video_youtube.classList.add("o_mini_video_hide");
	iframe_cursor_and_play_2.classList.add("o_mini_video_hide");
	iframe_cursor_and_play_3.classList.add("o_mini_video_hide");
	blu_side_video_youtube.classList.add("o_mini_video_hide");
	red_side_video_youtube.classList.add("o_mini_video_hide");
}