// ================================
// сторінка favorite =============

const categoryFilter = document.querySelector('.favorite-categories');
const recipeList = document.querySelector('.card-recipe-favorite');
const categorySelect = document.querySelector('.category-select');
const errorMessageEl = document.querySelector('.js-noone');
const paginationList = document.querySelector('.page-pagination-list');
const iconsUrl = new URL('../img/icons.svg', import.meta.url);

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
let itemsPerPage = 6;

let allElements;
let totalPages;
resizePage();

window.addEventListener('resize', resizePage);

function resizePage() {
  run(FAVORITE_RECIPE);
}

export default function run(arrayOfObjects) {
  if (arrayOfObjects && arrayOfObjects.length) {
    allElements = arrayOfObjects.length;
    // window.scrollTo({ top: 0, behavior: 'smooth' });
    screenWidthFunct();
    totalPages = Math.ceil(allElements / itemsPerPage);
    if (totalPages < currentPage) {
      currentPage = 1;
    }
    renderMarkup(arrayOfObjects); //завантаження списку на сторінку з локал сторедж
    document.querySelector('.picture-wrapp').style.display = 'block';
    document.querySelector('.picture-wrapp').style.margin = '0 0 40px 0';
  } else {
    paginationList.style.display = 'none';
    categoryFilter.style.display = 'none'; // приховує фільтр по категорії
    errorMessageEl.style.display = 'block'; //повідомлення про пустий список
  }
}

// рендер html, відображає на сторінці
function renderMarkup(markup) {
  const sliceMarkup = sliceMarkupFun(markup);
  deactiveBtn();
  activeBtn();
  recipeList.innerHTML = ' ';
  const createMarkupHtml = createMarkup(sliceMarkup);
  recipeList.insertAdjacentHTML('beforeend', createMarkupHtml);
  // addCardsInHtml(sliceMarkupFun(markup));
}

function createBtn() {
  if (totalPages === 1) {
    return (paginationList.style.display = 'none');
  } else {
    paginationList.style.display = 'flex';
  }
  document.querySelector('.page-pagination-item-third').style.display = 'none';
  // refs.btnThird.style.display = 'none'; // =====================треба повісити клас

  if (totalPages === 2) {
    // refs.btnSecond.style.display = 'none';
    document.querySelector('.page-pagination-item-second').style.display =
      'none';
  } else {
    document.querySelector('.page-pagination-item-second').style.display =
      'block';
  }
  // console.log(totalPages);
  // console.log(refs.btnSecond.textContent);
  refs.btnOther.textContent = totalPages;
}

function sliceMarkupFun(markup) {
  createBtn();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const slicedMarkup = markup.slice(startIndex, endIndex);

  return slicedMarkup;
}

// // створює список карток
function createMarkup(recipes) {
  return recipes
    .map(el => {
      const numStars = Math.round(el.rating);
      let stars = ``;

      for (let i = 0; i < numStars; i++) {
        stars += `<svg class="rat-icon act active">
              <use href="${iconsUrl.pathname}#icon-Star"></use></svg>`;
      }

      if (numStars < 5) {
        for (let i = 0; i < 5 - numStars; i++) {
          stars += `<svg class="rat-icon ">
              <use href="${iconsUrl.pathname}#icon-Star"></use></svg>`;
        }
      }

      return `
    <li class="recipe-item">
      <div class="photo-recipe-card " style="background: linear-gradient( 1deg, rgba(5, 5, 5, 0.6) 50%, rgba(5, 5, 5, 0) 100% ), url('${
        el.preview
      }'); background-repeat: no-repeat; background-size: cover;">
      <button class="fav-btn" >
      <svg class="fav-icon activ" data-id="${el._id}">
          <use href="${iconsUrl.pathname}#icon-heart-full"></use>
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

categorySelect.addEventListener('change', handlerCategorySelect);

// // фільтр
function handlerCategorySelect(event) {
  const selectedCategory = event.target.value;
  if (selectedCategory === '0') {
    run(FAVORITE_RECIPE);
  } else {
    const filteredRecipes = FAVORITE_RECIPE.filter(
      recipe => recipe.category === selectedCategory
    );
    // console.log(filteredRecipes);
    currentPage = 1;
    run(filteredRecipes);
  }
}

// //пагінація
paginationList.addEventListener('click', event => {
  if (event.target.classList.contains('btn-list')) {
    if (event.target.classList.contains('btn-first')) {
      currentPage = 1;
    } else if (event.target.classList.contains('btn-second')) {
      if (event.target.textContent > 2) {
        currentPage = event.target.textContent;
      } else {
        currentPage = 2;
      }
    } else if (event.target.classList.contains('btn-third')) {
      currentPage = 3;
    } else if (event.target.classList.contains('btn-show-others')) {
      currentPage = totalPages;
    }
    renderingBtn();
  }
});

refs.btnBegin.addEventListener('click', () => {
  currentPage = 1;
  renderingBtn;
});

refs.btnPrev.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderingBtn();
  }
});

refs.btnNext.addEventListener('click', () => {
  if (currentPage !== totalPages) {
    currentPage += 1;
    renderingBtn();
  }
});

refs.btnEnd.addEventListener('click', () => {
  currentPage = totalPages;
  renderingBtn();
});

function renderingBtn() {
  run(FAVORITE_RECIPE);
}

function activeBtn() {
  if (currentPage === 1) {
    refs.btnPrev.classList.remove('act');
    refs.btnBegin.classList.remove('act');

    refs.btnPrev.classList.add('bc');
    refs.btnBegin.classList.add('bc');
  }
  if (currentPage === 1) {
    refs.btnFirst.classList.add('act');
  }
  if (currentPage === 1) {
    refs.btnSecond.textContent = 2;
  }
  if (currentPage === totalPages) {
    refs.btnSecond.textContent = totalPages - 1;
  }
  if (
    currentPage === 2 ||
    (currentPage > 2 && currentPage < totalPages && totalPages > 2)
  ) {
    refs.btnSecond.classList.add('act');
    refs.btnSecond.textContent = currentPage;
  }
  // if (currentPage === 3) {
  //   refs.btnThird.classList.add('act');
  // }
  if (currentPage === totalPages) {
    refs.btnOther.classList.add('act');
  }
  if (currentPage < totalPages) {
    refs.btnNext.classList.remove('bc');
    refs.btnEnd.classList.remove('bc');
    refs.btnNext.classList.add('act');
    refs.btnEnd.classList.add('act');
  }
}

function deactiveBtn() {
  if (currentPage > 1) {
    refs.btnPrev.classList.add('act');
    refs.btnBegin.classList.add('act');
    refs.btnPrev.classList.remove('bc');
    refs.btnBegin.classList.remove('bc');
  }

  refs.btnFirst.classList.remove('act');
  if (totalPages <= 3) {
    refs.btnSecond.textContent = 2;
  }
  refs.btnSecond.classList.remove('act');
  refs.btnThird.classList.remove('act');
  if (currentPage === totalPages) {
    refs.btnNext.classList.remove('act');
    refs.btnEnd.classList.remove('act');

    refs.btnNext.classList.add('bc');
    refs.btnEnd.classList.add('bc');
  }
  if (currentPage !== totalPages) {
    refs.btnOther.classList.remove('act');
  }
}

function screenWidthFunct() {
  const screenWidth = window.innerWidth;

  // console.log('screenWidth before:', screenWidth);
  // console.log('itemsPerPage', itemsPerPage);
  if (screenWidth < 768) {
    itemsPerPage = 6;
  } else if (screenWidth >= 768 && 1280 > screenWidth) {
    itemsPerPage = 9;
  } else if (screenWidth >= 1280) {
    itemsPerPage = 12;
  }
  // console.log('screenWidth after:', screenWidth);
  // console.log('itemsPerPage', itemsPerPage);
}
