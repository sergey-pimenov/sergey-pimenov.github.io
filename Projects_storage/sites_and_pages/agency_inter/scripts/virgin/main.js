// Team video
var team_video = document.getElementsByClassName("team_video"),
	play_icon = document.getElementsByClassName("play_icon");

play_icon[0].addEventListener("click", playVideo);

function playVideo() {
	play_icon[0].style.display = "none";
	team_video[0].setAttribute("src", "https://www.youtube.com/embed/-O3cZ3M4hAo?rel=0&amp;controls=0&amp;showinfo=0;&autoplay=1");
}


// More reviews
var show_more = document.getElementsByClassName("show_more"),
	more_reviews = document.getElementsByClassName("more_reviews");

show_more[0].addEventListener("click", showMoreReviews);

var show_more_height,
	window_width;

window.addEventListener("resize", getSizes);

getSizes();

function getSizes() {
	more_reviews[0].style.height = "auto";
	show_more_height = parseInt(getComputedStyle(more_reviews[0]).height, 10);
	more_reviews[0].style.height = "0";

	window_width = parseInt(getComputedStyle(document.body).width, 10);
}

function showMoreReviews() {
	if (window_width > 1279) {
		more_reviews[0].style.height = "40vw";
		show_more[0].style.transform = "scaleX(0)";
		show_more[0].style.marginBottom = "0";
	}

	if (window_width <= 1279) {
		more_reviews[0].style.height = show_more_height + "px";
		show_more[0].style.transform = "scaleX(0)";
		show_more[0].style.marginBottom = "0";
	}
}

// Menu
var mobile_menu_logo = document.getElementsByClassName("mobile_menu_logo");

var navigation = document.getElementsByClassName("navigation");

mobile_menu_logo[0].addEventListener("click", openMenu);

function openMenu() {
	navigation[0].classList.toggle("menu_open");
	mobile_menu_logo[0].classList.toggle("logo_closed");
}