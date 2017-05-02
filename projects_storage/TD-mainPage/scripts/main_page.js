// Robert Penner's easeInOutQuad

// find the rest of his easing functions here: http://robertpenner.com/easing/
// find them exported for ES6 consumption here: https://github.com/jaxgeller/ez.js

const easeInOutQuad = (t, b, c, d) => {
  t /= d / 2
  if (t < 1) return c / 2 * t * t + b
  t--
  return -c / 2 * (t * (t - 2) - 1) + b
}

const outInX = (t, b, c, d) => {
  ts=(t/=d)*t
  tc=ts*t
  return b+c*(tc + -3*ts + 3*t)
}


const jumper = () => {
  // private variable cache
  // no variables are created during a jump, preventing memory leaks

  let element         // element to scroll to                   (node)

  let start           // where scroll starts                    (px)
  let stop            // where scroll stops                     (px)

  let offset          // adjustment from the stop position      (px)
  let easing          // easing function                        (function)
  let a11y            // accessibility support flag             (boolean)

  let distance        // distance of scroll                     (px)
  let duration        // scroll duration                        (ms)

  let timeStart       // time scroll started                    (ms)
  let timeElapsed     // time spent scrolling thus far          (ms)

  let next            // next scroll position                   (px)

  let callback        // to call when done scrolling            (function)

  // scroll position helper

  function location () {
    return window.scrollY || window.pageYOffset
  }

  // element offset helper

  function top (element) {
    return element.getBoundingClientRect().top + start
  }

  // rAF loop helper

  function loop (timeCurrent) {
    // store time scroll started, if not started already
    if (!timeStart) {
      timeStart = timeCurrent
    }

    // determine time spent scrolling so far
    timeElapsed = timeCurrent - timeStart

    // calculate next scroll position
    next = easing(timeElapsed, start, distance, duration)

    // scroll to it
    window.scrollTo(0, next)

    // check progress
    timeElapsed < duration
      ? window.requestAnimationFrame(loop)       // continue scroll loop
      : done()                                   // scrolling is done
  }

  // scroll finished helper

  function done () {
    // account for rAF time rounding inaccuracies
    window.scrollTo(0, start + distance)

    // if scrolling to an element, and accessibility is enabled
    if (element && a11y) {
      // add tabindex indicating programmatic focus
      element.setAttribute('tabindex', '-1')

      // focus the element
      element.focus()
    }

    // if it exists, fire the callback
    if (typeof callback === 'function') {
      callback()
    }

    // reset time for next jump
    timeStart = false
  }

  // API

  function jump (target, options = {}) {
    // resolve options, or use defaults
    duration = options.duration || 1000
    offset = options.offset || 0
    callback = options.callback                       // "undefined" is a suitable default, and won't be called
    easing = options.easing || easeInOutQuad
    a11y = options.a11y || false

    // cache starting position
    start = location()

    // resolve target
    switch (typeof target) {
      // scroll from current position
      case 'number':
        element = undefined           // no element to scroll to
        a11y = false                  // make sure accessibility is off
        stop = start + target
        break

      // scroll to element (node)
      // bounding rect is relative to the viewport
      case 'object':
        element = target
        stop = top(element)
        break

      // scroll to element (selector)
      // bounding rect is relative to the viewport
      case 'string':
        element = document.querySelector(target)
        stop = top(element)
        break
    }

    // resolve scroll distance, accounting for offset
    distance = stop - start + offset

    // resolve duration
    switch (typeof options.duration) {
      // number in ms
      case 'number':
        duration = options.duration
        break

      // function passed the distance of the scroll
      case 'function':
        duration = options.duration(distance)
        break
    }

    // start the loop
    window.requestAnimationFrame(loop)
  }

  // expose only the jump method
  return jump
}

// export singleton

const jumpTo = jumper()
/***** Global *****/

var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;
var html = document.getElementsByTagName('html')[0];

var tutorialState;

if (!isMac) {
	html.classList.add('castomScroll');
}

window.addEventListener('resize', setDynamicVariables);

function setDynamicVariables() {
	windowHeight = document.documentElement.clientHeight;
}
setDynamicVariables();

var scrollDirection;
var keyDownValue;

window.addEventListener('wheel', function(e) {
	scrollDirection = e.deltaY;
});
window.addEventListener('keydown', function(e) {
	keyDownValue = e.keyCode;
	setTimeout(function() {
		keyDownValue = 0;
	}, 50)
})

// Scroll effects
var windowHeight,
		yOffset,
		st;

window.addEventListener('scroll', scrollEffects);

var endParallax = windowHeight * 4;
var startToning = windowHeight * 3;
var endToning = windowHeight * 4;
var goToSliderStart = windowHeight * 3.8;
var goToSliderEnd = windowHeight * 4;

function scrollEffects() {
	yOffset = window.pageYOffset;

	if(yOffset <= endParallax) {
		throttle(parallaxAnim(yOffset), 16);
	}

	if(yOffset >= startToning && yOffset <= endToning) {
		throttle(toningScreen(yOffset, startToning), 16);
	}

	if(!isMac && yOffset >= goToSliderStart && yOffset <= goToSliderEnd) {
		goToSlider();
	}
}

/***** Global end *****/


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


/***** Scroll functions *****/

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

/***** Scroll functions end *****/


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



/***** Init screen *****/

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

	var currentScale, defaultScale = 0;
	var start = 0;
	var end = windowHeight * 4;

	// Reset variables that depend on window size
	window.addEventListener('resize', function() {
		end = windowHeight * 4;
	});

	// window.addEventListener('scroll', throttle(parallaxAnim, 16));

	// Set parallax for nodes
	function parallaxAnim(yOffset) {
		scaleElement(grass, 0.1);
		scaleElement(ball, 0.11);
		scaleElement(player_1, 0.09);
		scaleElement(player_2, 0.05);
		scaleElement(bg_players, 0.01);
	}

	function scaleElement(element, scaleShift) {
		shift = (yOffset - start) * (scaleShift - defaultScale) / end;
		currentScale = defaultScale + shift;
		element.style.transform = 'rotate(.0001deg) translateZ(0) scale(' + (1 + currentScale) + ')';
	}

	// Magic parallax function
	function parallax(element, x, y, z) {
		// Move elements x/y/z axis
		element.style.transform = 'translate3d('+ yOffset / x + 'px,' + yOffset / y + 'px,' + yOffset / z + 'px)';
	}

	setTimeout( function() {
		if(window.pageYOffset == 0) {
			if(!isSafari) {
				doScrollingToPos(windowHeight, 800);
			} else {
				window.scrollTo(0, windowHeight);
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
			scrollPosition = 'onSlider',
			scrollIcon = document.getElementsByClassName('scrollIcon')[0],
			scrollWithScrollIcon = false;

	if(!isMac) {
		scrollIcon.addEventListener('click', function() {
			disableScroll();
			scrollWithScrollIcon = true;
			jumpTo(initSlider, {
			  duration: 500,
			  offset: 0,
			  callback: function() {
			  	disableScrollToSlider = false;
				},
			  easing: outInX,
			  a11y: false
			})
			setTimeout(function() {
				enableScroll();
				scrollWithScrollIcon = false;
			}, 510)
		});
	} else {
		scrollIcon.style.cursor = 'auto';
	}

	var currentOpacity, defaultOpacity = 0, finalOpacity = 1;

	function toningScreen(currentYOffset, start) {
		opacityShift = (currentYOffset - start) * (finalOpacity - defaultOpacity) / windowHeight;
		currentOpacity = defaultOpacity + opacityShift;
		if(currentOpacity >= defaultOpacity) {
			toning.style.opacity = currentOpacity;
		}
		if(window.pageYOffset <= (windowHeight * 3)) {
			toning.style.opacity = 0;
		}
	}

	var currentYScroll = 'not scroll';
	var lastScrollTop = 0;
	var disableScrollToSlider = false;

	var lastScrollTop = 0;

	function goToSlider() {
		if(scrollWithScrollIcon) {
			return;
		}

		if(currentYScroll != 'not scroll') {
			return;
		}

		var st = window.pageYOffset || document.documentElement.scrollTop;
		if (st > lastScrollTop){ // Detect scroll down
			 	if (st > windowHeight * 3.8 && st < windowHeight * 4) {
			 		currentYScroll = 'scroll';

			 		window.removeEventListener('scroll', goToSlider);
					disableScroll();
					doScrollingToPos(windowHeight * 4, 300)

					setTimeout(function(){
						currentYScroll = 'not scroll';
						enableScroll();
						window.addEventListener('scroll', goToSlider);
					}, 310)
			 	}
   	}
	   lastScrollTop = st;
	}

	function goToSliderMac() {
		if(disableScrollToSlider) {
			return;
		}
		if(scrollWithScrollIcon) {
			return;
		}
		if (scrollDirection > 0 || keyDownValue == 40){ // Detect scroll down
	 		disableScrollToSlider = true;

	 		jumpTo(initSlider, {
			  duration: 500,
			  offset: 0,
			  callback: function() {
			  	disableScrollToSlider = false;
				},
			  easing: outInX,
			  a11y: false
			})
		}
	}

	// Infographic animation
	var pathFromBallCircle = document.getElementsByClassName('pathFromBallCircle')[0],
			pathFromBallCircleLength = Math.ceil(pathFromBallCircle.getTotalLength()),
			ballCircle = document.getElementsByClassName('ballCircle')[0],
			textCircle1 = document.getElementsByClassName('textCircle1')[0],
			textCircle2 = document.getElementsByClassName('textCircle2')[0],
			dotCircle = document.getElementsByClassName('dotCircle')[0],
			pulse = document.getElementsByClassName('pulse')[0],
			pulseValue = document.getElementsByClassName('pulseValue')[0],
			circle1 = document.getElementsByClassName('circle1')[0],
			circle1Dot = document.getElementsByClassName('circle1Dot')[0],
			lineFromCircle1 = document.getElementsByClassName('lineFromCircle1')[0],
			circle2 = document.getElementsByClassName('circle2')[0],
			lineFromCircle2 = document.getElementsByClassName('lineFromCircle2')[0],
			circle3 = document.getElementsByClassName('circle3')[0],
			lineFromCircle3 = document.getElementsByClassName('lineFromCircle3')[0],
			circle4 = document.getElementsByClassName('circle4')[0],
			circle4Dot = document.getElementsByClassName('circle4Dot')[0],
			lineToNumbers = document.getElementsByClassName('lineToNumbers')[0],
			numbers = document.getElementsByClassName('numbers')[0];

	var currentYOffset = 0;

	window.addEventListener('scroll', function() {

		currentYOffset = (window.pageYOffset - windowHeight);

		// First infographic
		if (window.pageYOffset >= windowHeight && window.pageYOffset <= windowHeight + 50) {
			ballCircle.style.opacity = 1 * (currentYOffset / 50);
		} if (window.pageYOffset <= windowHeight) {
			ballCircle.style.opacity = '0';
		} if (window.pageYOffset >= windowHeight + 50) {
			ballCircle.style.opacity = '1';
		}

		if (window.pageYOffset > windowHeight + 50 && window.pageYOffset <= windowHeight + 150) {
			dotCircle.style.opacity = 1 * ((currentYOffset + 50) / 150);
		} if (window.pageYOffset <= windowHeight + 50) {
			dotCircle.style.opacity = '0';
		} if (window.pageYOffset >= windowHeight + 150) {
			dotCircle.style.opacity = '1';
		}

		if (window.pageYOffset > windowHeight + 150 && window.pageYOffset <= windowHeight + 250) {
			pathFromBallCircle.style.strokeDashoffset = '0';
			textCircle1.style.opacity = 1 * ((currentYOffset + 250) / 400);
		} if (window.pageYOffset <= windowHeight + 150) {
			pathFromBallCircle.style.strokeDashoffset = '192px';
			textCircle1.style.opacity = '0';
		}  if (window.pageYOffset >= windowHeight + 250) {
			pathFromBallCircle.style.strokeDashoffset = '0';
			textCircle1.style.opacity = '1';
		}

		if (window.pageYOffset > windowHeight + 400 && window.pageYOffset <= windowHeight + 550) {
			textCircle2.style.opacity = 1 * ((currentYOffset + 400) / 550);
		} if (window.pageYOffset <= windowHeight + 400) {
			textCircle2.style.opacity = '0';
		} if (window.pageYOffset >= windowHeight + 550) {
			textCircle2.style.opacity = '1';
		}

		// Second infographic
		if (window.pageYOffset > windowHeight + 250 && window.pageYOffset <= windowHeight + 400) {
			circle2.style.opacity = 1 * ((currentYOffset + 250) / 400);
		} if (window.pageYOffset <= windowHeight + 250) {
			circle2.style.opacity = '0';
		} if (window.pageYOffset >= windowHeight + 400) {
			circle2.style.opacity = '1';
		}

		if (window.pageYOffset > windowHeight + 400 && window.pageYOffset <= windowHeight + 550) {
			lineFromCircle1.style.strokeDashoffset = '0';
			lineFromCircle2.style.strokeDashoffset = '0';
			circle1Dot.style.opacity = '1';
			circle1.style.opacity = '1';
			circle3.style.opacity = '1';
		} if (window.pageYOffset <= windowHeight + 400) {
			lineFromCircle1.style.strokeDashoffset = '-163px';
			lineFromCircle2.style.strokeDashoffset = '-221px';
			circle1Dot.style.opacity = '0';
			circle1.style.opacity = '0';
			circle3.style.opacity = '0';
		}  if (window.pageYOffset >= windowHeight + 550) {
			lineFromCircle1.style.strokeDashoffset = '0';
			lineFromCircle2.style.strokeDashoffset = '0';
			circle1Dot.style.opacity = '1';
			circle1.style.opacity = '1';
			circle3.style.opacity = '1';
		}

		if (window.pageYOffset > windowHeight + 600 && window.pageYOffset <= windowHeight + 750) {
			lineFromCircle3.style.strokeDashoffset = '0';
			lineToNumbers.style.strokeDashoffset = '0';
			circle4Dot.style.opacity = '1';
			circle4.style.opacity = '1';
			numbers.style.opacity = '1';
		} if (window.pageYOffset <= windowHeight + 600) {
			lineFromCircle3.style.strokeDashoffset = '150px';
			lineToNumbers.style.strokeDashoffset = '218px';
			circle4Dot.style.opacity = '0';
			circle4.style.opacity = '0';
			numbers.style.opacity = '0';
		}  if (window.pageYOffset >= windowHeight + 750) {
			lineFromCircle3.style.strokeDashoffset = '0';
			lineToNumbers.style.strokeDashoffset = '0';
			circle4Dot.style.opacity = '1';
			circle4.style.opacity = '1';
			numbers.style.opacity = '1';
		}
	})


/***** Init screen end *****/


/***** Init sclider *****/

window.addEventListener('load', initSliders);

function initSliders() {

	var initSlider = document.getElementById('initSlider');

	// Slider nodes
	var sliderControl = document.getElementsByClassName('sliderControl'),
			descriptionBlock = document.getElementsByClassName('descriptionBlock'),
			sliderIcon = document.getElementsByClassName('sliderIcon'),
			sliderContent = document.getElementsByClassName('sliderContent')[0];

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

	var lastSlide = sliderControl.length - 1;
	var direction = 'ahead';

	sliderContent.addEventListener('click', function(event) {
		if(event.target.classList.contains('sliderControl')) {
			return;
		}
		if(currentSlider == lastSlide) {
			direction = 'back';
		}
		if(direction == 'ahead') {
			currentSlider++;
		}
		if(direction == 'back') {
			currentSlider--;
			if(currentSlider == 0) {
				direction = 'ahead';
			}
		}
		goToSlide(currentSlider);
		activeControl.classList.remove('active');
		sliderControl[currentSlider].classList.add('active');
		activeControl = sliderControl[currentSlider];
	});

	var sliderState = 'not moved';

	function changeSliderContent(event) {
		if(sliderState != 'not moved') {
			return;
		}
		setTimeout(function() {
			sliderState = 'not moved';
		}, 310)
		// Detect count of slider that was clicked
    var target = event.target;
    var parent = target.parentNode;
    for ( var i = 0; i < parent.children.length; i++ ) {
    	if ( parent.children[i] == target ) {
    		currentSlider = i;
    	}
    }

    // Add active state for control and show new slide content
    if(target.classList.contains('active')) {
    	return;
    }
		target.classList.add('active');
		activeControl.classList.remove('active');
		activeControl = target;

		goToSlide(currentSlider);
		sliderState = 'moved';
	}

	function goToSlide(currentSlider) {
		if(sliderState != 'not moved') {
			return;
		}
		setTimeout(function() {
			sliderState = 'not moved';
		}, 310)
		// Remove active/visible state from last checked slide
    activeDescription.style.transition = 'transform 0.3s 0.3s linear, opacity 0.3s linear';
    activeDescription.style.transform = 'translateY(10px)';
    activeDescription.style.zIndex = '-1';
    activeDescription.style.opacity = '0';
    activeIcon.classList.remove('showIcon');

    setTimeout(function() {
    	activeDescription.style.transition = 'transform 0.3s linear, opacity 0.3s linear';
    	descriptionBlocks[currentSlider].style.transform = 'translateY(0)';
    	descriptionBlocks[currentSlider].style.zIndex = '1';
    	descriptionBlocks[currentSlider].style.opacity = '1';
    }, 300)

    sliderIcon[currentSlider].classList.add('showIcon');

		// Remember checked slide control and slide content
    activeDescription = descriptionBlocks[currentSlider];
    activeIcon = sliderIcons[currentSlider];
    sliderState = 'moved';
	}

	// Slider left-aside background
	var initSliderBg = document.getElementsByClassName('initSliderBg')[0];

	// Slider content nodes
	var sliderContent = document.querySelectorAll('.contentTitle, .sliderDescriptions')
	var sliderControls = document.getElementById('sliderControls');

	// Show slider content when user scroll to it
	window.addEventListener('scroll', animateInitSlider);


	setTimeout(function() {
		if(window.pageYOffset >= windowHeight * 3) {
			animateInitSlider();
		}
	}, 100)

	function animateInitSlider() {
		Offset = window.pageYOffset;
		if(Offset >= windowHeight * 3) {
			window.removeEventListener('scroll', animateInitSlider);
			for( i = 0; i < sliderContent.length; i++ ) {
				sliderContent[i].classList.add('showSlideContent');
			}
			sliderIcon[0].classList.add('showIcon');
			verticalLines[0].classList.add('showVerticalLines');
			iconWraper.classList.add('showWraper');
			initSlider.addEventListener('mousemove', throttle(moveSliderSvg, 16));
		}
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
		xPos = event.clientX;
		yPos = event.clientY;
		layer0.style.transform = translate(xPos / 120, yPos / 90);
		layer1.style.transform = translate(xPos / 100, yPos / 70);
		layer2.style.transform = translate(xPos / 80, yPos / 50);
		layer3.style.transform = translate(xPos / 70, yPos / 40);
	}


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

		tournamentList.style.opacity = '0';
		tournamentList.classList.toggle('showTournamentList');

		setTimeout(function() {
			tournamentList.style.transition = 'opacity 0.3s';
			tournamentList.style.opacity = '1';
		}, 100);
		
		tournamentList.style.zIndex = '100';
		tournamentOpened = true;
		tutorialState = 'opened';
	}

	function openTournaments() {
		popupsToning.style.opacity = '1';

		setTimeout(function() {
			document.body.style.overflow = 'hidden';
			tournamentList.classList.toggle('showTournamentList');
		}, 100);

		tournamentOpened = true;
	}

	function closeTournaments() {
		setTimeout(function() {
			if(tutorialState != 'opened') {
				popupsToning.style.opacity = '0';
				document.body.style.overflow = 'visible';
			}
		}, 100);

		if(tutorialState == 'opened') {
			tournamentList.style.opacity = '0';
			setTimeout(function() {
				tournamentList.classList.toggle('showTournamentList');
				tournamentList.style.transition = 'none';
				tournamentList.style.opacity = '1';
			}, 330);
		}

		if(tutorialState != 'opened') {
			tournamentList.classList.toggle('showTournamentList');
		}
		tournamentOpened = false;
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
			popupsToning = document.getElementsByClassName('popupsToning')[0],
			initSlide = document.getElementById('initSlide'),
			sliderCount = slideContent.length;

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
		tutorialOpen = true;
		slideTitle[0].style.transform = 'translateZ(0) translateY(0)';
		popupsToning.style.opacity = '1';

		setTimeout(function() {
			document.body.style.overflow = 'hidden';
			tutorial.classList.add('showTutorial');
		}, 100);

		setTimeout(function() {
			circleWrapper.classList.add('showCircleWrapper');
			linesWrapper.classList.add('showLinesWrapper');
			initIcon.classList.add('showInitIcon');
		}, 800);
	}

	function hideTutorial() {

		setTimeout(function() {
			popupsToning.style.opacity = '0';
			document.body.style.overflow = 'visible';
		}, 100);

		tutorial.classList.remove('showTutorial');
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
			slideBg = document.getElementsByClassName('slideBg'),
			tutorialIcon = document.getElementsByClassName('tutorialIcon');

	tutorialIcon[0].classList.add('showIcon');
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
			selectButton.style.transform = 'translateY(0)';
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
			introText = document.getElementById('introText'),
			introduction = document.getElementsByClassName('introduction')[0],
			list = document.getElementsByClassName('list')[0],
			goBack = document.getElementsByClassName('goBack')[0],
			tournamentTitle = document.getElementsByClassName('tournamentTitle')[0],
			selectTournamentTitle = document.getElementsByClassName('selectTournamentTitle');

	var tournamentTarget;

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


