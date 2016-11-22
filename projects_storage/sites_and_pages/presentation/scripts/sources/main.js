// Init fullpage library

window.onload = function() {

// Hide preload

var page_preloader = document.getElementById("page-preloader");

page_preloader.style.opacity = "0";

setTimeout(function() {
  page_preloader.style.display = "none";
}, 500);


fullpage.initialize('#fullpage', {
	anchors: ['header', 'presentation', 'how_it_work', 'perspective', /* 'facts', */ 'what_they_say', 'sportsmen_0', 'sportsmen_1', 'sportsmen_2', /* 'sportsmen_3', */ 'about_us'],
	css3:true
});


// Menu

var menu_logo = document.getElementsByClassName("menu_logo");

var menu = document.querySelectorAll("header nav");

menu_logo[0].addEventListener("click", toggleMenu);

function toggleMenu() {
	menu[0].classList.toggle("toggle_menu");
}

// Presentation

var canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d'),
  w = canvas.width = window.innerWidth,
  h = canvas.height = window.innerHeight,
    
  hue = "217",
  stars = [],
  count = 0,
  maxStars = 1400;

// Thanks @jackrugile for the performance tip! http://codepen.io/jackrugile/pen/BjBGoM
// Cache gradient
var canvas2 = document.createElement('canvas'),
    ctx2 = canvas2.getContext('2d');
    canvas2.width = 100;
    canvas2.height = 100;
var half = canvas2.width/2,
    gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.025, '#fff');
    gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
    gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
    gradient2.addColorStop(1, 'transparent');

    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();

// End cache

function random(min, max) {
  if (arguments.length < 2) {
    max = min;
    min = 0;
  }
  
  if (min > max) {
    var hold = max;
    max = min;
    min = hold;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function maxOrbit(x,y) {
  var max = Math.max(x,y),
      diameter = Math.round(Math.sqrt(max*max + max*max));
  return diameter/2;
}

var Star = function() {

  this.orbitRadius = random(maxOrbit(w,h));
  this.radius = random(60, this.orbitRadius) / 12;
  this.orbitX = w / 2;
  this.orbitY = h / 2;
  this.timePassed = random(0, maxStars);
  this.speed = random(this.orbitRadius) / 300000;
  this.alpha = random(2, 10) / 10;

  count++;
  stars[count] = this;
}

Star.prototype.draw = function() {
  var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
      y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
      twinkle = random(10);

  if (twinkle === 1 && this.alpha > 0) {
    this.alpha -= 0.05;
  } else if (twinkle === 2 && this.alpha < 1) {
    this.alpha += 0.05;
  }

  ctx.globalAlpha = this.alpha;
    ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
  this.timePassed += this.speed;
}

for (var i = 0; i < maxStars; i++) {
  new Star();
}

var grd=ctx.createLinearGradient(0, 0, 0, h);
grd.addColorStop(0,"black");
grd.addColorStop(1,"rgb(38, 6, 60)");

function animation() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, w, h)
  
  ctx.globalCompositeOperation = 'lighter';
  for (var i = 1, l = stars.length; i < l; i++) {
    stars[i].draw();
  };  
  
  window.requestAnimationFrame(animation);
}

var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

if (isChrome) {
    animation()
} else {
  var presentation = document.getElementsByClassName("presentation");
  presentation[0].style.background = "linear-gradient(to bottom, black, rgb(38, 6, 60) )";
}

// Youtube block

var video_play = document.querySelectorAll(".video span");
var youtube_block = document.querySelectorAll(".youtube_block");
var youtube_video = document.querySelectorAll(".youtube_block iframe");
var close_icon = document.querySelectorAll(".close_icon");


video_play[0].addEventListener("click", openFirstVideo);

function openFirstVideo() {
	youtube_block[0].style.display = "block";
	youtube_video[0].setAttribute("src", "https://www.youtube.com/embed/LvZQdJKGq1I?rel=0&amp;controls=0&amp;showinfo=0;&autoplay=1")
}

video_play[1].addEventListener("click", openSecondVideo);

function openSecondVideo() {
	youtube_block[0].style.display = "block";
	youtube_video[0].setAttribute("src", "https://www.youtube.com/embed/EQph2LQUtT8?rel=0&amp;controls=0&amp;showinfo=0;&autoplay=1")
}

close_icon[0].addEventListener("click", closeVideo);

function closeVideo() {
	youtube_block[0].style.display = "none";
	youtube_video[0].setAttribute("src", "")
}

// Graphics

var graphics = document.querySelectorAll(".graphics div");
var graphics_h5 = document.querySelectorAll(".graphics > h5");
var graphics_span = document.querySelectorAll(".graphics > span");
var graphics_data = document.querySelectorAll(".graphics div span");
var years = document.querySelectorAll(".perspective ul li");

for( i = 0; i < years.length; i++) {
  years[i].addEventListener("click", setGraphics);
}

function setGraphics(event) {
  var target = event.target;
  for( i = 0; i < years.length; i++) {
    years[i].classList.remove("selected");
  }
  target.classList.add("selected");
  if (target.innerHTML == " 3 года ") {

    graphics_span[0].innerHTML = "900 000 чел. <br> 65 000 000 руб.";
    graphics_span[1].innerHTML = "280 000 чел. <br> 15 000 000 руб.";
    graphics_span[2].innerHTML = "120 000 чел. <br> 3 000 000 руб.";
    
    graphics[0].style.transform = "scaleY(1)";
    graphics_h5[0].style.transform = "translate(0)";
    graphics_span[0].style.transform = "translate(0)";

    graphics[1].style.transform = "scaleY(1)";
    graphics_h5[1].style.transform = "translate(0)";
    graphics_span[1].style.transform = "translate(0)";

    graphics[2].style.transform = "scaleY(1)";
    graphics_h5[2].style.transform = "translateY(0)";
    graphics_span[2].style.transform = "translateY(0)";
  }
  if (target.innerHTML == " 5 лет ") {

    graphics_span[0].innerHTML = "1 300 000 чел. <br> 95 000 000 руб.";
    graphics_span[1].innerHTML = "380 000 чел. <br> 25 000 000 руб.";
    graphics_span[2].innerHTML = "210 000 чел. <br> 9 000 000 руб.";

    graphics[0].style.transform = "scaleY(1.5)";
    graphics_h5[0].style.transform = "translateY(-6vw)";
    graphics_span[0].style.transform = "translateY(-3vw)";

    graphics[1].style.transform = "scaleY(1.5)";
    graphics_h5[1].style.transform = "translateY(-4vw)";
    graphics_span[1].style.transform = "translateY(-3vw)";

    graphics[2].style.transform = "scaleY(1.5)";
    graphics_h5[2].style.transform = "translateY(-2.8vw)";
    graphics_span[2].style.transform = "translateY(-1.5vw)";
  }
  if (target.innerHTML == " 10 лет ") {

    graphics_span[0].innerHTML = "3 000 000 чел. <br> 105 000 000 руб.";
    graphics_span[1].innerHTML = "780 000 чел. <br> 45 000 000 руб.";
    graphics_span[2].innerHTML = "410 000 чел. <br> 21 000 000 руб.";

    graphics[0].style.transform = "scaleY(1.9)";
    graphics_h5[0].style.transform = "translateY(-11vw)";
    graphics_span[0].style.transform = "translateY(-7vw)";

    graphics[1].style.transform = "scaleY(1.9)";
    graphics_h5[1].style.transform = "translateY(-7.3vw)";
    graphics_span[1].style.transform = "translateY(-5vw)";

    graphics[2].style.transform = "scaleY(1.9)";
    graphics_h5[2].style.transform = "translateY(-4.7vw)";
    graphics_span[2].style.transform = "translateY(-3vw)";
  }
  if (target.innerHTML == " 15 лет ") {

    graphics_span[0].innerHTML = "30 000 000 чел. <br> 135 000 000 руб.";
    graphics_span[1].innerHTML = "3 000 000 чел. <br> 65 000 000 руб.";
    graphics_span[2].innerHTML = "1 200 000 чел. <br> 31 000 000 руб.";

    graphics[0].style.transform = "scaleY(2.3)";
    graphics_h5[0].style.transform = "translateY(-15.7vw)";
    graphics_span[0].style.transform = "translateY(-11vw)";

    graphics[1].style.transform = "scaleY(2.3)";
    graphics_h5[1].style.transform = "translateY(-10.6vw)";
    graphics_span[1].style.transform = "translateY(-7vw)";

    graphics[2].style.transform = "scaleY(2.3)";
    graphics_h5[2].style.transform = "translateY(-6.8vw)";
    graphics_span[2].style.transform = "translateY(-4vw)";
  }
}


// How it work SVG

var polls = new Vivus('polls', { duration: 80 });
var talents = new Vivus('talents', { duration: 110, animTimingFunction: Vivus.EASE_IN });
var gallery = new Vivus('gallery', { duration: 150, forceRender: false });
var competitions = new Vivus('competitions', { duration: 100 });
var city = new Vivus('city', { duration: 120, animTimingFunction: Vivus.EASE_IN  });


  polls.reset();
  talents.reset();
  gallery.reset();
  competitions.reset();
  city.reset();
 

var start_button = document.getElementById("start_button");
var start_p = document.querySelectorAll(".how_it_work > p")

var polls_block = document.getElementsByClassName("polls");

start_button.addEventListener("click", startDemonstration);
  

function startDemonstration() {
  start_button.classList.add("hide_button");
  setTimeout(function() {
    start_button.style.display = "none";
  }, 1300 );
  start_p[0].classList.add("translate_start");
  polls.play();
  polls_block[0].classList.add("show_block");
  talents_block[0].classList.add("show_tap");
  setTimeout(function() {
    talents_start_area[0].style.zIndex = "1";
  }, 1500  );
}

var talents_block = document.getElementsByClassName("talents");
var talents_start_area = document.querySelectorAll(".talents .start_area");

talents_start_area[0].addEventListener("click", startTalents);

function startTalents() {
  setTimeout(function() {
    talents.play();
  }, 1000 );
  talents_block[0].classList.add("show_block");
  polls_block[0].classList.add("show_line");
  photo_album_block[0].classList.add("show_tap");
  setTimeout(function() {
    photo_album_start_area[0].style.zIndex = "1";
  }, 1500  )
}

var photo_album_block = document.getElementsByClassName("photo_album");
var photo_album_start_area = document.querySelectorAll(".photo_album .start_area");

photo_album_start_area[0].addEventListener("click", startPhotoAlbum);

function startPhotoAlbum() {
  setTimeout(function() {
    gallery.play();
  }, 1000 );
  photo_album_block[0].classList.add("show_block");
  talents_block[0].classList.add("show_line");
  competitions_block[0].classList.add("show_tap");
  setTimeout(function() {
    competitions_start_area[0].style.zIndex = "1";
  }, 1500  )
}

var competitions_block = document.getElementsByClassName("competitions");
var competitions_start_area = document.querySelectorAll(".competitions .start_area");

competitions_start_area[0].addEventListener("click", startCompetitions );

function startCompetitions () {
  setTimeout(function() {
    competitions.play();
  }, 1000 );
  competitions_block[0].classList.add("show_block");
  photo_album_block[0].classList.add("show_line");
  competitions_block[0].classList.add("show_line");
  city_block[0].classList.add("show_tap");
  setTimeout(function() {
    city_start_area[0].style.zIndex = "1";
  }, 1500  )
}

var city_block = document.getElementsByClassName("my_city");
var city_start_area = document.querySelectorAll(".my_city .start_area");

city_start_area[0].addEventListener("click", startCity );

function startCity () {
  setTimeout(function() {
    city.play();
  }, 1000 );
  city_block[0].classList.add("show_block");
  city_block[0].classList.add("show_line");
}



// Gallery
/*
var swiper = new Swiper('.swiper-container', {
  pagination: '.swiper-pagination',
  paginationClickable: true,
  nextButton: '.swiper-button-next',
  prevButton: '.swiper-button-prev',
  spaceBetween: 0,
  grabCursor: true
});
*/


// Reviews

var prof = document.getElementById("prof");
var peoples = document.getElementById("peoples");

var prof_block = document.getElementsByClassName("review_prof");
var review_people_block = document.getElementsByClassName("review_people");

prof.addEventListener("click", showProf);
peoples.addEventListener("click", showPeoples);

function showProf() {
  prof.style.background = "rgba(162, 215, 248, 0.4)";
  peoples.style.background = "rgba(162, 215, 248, 0.2)";
  prof_block[0].style.display = "block";
  review_people_block[0].style.display = "none";
}

function showPeoples() {
  prof.style.background = "rgba(162, 215, 248, 0.2)";
  peoples.style.background = "rgba(162, 215, 248, 0.4)";
  prof_block[0].style.display = "none";
  review_people_block[0].style.display = "block";
}


// Youtube block 2

var video_play_2 = document.querySelectorAll(".video_2 span");
var youtube_block_2 = document.querySelectorAll(".youtube_block_2");
var youtube_video_2 = document.querySelectorAll(".youtube_block_2 iframe");
var close_icon_2 = document.querySelectorAll(".close_icon_2");


video_play_2[0].addEventListener("click", openReviewVideo);

function openReviewVideo() {
  youtube_block_2[0].style.display = "block";
  youtube_video_2[0].setAttribute("src", "https://www.youtube.com/embed/4tWl1Q7GMXI?rel=0&amp;controls=0&amp;showinfo=0;&autoplay=1")
}

close_icon_2[0].addEventListener("click", closeReviewVideo);

function closeReviewVideo() {
  youtube_block_2[0].style.display = "none";
  youtube_video_2[0].setAttribute("src", "")
}

// Window.onload end
};