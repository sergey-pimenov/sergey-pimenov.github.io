import Vivus from "vivus";

let animationInit = false;

if (document.hidden == false) {
  initAnimation();
  document.body.classList.add("playAnimation");
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    document.body.classList.remove("playAnimation");
  }

  if (!document.hidden) {
    document.body.classList.add("playAnimation");

    if (!animationInit) initAnimation();
  }
});

function initAnimation() {
  animationInit = true;

  document.body.classList.add("show");

  // Nodes
  const part1Node = document.querySelector(".part-1");
  const part2Node = document.querySelector(".part-2");
  const part3Node = document.querySelector(".part-3");
  const part4Node = document.querySelector(".part-4");
  const part5Node = document.querySelector(".part-5");
  const part6Node = document.querySelector(".part-6");
  const backgrounds = document.querySelectorAll(".background");
  const title = document.querySelector(".title");
  const description = document.querySelector(".description");
  const slogans = document.querySelector(".slogans");

  // From end of animation so start
  const part_5 = {
    animation: new Vivus(
      part5Node,
      {
        type: "oneByOne",
        duration: 230,
        animTimingFunction: Vivus.EASE,
      },
      () => {
        part6Node.classList.add("show");
      }
    ),

    play: function () {
      part_5.animation.play();
    },
  };

  const part_4 = {
    animation: new Vivus(
      part4Node,
      {
        type: "oneByOne",
        duration: 200,
        animTimingFunction: Vivus.EASE,
      },
      () => {
        backgrounds[0].classList.add("show");
        backgrounds[1].classList.add("show");
      }
    ),

    play: function () {
      part_4.animation.play();
    },
  };

  const part_3 = {
    animation: new Vivus(
      part3Node,
      {
        type: "oneByOne",
        duration: 80,
        animTimingFunction: Vivus.EASE,
      },
      part_4.play
    ),

    play: function () {
      part_3.animation.play();
    },
  };

  const part_2 = {
    animation: new Vivus(
      part2Node,
      {
        type: "oneByOne",
        duration: 180,
        animTimingFunction: Vivus.EASE,
      },
      part_5.play
    ),

    play: function () {
      part_2.animation.play();
      part_3.animation.play();
    },
  };

  const part_1 = {
    animation: new Vivus(
      part1Node,
      {
        type: "oneByOne",
        duration: 100,
        animTimingFunction: Vivus.EASE,
      },
      part_2.play
    ),
  };

  part_1.animation.play();
}
///// Init animation end /////

console.log(
  "Hi! You can find sources here: https://github.com/sergey-pimenov/sergey-pimenov.github.io/tree/master/src"
);
