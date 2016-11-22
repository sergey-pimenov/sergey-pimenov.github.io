var login = document.getElementById('login');
var popup_login = document.getElementById('popup_login');
var login_container = document.getElementById('login_container');

login.addEventListener('click', openLoginPopup);

function openLoginPopup() {
	popup_login.classList.add('popup_login_display');
}

window.addEventListener('click', closeLoginPopup);


function closeLoginPopup(event) {
	var target = event.target;
	if ( target.id == 'popup_login' || target.id == 'close_login_container' ) {
			popup_login.classList.remove('popup_login_display');
	}
}