import SlimSelect from 'slim-select';
import axios from 'axios';
import Notiflix from 'notiflix';
import { debounce } from 'throttle-debounce';
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';
import Pagination from './pagination';
import LocalStorage from './localStorage';
const pagination = new Pagination();
const localData = new LocalStorage();
const FAVORITES = 'favorites';
const FAVORITES_RECIPES = 'FAVORITE_RECIPE';

if (!localStorage.getItem(FAVORITES_RECIPES)) {
  localStorage.setItem(FAVORITES_RECIPES, JSON.stringify(localData.getLoc()));
}
if (!localStorage.getItem(FAVORITES)) {
  localStorage.setItem(FAVORITES, JSON.stringify(pagination.getLoc()));
}

let favoritRecipes = JSON.parse(localStorage.getItem(FAVORITES_RECIPES));
localData.allPushLoc(favoritRecipes);

let favorit = JSON.parse(localStorage.getItem(FAVORITES));
pagination.allPushLoc(favorit);

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
  allCatBtn: document.querySelector('.all-categories-btn'),
  pagBtn: document.querySelector('.page-pagination-list'),
  btnResetFiltr: document.querySelector('.btn-reset-filtr'),
  formEl: document.querySelector('.search-form'),
  loaderEl: document.querySelector('.loader-f'),
};



let timeSelect = new SlimSelect({
  select: refs.selectTime,
  settings: {
    contentPosition: 'absolute',
    placeholderText: '0 min',
    showSearch: false,
    searchHighlight: true,
  },
});
let areaSelect;
let ingrSelect;
getApi('areas').then(r => {
  refs.selectArea.insertAdjacentHTML('beforeend', stringConcatenation(r));
  areaSelect = new SlimSelect({
    select: refs.selectArea,
    settings: {
      contentPosition: 'absolute',
      placeholderText: 'Region',
      showSearch: false,
      searchHighlight: true,
    },
  });
});

getApi('ingredients').then(r => {
  refs.selectIngredients.insertAdjacentHTML(
    'beforeend',
    stringConcatenationIng(r)
  );
  ingrSelect = new SlimSelect({
    select: refs.selectIngredients,
    settings: {
      contentPosition: 'absolute',
      placeholderText: 'Product',
      showSearch: false,
      searchHighlight: true,
    },
  });
});

initialRecipeWindow();
getAllRecipes().then(r => {
  if (r) {
    createCards(r.results);
    appdateTotal(r.totalPages);
    defaultValuePaginat();
    hidLoader();
  }
});

refs.categoryBtn.addEventListener('click', onClickBtnRecipeInAll);
refs.selectTime.addEventListener('change', onChangeTime);
refs.selectArea.addEventListener('change', onChangeArea);
refs.selectIngredients.addEventListener('change', onChangeIngredients);
refs.inputEl.addEventListener('input', debounce(300, onChangeRequest));
refs.btnBegin.addEventListener('click', onClickBegininPage);
refs.btnPrev.addEventListener('click', onClickPrevPage);
refs.btnFirst.addEventListener('click', onClickFirstPage);
refs.btnSecond.addEventListener('click', onClickSecondPage);
refs.btnThird.addEventListener('click', onClickThirdPage);
refs.btnNext.addEventListener('click', onClickNextPage);
refs.btnEnd.addEventListener('click', onClickLastPage);
refs.btnOther.addEventListener('click', onClickOtherBtnPage);
refs.formEl.addEventListener('submit', onSub);
refs.btnResetFiltr.addEventListener('click', onClickReloadFilter);
refs.allCatBtn.addEventListener('click', onRemoveRecipe);
refs.recipeList.addEventListener('click', onClickRecipeList);


function onRemoveRecipe(e) {
  hidLoader();
  pagination.categories = '';
  clearCardsList();
  defaultPage();
  getAllRecipes().then(r => {
    createCards(r.results);
    appdateTotal(r.totalPages);
    rmHiddAllBtn();
    rmBc(refs.btnNext);
    rmBc(refs.btnEnd);
    seePaginBtn();
    hidLoader();
  });
}


export default function onClickAddToFavoritInModal() {
  favorit = JSON.parse(localStorage.getItem(FAVORITES));
  pagination.clearLoc();
  pagination.allPushLoc(favorit);
  
  favoritRecipes = JSON.parse(localStorage.getItem(FAVORITES_RECIPES));
  localData.clearLoc();
  localData.allPushLoc(favoritRecipes);

  clearCardsList();
  defaultPage();
  getAllRecipes().then(r => {
    createCards(r.results);
    appdateTotal(r.totalPages);
    rmHiddAllBtn();
    rmBc(refs.btnNext);
    rmBc(refs.btnEnd);
    seePaginBtn();
  });
}

function onClickRecipeList(e) {
  const idTarget = e.target.parentNode.dataset.id;
  const classPar = e.target.parentNode.classList;
  favorit = JSON.parse(localStorage.getItem(FAVORITES));
  pagination.clearLoc();
  pagination.allPushLoc(favorit);
  
  if (e.target.parentNode.classList.contains('fav-icon')) {
    if (pagination.getLoc().includes(idTarget)) {
      localData.delItmLoc(idTarget);
      localStorage.setItem(
        FAVORITES_RECIPES,
        JSON.stringify(localData.getLoc())
      );
      pagination.delItmLoc(idTarget);
      localStorage.setItem(FAVORITES, JSON.stringify(pagination.getLoc()));
      classPar.remove('activ');
    } else {
      getApiOneId(idTarget).then(r => {
        localData.pushLoc(r);
        localStorage.setItem(
          FAVORITES_RECIPES,
          JSON.stringify(localData.getLoc())
        );
      });

      pagination.pushLoc(idTarget);
      localStorage.setItem(FAVORITES, JSON.stringify(pagination.getLoc()));
      classPar.add('activ');
    }

    // if (pagination.getLoc().includes(idTarget)) {
    //   pagination.delItmLoc(idTarget);
    //   localStorage.setItem(FAVORITES, JSON.stringify(pagination.getLoc()));
    //   classPar.remove('activ');
    //   // classPar.add('dis');
    // } else {
    //   pagination.pushLoc(idTarget);
    //   localStorage.setItem(FAVORITES, JSON.stringify(pagination.getLoc()));
    //   // classPar.remove('dis');
    //   classPar.add('activ');
    // }
  }
}


function onChangeRequest(e) {
  hidLoader();
  pagination.req = e.target.value;
  clearCardsList();
  defaultPage();
  getAllRecipes().then(r => {
    createCards(r.results);
    appdateTotal(r.totalPages);
    rmHiddAllBtn();
    rmBc(refs.btnNext);
    rmBc(refs.btnEnd);
    seePaginBtn();
    hidLoader();
  });
}

function defaultValuePaginat() {
  refs.btnFirst.textContent = 1;
  refs.btnSecond.textContent = 2;
  refs.btnThird.textContent = 3;
  refs.btnOther.textContent = pagination.total;
}

function onClickBegininPage(e) {
  if (pagination.page > 1) {
    hidLoader();
    clearCardsList();
    pagination.pages = 1;
    getAllRecipes().then(r => {
      createCards(r.results);
      appdateTotal(r.totalPages);
      rmActive(refs.btnOther);
      rmActive(refs.btnSecond);
      rmActive(refs.btnThird);
      addActive(refs.btnFirst);
      rmHiddAllBtn();
      addBc(refs.btnBegin)
      addBc(refs.btnPrev);
      rmBc(refs.btnNext);
      rmBc(refs.btnEnd);
      hidLoader();
      if (pagination.total > 3) {
        defaultValuePaginat();
        return;
      } else if (pagination.total === 2) {
        refs.btnThird.classList.add('hidden-itm');
        refs.btnOther.classList.add('hidden-itm');
        return;
      } else if (pagination.total === 3) {
        refs.btnOther.classList.add('hidden-itm');
        return;
      }
    });
  }
}

function onClickPrevPage(e) {
  if (window.screen.width < 768) {
    if (pagination.page > 1) {
      hidLoader();
      clearCardsList();
      rmBc(refs.btnNext);
      rmBc(refs.btnEnd);
      pagination.decr();
      getAllRecipes().then(r => {
        createCards(r.results);
        appdateTotal(r.totalPages);
        hidLoader();
        if (pagination.page === 1) {
          rmActive(refs.btnSecond);
          addActive(refs.btnFirst);
          addBc(refs.btnBegin);
          addBc(refs.btnPrev);
          return;
        }
        addActive(refs.btnSecond);
        rmActive(refs.btnOther);
        refs.btnOther.textContent = pagination.totalRecipe;
        refs.btnSecond.textContent = pagination.pages;
      });
    }
  } else {
    if (pagination.page > 1) {
      hidLoader();
      clearCardsList();
      rmBc(refs.btnNext);
      rmBc(refs.btnEnd);
      pagination.decr();
      getAllRecipes().then(r => {
        hidLoader();
        createCards(r.results);
        appdateTotal(r.totalPages);
        if (pagination.page === 1) {
          rmActive(refs.btnSecond);
          addActive(refs.btnFirst);
          addBc(refs.btnBegin);
          addBc(refs.btnPrev);
          return;
        }
        if (pagination.page === 2) {
          rmActive(refs.btnThird);
          addActive(refs.btnSecond);
          refs.btnOther.textContent = pagination.totalRecipe;
          return;
        }
        addActive(refs.btnThird);
        rmActive(refs.btnOther);
        refs.btnOther.textContent = pagination.totalRecipe;
        refs.btnThird.textContent = pagination.pages;
      });
    }
  }
}

function onClickFirstPage(e) {
  if (pagination.pages > 1) {
    hidLoader();
    clearCardsList();
    rmBc(refs.btnNext);
    rmBc(refs.btnEnd);
    pagination.pages = 1;
    getAllRecipes().then(r => {
      hidLoader();
      createCards(r.results);
      appdateTotal(r.totalPages);
      rmActive(refs.btnOther);
      addActive(refs.btnFirst);
      rmActive(refs.btnSecond);
      rmActive(refs.btnThird);
      defaultValuePaginat();
      rmHiddAllBtn();
      addBc(refs.btnBegin);
      addBc(refs.btnPrev);
      if (pagination.total > 3) {
        defaultValuePaginat();
        return;
      } else if (pagination.total === 2) {
        refs.btnThird.classList.add('hidden-itm');
        refs.btnOther.classList.add('hidden-itm');
        return;
      } else if (pagination.total === 3) {
        refs.btnOther.classList.add('hidden-itm');
        return;
      }
    });
  }
}

function onClickSecondPage(e) {
  if (window.screen.width < 768) {
    if (pagination.pages !== Number(e.target.textContent)) {
      hidLoader();
      clearCardsList();
      rmBc(refs.btnBegin);
      rmBc(refs.btnPrev);
      pagination.pages = Number(e.target.textContent);
      getAllRecipes().then(r => {
        hidLoader();
        createCards(r.results);
        appdateTotal(r.totalPages);
        rmActive(refs.btnFirst);
        rmActive(refs.btnOther);
        addActive(refs.btnSecond);
        if (pagination.pages === pagination.total) {
          addBc(refs.btnNext);
          addBc(refs.btnEnd);
        } else {
          rmBc(refs.btnNext);
          rmBc(refs.btnEnd);
        }
      });
    }
  } else {
    if (
      pagination.pages !== Number(e.target.textContent) &&
      pagination.total >= Number(e.target.textContent)
    ) {
      hidLoader();
      clearCardsList();
      rmBc(refs.btnBegin);
      rmBc(refs.btnPrev);
      pagination.pages = Number(e.target.textContent);
      getAllRecipes().then(r => {
        hidLoader();
        createCards(r.results);
        appdateTotal(r.totalPages);
        rmActive(refs.btnFirst);
        rmActive(refs.btnOther);
        rmActive(refs.btnThird);
        addActive(refs.btnSecond);
        rmHiddAllBtn();
        if (pagination.total > 2) {
          rmBc(refs.btnEnd)
          rmBc(refs.btnNext)
        }
        if (pagination.pages === pagination.total) {
          refs.btnThird.classList.add('hidden-itm');
          refs.btnOther.classList.add('hidden-itm');
          addBc(refs.btnNext);
          addBc(refs.btnEnd);
          return;
        } else if (pagination.total === 3) {
          // refs.btnThird.textContent = 3;
          refs.btnOther.classList.add('hidden-itm');
          rmBc(refs.btnNext);
          rmBc(refs.btnEnd);
          return;
        }
        refs.btnOther.textContent = pagination.total;
        refs.btnThird.textContent = 3;
      });
    }
  }
}

function onClickThirdPage(e) {
  if (
    pagination.pages !== Number(e.target.textContent) &&
    pagination.total >= 3
  ) {
    hidLoader();
    clearCardsList();
    rmBc(refs.btnBegin);
    rmBc(refs.btnPrev);
    pagination.pages = Number(e.target.textContent);
    getAllRecipes().then(r => {
      hidLoader();
      createCards(r.results);
      appdateTotal(r.totalPages);
      rmActive(refs.btnFirst);
      rmActive(refs.btnOther);
      rmActive(refs.btnSecond);
      addActive(refs.btnThird);
      rmHiddAllBtn();
      if (pagination.total > 3) {
        rmBc(refs.btnEnd);
        rmBc(refs.btnNext);
        refs.btnOther.textContent = pagination.total;
      } else if (pagination.total === 3) {
        refs.btnOther.classList.add('hidden-itm');
        addBc(refs.btnNext);
        addBc(refs.btnEnd);
      }
    });
  }
}

function onClickOtherBtnPage(e) {
  if (window.screen.width < 768) {
    if (
      pagination.pages !== Number(e.target.textContent) &&
      pagination.total > 3
    ) {
      hidLoader();
      clearCardsList();
      rmBc(refs.btnBegin);
      rmBc(refs.btnPrev);
      addBc(refs.btnNext);
      addBc(refs.btnEnd);
      pagination.pages = Number(e.target.textContent);
      getAllRecipes().then(r => {
        hidLoader();
        createCards(r.results);
        appdateTotal(r.totalPages);
        rmActive(refs.btnFirst);
        rmActive(refs.btnSecond);
        addActive(refs.btnOther);
        refs.btnOther.textContent = pagination.totalRecipe;
      });
    }
  } else {
    if (
      pagination.pages !== Number(e.target.textContent) &&
      pagination.total > 3
    ) {
      hidLoader();
      clearCardsList();
      rmBc(refs.btnBegin);
      rmBc(refs.btnPrev);
      addBc(refs.btnNext);
      addBc(refs.btnEnd);
      pagination.pages = Number(e.target.textContent);
      getAllRecipes().then(r => {
        hidLoader();
        createCards(r.results);
        appdateTotal(r.totalPages);
        rmActive(refs.btnFirst);
        rmActive(refs.btnSecond);
        rmActive(refs.btnThird);
        addActive(refs.btnOther);
      });
    }
  }
}

function onClickNextPage(e) {
  if (window.screen.width < 768) {
    if (pagination.pages < pagination.total) {
      hidLoader();
      clearCardsList();
      rmBc(refs.btnBegin);
      rmBc(refs.btnPrev);
      pagination.incr();
      console.log(pagination.total);
      getAllRecipes().then(r => {
        hidLoader();
        createCards(r.results);
        appdateTotal(r.totalPages);
        rmActive(refs.btnFirst);
        if (pagination.pages === pagination.total && pagination.pages > 3) {
          addActive(refs.btnOther);
          rmActive(refs.btnSecond);
          addBc(refs.btnNext);
          addBc(refs.btnEnd);
          return;
        }
        if (pagination.pages === pagination.total) {
          addBc(refs.btnNext);
          addBc(refs.btnEnd);
        }
        addActive(refs.btnSecond);
        refs.btnSecond.textContent = pagination.pages;
      });
    }
  } else {
    if (pagination.pages < pagination.total) {
      hidLoader();
      clearCardsList();
      rmBc(refs.btnBegin);
      rmBc(refs.btnPrev);
      pagination.incr();
      getAllRecipes().then(r => {
        hidLoader();
        createCards(r.results);
        appdateTotal(r.totalPages);
        if (pagination.pages === pagination.total) {
          addBc(refs.btnNext);
          addBc(refs.btnEnd);
        }
        if (pagination.pages === 2) {
          addActive(refs.btnSecond);
          rmActive(refs.btnFirst);
          return;
        } else if (pagination.pages === 3) {
          addActive(refs.btnThird);
          rmActive(refs.btnSecond);
          return;
        } else if (
          pagination.pages === pagination.total &&
          pagination.pages > 3
        ) {
          addActive(refs.btnOther);
          rmActive(refs.btnThird);
          return;
        }
        addActive(refs.btnThird);
        refs.btnThird.textContent = pagination.pages;
      });
    }
  }
}
function onClickLastPage(e) {
  if (window.screen.width < 768) {
    if (pagination.pages !== pagination.total && pagination.total > 1) {
      hidLoader();
      clearCardsList();
      addBc(refs.btnNext);
      addBc(refs.btnEnd);
      rmBc(refs.btnBegin);
      rmBc(refs.btnPrev);
      pagination.pages = pagination.total;
      getAllRecipes().then(r => {
        hidLoader();
        createCards(r.results);
        appdateTotal(r.totalPages);
        rmActive(refs.btnFirst);
        addActive(refs.btnSecond);
        refs.btnOther.textContent = pagination.pages;
        addActive(refs.btnOther);
        if (pagination.total > 2) {
          rmActive(refs.btnSecond);
        }
      });
    }
  } else {
    if (pagination.total > 1 && pagination.pages !== pagination.total) {
      hidLoader();
      clearCardsList();
      addBc(refs.btnNext);
      addBc(refs.btnEnd);
      rmBc(refs.btnBegin);
      rmBc(refs.btnPrev);
      pagination.pages = pagination.total;
      getAllRecipes().then(r => {
        hidLoader();
        createCards(r.results);
        appdateTotal(r.totalPages);
        rmActive(refs.btnFirst);
        if (pagination.page === 2) {
          addActive(refs.btnSecond);
          return
        } else if (pagination.page === 3) {
          addActive(refs.btnThird);
          rmActive(refs.btnSecond);
          return
        } else {
          addActive(refs.btnOther);
          rmActive(refs.btnSecond);
          rmActive(refs.btnThird);
        }
        refs.btnOther.textContent = pagination.pages;
      });
    }
  }
}

function onClickBtnRecipeInAll(e) {
  pagination.categories = e.target.dataset.value;
  hidLoader();
  clearCardsList();
  defaultPage();
  getAllRecipes().then(r => {
    hidLoader();
    createCards(r.results);
    appdateTotal(r.totalPages);
    rmHiddAllBtn();
    rmBc(refs.btnNext);
    rmBc(refs.btnEnd);
    seePaginBtn();
  });
}

function onChangeIngredients(e) {
  pagination.ingredients = e.target.value;
  hidLoader();
  clearCardsList();
  defaultPage();
  getAllRecipes().then(r => {
    hidLoader();
    createCards(r.results);
    appdateTotal(r.totalPages);
    rmHiddAllBtn();
    rmBc(refs.btnNext);
    rmBc(refs.btnEnd);
    seePaginBtn();
  });
}

function onChangeArea(e) {
  pagination.areas = e.target.value;
  hidLoader();
  clearCardsList();
  defaultPage();
  getAllRecipes().then(r => {
    hidLoader();
    createCards(r.results);
    appdateTotal(r.totalPages);
    rmHiddAllBtn();
    rmBc(refs.btnNext);
    rmBc(refs.btnEnd);
    seePaginBtn();
  });
}

function onChangeTime(e) {
  pagination.times = e.target.value;
  hidLoader();
  clearCardsList();
  defaultPage();
  getAllRecipes().then(r => {
    hidLoader();
    createCards(r.results);
    appdateTotal(r.totalPages);
    rmHiddAllBtn();
    rmBc(refs.btnNext);
    rmBc(refs.btnEnd);
    seePaginBtn();
  });
}

function defaultPage() {
  pagination.pages = 1;
  rmActive(refs.btnSecond);
  rmActive(refs.btnThird);
  rmActive(refs.btnOther);
  addActive(refs.btnFirst);
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
      let stars = ``;

      const fav = favorit;

      let useIcons;
      useIcons = new URL('../img/icons.svg', import.meta.url);

      let heart = `
        <svg class="fav-icon dis" data-id="${_id}">
            <use href="${useIcons.pathname}#icon-heart-full"></use>
          </svg>`;

      if (fav.includes(_id)) {
        heart = `
        <svg class="fav-icon activ" data-id="${_id}">
            <use href="${useIcons.pathname}#icon-heart-full"></use>
          </svg>`;
      }

      if (rating >= 4.5) {
        stars = `<svg class="rat-icon act">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon act">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon act">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon act">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon act">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg>`;
      } else if (rating >= 4 || rating >= 3.5) {
        stars = `<svg class="rat-icon act">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon act">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon act">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon act">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon ">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg>`;
      } else if (rating >= 3 || rating >= 2.5) {
        stars = `<svg class="rat-icon act">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon act">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon act">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg>`;
      } else if (rating >= 2 || rating >= 1.5) {
        stars = `<svg class="rat-icon act">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon act">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon ">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon ">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon ">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg>`;
      } else if (rating >= 1) {
        stars = `<svg class="rat-icon act">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon ">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon ">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon ">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon ">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg>`;
      } else {
        stars = `<svg class="rat-icon ">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon ">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon ">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon ">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg><svg class="rat-icon ">
              <use href="${useIcons.pathname}#icon-Star"></use>
            </svg>`;
      }

      return `
      <div class="thumb-card" style="background-image: linear-gradient(1deg, rgba(5, 5, 5, 0.60) 0%, rgba(5, 5, 5, 0.00) 100%), url(${thumb}); background-repeat: no-repeat; background-size:cover;">
          <div class="photo-recipe-card" >
        <button class="fav-btn" >
          ${heart}
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
            ${stars}
          </div>
          <button class="see-recipe-card" data-id="${_id}">See recipe</button>
          </div>
        </div>
      </div>
        </div>`;
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
      title: pagination.req,
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

function getApiOneId(id) {
  return axios.get(`${BASE_URL}recipes/${id}`).then(r => r.data);
}

// function createSelect(select, placehold) {
//   new SlimSelect({
//     select: select,
//     settings: {
//       contentPosition: 'absolute',
//       placeholderText: placehold,
//       showSearch: false,
//       searchHighlight: true,
//     },
//   });
// }

function rmHiddAllBtn() {
  refs.btnFirst.classList.remove('hidden-itm');
  refs.btnSecond.classList.remove('hidden-itm');
  refs.btnThird.classList.remove('hidden-itm');
  refs.btnOther.classList.remove('hidden-itm');

  // refs.btnFirst.parentNode.classList.remove('bc');
  // refs.btnSecond.parentNode.classList.remove('bc');
  // refs.btnThird.parentNode.classList.remove('bc');
  // refs.btnOther.parentNode.classList.remove('bc');
}

function hidden(itm) {
  itm.classList.add('hidden-itm');
  // itm.parentNode.classList.add('bc');
}

function rmHidden(itm) {
  itm.classList.remove('hidden-itm');
  // itm.parentNode.classList.remove('bc');
}

function addBc(itm) {
  itm.classList.add('bc');
}

function rmBc(itm) {
  itm.classList.remove('bc');
}

function addActive(itm) {
  itm.classList.add('act');
}

function rmActive(itm) {
  itm.classList.remove('act');
}

function hidLoader() {
  refs.loaderEl.classList.toggle('hidden-itm');
}



function seePaginBtn() {
  addBc(refs.btnBegin);
  addBc(refs.btnPrev);
  rmHidden(refs.pagBtn);
  if (pagination.total > 3) {
    defaultValuePaginat();
      return;
    } else if (pagination.total === 3) {
      defaultValuePaginat();
      refs.btnOther.classList.add('hidden-itm');
      return;
    } else if (pagination.total === 2) {
      defaultValuePaginat();
      refs.btnThird.classList.add('hidden-itm');
      refs.btnOther.classList.add('hidden-itm');
      return;
    } else if (pagination.total === 1) {
    defaultValuePaginat();
      hidden(refs.pagBtn);
      addBc(refs.btnNext);
      addBc(refs.btnEnd);
      refs.btnThird.classList.add('hidden-itm');
      refs.btnOther.classList.add('hidden-itm');
      refs.btnSecond.classList.add('hidden-itm');
      return;
  } else {
      hidden(refs.pagBtn);
      addBc(refs.btnNext);
      addBc(refs.btnEnd);
      refs.btnThird.classList.add('hidden-itm');
      refs.btnOther.classList.add('hidden-itm');
      refs.btnSecond.classList.add('hidden-itm');
      refs.btnFirst.classList.add('hidden-itm');
      Notiflix.Notify.failure(`❌ There are no requests with such filters.`);
    };
}


function onClickReloadFilter() {
  refs.inputEl.value = '';
  pagination.req = '';
  favorit = JSON.parse(localStorage.getItem(FAVORITES));
  timeSelect.setSelected('<option data-placeholder="true" value=""></option>');
  areaSelect.setSelected('<option data-placeholder="true" value=""></option>');
  ingrSelect.setSelected('<option data-placeholder="true" value=""></option>');

  getAllRecipes().then(r => {
    clearCardsList();
    createCards(r.results);
    appdateTotal(r.totalPages);
    rmHiddAllBtn();
    rmBc(refs.btnNext);
    rmBc(refs.btnEnd);
    seePaginBtn();
  });
}

function onSub(e) {
  e.preventDefault();
}