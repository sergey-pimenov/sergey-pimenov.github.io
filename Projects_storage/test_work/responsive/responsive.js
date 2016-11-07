var show_more = document.getElementsByClassName('show_more'); // show_more elements in navigation

var sub_menu = document.querySelectorAll('.sub-menu'); // All sub-menu

for( i = 0; i < show_more.length; i++ ) {
  show_more[i].addEventListener('click', openSubMenu); // show_more listener
}

var closedElement = 'matrix(1, 0, 0, 0, 0, 0)'; // State of closed element
var openElement = 'scaleY(1)'; // State of open element

function openSubMenu() {
  var current_sub_menu = this.nextElementSibling; // Sub-menu near show_more element
  var state_of_element = getComputedStyle(current_sub_menu).transform; // Get state of sub-menu
  for( i = 0; i < sub_menu.length; i++ ) {
    sub_menu[i].style.transform = closedElement; // At first close all sub-menu
  }
  for( i = 0; i < show_more.length; i++ ) {
    show_more[i].style.transform = 'rotateX(0)'; // Then reset all show_more elements
  }
  if (state_of_element == closedElement) {
    current_sub_menu.style.transform = openElement; // And then open sub-menu under show_more element
    this.style.transform = 'rotateX(180deg)'; // and transform current show_more-element
  }
}



var slider_item = document.querySelectorAll('.main-slider .items .item'); // All slider items
var item_content = document.querySelectorAll('.item .content'); // All content

for ( i = 0; i < slider_item .length; i++) {
  slider_item[i].addEventListener('click', openSliderItem)
}

function openSliderItem() {
  var current_slider_item = this.children[1];
  var state_of_slider_item = getComputedStyle(current_slider_item).transform;
  for( i = 0; i < item_content.length; i++ ) {
    item_content[i].style.transform = closedElement; // At first close all slider items
  }
  for( i = 0; i < slider_item.length; i++ ) {
    slider_item[i].style.fontWeight = 'normal'; // And reset font-weight of all titles
  }
  if ( state_of_slider_item == closedElement) {
    current_slider_item.style.transform = 'scaleY(1)'; // Then open current slider item 
    this.style.fontWeight = 'bold';
  }
}