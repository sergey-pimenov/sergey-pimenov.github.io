/***** Detect visibility *****/

function checkVisible(elm) {

  var rect = elm.getBoundingClientRect();
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);

  function detectVisible() {
  	return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
  }

  return detectVisible();
}

function detectVisibility(element, doWhenVisible, listenerName) {
	var counterOfVeiw = 0;

	listenerName = window.addEventListener('scroll', function() {
    if(counterOfVeiw == 0 && checkVisible(element)) {
      doWhenVisible();
      counterOfVeiw = 1;
    } 
    if (counterOfVeiw > 0) {
    	window.removeEventListener('scroll', listenerName);
    }
  });
}

/***** Detect visibility end *****/
// Scroll to element
function doScrolling(elementY, duration) { 
  var startingY = window.pageYOffset;
  var diff = elementY.offsetTop - startingY;
  var start;

  // Bootstrap our animation - it will get called right before next frame shall be rendered.
  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp
    // Elapsed miilseconds since start of scrolling.
    var time = timestamp - start
    // Get percent of completion in range [0, 1].
    var percent = Math.min(time / duration, 1)

    window.scrollTo(0, startingY + diff * percent)
    console.log(1)

    // Proceed with animation as long as we wanted it to.
    if (time < duration) {
      window.requestAnimationFrame(step)
    }
  })
}

// Scroll to position
function doScrollingToPos(yPos, duration, callback) { 
  var startingY = window.pageYOffset;
  var diff = yPos - startingY;
  var start;

  // Bootstrap our animation - it will get called right before next frame shall be rendered.
  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp
    // Elapsed miilseconds since start of scrolling.
    var time = timestamp - start
    // Get percent of completion in range [0, 1].
    var percent = Math.min(time / duration, 1)

    window.scrollTo(0, startingY + diff * percent)

    // Proceed with animation as long as we wanted it to.
    if (time < duration) {
      window.requestAnimationFrame(step)
    } else {
      callback && callback();
    }
  })
}
// Disable/enable scroll

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

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}
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

window.addEventListener('load', initScreen);

function initScreen() {

	// Detect Safari
	//var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
	//var isSafariTwo = /constructor/i.test(function HTMLElementConstructor() {});

	var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

	var player_1 = document.getElementsByClassName('player-1')[0],
			bg = document.getElementsByClassName('bg')[0],
			player_2 = document.getElementsByClassName('player-2')[0],
			ball = document.getElementsByClassName('ball')[0],
			bg_players = document.getElementsByClassName('bg-players')[0],
			grass = document.getElementsByClassName('grass')[0],
			parallaxBlock = document.getElementsByClassName('parallax')[0],
			initScreen = document.getElementsByClassName('initScreen')[0],
			translateWrapper = document.getElementsByClassName('translateWrapper'),
			paralaxedNode = document.getElementsByClassName('paralaxedNode');

	var yOffset;
	var currentScale, defaultScale = 0;
	var windowHeight = document.documentElement.clientHeight;
	var start = 0;
	var end = windowHeight * 4;

	// Reset variables that depend on window size
	window.addEventListener('resize', function() {
		Offset = window.pageYOffset;
		windowHeight = document.documentElement.clientHeight;
		end = windowHeight * 4;
	});

	//initScreen.addEventListener('mousemove', moveInitScreenElements);

	function moveInitScreenElements(event) {
		translateWrapper[1].style.transform = 'translateZ(0) translate(' + event.clientX / -170 + 'px,' + event.clientY / -110 + 'px)';
		translateWrapper[3].style.transform = 'translateZ(0) translate(' + event.clientX / -150 + 'px,' + event.clientY / -100 + 'px)';
		translateWrapper[4].style.transform = 'translateZ(0) translate(' + event.clientX / 150 + 'px,' + event.clientY / 100 + 'px)';
		translateWrapper[5].style.transform = 'translateZ(0) translate(' + event.clientX / -100 + 'px,' + event.clientY / -90 + 'px)';
	}

	window.addEventListener('scroll', throttle(parallaxAnim, 16));

	// Set parallax for nodes
	function parallaxAnim() {
		yOffset = window.pageYOffset;

		scaleElement(grass, 0.1);
		scaleElement(ball, 0.11);
		scaleElement(player_1, 0.09);
		scaleElement(player_2, 0.05);
		scaleElement(bg_players, 0.01);

	}

	function scaleElement(element, scaleShift) {
		shift = (yOffset - start) * (scaleShift - defaultScale) / end;
		currentScale = defaultScale + shift;
		// Magic value '5px' need for fix bug in FF
		element.style.transform = 'translateZ(0) scale(' + (1 + currentScale) + ')';
	}

	// Magic parallax function
	function parallax(element, x, y, z) {
		// Detect scroll
		yOffset = window.pageYOffset;
		// Move elements x/y/z axis
		element.style.transform = 'translate3d('+ yOffset / x + 'px,' + yOffset / y + 'px,' + yOffset / z + 'px)';
	}

	setTimeout( function() {
		if(window.pageYOffset == 0) {
			console.log(window.pageYOffset)
			if(!isSafari) {
				doScrollingToPos(document.documentElement.clientHeight, 800);
			} else {
				window.scrollTo(0, document.documentElement.clientHeight);
			}
		}

		setTimeout(function() { // Change transition when we do initial scroll
			for( i = 0; i < paralaxedNode.length; i++ ) {
				paralaxedNode[i].style.transition = 'transform 0.25s linear';
			}
		}, 2300)
	}, 0);

	// Hide slider
	var initSlider = document.getElementById('initSlider'),
			toning = document.getElementsByClassName('secondToning')[0],
			currentYOffset,
			scrollPosition = 'onSlider',
			scrollIcon = document.getElementsByClassName('scrollIcon')[0],
			scrollWithScrollIcon = false;

	if(!isSafari) {
		scrollIcon.addEventListener('click', function() {
			scrollWithScrollIcon = true;
			doScrolling(initSlider, 1000);
			setTimeout(function() {
				scrollWithScrollIcon = false;
			}, 1100)
		});
	} else {
		scrollIcon.style.cursor = 'auto';
	}

	// Run toning function when we see slider
	detectVisibility(initSlider, hideInitScreen, 'initSliderListener');

	function hideInitScreen() {
		// Set throttle for limit hideScreen function
		window.addEventListener('scroll', throttle(toningScreen, 16));
	}

	var currentOpacity, defaultOpacity = 0, finalOpacity = 1;
	var windowHeight = document.documentElement.clientHeight;
	var fadeOutStartYOffset = windowHeight * 2.5;
	var fadeOutDurationOffset = windowHeight * 1.5;
	var yStep = 0;
	var scrollState = false;

	function toningScreen() {
		currentYOffset = window.pageYOffset;
		opacityShift = (currentYOffset - fadeOutStartYOffset) * (finalOpacity - defaultOpacity) / fadeOutDurationOffset;
		currentOpacity = defaultOpacity + opacityShift;
		if(currentOpacity >= defaultOpacity) {
			toning.style.opacity = currentOpacity;
		}
	}

	if(!isSafari) window.addEventListener("scroll", goToSlider, false);

	var currentYScroll;
	var lastScrollTop = 0;

	function goToSlider() {
		if(scrollWithScrollIcon) {
			return;
		}
		var st = window.pageYOffset || document.documentElement.scrollTop;
		if (st > lastScrollTop){ // Detect scroll down
			 	if (st > windowHeight * 3 && st < windowHeight * 4) {
			 		console.log('scroll down');

			 		window.removeEventListener('scroll', goToSlider);
					disableScroll();
					doScrollingToPos(windowHeight * 4, 500)

					setTimeout(function(){
						enableScroll();
						window.addEventListener('scroll', goToSlider);
					}, 500)
			 	}
   	}
	   lastScrollTop = st;
	}

}
/**** Slider script *****/

window.addEventListener('load', initSliders);

function initSliders() {

	var initSlider = document.getElementById('initSlider');

	// Slider nodes
	var sliderControl = document.getElementsByClassName('sliderControl'),
			descriptionBlock = document.getElementsByClassName('descriptionBlock'),
			sliderIcon = document.getElementsByClassName('sliderIcon');

	// Arrays for slider nodes
	var sliderControls = [],
			descriptionBlocks = [],
			sliderIcons = [];

	// Variables for remembering last checked slide
	var activeControl,
			activeDescription,
			activeIcon;

	for( i = 0; i < sliderControl.length; i++ ) {
		// Save all nodes in array
		sliderControls.push(sliderControl[i]);
		descriptionBlocks.push(descriptionBlock[i]);
		sliderIcons.push(sliderIcon[i]);

		// Set click-listener for all controls
		sliderControl[i].addEventListener('click', changeSliderContent);

	}

	// Set current slider
	var currentSlider = 0;

	function setSliderState() {
		// Initial initial state for slider objects
		sliderControl[currentSlider].classList.add('active');
		descriptionBlocks[currentSlider].style.transform = 'translateY(0)';
    descriptionBlocks[currentSlider].style.zIndex = '1';
    descriptionBlocks[currentSlider].style.opacity = '1';
		sliderIcons[currentSlider].classList.add('currentIcon');

		// Set initial active objects
		activeControl = sliderControl[currentSlider];
		activeDescription = descriptionBlocks[currentSlider];
		activeIcon = sliderIcons[currentSlider];
	}

	setSliderState();

	function changeSliderContent(event) {
		// Detect count of slider that was clicked
    var target = event.target;
    var parent = target.parentNode;
    for ( var i = 0; i < parent.children.length; i++ ) {
    	if ( parent.children[i] == target ) {
    		currentSlider = i;
    	}
    }

		// Remove active/visible state from last checked slide
		activeControl.classList.remove('active');
    activeDescription.style.transition = 'transform 0.3s 0.3s linear, opacity 0.3s linear';
    activeDescription.style.transform = 'translateY(10px)';
    activeDescription.style.zIndex = '-1';
    activeDescription.style.opacity = '0';
    activeIcon.classList.remove('showIcon');

		// Add active state for control and show new slide content
		this.classList.add('active');

    /////////descriptionBlocks[currentSlider].classList.add('currentDescription');
    setTimeout(function() {
    	activeDescription.style.transition = 'transform 0.3s linear, opacity 0.3s linear';
    	descriptionBlocks[currentSlider].style.transform = 'translateY(0)';
    	descriptionBlocks[currentSlider].style.zIndex = '1';
    	descriptionBlocks[currentSlider].style.opacity = '1';
    }, 300)

    // sliderIcons[currentSlider].classList.add('currentIcon');
    sliderIcon[currentSlider].classList.add('showIcon');

		// Remember checked slide control and slide content
		activeControl = this;
    activeDescription = descriptionBlocks[currentSlider];
    activeIcon = sliderIcons[currentSlider];
	}

	// Slider left-aside background
	var initSliderBg = document.getElementsByClassName('initSliderBg')[0];

	// Slider content nodes
	var sliderContent = document.querySelectorAll('.contentTitle, .sliderDescriptions')
	var sliderControls = document.getElementById('sliderControls');

	// Show slider content when user scroll to it
	detectVisibility(sliderControls, animateInitSlider, 'sliderControlsListener');

	function animateInitSlider() {
		for( i = 0; i < sliderContent.length; i++ ) {
			sliderContent[i].classList.add('showSlideContent');
		}
		// initSliderBg.classList.add('showSliderBg');
		sliderIcon[0].classList.add('showIcon');
		verticalLines[0].classList.add('showVerticalLines');
		iconWraper.classList.add('showWraper');

	}

	// Slider animation
	var sliderIcon = document.getElementsByClassName('sliderIcon'),
			verticalLines = document.getElementsByClassName('verticalLines'),
			iconWraper = document.getElementsByClassName('iconWraper')[0],
			sliderIconPaths = document.querySelectorAll('.sliderIcon *'),
			verticalLinesPaths = document.querySelectorAll('.verticalLines *'),
			pathLength;

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

	// document.addEventListener('click', function() {
	// 	for( i = 0; i < verticalLines.length; i++ ) {
	// 		verticalLines[i].classList.add('showVerticalLines');
	// 	}
	// });


	var starsAndCircles = document.getElementsByClassName('starsAndCircles')[0],
			layer0 = document.getElementsByClassName('layer0')[0],
			layer1 = document.getElementsByClassName('layer1')[0],
			layer2 = document.getElementsByClassName('layer2')[0],
			layer3 = document.getElementsByClassName('layer3')[0],
			translateLayer = document.getElementsByClassName('translateLayer');

	initSlider.addEventListener('mousemove', throttle(moveSliderSvg, 16));

	var xPos,
			yPos;

	function translate(x, y) {
		// 'rotate' - for FF subpixel animations, see for more info:
		// https://jsfiddle.net/ryanwheale/xkxwN/
		// and http://webcache.googleusercontent.com/search?q=cache:http://gielberkers.com/how-to-fix-shaking-css-transitions-in-firefox/&gws_rd=cr&ei=ee2zVPKYLMaVuATV-IDQBw
		return 'translate(' + x + 'px,' + y + 'px) rotate(.0001deg)';
	}

	function moveSliderSvg(event) {
		xPos = event.clientX;
		yPos = event.clientY;
		console.log(yPos);

		layer0.style.transform = translate(xPos / -120, yPos / -90);
		layer1.style.transform = translate(xPos / -100, yPos / -70);
		layer2.style.transform = translate(xPos / -80, yPos / -50);
		layer3.style.transform = translate(xPos / -70, yPos / -40);
	}


}

/**** Slider script end *****/
window.addEventListener('load', initSelectTournament);

function initSelectTournament() {

	var selectButton = document.getElementsByClassName('selectButton')[0],
			close = document.getElementsByClassName('closeTournaments')[0],
			tournamentList = document.getElementsByClassName('tournamentList')[0],
			tournamentOpened = false;

	close.addEventListener('click', closeTournaments);
	selectButton.addEventListener('click', openTournaments);

	function openTournaments() {
		tournamentOpened = true;
		tournamentList.classList.toggle('showTournamentList');
		document.body.style.overflow = 'hidden';
	}

	function closeTournaments() {
		tournamentOpened = false;
		tournamentList.classList.toggle('showTournamentList');
		document.body.style.overflow = 'visible';
	}

	function hideTournamentsEsc(closeEvent) {
		// Do something only when tutorial open
		if(tournamentOpened == false) {
			return false;
		}
		if( closeEvent.keyCode == 27) {
			closeTournaments();
		}
	}

	window.addEventListener('keydown', hideTournamentsEsc);

}

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
			initSlide = document.getElementById('initSlide');
			//slideBgIcon = document.querySelectorAll('.slideBg .icon')
			// slideBgIcon1 = document.querySelectorAll('.slideBg .icon')[0],
			// slideBgIcon2 = document.querySelectorAll('.slideBg .icon')[1],
			// slideBgIcon3 = document.querySelectorAll('.slideBg .icon')[2],
			// slideBgIcon4 = document.querySelectorAll('.slideBg .icon')[3],
			// slideBgIcon5 = document.querySelectorAll('.slideBg .icon')[4];

	function moveSlideBgIcon(event) {
		slideBgIcon1.style.transform = 'translateZ(0) translate(' + event.clientX / -150 + 'px,' + event.clientY / -150 + 'px)';
		slideBgIcon2.style.transform = 'translateZ(0) translate(' + event.clientX / -140 + 'px,' + event.clientY / -130 + 'px)';
		slideBgIcon3.style.transform = 'translateZ(0) translate(' + event.clientX / -130 + 'px,' + event.clientY / 120 + 'px)';
		slideBgIcon4.style.transform = 'translateZ(0) translate(' + event.clientX / -120 + 'px,' + event.clientY / 100 + 'px)';
		slideBgIcon5.style.transform = 'translateZ(0) translate(' + event.clientX / -110 + 'px,' + event.clientY / 90 + 'px)';
	}

	howToButton.addEventListener('click', showTutorial);
	close.addEventListener('click', hideTutorial);
	window.addEventListener('keydown', hideTutorialEsc);

	function showTutorial() {
		tutorial.classList.add('showTutorial');
		document.body.style.overflow = 'hidden';
		tutorialOpen = true;
		slideTitle[0].style.transform = 'translateZ(0) translateY(0)';

		// Init animation
		setTimeout(function() {
			circleWrapper.classList.add('showCircleWrapper');
			linesWrapper.classList.add('showLinesWrapper');
			initIcon.classList.add('showInitIcon');
		}, 500);

		// setTimeout(function() {
		// 	initSlide.classList.add('showBgIcons');
		// }, 10);

		setTimeout(function() {
			for( i = 0; i < slideBgIcon.length; i++ ) {
				slideBgIcon[i].style.transition = 'transform 0.3s linear';
			}
			// window.addEventListener('mousemove', moveSlideBgIcon);
		}, 4000)
	}

	function hideTutorial() {
		document.body.style.overflow = 'visible';

		tutorial.classList.remove('showTutorial');
		tutorialOpen = false;

		// circleWrapper.classList.remove('showCircleWrapper');
		// linesWrapper.classList.remove('showLinesWrapper');
		// tutorialIcon[0].classList.remove('showIcon');
	}

	function hideTutorialEsc(closeEvent) {
		// Do something only when tutorial open
		if(tutorialOpen == false) {
			return false;
		}
		if( closeEvent.keyCode == 27) {
			hideTutorial();
		}
	}

	var tutorial = document.getElementsByClassName('tutorial')[0],
			track = document.getElementsByClassName('track')[0],
			windowHeight = document.documentElement.clientHeight,
			scrollTotal = 0,
			itNotMove = true,
			trackHeight = parseInt(getComputedStyle(track).height, 10),
			sliderCounter = 0,
			indicator = document.getElementsByClassName('indicator'),
			slideBg = document.getElementsByClassName('slideBg'),
			tutorialIcon = document.getElementsByClassName('tutorialIcon');

	tutorialIcon[0].classList.add('showIcon');
	slideContent[0].style.opacity = '1';
	slideContent[0].style.transform = 'translateZ(0) translateY(0)';

	window.addEventListener('resize', refreshDynamicVariables);

	function refreshDynamicVariables() {
		windowHeight = document.documentElement.clientHeight;
	}

	tutorial.addEventListener('wheel', wheelChangeSlide);
	// Detect when slider stoped and unblocking scroll
	// track.addEventListener('transitionend', trackStoped);
	// Work only when slider open
	window.addEventListener('keydown', arrowChangeSlide);

	function wheelChangeSlide(wheelEvent) {
		// Do something only when tutorial open
		if(tutorialOpen == false) {
			return false;
		}
		// Manipulate slider only when slider not move
		if(itNotMove) {
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
	}

	function blockScroll() {
		itNotMove = false;
		setTimeout(function() {
			itNotMove = true;
		}, 1000)
	}

	function scrollUp() {
		//scrollTotal = scrollTotal - windowHeight;
		//track.style.transform = 'translateY(-' + scrollTotal + 'px)';
	}

	function scrollDown() {
		//scrollTotal = scrollTotal + windowHeight;
		//track.style.transform = 'translateZ(0) translateY(-' + scrollTotal + 'px)';
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
		}, 500);
		slideContent[i - 1].style.opacity = '0';
		setTimeout(function() {
			slideTitle[i - 1].style.transform = 'translateZ(0) translateY(-10px)';
			sliderNumber[i - 1].style.transform = 'translateZ(0) translateY(-10px)';
		}, 500);
	}

	function goBack(i) {
		indicator[i].classList.add('active');
		indicator[i].classList.remove('previous');
		indicator[i + 1].classList.remove('active');
		indicator[i + 1].classList.remove('previous');

		// Timeout need for transition effect
		setTimeout(function() {
			slideBg[i + 1].style.zIndex = '0';
		}, 500)
		slideBg[i + 1].style.opacity = '0';

		tutorialIcon[i].classList.add('currentIcon');
		tutorialIcon[i].classList.add('showIcon');
		tutorialIcon[i + 1].classList.remove('currentIcon');
		tutorialIcon[i + 1].classList.remove('showIcon');

		setTimeout(function() {
			slideContent[i].style.opacity = '1';
			slideTitle[i].style.transform = 'translateZ(0) translateY(0)';
			sliderNumber[i].style.transform = 'translateZ(0) translateY(0)';
		}, 500)
		slideContent[i + 1].style.opacity = '0';
		setTimeout(function() {
			slideTitle[i + 1].style.transform = 'translateZ(0) translateY(10px)';
			sliderNumber[i + 1].style.transform = 'translateZ(0) translateY(10px)';
		}, 500);
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
window.addEventListener('load', initTournamentList);

function initTournamentList() {
	var tournament = document.getElementsByClassName('tournament'),
			tournamentBlock = document.getElementsByClassName('tournamentBlock')[0],
			introText = document.getElementById('introText'),
			introduction = document.getElementsByClassName('introduction')[0],
			list = document.getElementsByClassName('list')[0],
			goBack = document.getElementsByClassName('goBack')[0],
			tournamentTitle = document.getElementsByClassName('tournamentTitle')[0];

	for ( i = 0; i < tournament.length; i++ ) {
		tournament[i].addEventListener('click', function() {
			tournamentBlock.style.display = 'block';
			introText.style.display = 'none';
			introduction.innerHTML += '<div class="tournamentTitle">' +
																	'<img class="icon" src="images/icon.png">' +
																	'<h3 class="name"> Английская премьер лига </h3>' +
																'</div>';
			list.style.overflow = 'hidden';

			// Redefine nodes
			tournament = document.getElementsByClassName('tournament'),
			tournamentBlock = document.getElementsByClassName('tournamentBlock')[0],
			introText = document.getElementById('introText'),
			introduction = document.getElementsByClassName('introduction')[0],
			list = document.getElementsByClassName('list')[0],
			goBack = document.getElementsByClassName('goBack')[0],
			tournamentTitle = document.getElementsByClassName('tournamentTitle')[0];

			goBack.style.display = 'block';

			goBack.addEventListener('click', function() {
				tournamentBlock.style.display = 'none';
				introText.style.display = 'block';
				tournamentTitle.remove();
				list.style.overflow = 'auto';
				goBack.style.display = 'none';
			})
		})
	}
}
