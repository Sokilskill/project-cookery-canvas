import SlimSelect from 'slim-select';
import axios from 'axios';
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';
import Pagination from './pagination';
const pagination = new Pagination();

const refs = {
  inputEl: document.querySelector('#search-recipe'),
  selectTime: document.querySelector('.filtr-time'),
  selectArea: document.querySelector('.filtr-area'),
  selectIngredients: document.querySelector('.filtr-ingredients'),
  recipeList: document.querySelector('.cards-recipe'),
  btnBegin: document.querySelector('.btn-beginning'),
  btnPrev: document.querySelector('.btn-previous'),
  btnFirst: document.querySelector('.btn-first'),
  btnSecond: document.querySelector('.btn-second'),
  btnThird: document.querySelector('.btn-third'),
  btnOther: document.querySelector('.btn-show-others'),
  btnNext: document.querySelector('.btn-next'),
  btnEnd: document.querySelector('.btn-end'),
  categoryBtn: document.querySelector('.categories-list'),
  allCatBtn: document.querySelector('all-categories-btn'),
  pagBtn: document.querySelector('.page-pagination-list'),
};
hidden(refs.pagBtn);
createSelect(refs.selectTime, '0 min');

getApi('areas').then(r => {
  refs.selectArea.insertAdjacentHTML('beforeend', stringConcatenation(r));
  createSelect(refs.selectArea, 'Region');
});

getApi('ingredients').then(r => {
  refs.selectIngredients.insertAdjacentHTML(
    'beforeend',
    stringConcatenationIng(r)
  );
  createSelect(refs.selectIngredients, 'Product');
});

initialRecipeWindow();
getAllRecipes().then(r => {
  if (r) {
    createCards(r.results);
    appdateTotal(r.totalPages);
    console.log(pagination.total);
    rmHidden(refs.pagBtn);
  }
});

refs.categoryBtn.addEventListener('click', onClickBtnRecipeInAll);
refs.selectTime.addEventListener('change', onChangeTime);
refs.selectArea.addEventListener('change', onChangeArea);
refs.selectIngredients.addEventListener('change', onChangeIngredients);
refs.btnBegin.addEventListener('click', onClickBegininPage);
refs.btnPrev.addEventListener('click', onClickPrevPage);
refs.btnFirst.addEventListener('click', onClickBegininPage);

function onClickBegininPage(e) {
  refs.recipeList.innerHTML = '';
  pagination.pages = 1;
  getAllRecipes().then(r => {
    createCards(r.results);
    appdateTotal(r.totalPages);
    console.log(pagination.total);
    if (pagination.totalRecipe === null) {
      alert('Wuups');
      hidden(refs.pagBtn);
      return;
    }
  });
}
function onClickPrevPage(e) {
  if (pagination.page > 1) {
    refs.recipeList.innerHTML = '';
    pagination.decr();
    getAllRecipes().then(r => {
      createCards(r.results);
      appdateTotal(r.totalPages);
      console.log(pagination.total);
    });
  }
}

function onClickSecondPage(e) {}
function onClickThirdPage(e) {}
function onClickShowOtherPage(e) {}
function onClickLastPage(e) {}

function onClickBtnRecipeInAll(e) {
  pagination.categories = e.target.dataset.value;
  refs.recipeList.innerHTML = '';

  getAllRecipes().then(r => {
    createCards(r.results);
    appdateTotal(r.totalPages);
    console.log(pagination.total);
    if (pagination.totalRecipe === null) {
      alert('Wuups');
      hidden(refs.pagBtn);
      return;
    }
  });
}

function onChangeIngredients(e) {
  pagination.ingredients = e.target.value;
  clearCardsList();
  getAllRecipes().then(r => {
    createCards(r.results);
    appdateTotal(r.totalPages);
    console.log(pagination.total);
    if (pagination.totalRecipe === null) {
      alert('Wuups');
      hidden(refs.pagBtn);
      return;
    }
  });
}

function onChangeArea(e) {
  pagination.areas = e.target.value;
  clearCardsList();
  getAllRecipes().then(r => {
    createCards(r.results);
    appdateTotal(r.totalPages);
    console.log(pagination.total);
    if (pagination.totalRecipe === null) {
      alert('Wuups');
      hidden(refs.pagBtn);
      return;
    }
  });
}

function onChangeTime(e) {
  pagination.times = e.target.value;
  clearCardsList();
  getAllRecipes().then(r => {
    createCards(r.results);
    appdateTotal(r.totalPages);
    console.log(pagination.total);
    if (pagination.totalRecipe === null) {
      alert('Wuups');
      hidden(refs.pagBtn);
      return;
    }
  });
}

function clearCardsList() {
  refs.recipeList.innerHTML = '';
}

function initialRecipeWindow() {
  if (window.screen.width < 768) {
    pagination.limits = 6;
  } else if (window.screen.width < 1280) {
    pagination.limits = 8;
  } else {
    pagination.limits = 9;
  }
}

function createCards(result) {
  refs.recipeList.insertAdjacentHTML('beforeend', addingCards(result));
}

function appdateTotal(tot) {
  pagination.total = tot;
}

function addingCards(el) {
  return el
    .map(({ title, description, _id, rating, thumb }) => {
      const descr = description.slice(0, 94);
      if (rating >= 4.5) {
        return `
      <div class="photo-recipe-card" style="background-image: url(${thumb}); background-repeat: no-repeat; background-size:contain;">
        <button class="fav-btn" data-id="${_id}>
          <svg class="fav-icon">
            <use href="./img/icons.svg#icon-heart"></use>
          </svg>
        </button>

        <div class="info-recipe-card" >
          <h2 class="title-recipe-card">
            ${title}
          </h2>
          <p class="descr-recipe-card">
            ${descr}...
          </p>
          <div class="thum-raying-card">
            <div class="rating-recipe-card">
            <span class="rating-value">${rating}</span>

            <svg class="rat-icon act">
              <use href="./img/icons.svg#icon-Star"></use>
            </svg><svg class="rat-icon act">
              <use href="./img/icons.svg#icon-Star"></use>
            </svg><svg class="rat-icon act">
              <use href="./img/icons.svg#icon-Star"></use>
            </svg><svg class="rat-icon act">
              <use href="./img/icons.svg#icon-Star"></use>
            </svg><svg class="rat-icon act">
              <use href="./img/icons.svg#icon-Star"></use>
            </svg>

          </div>
          <button class="see-recipe-card">See recipe</button>
          </div>
        </div>
      </div>`;
      } else if (rating >= 4) {
        return `
      <div class="photo-recipe-card" style="background-image: url(${thumb}); background-repeat: no-repeat; background-size:contain;">
        <button class="fav-btn" data-id="${_id}>
          <svg class="fav-icon">
            <use href="./img/icons.svg#icon-heart"></use>
          </svg>
        </button>

        <div class="info-recipe-card" >
          <h2 class="title-recipe-card">
            ${title}
          </h2>
          <p class="descr-recipe-card">
            ${descr}...
          </p>
          <div class="thum-raying-card">
            <div class="rating-recipe-card">
            <span class="rating-value">${rating}</span>

            <svg class="rat-icon act">
              <use href="./img/icons.svg#icon-Star"></use>
            </svg><svg class="rat-icon act">
              <use href="./img/icons.svg#icon-Star"></use>
            </svg><svg class="rat-icon act">
              <use href="./img/icons.svg#icon-Star"></use>
            </svg><svg class="rat-icon act">
              <use href="./img/icons.svg#icon-Star"></use>
            </svg><svg class="rat-icon">
              <use href="./img/icons.svg#icon-Star"></use>
            </svg>

          </div>
          <button class="see-recipe-card">See recipe</button>
          </div>
        </div>
      </div>`;
      } else if (rating >= 3) {
        return `
      <div class="photo-recipe-card" style="background-image: url(${thumb}); background-repeat: no-repeat; background-size:contain;">
        <button class="fav-btn" data-id="${_id}>
          <svg class="fav-icon">
            <use href="./img/icons.svg#icon-heart"></use>
          </svg>
        </button>

        <div class="info-recipe-card" >
          <h2 class="title-recipe-card">
            ${title}
          </h2>
          <p class="descr-recipe-card">
            ${descr}...
          </p>
          <div class="thum-raying-card">
            <div class="rating-recipe-card">
            <span class="rating-value">${rating}</span>

            <svg class="rat-icon act">
              <use href="./img/icons.svg#icon-Star"></use>
            </svg><svg class="rat-icon act">
              <use href="./img/icons.svg#icon-Star"></use>
            </svg><svg class="rat-icon act">
              <use href="./img/icons.svg#icon-Star"></use>
            </svg><svg class="rat-icon">
              <use href="./img/icons.svg#icon-Star"></use>
            </svg><svg class="rat-icon">
              <use href="./img/icons.svg#icon-Star"></use>
            </svg>

          </div>
          <button class="see-recipe-card">See recipe</button>
          </div>
        </div>
      </div>`;
      } else if (rating >= 2) {
        return `
      <div class="photo-recipe-card" style="background-image: url(${thumb}); background-repeat: no-repeat; background-size:contain;">
        <button class="fav-btn" data-id="${_id}>
          <svg class="fav-icon">
            <use href="./img/icons.svg#icon-heart"></use>
          </svg>
        </button>

        <div class="info-recipe-card" >
          <h2 class="title-recipe-card">
            ${title}
          </h2>
          <p class="descr-recipe-card">
            ${descr}...
          </p>
          <div class="thum-raying-card">
            <div class="rating-recipe-card">
            <span class="rating-value">${rating}</span>

            <svg class="rat-icon act">
              <use href="./img/icons.svg#icon-Star"></use>
            </svg><svg class="rat-icon act">
              <use href="./img/icons.svg#icon-Star"></use>
            </svg><svg class="rat-icon">
              <use href="./img/icons.svg#icon-Star"></use>
            </svg><svg class="rat-icon">
              <use href="./img/icons.svg#icon-Star"></use>
            </svg><svg class="rat-icon">
              <use href="./img/icons.svg#icon-Star"></use>
            </svg>

          </div>
          <button class="see-recipe-card">See recipe</button>
          </div>
        </div>
      </div>`;
      } else {
        return `
      <div class="photo-recipe-card" style="background-image: url(${thumb}); background-repeat: no-repeat; background-size:contain;">
        <button class="fav-btn" data-id="${_id}>
          <svg class="fav-icon">
            <use href="../img/icons.svg#icon-heart"></use>
          </svg>
        </button>

        <div class="info-recipe-card" >
          <h2 class="title-recipe-card">
            ${title}
          </h2>
          <p class="descr-recipe-card">
            ${descr}...
          </p>
          <div class="thum-raying-card">
            <div class="rating-recipe-card">
            <span class="rating-value">${rating}</span>

            <svg class="rat-icon act">
              <use href="./img/icons.svg#icon-Star"></use>
            </svg><svg class="rat-icon">
              <use href="./img/icons.svg#icon-Star"></use>
            </svg><svg class="rat-icon">
              <use href="./img/icons.svg#icon-Star"></use>
            </svg><svg class="rat-icon">
              <use href="./img/icons.svg#icon-Star"></use>
            </svg><svg class="rat-icon">
              <use href="./img/icons.svg#icon-Star"></use>
            </svg>

          </div>
          <button class="see-recipe-card">See recipe</button>
          </div>
        </div>
      </div>`;
      }
    })
    .join('');
}

function getAllRecipes() {
  const options = {
    params: {
      category: pagination.categories,
      page: pagination.pages,
      limit: pagination.limits,
      time: pagination.times,
      area: pagination.areas,
      ingredient: pagination.ingredients,
    },
  };

  return axios.get(`${BASE_URL}recipes`, options).then(r => r.data);
}

function stringConcatenation(ms) {
  return ms
    .map(({ _id, name }) => {
      return `<option value="${name}" id="${_id}">${name}</option>`;
    })
    .join('');
}

function stringConcatenationIng(ms) {
  return ms
    .map(({ _id, name }) => {
      return `<option value="${_id}">${name}</option>`;
    })
    .join('');
}

function getApi(tag) {
  return axios.get(`${BASE_URL}${tag}`).then(r => r.data);
}

function createSelect(select, placehold) {
  new SlimSelect({
    select: select,
    settings: {
      contentPosition: 'absolute',
      placeholderText: placehold,
      showSearch: false,
      searchHighlight: true,
    },
  });
}

function hidden(itm) {
  itm.classList.add('hidden-itm');
}

function rmHidden(itm) {
  itm.classList.remove('hidden-itm');
}
