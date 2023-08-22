//
// Open modal menu
//
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

// закриття по кліку не на мобільному меню
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

//
//============================
//Scroll to top
const scrollTopBtn = document.getElementById('scroll-to-top-btn');

(() => {
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (document.documentElement.scrollTop > 700) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }
  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
