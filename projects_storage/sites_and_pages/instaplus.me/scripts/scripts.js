var menu_icon_block = document.getElementById("menu_icon_block");
var menu_block = document.getElementById("menu_block");
var menu_lines = document.querySelectorAll(".mobile_menu_icon span");
var menu_main_lines = document.getElementById("menu_main_lines");
var bird_lines_block = document.getElementById("bird_lines_block");
var cost = document.getElementsByClassName("cost");
var cost_one = document.getElementById("cost_one");
var cost_two = document.getElementById("cost_two");
var cost_tree = document.getElementById("cost_tree");
var days_one = document.querySelectorAll("#cost_one .days");
var days_two = document.querySelectorAll("#cost_two .days");
var days_tree = document.querySelectorAll("#cost_tree .days");
var days = document.getElementById("days");
var price = document.getElementById("price");
var li_elem = document.getElementsByTagName("li");

menu_icon_block.addEventListener("click", openMenu)

function openMenu() {
	menu_block.classList.toggle("display_this");
	menu_main_lines.classList.toggle("rotate_this");
	bird_lines_block.classList.toggle("rotate_bird_lines")
}

for( i = 0; i < cost.length ;i++ ) {
	cost[i].addEventListener("click", costSelect)
}

cost_one.classList.add("select_cost");
days_one[0].classList.add("days_select");

function costSelect(event) {
	var target = event.target;
	days_one[0].classList.remove("days_select");
	days_two[0].classList.remove("days_select");
	days_tree[0].classList.remove("days_select");
	for( i = 0; i < cost.length ;i++ ) {
		cost[i].classList.remove("select_cost");
	}
	if( target.classList.contains("cost_one") ) {
		cost_one.classList.add("select_cost");
		days_one[0].classList.add("days_select");
		days.innerHTML = "7 дней,";
		price.innerHTML = "299 руб.";
	}
	if( target.classList.contains("cost_two") ) {
		cost_two.classList.add("select_cost");
		days_two[0].classList.add("days_select");
		days.innerHTML = "30 дней,";
		price.innerHTML = "899 руб.";
	}
	if( target.classList.contains("cost_tree") ) {
		cost_tree.classList.add("select_cost");
		days_tree[0].classList.add("days_select");
		days.innerHTML = "60 дней,";
		price.innerHTML = "1290 руб.";
	}
}

var card = document.getElementById("card");
var web_money = document.getElementById("web_money");
var yandex_money = document.getElementById("yandex_money");
var qiwi = document.getElementById("qiwi");
var alfa = document.getElementById("alfa");
var privat = document.getElementById("privat");
var paypal = document.getElementById("paypal");
var other = document.getElementById("other");

for( i = 0; i < li_elem.length ;i++ ) {
	li_elem[i].addEventListener("click", liSelect)
}

function liSelect(event) {
	var target = event.target;
	for( i = 0; i < li_elem.length ;i++ ) {
		li_elem[i].classList.remove("li_selected");
	}
	if ( target.classList.contains("card") ) {
		card.classList.add("li_selected");
	}
	if ( target.classList.contains("web_money") ) {
		web_money.classList.add("li_selected");
	}
	if ( target.classList.contains("yandex_money") ) {
		yandex_money.classList.add("li_selected");
	}
	if ( target.classList.contains("qiwi") ) {
		qiwi.classList.add("li_selected");
	}
	if ( target.classList.contains("alfa") ) {
		alfa.classList.add("li_selected");
	}
	if ( target.classList.contains("privat") ) {
		privat.classList.add("li_selected");
	}
	if ( target.classList.contains("paypal") ) {
		paypal.classList.add("li_selected");
	}
	if ( target.classList.contains("other") ) {
		other.classList.add("li_selected");
	}
}