// ================================
// сторінка favorite =============

const categoryFilter = document.querySelector('.favorite-categories');
const recipeList = document.querySelector('.card-recipe-favorite');
const categorySelect = document.querySelector('.category-select');
const errorMessageEl = document.querySelector('.js-noone');
const paginationList = document.querySelector('.page-pagination-list');

const refs = {
  btnBegin: document.querySelector('.btn-beginning'),
  btnPrev: document.querySelector('.btn-previous'),
  btnFirst: document.querySelector('.btn-first'),
  btnSecond: document.querySelector('.btn-second'),
  btnThird: document.querySelector('.btn-third'),
  btnOther: document.querySelector('.btn-show-others'),
  btnNext: document.querySelector('.btn-next'),
  btnEnd: document.querySelector('.btn-end'),
};

// FAVORITE_RECIPE сюди додавати після натискання кнопки додати в улюблені
const FAVORITE_RECIPE = JSON.parse(localStorage.getItem('FAVORITE_RECIPE'));
console.log(FAVORITE_RECIPE);

let currentPage = 1;
let itemsPerPage = 12;

const allElements = FAVORITE_RECIPE.length;
const totalPages = Math.ceil(allElements / itemsPerPage);

console.log(FAVORITE_RECIPE.length);

//запуск
function run() {
  if (FAVORITE_RECIPE) {
    categorySelect.addEventListener('change', handlerCategorySelect);
    renderMarkup(FAVORITE_RECIPE); //завантаження списку на сторінку з локал сторедж
    errorMessageEl.classList.add('disactive-message'); //відключає повідомлення про пустий список
  } else {
    paginationList.style.display = 'none';
    categoryFilter.style.display = 'none'; // приховує фільтр по категорії
    errorMessageEl.classList.remove('disactive-message');
  }
}

run();

// рендер html, відображає на сторінці
function renderMarkup(markup) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const slicedMarkup = markup.slice(startIndex, endIndex);
  recipeList.innerHTML = ' ';
  console.log(recipeList.innerHTML);
  addCardsInHtml(slicedMarkup);
}

function addCardsInHtml(result) {
  recipeList.insertAdjacentHTML('beforeend', createMarkup(result));
}
// створює список карток
function createMarkup(recipes) {
  return recipes
    .map(el => {
      // let iconsUrl = new URL('../img/icons.svg', import.meta.url);
      const numStars = Math.round(el.rating);
      let stars = ``;

      // for (let i = 0; i < numStars; i++) {
      //   stars += `<svg class="rat-icon act">
      //         <use href="${iconsUrl.pathname}#icon-Star"></use></svg>`;
      // }

      // if (numStars < 5) {
      //   for (let i = 0; i < 5 - numStars; i++) {
      //     stars += `<svg class="rat-icon ">
      //         <use href="${iconsUrl.pathname}#icon-Star"></use></svg>`;
      //   }
      // }

      return `
    <li class="recipe-item">
      <div class="photo-recipe-card " style="background-image: linear-gradient( 1deg, rgba(5, 5, 5, 0.6) 50%, rgba(5, 5, 5, 0) 100% ), url('${
        el.preview
      }'); background-repeat: no-repeat; background-size: cover;">
      <button class="fav-btn" >
      <svg class="fav-icon activ" data-id="${el._id}">
          <use href=""></use>
        </svg>
      </button>

      <div class="info-recipe-card  " >
        <h2 class="title-recipe-card">
          ${el.title}
        </h2>
        <p class="descr-recipe-card">
          ${el.description.slice(0, 94)}...
        </p>
        <div class="thum-raying-card">
          <div class="rating-recipe-card">
          <span class="rating-value ">${el.rating.toFixed(1)}</span>
        ${stars}

        </div>
        <button class="see-recipe-card" data-id="${el._id}">See recipe</button>
        </div>
      </div>
    </div>
    </li>`;
    })
    .join('');
}

// фільтр
function handlerCategorySelect(event) {
  const selectedCategory = event.target.value;
  console.log(selectedCategory);
  if (selectedCategory === '0') {
    renderMarkup(slicedMarkup);
  } else {
    const filteredRecipes = FAVORITE_RECIPE.filter(
      recipe => recipe.category === selectedCategory
    );
    console.log(filteredRecipes);

    // const filteredMarkup = createMarkup(filteredRecipes);
    renderMarkup(filteredRecipes);
  }
}

//пагінація
paginationList.addEventListener('click', event => {
  if (event.target.classList.contains('btn-list')) {
    if (event.target.classList.contains('btn-first')) {
      currentPage = 1;
      event.target.classList.add('act');
      refs.btnSecond.classList.remove('act');
      refs.btnThird.classList.remove('act');

      renderMarkup(FAVORITE_RECIPE);
      console.log(event.target);
    } else if (event.target.classList.contains('btn-second')) {
      currentPage = 2;
      event.target.classList.add('act');
      refs.btnFirst.classList.remove('act');
      refs.btnThird.classList.remove('act');
      renderMarkup(FAVORITE_RECIPE);

      console.log(currentPage);
    } else if (event.target.classList.contains('btn-third')) {
      currentPage = 3;
      console.log(currentPage);
      event.target.classList.add('act');
      refs.btnSecond.classList.remove('act');
      refs.btnSecond.classList.remove('act');
      renderMarkup(FAVORITE_RECIPE);
      event.target.classList.add('act');
    } else if (event.target.classList.contains('.btn-show-others')) {
      currentPage = totalPages;
    } else if (event.target.classList.contains('btn-previous')) {
      if (currentPage > 1) {
        currentPage--;
      }
    } else if (event.target.classList.contains('btn-next')) {
      if (currentPage < totalPages) {
        currentPage++;
      }
    } else {
      currentPage = parseInt(event.target.textContent);
    }

    // renderMarkup(createMarkup);
  }
});
