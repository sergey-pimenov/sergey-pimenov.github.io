import Vivus from 'vivus';
import throttling from './utils/scripts/throttling';

// Prevent scroll restore

document.addEventListener('unload', () => {
  window.scrollTo(0, 0); 
});

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

///// Init animation /////
window.addEventListener('load', initAnimation);

function initAnimation() {
  // Nodes
  var part1Node = document.querySelector('.part-1');
  var part2Node = document.querySelector('.part-2');
  var part3Node = document.querySelector('.part-3');
  var part4Node = document.querySelector('.part-4');
  var part5Node = document.querySelector('.part-5');
  var part6Node = document.querySelector('.part-6');
  var backgrounds = document.querySelectorAll('.background');
  var title = document.querySelector('.title');
  var description = document.querySelector('.description');
  var slogans = document.querySelector('.slogans');

  setTimeout(() => {
    slogans.classList.add('show');
  }, 500);

  setTimeout(() => {
    slogans.classList.add('animate');
  }, 600);

  var part_5 = {
    animation : new Vivus(part5Node, {
      type: 'oneByOne',
      duration: 230,
      animTimingFunction: Vivus.EASE
    }, () => {
      part6Node.classList.add('show');
    }),

    play : function() {
      part_5.animation.play()
      // mousemoveAnimation();
    }
  }

  var part_4 = {
    animation : new Vivus(part4Node, {
      type: 'oneByOne',
      duration: 200,
      animTimingFunction: Vivus.EASE
    }),

    play : function() {
      part_4.animation.play()
    }
  }

  var part_3 = {
    animation : new Vivus(part3Node, {
      type: 'oneByOne',
      duration: 80,
      animTimingFunction: Vivus.EASE
    }, part_4.play),

    play : function() {
      part_3.animation.play()
    }
  }
  
  var part_2 = {
    animation : new Vivus(part2Node, {
      type: 'oneByOne',
      duration: 180,
      animTimingFunction: Vivus.EASE
    }, part_5.play),

    play : function() {
      part_2.animation.play()
      part_3.animation.play()
    }
  }

  var part_1 = {
    animation : new Vivus(part1Node, {
      type: 'oneByOne',
      duration: 100,
      animTimingFunction: Vivus.EASE
    }, part_2.play)
  }

  part_1.animation.play();
  document.body.classList.add('show');

  setTimeout(() => {
    document.getElementsByTagName('html')[0].classList.add('showContent');
    slogans.classList.add('hide');
    backgrounds[0].classList.add('show');
    backgrounds[1].classList.add('show');
    setTimeout(() => {
      title.classList.add('show');
      description.classList.add('show');
    }, 1000)
  }, 5500);
}
///// Init animation end /////


///// Fix Safari bug /////

function downArrowPosition() {
  var bottom = document.documentElement.clientHeight;
  document.querySelector('.down').style.top = bottom - 40 + 'px';
}

downArrowPosition();

window.addEventListener('resize', downArrowPosition);

console.log('Hi! You can find sources here: https://github.com/sergey-pimenov/sergey-pimenov.github.io/tree/master/src')