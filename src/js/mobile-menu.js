const burgerBtnEl = document.querySelector('.js-open-menu');
const closeBtnEl = document.querySelector('.js-close-menu');
const mobileMenuEl = document.querySelector('.js-mob-menu');
const backdrop = document.querySelector('.header-backdrop');
const body = document.body;
burgerBtnEl.addEventListener('click', handlerBurgerBtn);

function handlerBurgerBtn(event) {
  mobileMenuEl.classList.add('is-open');
  backdrop.classList.add('active');
  body.classList.add('my-body-noscroll-class');
}

closeBtnEl.addEventListener('click', () => {
  closeMenu();
});

backdrop.addEventListener('click', () => {
  closeMenu();
});

function closeMenu(event) {
  mobileMenuEl.classList.remove('is-open');
  backdrop.classList.remove('active');
  body.classList.remove('my-body-noscroll-class');
}

window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
  if (!e.matches) return;
  closeMenu();
});
