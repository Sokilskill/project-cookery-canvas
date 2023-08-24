import { addFetch } from './add-order-API';

const elements = {
  form: document.querySelector('.modal-form'),
  heroOrderBtn: document.querySelector('.hero-order-btn'),
  modalCloseBtn: document.querySelector('.modal-close-btn'),
  shoppingCartBtn: document.querySelector('.shopping-cart'),
  backdrop: document.querySelector('.backdrop'),
  body: document.querySelector('body'),
};

if (elements.heroOrderBtn) {
  elements.heroOrderBtn.addEventListener('click', orderNowOpn);
}

elements.shoppingCartBtn.addEventListener('click', orderNowOpn);

function orderNowOpn(e) {
  window.onclick = function (event) {
    if (event.target === elements.backdrop) {
      modalClose();
    }
  };

  if (localStorage.getItem('orderNowData')) {
    const savedData = localStorage.getItem('orderNowData');
    const parsedData = JSON.parse(savedData);
    elements.form[0].value = parsedData.Name;
    elements.form[1].value = parsedData.Tell;
    elements.form[2].value = parsedData.Email;
    elements.form[3].value = parsedData.Comment;
  }

  if (elements.heroOrderBtn) {
    elements.heroOrderBtn.removeEventListener('click', orderNowOpn);
  }

  elements.body.classList.add('my-body-noscroll-class');
  elements.shoppingCartBtn.removeEventListener('click', orderNowOpn);
  elements.modalCloseBtn.addEventListener('click', modalClose);
  elements.backdrop.classList.remove('is-hidden');
}

function modalClose(e) {
  if (elements.heroOrderBtn) {
    elements.heroOrderBtn.addEventListener('click', orderNowOpn);
  }

  elements.body.classList.remove('my-body-noscroll-class');
  elements.modalCloseBtn.removeEventListener('click', modalClose);
  elements.shoppingCartBtn.addEventListener('click', orderNowOpn);
  elements.backdrop.classList.add('is-hidden');

  const data = {
    Name: elements.form[0].value,
    Email: elements.form[2].value,
    Tell: elements.form[1].value,
    Comment: elements.form[3].value,
  };

  if (
    data.Name.length > 0 ||
    data.Email.length > 0 ||
    data.Tell.length > 0 ||
    data.Comment.length > 0
  ) {
    localStorage.setItem('orderNowData', JSON.stringify(data));
  } else {
    localStorage.removeItem('orderNowData');
  }
}

function post(e) {
  e.preventDefault();
  const data = {
    Name: elements.form[0].value,
    Email: elements.form[1].value,
    Tell: elements.form[2].value,
    Comment: elements.form[3].value,
  };

  addFetch(data).then(response => {
    if (response.status === ok) {
      localStorage.removeItem('orderNowData', JSON.stringify(data));
      elements.form.reset();
    }
  });
}

elements.form.addEventListener('submit', post);
