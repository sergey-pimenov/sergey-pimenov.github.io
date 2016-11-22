var face_main = document.getElementById("face_main");

var interval = 10000;

var count = 1;

function blink() {
	interval = interval / randomInteger(1, 5);
	if (count % 2 == 0) {
	face_main.style.webkitFilter = "brightness(10)";
	face_main.style.filter = "brightness(10)";
	setTimeout(function() {
		face_main.style.webkitFilter = "brightness(1)";
		face_main.style.filter = "brightness(1)";
		setTimeout(function() {
			face_main.style.webkitFilter = "brightness(10)";
			face_main.style.filter = "brightness(10)";
			setTimeout(function() {
				face_main.style.webkitFilter = "brightness(1)";
				face_main.style.filter = "brightness(1)";
			}, 30);
		}, 30);
	}, 30);
	}
	if (count % 2 !== 0) {
		face_main.style.webkitFilter = "brightness(10)";
		face_main.style.filter = "brightness(10)";
		setTimeout(function() {
			face_main.style.webkitFilter = "brightness(1)";
			face_main.style.filter = "brightness(1)";
		}, 30 );
	}
	count++;
	setTimeout(blink, interval);
	interval = 5000;
}

blink();

function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}


var title_all = document.querySelectorAll(" .move_path * ");

var title_array = [];

for( i = 0, arr_len = title_all.length; i < arr_len; i++ ) {
	title_array[i] = title_all[i];
}

var random_value;


var transform_value;

// FF or other title shift

if(!(navigator.userAgent.toLowerCase().indexOf('firefox') > -1)) {
	transform_value = 2;
	function titleAnimation() {
		random_value = randomInteger(1, 10)
		for( i = 0, arr_len = title_all.length; i < arr_len; i++ ) {
			random_value = randomInteger(1, 5);
			transform_value = transform_value -1 / random_value;
			title_array[i].style.transform = "translateX" + "(" + transform_value + "px" + ")"  + "translateZ(0)";
			if(transform_value < 0) {
				transform_value = 2;
			}
		}
		setTimeout(titleAnimation, 150);
	}

	titleAnimation();
} else if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
	transform_value = 1;
	function titleAnimationFF() {
		random_value = randomInteger(1, 10)
		for( i = 0, arr_len = title_all.length; i < arr_len; i++ ) {
			random_value = randomInteger(1, 5);
			transform_value = transform_value -1 / random_value;
			title_array[i].style.transform = "translateX" + "(" + transform_value + "px" + ")"  + "translateZ(0)";
			if(transform_value < 0) {
				transform_value = 2;
			}
		}
		setTimeout(titleAnimationFF, 150);
	}

	titleAnimationFF();
}
