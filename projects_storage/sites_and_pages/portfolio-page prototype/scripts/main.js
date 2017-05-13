// Attention! This just prototype, so here spaghetti code
window.addEventListener('load', initScript);

function initScript() {

  if (/MSIE 10/i.test(navigator.userAgent)) {
    itsIE();
  }

  if (/MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) {
    itsIE();
  }

  if (/Edge\/\d./i.test(navigator.userAgent)){
    itsIE();
  }

  var scene = document.getElementsByClassName('scene')[0];
  var windowXCenter = window.innerWidth / 2;
  var windowYCenter = window.innerHeight / 2;
  var disableRotate = false;

  window.addEventListener('mousemove', function(e) {
  	if(isFirefox) {
  		return;
  	}
  	x = e.clientX;
  	y = e.clientY;
  	throttle(rotateScene(x, y), 16);
  });

  function rotateScene(x, y) {
    if(disableRotate) {
      return;
    }
  	scene.style.transform = 'rotateX(' + (-16 + ((y - windowYCenter) / -209)) + 'deg)' 
  													           + 'rotateY(' + (((x - windowXCenter)/ 209))+ 'deg)';
  }

  // Throttle
  function throttle(func, ms) {

    var isThrottled = false,
      savedArgs,
      savedThis;

    function wrapper() {

      if (isThrottled) { // (2)
        savedArgs = arguments;
        savedThis = this;
        return;
      }

      func.apply(this, arguments); // (1)

      isThrottled = true;

      setTimeout(function() {
        isThrottled = false; // (3)
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    }

    return wrapper;
  }

  // Typer
  var screenContent = document.getElementsByClassName('screenContent')[0];

  typer(screenContent)
    .line("Hello, I'm John Doe. I do awesome things. You can hire me", 100)

  // Keys
  var keys = document.querySelectorAll('.keyboard path');

  for(i = 1; i < keys.length; i++) {
    keys[i].classList.add('keyAnim');
    keys[i].style.animationDelay = i / 10 + 's'
  }

  // Menu
  var about = document.getElementById('about');
  var sceneWrapper = document.getElementById('scene-wrapper');
  var aboutBlock = document.getElementsByClassName('aboutBlock')[0];
  var aboutOpened = false;

  about.addEventListener('click', function(e) {
    aboutOpened = (aboutOpened ? false : true);
    if(aboutOpened) {
      showAboutBlock();
    } else {
    	initState();
    }
  })

  function initState() {
  	aboutBlock.style.transform = 'scale(0, 0)';
    aboutBlock.style.opacity = '0';
    hideWorkBlock();
  	setTimeout(function() {
      scene.style.transition = 'transform 0.1s linear';
      showScene();
  	}, 310);
  }

  function showAboutBlock() {
  	sceneWrapper.style.transition = 'all 0.3s';
  	if(workOpened) {
			hideWorkBlock();
  		workOpened = false;
		} else {
			hideScene();	
		}
    setTimeout(function() {
    	showAbout();
    }, 310)
  }

  function showAbout() {
  	aboutBlock.style.transform = 'scale(1)';
    aboutBlock.style.opacity = '1';
  }

  function showScene() {
		sceneWrapper.style.transform = 'scale(1)';
    sceneWrapper.style.opacity = '1';
  }

  function hideScene() {
		sceneWrapper.style.opacity = '0';
    sceneWrapper.style.transform = 'scale(0.001)';
  }

  var close = document.getElementsByClassName('close');

  for(i = 0; i < close.length; i++) {
  	close[i].addEventListener('click', function() {
  		aboutOpened = false;
  		workOpened = false;
  		initState();
  	})
  };

  var work = document.getElementById('work');
  var workBlock = document.getElementsByClassName('workBlock')[0];
  var workOpened = false;

  work.addEventListener('click', function() {
  	workOpened = (workOpened ? false : true);
    if(workOpened) {
    	sceneWrapper.style.transition = 'all 0.3s';
    	if(aboutOpened) {
  			aboutBlock.style.transform = 'scale(0, 0)';
    		aboutBlock.style.opacity = '0';
    		aboutOpened = false;
  		} else {
  			hideScene();	
  		}
      setTimeout(function() {
      	showWorkBlock();
      }, 310);
    } else {
    	hideWorkBlock()
    	setTimeout(function() {
    		showScene();
    		setTimeout(function() {
    			sceneWrapper.style.transition = 'all 0.1s';
    		}, 310)
    	}, 310);
    }
  });

  function showWorkBlock() {
  	workBlock.style.transform = 'scale(1)';
    workBlock.style.opacity = '1';
  }

  function hideWorkBlock() {
  	workBlock.style.transform = 'scale(0)';
    workBlock.style.opacity = '0';
  }

  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

  function itsIE() {
    document.body.style.background = 'white';
    document.body.style.padding = '100px';
    document.body.style.textAlign = 'center';
    document.body.innerHTML = "IE and Edge not supported. Please use other browsers."
  }

}