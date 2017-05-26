/**** Global *****/
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;
var html = document.getElementsByTagName('html')[0];
var currentWindowWidth = 0;
var tutorialState;

if (!isMac) {
	html.classList.add('customScroll');
}

window.addEventListener('resize', setDynamicVariables);

function setDynamicVariables() { 
    currentWindowWidth = document.documentElement.clientWidth;
	windowHeight = document.documentElement.clientHeight;
}

setDynamicVariables();

// Switch block
var firstBlock = document.getElementsByClassName('firstBlock')[0];
var secondBlock = document.getElementsByClassName('secondBlock')[0];
var scrollIcon = document.getElementsByClassName('scrollIcon')[0];
var sliderAnimationState = false;
disableScroll('initSlider');

firstBlock.addEventListener('wheel', function(e) {
	if(e.deltaY > 0) {
		goToSlider();
	}
});

scrollIcon.addEventListener('click', goToSlider)

var secondBlockScroll;
var initSlider = document.getElementById('initSlider');

secondBlock.addEventListener('scroll', function(e) {
	secondBlockScroll = secondBlock.scrollTop;
});

secondBlock.addEventListener('wheel', function(e) {
	if(secondBlockScroll) {
		return;
	}
	if(e.deltaY < 0) {
		goToInitScreen();
	}
});

function goToSlider() {
	secondBlock.style.transform = 'translateZ(0) translateY(-100vh)';
	setTimeout(function() {
		enableScroll('initSlider');
		// Play animation once time
		if(!sliderAnimationState) {
			animateInitSlider();
		}
		sliderAnimationState = true;
	}, 400)
}

function goToInitScreen() {
	secondBlock.style.transform = 'translateZ(0) translateY(0)';
	disableScroll('initSlider');
}


// Mobile block
// Mobile swipe direction function from 
// https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android/23230280#23230280

firstBlock.addEventListener('touchstart', handleTouchStart, false);        
firstBlock.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;                                                        

function handleTouchStart(evt) {                                         
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var yDiff = yDown - yUp;

    if ( yDiff > 0 ) {
				goToSlider();
    }

    /* reset values */
    xDown = null;
    yDown = null;                                             
};



secondBlock.addEventListener('touchstart', handleTouchStartSecond, false);        
secondBlock.addEventListener('touchmove', handleTouchMoveSecond, false);
                                                        
var yDownSecond = null;                                                        

function handleTouchStartSecond(evt) {                                         
    xDownSecond = evt.touches[0].clientX;                                      
    yDownSecond = evt.touches[0].clientY;                                      
};                                                

function handleTouchMoveSecond(evt) {
    if ( ! yDownSecond ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var yDiff = yDownSecond - yUp;

    if ( yDiff < 0 ) { 
  		if(secondBlock.scrollTop == 0) {
  			goToInitScreen();
  		}
    }

    /* reset values */
    yDownSecond = null;                                               
};

if(currentWindowWidth <= 768) {
    window.addEventListener('load', function() {
        var initSliderBg = document.getElementsByClassName('initSliderBg')[0];
        initSliderBg.classList.add('mobileSliderStyles');
        initSliderBg.setAttribute('viewBox', '150 201 198 205');
    });
}

/***** Global end ****/


/***** Disable/enable scroll *****/

var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll(element) {
  if (element.addEventListener) // older FF
      element.addEventListener('DOMMouseScroll', preventDefault, false);
  element.onwheel = preventDefault; // modern standard
  element.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  element.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll(element) {
    if (element.removeEventListener)
        element.removeEventListener('DOMMouseScroll', preventDefault, false);
    element.onmousewheel = document.onmousewheel = null; 
    element.onwheel = null; 
    element.ontouchmove = null;  
    document.onkeydown = null;  
}

/***** Disable/enable scroll end *****/


/***** Throttle *****/

// Function that limit call count
function throttle(fn, delay) {
	var timer = null;

	return function() {
		if (timer) return;

		var args = arguments;
		timer = setTimeout(function() {
			fn.apply(undefined, args);
			timer = null;
		}, delay);
	}
}

/***** Throttle end *****/



 window.addEventListener('load', initInitScreen);

function initInitScreen() {

	var initScreen = document.getElementsByClassName('initScreen')[0];
	var paralaxWrapper = document.getElementsByClassName('paralaxWrapper');
	var x, y;
	var initTransitionState = 'slow';

	if(currentWindowWidth >= 768) {
		initScreen.addEventListener('mousemove', function(e) {
			// First transition must be slow
			if(initTransitionState == 'slow') {
				initTransitionState = 'normal';
				setTimeout(function() {
					initScreen.classList.add('setSprecialTransition');
				}, 1550);
			}
			x = e.clientX;
			y = e.clientY;
			throttle(translateObjects(x, y), 32);
		});
	}

	function translateObjects(x, y) {
		if(currentWindowWidth <= 768) {
			return
		}

		paralaxWrapper[0].style.transform = 'translate(' + ((x / 170)) + 'px,' + ((y / 150)) + 'px)';
		paralaxWrapper[1].style.transform = 'translate(' + ((x / 140)) + 'px,' + ((y / 130)) + 'px)';
		paralaxWrapper[2].style.transform = 'translate(' + ((x / 130)) + 'px,' + ((y / 120)) + 'px)';
		paralaxWrapper[3].style.transform = 'translate(' + ((x / 90)) + 'px,' + ((y / 80) )+ 'px)';
		paralaxWrapper[4].style.transform = 'translate(' + ((x / 240)) + 'px,' + ((y / 170) )+ 'px)';
	}

}
/***** Init sclider *****/

// Need to be global for basic.js

// Global
var sliderIcon = document.getElementsByClassName('sliderIcon'),
		verticalLines = document.getElementsByClassName('verticalLines'),
		iconWraper = document.getElementsByClassName('iconWraper')[0],
		sliderIconPaths = document.querySelectorAll('.sliderIcon *'),
		verticalLinesPaths = document.querySelectorAll('.verticalLines *'),
		pathLength;

// Slider nodes
var sliderControl = document.getElementsByClassName('sliderControl'),
		descriptionBlock = document.getElementsByClassName('descriptionBlock'),
		sliderIcon = document.getElementsByClassName('sliderIcon'),
		sliderContent = document.getElementsByClassName('sliderContent')[0],
		slidePoint = document.getElementsByClassName('sliderContent');

var selectTournament = document.getElementsByClassName('selectTournament')[0];

// Arrays for slider nodes
var descriptionBlocks = [],
		sliderIcons = [];

// Variables for remembering last checked slide
var activeDescription,
		activeIcon;

for( i = 0; i < descriptionBlock.length; i++ ) {
	// Save all nodes in array
	descriptionBlocks.push(descriptionBlock[i]);
	sliderIcons.push(sliderIcon[i]);
}

function setSliderState() {
	// Initial initial state for slider objects
	descriptionBlocks[0].style.transform = 'translateX(0)';
  descriptionBlocks[0].style.zIndex = '1';
  descriptionBlocks[0].style.opacity = '1';
	sliderIcons[0].classList.add('currentIcon');
}

setSliderState();

var sliderCounter = 0;
var sliderState = 'not moved';
var lastSlide;
var slideOne = document.getElementsByClassName('slideOne')[0];
var slideTwo = document.getElementsByClassName('slideTwo')[0];

sliderContent.addEventListener('click', function(event) {
	if (sliderState == 'moved') {
		return;
	}
	if(event.target.classList.contains('slidePoint')) {
		return;
	}
	sliderState = 'moved';
	lastSlide = sliderCounter;
	sliderCounter == 0 ? sliderCounter = 1 : sliderCounter = 0;

	if(sliderCounter == 0) {
		slideTwo.classList.remove('activeSlide');
		slideOne.classList.add('activeSlide');
	} else {
		slideOne.classList.remove('activeSlide');
		slideTwo.classList.add('activeSlide');
	}

	showSlide(sliderCounter, lastSlide, event.target);
	sliderIcon[lastSlide].classList.remove('showIcon');
	sliderIcon[sliderCounter].classList.add('showIcon');
});

function showSlide(nextSlide, lastSlide, target) {
	if(!target.classList.contains('back')) {
		showOne(nextSlide, lastSlide);
	} else {
		// Go back with special transition
		showTwo(nextSlide, lastSlide);
	}

	setTimeout(function() {
		sliderState = 'not moved';
	}, 630)
}

function showOne(nextSlide, lastSlide) {
	descriptionBlock[lastSlide].style.transform = 'translateX(-10px)';
	descriptionBlock[lastSlide].style.opacity = '0';
	descriptionBlock[nextSlide].style.transform = 'translateX(10px)';

	setTimeout(function() {
		descriptionBlock[nextSlide].style.opacity = '1';
		descriptionBlock[nextSlide].style.transform = 'translateX(0)';
	}, 310);
}

function showTwo(nextSlide, lastSlide) {
	descriptionBlock[lastSlide].style.transform = 'translateX(10px)';
	descriptionBlock[lastSlide].style.opacity = '0';
	descriptionBlock[nextSlide].style.transform = 'translateX(-10px)';

	setTimeout(function() {
		descriptionBlock[nextSlide].style.opacity = '1';
		descriptionBlock[nextSlide].style.transform = 'translateX(0)';
	}, 310);
}

function animateInitSlider() {
	// window.removeEventListener('scroll', animateInitSlider);
	for( i = 0; i < sliderContent.length; i++ ) {
		sliderContent[i].classList.add('showSlideContent');
	}
	sliderIcon[0].classList.add('showIcon');
	verticalLines[0].classList.add('showVerticalLines');
	iconWraper.classList.add('showWraper');
	selectTournament.style.transform = 'translateY(0)';
}

var initSliderBg = document.getElementsByClassName('initSliderBg')[0];

// Slider content nodes
var sliderContent = document.querySelectorAll('.contentTitle, .sliderDescriptions')

// Move vector pictures of slider
if(currentWindowWidth >= 768) {
	initSlider.addEventListener('mousemove', throttle(moveSliderSvg, 32));
}

for( i = 0; i < sliderIconPaths.length; i++ ) {
	pathLength = sliderIconPaths[i].getTotalLength();
	sliderIconPaths[i].style.strokeDasharray = pathLength;
	sliderIconPaths[i].style.strokeDashoffset = pathLength;
}

for( i = 0; i < verticalLinesPaths.length; i++ ) {
	pathLength = verticalLinesPaths[i].getTotalLength();
	verticalLinesPaths[i].style.strokeDasharray = pathLength;
	verticalLinesPaths[i].style.strokeDashoffset = pathLength;
}

var starsAndCircles = document.getElementsByClassName('starsAndCircles')[0],
		layer0 = document.getElementsByClassName('layer0')[0],
		layer1 = document.getElementsByClassName('layer1')[0],
		layer2 = document.getElementsByClassName('layer2')[0],
		layer3 = document.getElementsByClassName('layer3')[0],
		translateLayer = document.getElementsByClassName('translateLayer');

var xPos,
		yPos;

function translate(x, y) {
	// 'rotate' - for FF subpixel animations, see for more info:
	// https://jsfiddle.net/ryanwheale/xkxwN/
	// and http://webcache.googleusercontent.com/search?q=cache:http://gielberkers.com/how-to-fix-shaking-css-transitions-in-firefox/&gws_rd=cr&ei=ee2zVPKYLMaVuATV-IDQBw
	return 'translate(' + x + 'px,' + y + 'px) rotate(.0001deg)';
}

function moveSliderSvg(event) {
	if(currentWindowWidth <= 768) {
		return
	}
	xPos = event.clientX;
	yPos = event.clientY;
	layer0.style.transform = translate(xPos / 120, yPos / 90);
	layer1.style.transform = translate(xPos / 100, yPos / 70);
	layer2.style.transform = translate(xPos / 80, yPos / 100);
	layer3.style.transform = translate(xPos / 70, yPos / 40);
}


/***** Init screen end *****/


/***** Select tournaments *****/

window.addEventListener('load', initSelectTournament);

function initSelectTournament() {

	var selectButton = document.getElementsByClassName('selectButton')[0],
			close = document.getElementsByClassName('closeTournaments')[0],
			tournamentList = document.getElementsByClassName('tournamentList')[0],
			popupsToning = document.getElementsByClassName('popupsToning')[0],
			tournamentOpened = false,
			openTournamentsButton = document.getElementById('openTournaments');

	close.addEventListener('click', closeTournaments);
	selectButton.addEventListener('click', openTournaments);

	openTournamentsButton.addEventListener('click', openTournamentsFromTutorial);

	function openTournamentsFromTutorial() {
		tournamentList.classList.add('showTournamentList');
		tournamentList.style.zIndex = '7';
	}

	function openTournaments() {
		tournamentList.classList.add('showTournamentList');
		tournamentList.style.zIndex = '7';
	}

	function closeTournaments() {
		tournamentList.classList.remove('showTournamentList');
		setTimeout(function() {
			if(tutorialState != 'opened') {
				tournamentList.style.zIndex = '-1';
			}
		}, 220);
	}

	function hideTournamentsEsc(closeEvent) {
		if( closeEvent.keyCode == 27) {
			closeTournaments();
		}
	}

	window.addEventListener('keydown', hideTournamentsEsc);

}

/***** Select tournaments end *****/



/***** Tutorial *****/

window.addEventListener('load', initTutorial);

function initTutorial() {
	
	var howToButton = document.getElementsByClassName('howToButton')[0],
			tutorial = document.getElementsByClassName('tutorial')[0],
			close = document.getElementsByClassName('close')[0],
			parallaxBlock = document.getElementsByClassName('parallax')[0],
			tutorialOpen = false,
			slideContent = document.getElementsByClassName('slideContent'),
			initIcon = document.getElementsByClassName('initIcon')[0],
			slideTitle = document.getElementsByClassName('slideTitle'),
			sliderNumber = document.getElementsByClassName('sliderNumber'),
			selectButton = document.getElementsByClassName('select')[0],
			icon = document.getElementsByClassName('icon')[0],
			initSlide = document.getElementById('initSlide'),
			sliderCount = slideContent.length,
			iconsBlock = document.getElementsByClassName('icons')[0],
			translatedIcon = document.getElementsByClassName('translatedIcon'),
			slideBg = document.getElementsByClassName('slideBg'),
			x, y,
			initTransitionState = 'slow';

	tutorial.addEventListener('mousemove', function(e) {
		if(initTransitionState == 'slow') {
			setTimeout(function() {
				iconsBlock.classList.add('setNormalTransition');
			}, 1500);
		}
		initTransitionState = 'normal';
		x = e.clientX;
		y = e.clientY;
		throttle(translateIcons(x, y), 32);
	})

	function translateIcons(x, y) {
		translatedIcon[2].style.transform = 'translateZ(0) translate(' + (x / 90) + 'px,' + (y / 90) + 'px)';
		translatedIcon[3].style.transform = 'translateZ(0) translate(' + (x / 90) + 'px,' + (y / 90) + 'px)';
		translatedIcon[0].style.transform = 'translateZ(0) translate(' + (x / 140) + 'px,' + (y / 140) + 'px)';
		translatedIcon[1].style.transform = 'translateZ(0) translate(' + (x / 130) + 'px,' + (y / 130) + 'px)';
		translatedIcon[4].style.transform = 'translateZ(0) translate(' + (x / 140) + 'px,' + (y / 140) + 'px)';

		slideBg[0].style.transform = 'translateZ(0) translate(' + (x / 140) + 'px,' + (y / 140) + 'px)';
		slideBg[1].style.transform = 'translateZ(0) translate(' + (x / 140) + 'px,' + (y / 140) + 'px)';
		slideBg[2].style.transform = 'translateZ(0) translate(' + (x / 140) + 'px,' + (y / 140) + 'px)';
		slideBg[3].style.transform = 'translateZ(0) translate(' + (x / 140) + 'px,' + (y / 140) + 'px)';

		icon.style.transform = 'translateZ(0) translate(' + (x / 90) + 'px,' + (y / 90) + 'px)';
	}

	howToButton.addEventListener('click', showTutorial);
	close.addEventListener('click', hideTutorial);
	window.addEventListener('keydown', hideTutorialEsc);

	function showTutorial() {
		tutorialOpen = true;
		slideTitle[0].style.transform = 'translateZ(0) translateY(0)';
		
		tutorial.classList.add('showTutorial');
		tutorial.style.zIndex = '6';

		setTimeout(function() {
			circleWrapper.classList.add('showCircleWrapper');
			linesWrapper.classList.add('showLinesWrapper');
			tutorialIcon[0].classList.add('showIcon');
		}, 800);
	}

	function hideTutorial() {

		tutorial.classList.remove('showTutorial');
		setTimeout(function() {
			tutorial.style.zIndex = '-1';
		}, 220)

		tutorialOpen = false;
		tutorialState = 'closed';
	}

	function hideTutorialEsc(closeEvent) {
		// Do something only when tutorial open
		if(tutorialOpen == false) {
			return false;
		}
		if( closeEvent.keyCode == 27) {
			hideTutorial();
		}
		tutorialState = 'closed';
	}

	var tutorial = document.getElementsByClassName('tutorial')[0],
			track = document.getElementsByClassName('track')[0],
			windowHeight = document.documentElement.clientHeight,
			scrollTotal = 0,
			itNotMove = true,
			trackHeight = parseInt(getComputedStyle(track).height, 10),
			sliderCounter = 0,
			indicator = document.getElementsByClassName('indicator'),
			tutorialIcon = document.getElementsByClassName('tutorialIcon');

	slideContent[0].style.opacity = '1';
	slideContent[0].style.transform = 'translateZ(0) translateY(0)';

	window.addEventListener('resize', refreshDynamicVariables);

	function refreshDynamicVariables() {
		windowHeight = document.documentElement.clientHeight;
	}

	var delayX = 50;
	var timeoutX = null;
	tutorial.addEventListener('wheel', function(eventY){
		clearTimeout(timeoutX);
	  timeoutX = setTimeout(function(){
	  	this.eventY = eventY;
	  	wheelChangeSlide(eventY);
	  }, delayX);
	});

	window.addEventListener('keydown', arrowChangeSlide);

	function wheelChangeSlide(wheelEvent) {
		// Do something only when tutorial open
		if(tutorialOpen == false) {
			return false;
		}

		// Manipulate slider only when slider not move
		if(itNotMove) {
			tutorial.removeEventListener('wheel', wheelChangeSlide);
			// If we scroll down
			if(wheelEvent.deltaY > 0 ) {
				if(sliderCounter >= 3) {
					return false;
				}
				// Block scroll when slider moving
				blockScroll();
				// Set actual slider number
				sliderCounter++;
				goAhead(sliderCounter);
			}
			// If we scroll up
			if(wheelEvent.deltaY < 0 ) {
				if(sliderCounter < 1) {
					return false;
				}
				// Block scroll when slider moving
				blockScroll();
				// Set actual slider number
				sliderCounter--;
				goBack(sliderCounter);
			}
			if(sliderCounter >= 3) {
				selectButton.style.pointerEvents = 'auto';
			} else {
				selectButton.style.pointerEvents = 'none';
			}
		}
	}

	function arrowChangeSlide(arrowEvent) {
		// Do something only when tutorial open
		if(tutorialOpen == false) {
			return false;
		}
		// Manipulate slider only when slider not move
		if(itNotMove) {
			// When we scroll down
			if( arrowEvent.keyCode == 40) {
				// If we scroll more than bottom limit
				if(sliderCounter >= 3) {
					return false;
				}
				// Block scroll when slider moving
				blockScroll();
				// Set actual slider number
				sliderCounter++;
				goAhead(sliderCounter);
			}
			// When we scroll up
			if( arrowEvent.keyCode == 38 ) {
				// If we scroll more than top limit
				if(sliderCounter < 1) {
					return false;
				}
				// Block scroll when slider moving
				blockScroll();
				// Set actual slider number
				sliderCounter--;
				goBack(sliderCounter);
			}
		}
		if(sliderCounter >= 3) {
			selectButton.style.pointerEvents = 'auto';
		} else {
			selectButton.style.pointerEvents = 'none';
		}
	}

	function blockScroll() {
		itNotMove = false;
		setTimeout(function() {
			itNotMove = true;
			tutorial.addEventListener('wheel', wheelChangeSlide);
		}, 1000);
	}

	function goAhead(i) {
		// Set active state for progress line
		indicator[i].classList.add('active');
		// Set state for current slide - 1
		indicator[i - 1].classList.add('previous');

		// Show current slide and hide previous
		slideBg[i].style.zIndex = '1';
		slideBg[i].style.opacity = '1';

		// Show current icon and hide previous
		tutorialIcon[i - 1].classList.remove('currentIcon');
		tutorialIcon[i].classList.add('currentIcon');
		tutorialIcon[i - 1].classList.remove('showIcon');
		tutorialIcon[i].classList.add('showIcon');

		setTimeout(function() {
			slideContent[i].style.opacity = '1';
			slideTitle[i].style.transform = 'translateZ(0) translateY(0)';
			sliderNumber[i].style.transform = 'translateZ(0) translateY(0)';
		}, 250);
		slideContent[i - 1].style.opacity = '0';
		setTimeout(function() {
			slideTitle[i - 1].style.transform = 'translateZ(0) translateY(-10px)';
			sliderNumber[i - 1].style.transform = 'translateZ(0) translateY(-10px)';
		}, 250);

		if ((sliderCounter + 1) == sliderCount) {
			setTimeout(function() {
				selectButton.style.transform = 'translateY(0)';
			}, 250)
		}

	}

	function goBack(i) {
		indicator[i].classList.add('active');
		indicator[i].classList.remove('previous');
		indicator[i + 1].classList.remove('active');
		indicator[i + 1].classList.remove('previous');

		// Timeout need for transition effect
		setTimeout(function() {
			slideBg[i + 1].style.zIndex = '0';
		}, 250)
		slideBg[i + 1].style.opacity = '0';

		tutorialIcon[i].classList.add('currentIcon');
		tutorialIcon[i].classList.add('showIcon');
		tutorialIcon[i + 1].classList.remove('currentIcon');
		tutorialIcon[i + 1].classList.remove('showIcon');

		setTimeout(function() {
			slideContent[i].style.opacity = '1';
			slideTitle[i].style.transform = 'translateZ(0) translateY(0)';
			sliderNumber[i].style.transform = 'translateZ(0) translateY(0)';
		}, 250)
		slideContent[i + 1].style.opacity = '0';
		setTimeout(function() {
			slideTitle[i + 1].style.transform = 'translateZ(0) translateY(10px)';
			sliderNumber[i + 1].style.transform = 'translateZ(0) translateY(10px)';
		}, 250);

		if ((sliderCounter) == sliderCount - 2) {
			selectButton.style.transform = 'translateY(20px)';
		}
	}

	// Icon animation
	var tutorialIconPaths = document.querySelectorAll('.tutorialIcon *'),
			circleWrapper = document.getElementsByClassName('circleWrapper')[0],
			linesWrapper = document.getElementsByClassName('linesWrapper')[0],
			linesWrapperPaths = document.querySelectorAll('.linesWrapper *');

	for( i = 0; i < tutorialIconPaths.length; i++ ) {
		pathLength = tutorialIconPaths[i].getTotalLength();
		tutorialIconPaths[i].style.strokeDasharray = pathLength;
		tutorialIconPaths[i].style.strokeDashoffset = pathLength;
	}

	for( i = 0; i < linesWrapperPaths.length; i++ ) {
		pathLength = linesWrapperPaths[i].getTotalLength();
		linesWrapperPaths[i].style.strokeDasharray = pathLength;
		linesWrapperPaths[i].style.strokeDashoffset = pathLength;
	}

}

/***** Tutorial end *****/


/***** Tournament list *****/

window.addEventListener('load', initTournamentList);

function initTournamentList() {
	var tournament = document.getElementsByClassName('tournament'),
			tournamentBlock = document.getElementsByClassName('tournamentBlock')[0],
			tournamentList = document.getElementsByClassName('tournamentList')[0],
			introText = document.getElementById('introText'),
			introduction = document.getElementsByClassName('introduction')[0],
			list = document.getElementsByClassName('list')[0],
			goBack = document.getElementsByClassName('goBack')[0],
			tournamentTitle = document.getElementsByClassName('tournamentTitle')[0],
			translatedBg = document.getElementsByClassName('translatedBg')[0],
			selectTournamentTitle = document.getElementsByClassName('selectTournamentTitle'),
			x, y;

	var tournamentTarget;

	tournamentList.addEventListener('mousemove', function(e) {
		x = e.clientX;
		y = e.clientY;

		throttle(translateObjects(x, y), 42)
	});

	function translateObjects(x, y) {
		translatedBg.style.transform = 'translate(' + ((x / 190)) + 'px,' + ((y / 170)) + 'px)';
		introText.style.transform = 'translate(' + ((x / 150)) + 'px,' + ((y / 110)) + 'px)';
	}

	for ( i = 0; i < tournament.length; i++ ) {
		selectTournamentTitle[i].addEventListener('click', function() {
			tournamentTarget = this;
			tournamentTarget.classList.toggle('open');
			tournamentTarget.parentNode.classList.toggle('goToTop');
			if(tournamentTarget.parentNode.classList.contains('goToTop')) {
				this.parentNode.style.zIndex = '10';
			}
			if(!tournamentTarget.parentNode.classList.contains('goToTop')) {
				setTimeout(function() {
					tournamentTarget.parentNode.style.zIndex = '0';
				}, 300)
			}
		})
	}
}

/***** Tournament list end *****/


