const burgerBtnEl = document.querySelector('.js-open-menu');
const closeBtnEl = document.querySelector('.js-close-menu');
const mobileMenuEl = document.querySelector('.js-mob-menu');
const body = document.body;
burgerBtnEl.addEventListener('click', handlerBurgerBtn);

function handlerBurgerBtn(event) {
  mobileMenuEl.classList.add('is-open');
  body.classList.add('my-body-noscroll-class');
}

closeBtnEl.addEventListener('click', closeMenu);

function closeMenu(event) {
  mobileMenuEl.classList.remove('is-open');
  body.classList.remove('my-body-noscroll-class');
}
