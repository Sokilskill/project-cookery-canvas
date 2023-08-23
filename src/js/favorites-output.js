// ================================
// сторінка favorite =============

const categoryFilter = document.querySelector('.favorite-categories');
const recipeList = document.querySelector('.card-recipe-favorite');
const categorySelect = document.querySelector('.category-select');
const errorMessageEl = document.querySelector('.js-noone');

// забирає об'єкт масиву з локал сторедж
// favoriteRecipes сюди додавати після натискання кнопки додати в улюблені
const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
console.log(favoriteRecipes);

// рендер html
function renderMarkup(markup) {
  recipeList.innerHTML = '';
  recipeList.innerHTML = markup;
}

// створює картки
function createMarkup(recipes) {
  return recipes
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
                   <use href="${newUrl}#icon-Star"></use>
                 </svg>`;
        }
      }
      //   console.log(stars);

      return `
      <li class="recipe-item"> 
        <div class="photo-recipe-card photo-recipe-card-favorite" style="background:linear-gradient( 1deg, rgba(5, 5, 5, 0.6) 50%, rgba(5, 5, 5, 0) 100% ), url('${
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
            <span class="rating-value">${el.rating}</span>
          
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
    .join('');
}

// фільтр

function handlerCategorySelect(event) {
  const selectedCategory = event.target.value;
  console.log(selectedCategory);
  if (selectedCategory === '0') {
    const allRecipesMarkup = createMarkup(favoriteRecipes);
    renderMarkup(allRecipesMarkup);
  } else {
    const filteredRecipes = favoriteRecipes.filter(
      recipe => recipe.category === selectedCategory
    );
    console.log(filteredRecipes);

    const filteredMarkup = createMarkup(filteredRecipes);
    renderMarkup(filteredMarkup);
  }
}

//запуск
function run() {
  if (favoriteRecipes) {
    categorySelect.addEventListener('change', handlerCategorySelect);

    const allRecipesMarkup = createMarkup(favoriteRecipes);

    renderMarkup(allRecipesMarkup);
    errorMessageEl.classList.add('disactive-message');
  } else {
    categoryFilter.style.display = 'none';
    errorMessageEl.classList.remove('disactive-message');
  }
}

run();
