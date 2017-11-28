import Vivus from 'vivus';
import throttling from './utils/scripts/throttling';

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
    document.body.classList.add('showContent');
    slogans.classList.add('hide');
    backgrounds[0].classList.add('show');
    backgrounds[1].classList.add('show');
    setTimeout(() => {
      title.classList.add('show');
      description.classList.add('show');
    }, 500)
  }, 5500);
}

///// Init animation end /////


///// Fix Safiri bug /////

function downArrowPosition() {
  var bottom = document.documentElement.clientHeight;
  document.querySelector('.down').style.top = bottom - 40 + 'px';
}

downArrowPosition();

window.addEventListener('resize', downArrowPosition);

///// Fix Safiri bug end /////


///// Animation on mousemove event /////

// var initXPos = null;
// var initYPos = null;
// var currentXPos;
// var currentYPos;
// var iam = document.querySelector('.iam');
// var head = document.querySelector('.head');
// var backgrounds = document.querySelector('.backgrounds');
// var background_1 = document.querySelector('.background-1');
// var background_2 = document.querySelector('.background-2');
// var windowXCenter = window.innerWidth / 2;
// var windowYCenter = window.innerHeight / 2;

// function mousemoveAnimation() {
//   window.addEventListener('mousemove', (e) => {
//     currentXPos = e.clientX;
//     currentYPos = e.clientY;

//     if(initXPos == null && initYPos == null) {
//       initXPos = e.clientX;
//       initYPos = e.clientY;
//     }

//     animateWithThrottle();
//   })
// }

// var animateWithThrottle = throttling(() => {
//   animate();
// }, 1, 100);

// function animate() {
//   var x = parseInt( (initXPos - currentXPos) / 100, 10) + 'px';
//   var bg2X = '-' + x;
//   var y = parseInt( (initYPos - currentYPos) / 70, 10) + 'px';

//   var xAngle = parseInt( (windowXCenter - currentXPos) / -120, 10) + 'deg';
//   var yAngle = parseInt( (windowYCenter - currentYPos) / 70, 10) + 'deg';

//   // console.log('X: ' + xAngle)
//   // console.log('Y: ' + yAngle)
  
//   // background_1.style.transform = `translate(${x}, ${y})`;
//   // background_2.style.transform = `scaleX(-1) translate(${bg2X}, ${y})`;

//   backgrounds.style.transform = `translate(${x}, ${y})`;

//   iam.style.transform = `rotateX(${yAngle}) rotateY(${xAngle})`;

//   head.style.transform = `rotateX(${yAngle}) rotateY(${xAngle})`;
// }

///// Animation on mousemove event end /////

console.log('Hi! You can find sources here: https://github.com/sergey-pimenov/sergey-pimenov.github.io/tree/master/src')