// Блок формы
var form_block = document.getElementsByTagName("form");
// Блок благодарности
var thank_block = document.getElementsByClassName("thank");

// Переменная отклика, по умолчанию - false
var feedback = false;

// Если пользователь отправил письмо(т.е. feedback = true), 
// то отображаем блок благодарности
if(feedback) {
	// Скрыть формы
	form_block[0].style.display = "none";
	// Отобразить благодарность
	thank_block[0].style.display = "block";
}

if(!feedback) {
	thank_block[0].style.display = "none";
}