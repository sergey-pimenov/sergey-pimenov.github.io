var menu_logo = document.getElementById('menu_logo');
var menu_block = document.getElementById('menu_block');

menu_logo.addEventListener('click', openMenu);

function openMenu() {
	menu_block.classList.toggle('open_menu'); 
}

var sub_item = document.querySelectorAll('.menu_block ul h5');

var sub_item_count = 0;

for( i = 0; i < sub_item.length; i++ ) {
	sub_item[i].addEventListener('click', subItemOpen);
}

var menu_icons = document.querySelectorAll('.menu_block > ul > li');

function subItemOpen() {
	sub_item_count++;
	this.classList.toggle('open_sub_item');
}


for( i = 0; i < menu_icons.length; i++ ) {
	menu_icons[i].addEventListener('click', open_menu_and_sub_items)
}

function open_menu_and_sub_items(event) {
	var target = event.target;
	target.children[0].classList.toggle('open_sub_item');
	openMenu();
}