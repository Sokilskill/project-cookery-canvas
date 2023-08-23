// ================================
// сторінка favorite =============

const categoryFilter = document.querySelector('.favorite-categories');
const recipeList = document.querySelector('.card-recipe-favorite');
const categorySelect = document.querySelector('.category-select');
const errorMessageEl = document.querySelector('.js-noone');
const paginationList = document.querySelector('.page-pagination-list');

// favoriteRecipes сюди додавати після натискання кнопки додати в улюблені
const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
console.log(favoriteRecipes);

let allElements;
let currentPage = 1;
let itemsPerPage = 12;

//запуск
function run() {
  if (favoriteRecipes) {
    allElements = favoriteRecipes.length;
    console.log(favoriteRecipes.length);
    categorySelect.addEventListener('change', handlerCategorySelect);
    renderMarkup(favoriteRecipes); //завантаження списку на сторінку з локал сторедж
    errorMessageEl.classList.add('disactive-message'); //відключає повідомлення про пустий список
  } else {
    paginationList.style.display = 'none';
    categoryFilter.style.display = 'none'; // приховує фільтр по категорії
    errorMessageEl.classList.remove('disactive-message');
  }
}

run();
const totalPages = Math.ceil(allElements / itemsPerPage);

// рендер html, відображає на сторінці
function renderMarkup(markup) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const slicedMarkup = markup.slice(startIndex, endIndex);

  recipeList.innerHTML = '';
  createMarkup(slicedMarkup);
}

// створює список карток
function createMarkup(recipes) {
  recipeList.insertAdjacentHTML(
    'beforeend',
    recipes
      .map(el => {
        const newUrl = new URL('../img/icons.svg', import.meta.url);

        const numStars = Math.round(el.rating);
        let stars = '';
        //   console.log(numStars);

        for (let i = 0; i < numStars; i++) {
          stars += `<svg class="rat-icon act">
              <use href="${newUrl}#icon-Star"></use></svg>`;
        }

        if (numStars < 5) {
          for (i = 0; i < 5 - numStars; i++) {
            stars += `<svg class="rat-icon ">
              <use href="${newUrl}#icon-Star"></use></svg>`;
          }
        }
        //   console.log(stars);

        return `
      <li class="recipe-item"> 
        <div class="photo-recipe-card " style="background:linear-gradient( 1deg, rgba(5, 5, 5, 0.6) 50%, rgba(5, 5, 5, 0) 100% ), url('${
          el.preview
        }'); background-repeat: no-repeat; background-size:cover;">
        <button class="fav-btn" >
            
        <svg class="fav-icon activ" data-id="${el._id}">
            <use href="${newUrl}#icon-heart-full"></use>
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
          <button class="see-recipe-card" data-id="${
            el._id
          }">See recipe</button>
          </div>
        </div>
      </div>
      </li>
     `;
      })
      .join('')
  );
}

// фільтр
function handlerCategorySelect(event) {
  const selectedCategory = event.target.value;
  console.log(selectedCategory);
  if (selectedCategory === '0') {
    // const allRecipesMarkup = createMarkup(favoriteRecipes);
    return renderMarkup(favoriteRecipes);
  } else {
    const filteredRecipes = favoriteRecipes.filter(
      recipe => recipe.category === selectedCategory
    );
    console.log(filteredRecipes);

    // const filteredMarkup = createMarkup(filteredRecipes);
    return renderMarkup(filteredRecipes);
  }
}

//пагінація
paginationList.addEventListener('click', event => {
  if (event.target.classList.contains('btn-list')) {
    if (event.target.classList.contains('btn-first')) {
      currentPage = 1;
      event.target.classList.add('act');
      console.log(event.target);
    } else if (event.target.classList.contains('btn-second')) {
      currentPage = 2;
      event.target.classList.add('act');

      console.log(currentPage);
    } else if (event.target.classList.contains('btn-third')) {
      currentPage = 3;
      console.log(currentPage);
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
