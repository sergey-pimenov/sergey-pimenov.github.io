// Если в данном городе нет специальных предложений

var no_offers = document.getElementById("no_offers");
var view_all_offers_no = document.getElementById("view_all_offers_no");
var when_no_offers = document.getElementById("when_no_offers");
var main = document.getElementById("main");

var article_one = document.getElementById("article_one");
var article_two = document.getElementById("article_two");
var article_tree = document.getElementById("article_tree");

// Если в данном городе нет специальных предложений no_offers_city = true;
// Тогда появляется сообщение об этом и даётся возможность оставить заявку
var no_offers_city = false;



if(no_offers_city) {
  no_offers.style.display = "none";
  view_all_offers_no.style.display = "none";
  when_no_offers.style.display = "block";
  main.style.height = "700px";
}



// Переключение между артиклями

var tab_one = document.getElementById("tab_one");
var tab_two = document.getElementById("tab_two");
var tab_tree = document.getElementById("tab_tree");

tab_one.addEventListener("click", tabOneOpen);

function tabOneOpen(event) {
  main.style.height = "auto";
  article_one.style.display = "block";
  article_two.style.display = "none";
  article_tree.style.display = "none";

  tab_one.style.background = "transparent";
  tab_two.style.background = "transparent";
  tab_tree.style.background = "transparent";
  tab_one.style.color = "white";
  tab_two.style.color = "white";
  tab_tree.style.color = "white";

  tab_one.classList.remove("li_hover");
  tab_two.classList.add("li_hover");
  tab_tree.classList.add("li_hover");

  var target = event.target;
  target.style.background = "white";
  target.style.color = "grey";
}

tab_two.addEventListener("click", tabTwoOpen);

function tabTwoOpen(event) {
  main.style.height = "auto";
  article_one.style.display = "none";
  article_two.style.display = "block";
  article_tree.style.display = "none";

  tab_one.style.background = "transparent";
  tab_two.style.background = "transparent";
  tab_tree.style.background = "transparent";
  tab_one.style.color = "white";
  tab_two.style.color = "white";
  tab_tree.style.color = "white";

  tab_one.classList.add("li_hover");
  tab_two.classList.remove("li_hover");
  tab_tree.classList.add("li_hover");

  var target = event.target;
  target.style.background = "white";
  target.style.color = "grey";
}

tab_tree.addEventListener("click", tabTreeOpen);
function tabTreeOpen(event) {
  main.style.height = "auto";
  article_one.style.display = "none";
  article_two.style.display = "none";
  article_tree.style.display = "block";

  tab_one.style.background = "transparent";
  tab_two.style.background = "transparent";
  tab_tree.style.background = "transparent";
  tab_one.style.color = "white";
  tab_two.style.color = "white";
  tab_tree.style.color = "white";

  tab_one.classList.add("li_hover");
  tab_two.classList.add("li_hover");
  tab_tree.classList.remove("li_hover");

  var target = event.target;
  target.style.background = "white";
  target.style.color = "grey";
}


// Проверка формы

var mail_input = document.getElementById("mail_input");
var mail_button = document.getElementById("mail_button");
var mail_true = document.getElementById("mail_true");
var mail_true_h3 = document.getElementById("mail_true_h3");
var mail_true_p = document.getElementById("mail_true_p");

mail_button.onclick = function() {

    // Если форма пуста при отправке
    if ( mail_input.value == '') {
        mail_true.style.display = "block";
        mail_true_h3.innerHTML = "";
        mail_true_p.innerHTML = "Введите Ваш e-mail";
        mail_input.focus();
        return false; // Убираем при использовании JSON
    }

    reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    // Если всё корректно
    if (mail_input.value.match(reg)) {
        mail_true.style.display = "block";
        mail_true_h3.innerHTML = "Спасибо!";
        mail_true_p.innerHTML = "Вы успешно подписались <br> на  e-mail рассылку новосте Клуба <br>Клиентов Альфа-Банка";
        return false; // Убираем при использовании JSON
    }

    // Если email неправильный
    // Урать нижний if-блок, если нужна проверка email средствами браузера
    if (!mail_input.value.match(reg)) {
        mail_true.style.display = "block";
        mail_true_h3.innerHTML = "Что-то пошло не так";
        mail_true_p.innerHTML = "Пожалуйста, введите адрес вашей <br> почты корректно";
        mail_input.focus();
        return false; // Убираем при использовании JSON
    }
}



// Закрытие модального окна

var close_modal = document.getElementById("close_modal");

close_modal.onclick = function() {
   mail_true.style.display = "none";
}

