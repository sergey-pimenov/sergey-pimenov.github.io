var city = document.getElementById('city');
var popup_city = document.getElementById('popup_city');
var popup_conteiner = document.getElementById('popup_conteiner');

city.addEventListener('click', openCityPopup);

function openCityPopup() {
	popup_city.classList.add('popup_city_display');
}

window.addEventListener('click', closeCityPopup);


function closeCityPopup(event) {
	var target = event.target;
	if ( target.id == 'popup_city' || target.id == 'close_city_container' ) {
			popup_city.classList.remove('popup_city_display');
	}
} 