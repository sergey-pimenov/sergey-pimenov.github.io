var slider_1_switch = document.getElementsByClassName('slider_1_switch');
var slider_1_item = document.getElementsByClassName('slider_1_item');
var slider_1_content_block = document.getElementById('slider_1_content_block');
var recommend_switchs_1_block = document.getElementById('recommend_switchs_1_block');


for( i = 0; slider_1_switch.length > i; i++ ) {
	slider_1_switch[i].addEventListener('click', open_Slider_1_Item);
}
 
function open_Slider_1_Item(event) {
	clearInterval(translateContentToBottom);
	slider_1_content_block.removeEventListener('webkitTransitionEnd', changeSwipeIcon);
	slider_1_content_block.removeEventListener('MSTransitionEnd', changeSwipeIcon);
	slider_1_content_block.removeEventListener('OTransitionEnd', changeSwipeIcon);
	slider_1_content_block.removeEventListener('transitionend', changeSwipeIcon);
	slider_1_content_block.removeEventListener('transitionEnd', changeSwipeIcon);
	slider_1_content_block.classList.remove('slider_1_animation');
	recommend_switchs_1_block.classList.remove('switch_1_animation');
	var target = event.target;
	if( target.className == 'slider_1_switch' || target.parentNode.className == 'slider_1_switch' ) {
		if (target.id == 'recommend_switch_1' || target.parentNode.id == 'recommend_switch_1') {
			slider_1_content_block.style.transform = 'translateY(0)';
			for( i = 0; i < slider_1_switch.length; i++ ) {
					slider_1_switch[i].classList.remove('selected_switch');
			}
			recommend_switch_1.classList.add('selected_switch');
		}

		if (target.id == 'recommend_switch_2' || target.parentNode.id == 'recommend_switch_2') {
			slider_1_content_block.style.transform = 'translateY(-100%)';
			for( i = 0; i < slider_1_switch.length; i++ ) {
					slider_1_switch[i].classList.remove('selected_switch');
			}
			recommend_switch_2.classList.add('selected_switch');
		}

		if (target.id == 'recommend_switch_3' || target.parentNode.id == 'recommend_switch_3') {
			slider_1_content_block.style.transform = 'translateY(-200%)';
			for( i = 0; i < slider_1_switch.length; i++ ) {
					slider_1_switch[i].classList.remove('selected_switch');
			}
			recommend_switch_3.classList.add('selected_switch');
		}
	}
}


slider_1_content_block.addEventListener('webkitTransitionEnd', changeSwipeIcon);
slider_1_content_block.addEventListener('MSTransitionEnd', changeSwipeIcon);
slider_1_content_block.addEventListener('OTransitionEnd', changeSwipeIcon);
slider_1_content_block.addEventListener('transitionend', changeSwipeIcon);
slider_1_content_block.addEventListener('transitionEnd', changeSwipeIcon);

var translateValue = 100;
var traslateCount = 1;

var translateContentToBottom = setInterval(function() {
	slider_1_content_block.style.transform = 'translateY(-' + translateValue + '%)';
}, 6000);

function changeSwipeIcon() {
	traslateCount++;
	if (traslateCount == 1) {
		translateValue = 100;
		for( i = 0; i < slider_1_switch.length; i++ ) {
			slider_1_switch[i].classList.remove('selected_switch');
		}
		recommend_switch_1.classList.add('selected_switch');
	}
	if (traslateCount == 2) {
		translateValue = 200;
		for( i = 0; i < slider_1_switch.length; i++ ) {
			slider_1_switch[i].classList.remove('selected_switch');
		}
		recommend_switch_2.classList.add('selected_switch');
	}
	if (traslateCount == 3) {
		translateValue = 0;
		traslateCount = 0;
		for( i = 0; i < slider_1_switch.length; i++ ) {
			slider_1_switch[i].classList.remove('selected_switch');
		}
		recommend_switch_3.classList.add('selected_switch');
	}
} 