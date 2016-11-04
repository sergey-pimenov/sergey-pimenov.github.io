var search_icon = document.getElementById('search_icon');
var search_form = document.getElementById('search_form');

search_icon.addEventListener('click', toggleSearchForm);

function toggleSearchForm() {
	search_form.classList.toggle('search_form_display');
}