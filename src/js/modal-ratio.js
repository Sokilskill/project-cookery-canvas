import { toNumber } from 'lodash';
import axios from 'axios';
import Notiflix from 'notiflix';

const elem = {
  form: document.querySelector('.ratio-form'),
  modalCloseBtn: null,
  backdrop: document.querySelector('.backdrop-ratio'),
  body: document.querySelector('body'),
  giveRatioBtn: document.querySelector('.giveRating'),
};
let recipeID = '';
let rating = 0;

document.body.addEventListener('click', e => {
  if (e.target.classList.contains('giveRating')) {
    ratioModalOpen();
  }
});

function ratioModalOpen(e) {
  window.onclick = function (event) {
    if (event.target === elem.backdrop) {
      ratioModalClose();
    }
  };
  elem.backdrop.classList.remove('is-hidden');
  elem.modalCloseBtn = document.querySelector('.ratio-close-btn');
  const recipe = document.querySelector('.modal-content');
  elem.modalCloseBtn.addEventListener('click', ratioModalClose);

  recipeID = recipe.dataset.id;
  stars(5);
  const starEl = document.querySelector('.stars-ratio');
  starEl.addEventListener('mousemove', starRating);

  elem.form.addEventListener('submit', submitForm);
}
function ratioModalClose(e) {
  elem.backdrop.classList.add('is-hidden');
  elem.modalCloseBtn.removeEventListener('click', ratioModalClose);
}

Notiflix.Notify.init({ zindex: 99999 });

async function Fetch(recipeID, rating) {
  const URL = `https://tasty-treats-backend.p.goit.global/api/recipes/${recipeID}/${rating}`;

  return await axios
    .post(URL)
    .then(function (notif) {
      Notiflix.Notify.success('Post Success');
    })

    .catch(function (error) {
      Notiflix.Notify.failure(`please try again later`);
    });
}

function submitForm(e) {
  e.preventDefault();
  let rec = recipeID;
  let ratt = rating;
  Fetch(rec, ratt);
}

function starRating(e) {
  if (e.target.dataset.value) {
    stars(e.target.dataset.value);
  }
}

function stars(e) {
  let stars = ``;
  rating = toNumber(e);
  let useIcons;
  useIcons = new URL('../img/icons.svg', import.meta.url);

  if (rating >= 4.5) {
    stars = `<span class="ratio-count">${rating}</span>
        <svg class="rat-icon ratio-icon act active" data-value="1">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon ratio-icon act active" data-value="2">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon ratio-icon act active" data-value="3">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon ratio-icon act active" data-value="4">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon ratio-icon act active" data-value="5">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg>`;
  } else if (rating >= 4 || rating >= 3.5) {
    stars = `<span class="ratio-count">${rating}</span>
        <svg class="rat-icon ratio-icon act active" data-value="1">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon ratio-icon act active" data-value="2">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon ratio-icon act active" data-value="3">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon ratio-icon act active" data-value="4">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon ratio-icon" data-value="5">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg>`;
  } else if (rating >= 3 || rating >= 2.5) {
    stars = `<span class="ratio-count">${rating}</span>
        <svg class="rat-icon ratio-icon act active" data-value="1">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon ratio-icon act active" data-value="2">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon ratio-icon act active" data-value="3">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon ratio-icon" data-value="4"v>
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon ratio-icon" data-value="5">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg>`;
  } else if (rating >= 2 || rating >= 1.5) {
    stars = `<span class="ratio-count">${rating}</span>
        <svg class="rat-icon  ratio-icon act active" data-value="1">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon  ratio-icon act active" data-value="2">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon  ratio-icon" data-value="3">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon  ratio-icon" data-value="4">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon  ratio-icon" data-value="5">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg>`;
  } else if (rating >= 1) {
    stars = `<span class="ratio-count">${rating}</span>
        <svg class="rat-icon act active ratio-icon act active" data-value="1">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon  ratio-icon" data-value="2">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon  ratio-icon" data-value="3">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon  ratio-icon" data-value="4">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon  ratio-icon" data-value="5">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg>`;
  } else {
    stars = `<span class="ratio-count">${rating}</span>
        <svg class="rat-icon ratio-icon" data-value="1">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon ratio-icon" data-value="2">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon ratio-icon" data-value="3">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon ratio-icon" data-value="4">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon ratio-icon" data-value="5">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg>`;
  }
  const starsContainer = document.querySelector('.stars-ratio');
  starsContainer.innerHTML = stars;
}
