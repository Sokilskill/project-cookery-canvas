import SlimSelect from 'slim-select';
import axios from 'axios';
import Notiflix from 'notiflix';
import { debounce } from 'throttle-debounce';
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';
import Pagination from './pagination';
import LocalStorage from './localStorage'
const pagination = new Pagination();
const localData = new LocalStorage();
const FAVORITES = 'favorites'
const FAVORITES_RECIPES = 'favoriteRecipes ';

if (!localStorage.getItem(FAVORITES_RECIPES)) {
  localStorage.setItem(FAVORITES_RECIPES, JSON.stringify(localData.getLoc()));
}
if (!localStorage.getItem(FAVORITES)) {
  localStorage.setItem(FAVORITES, JSON.stringify(pagination.getLoc()));
}

const favoritRecipes = JSON.parse(localStorage.getItem(FAVORITES_RECIPES));
localData.allPushLoc(favoritRecipes);

const favorit = JSON.parse(localStorage.getItem(FAVORITES));
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
    defaultValuePaginat();
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

refs.btnResetFiltr.addEventListener('click', e => {
  location.reload();
});

refs.allCatBtn.addEventListener('click', onRemoveRecipe);

refs.recipeList.addEventListener('click', onClickRecipeList);

function onSub(e) {
  e.preventDefault();
}



function onClickRecipeList(e) {
  const idTarget = e.target.parentNode.dataset.id;
  const classPar = e.target.parentNode.classList;
  console.log(idTarget);
  // let actualObj = null;

  

  if (e.target.parentNode.classList.contains('fav-icon')) {
    // console.log(pagination.getLoc().includes(idTarget));
    if (pagination.getLoc().includes(idTarget)) {

      localData.delItmLoc(idTarget);
      localStorage.setItem(
        FAVORITES_RECIPES,
        JSON.stringify(localData.getLoc())
      );
      pagination.delItmLoc(idTarget);
      localStorage.setItem(FAVORITES, JSON.stringify(pagination.getLoc()));
      classPar.remove('activ');
      // classPar.add('dis');
    } else {
      getApiOneId(idTarget).then(r => {
        // actualObj = r;
        localData.pushLoc(r);
        localStorage.setItem(
          FAVORITES_RECIPES,
          JSON.stringify(localData.getLoc())
        );
      });
      
      pagination.pushLoc(idTarget);
      localStorage.setItem(FAVORITES, JSON.stringify(pagination.getLoc()));
      // classPar.remove('dis');
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

function onRemoveRecipe(e) {
  location.reload();
}

function onChangeRequest(e) {
  pagination.req = e.target.value;
  clearCardsList();
  defaultPage();
  getAllRecipes().then(r => {
    createCards(r.results);
    appdateTotal(r.totalPages);
    console.log(pagination.total);
    if (pagination.total > 3) {
      defaultValuePaginat();
      return;
    } else if (pagination.total === 3) {
      defaultValuePaginat();
      refs.btnOther.textContent = '-';
      return;
    } else if (pagination.total === 2) {
      defaultValuePaginat();
      refs.btnThird.textContent = '-';
      refs.btnOther.textContent = '-';
      return;
    } else if (pagination.total === 1) {
      defaultValuePaginat();
      refs.btnThird.textContent = '-';
      refs.btnOther.textContent = '-';
      refs.btnSecond.textContent = '-';
      return;
    } else if (r.totalPages === null) {
      refs.btnThird.textContent = '-';
      refs.btnOther.textContent = '-';
      refs.btnSecond.textContent = '-';
      refs.btnFirst.textContent = '-';
      Notiflix.Notify.failure(`❌ There are no requests with such filters.`);
    }
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
    clearCardsList();
    pagination.pages = 1;
    getAllRecipes().then(r => {
      createCards(r.results);
      appdateTotal(r.totalPages);
      console.log(pagination.total);
      rmActive(refs.btnOther);
      rmActive(refs.btnSecond);
      rmActive(refs.btnThird);
      addActive(refs.btnFirst);
      if (pagination.total > 3) {
        defaultValuePaginat();
        return;
      } else if (pagination.total === 2) {
        refs.btnThird.textContent = '-';
        refs.btnOther.textContent = '-';
        return;
      } else if (pagination.total === 3) {
        refs.btnOther.textContent = '-';
        return;
      }
    });
  }
}

function onClickPrevPage(e) {
  if (window.screen.width < 768) {
    if (pagination.page > 1) {
      clearCardsList();
      pagination.decr();
      getAllRecipes().then(r => {
        createCards(r.results);
        appdateTotal(r.totalPages);
        console.log(pagination.total);
        if (pagination.page === 1) {
          rmActive(refs.btnSecond);
          rmActive(refs.btnOther);
          addActive(refs.btnFirst);
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
      clearCardsList();
      pagination.decr();
      getAllRecipes().then(r => {
        createCards(r.results);
        appdateTotal(r.totalPages);
        console.log(pagination.total);
        if (pagination.page === 1) {
          rmActive(refs.btnSecond);
          addActive(refs.btnFirst);
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
    clearCardsList();
    pagination.pages = 1;
    getAllRecipes().then(r => {
      createCards(r.results);
      appdateTotal(r.totalPages);
      console.log(pagination.total);
      rmActive(refs.btnOther);
      addActive(refs.btnFirst);
      rmActive(refs.btnSecond);
      rmActive(refs.btnThird);
      defaultValuePaginat();
      if (pagination.total > 3) {
        defaultValuePaginat();
        return;
      } else if (pagination.total === 2) {
        refs.btnThird.textContent = '-';
        refs.btnOther.textContent = '-';
        return;
      } else if (pagination.total === 3) {
        refs.btnOther.textContent = '-';
        return;
      }
    });
  }
}

function onClickSecondPage(e) {
  if (window.screen.width < 768) {
    if (pagination.pages !== Number(e.target.textContent)) {
      clearCardsList();
      pagination.pages = Number(e.target.textContent);
      console.log(typeof e.target.textContent);
      console.log(pagination.pages);
      getAllRecipes().then(r => {
        createCards(r.results);
        appdateTotal(r.totalPages);
        console.log(pagination.total);
        rmActive(refs.btnFirst);
        rmActive(refs.btnOther);
        addActive(refs.btnSecond);
      });
    }
  } else {
    if (
      pagination.pages !== Number(e.target.textContent) &&
      pagination.total >= Number(e.target.textContent)
    ) {
      clearCardsList();
      pagination.pages = Number(e.target.textContent);
      getAllRecipes().then(r => {
        createCards(r.results);
        appdateTotal(r.totalPages);
        rmActive(refs.btnFirst);
        rmActive(refs.btnOther);
        rmActive(refs.btnThird);
        addActive(refs.btnSecond);
        if (pagination.pages === pagination.total) {
          refs.btnThird.textContent = '-';
          refs.btnOther.textContent = '-';
          return;
        } else if (pagination.total === 3) {
          refs.btnThird.textContent = 3;
          refs.btnOther.textContent = '-';
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
    e.target.textContent !== '-' &&
    pagination.total >= 3
  ) {
    clearCardsList();
    pagination.pages = Number(e.target.textContent);
    getAllRecipes().then(r => {
      createCards(r.results);
      appdateTotal(r.totalPages);
      rmActive(refs.btnFirst);
      rmActive(refs.btnOther);
      rmActive(refs.btnSecond);
      addActive(refs.btnThird);
      if (pagination.total > 3) {
        refs.btnOther.textContent = pagination.total;
      } else if (pagination.total === 3) {
        refs.btnOther.textContent = '-';
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
      clearCardsList();
      pagination.pages = Number(e.target.textContent);
      getAllRecipes().then(r => {
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
      clearCardsList();
      pagination.pages = Number(e.target.textContent);
      getAllRecipes().then(r => {
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
    if (pagination.pages < pagination.totalRecipe) {
      clearCardsList();

      pagination.incr();
      getAllRecipes().then(r => {
        createCards(r.results);
        appdateTotal(r.totalPages);
        console.log(pagination.total);
        rmActive(refs.btnFirst);
        if (pagination.pages === pagination.total && pagination.pages > 3) {
          addActive(refs.btnOther);
          rmActive(refs.btnSecond);
          return;
        }
        addActive(refs.btnSecond);
        refs.btnSecond.textContent = pagination.pages;
      });
    }
  } else {
    if (pagination.pages < pagination.totalRecipe) {
      clearCardsList();
      pagination.incr();
      getAllRecipes().then(r => {
        createCards(r.results);
        appdateTotal(r.totalPages);
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
    if (pagination.pages !== pagination.total && pagination.total > 3) {
      clearCardsList();
      pagination.pages = pagination.totalRecipe;
      getAllRecipes().then(r => {
        createCards(r.results);
        appdateTotal(r.totalPages);
        console.log(pagination.total);
        rmActive(refs.btnFirst);
        addActive(refs.btnSecond);
        refs.btnOther.textContent = pagination.pages;
        addActive(refs.btnOther);
        rmActive(refs.btnSecond);
      });
    }
  } else {
    if (pagination.total > 3 && pagination.pages !== pagination.total) {
      clearCardsList();
      pagination.pages = pagination.totalRecipe;
      getAllRecipes().then(r => {
        createCards(r.results);
        appdateTotal(r.totalPages);
        console.log(pagination.total);
        rmActive(refs.btnFirst);
        rmActive(refs.btnSecond);
        rmActive(refs.btnThird);
        addActive(refs.btnOther);
        refs.btnOther.textContent = pagination.pages;
      });
    }
  }
}

function onClickBtnRecipeInAll(e) {
  pagination.categories = e.target.dataset.value;
  clearCardsList();
  defaultPage();
  getAllRecipes().then(r => {
    createCards(r.results);
    appdateTotal(r.totalPages);
    console.log(pagination.total);
    if (pagination.total > 3) {
      defaultValuePaginat();
      return;
    } else if (pagination.total === 3) {
      defaultValuePaginat();
      refs.btnOther.textContent = '-';
      return;
    } else if (pagination.total === 2) {
      defaultValuePaginat();
      refs.btnThird.textContent = '-';
      refs.btnOther.textContent = '-';
      return;
    } else if (pagination.total === 1) {
      defaultValuePaginat();
      refs.btnThird.textContent = '-';
      refs.btnOther.textContent = '-';
      refs.btnSecond.textContent = '-';
      return;
    } else if (r.totalPages === null) {
      refs.btnThird.textContent = '-';
      refs.btnOther.textContent = '-';
      refs.btnSecond.textContent = '-';
      refs.btnFirst.textContent = '-';
      Notiflix.Notify.failure(`❌ There are no requests with such filters.`);
    }
  });
}

function onChangeIngredients(e) {
  pagination.ingredients = e.target.value;
  clearCardsList();
  defaultPage();
  getAllRecipes().then(r => {
    createCards(r.results);
    appdateTotal(r.totalPages);
    console.log(pagination.total);
    if (pagination.total > 3) {
      defaultValuePaginat();
      return;
    } else if (pagination.total === 3) {
      defaultValuePaginat();
      refs.btnOther.textContent = '-';
      return;
    } else if (pagination.total === 2) {
      defaultValuePaginat();
      refs.btnThird.textContent = '-';
      refs.btnOther.textContent = '-';
      return;
    } else if (pagination.total === 1) {
      defaultValuePaginat();
      refs.btnThird.textContent = '-';
      refs.btnOther.textContent = '-';
      refs.btnSecond.textContent = '-';
      return;
    } else if (r.totalPages === null) {
      refs.btnThird.textContent = '-';
      refs.btnOther.textContent = '-';
      refs.btnSecond.textContent = '-';
      refs.btnFirst.textContent = '-';
      Notiflix.Notify.failure(`❌ There are no requests with such filters.`);
    }
  });
}

function onChangeArea(e) {
  pagination.areas = e.target.value;
  clearCardsList();
  defaultPage();
  getAllRecipes().then(r => {
    createCards(r.results);
    appdateTotal(r.totalPages);
    console.log(pagination.total);
    if (pagination.total > 3) {
      defaultValuePaginat();
      return;
    } else if (pagination.total === 3) {
      defaultValuePaginat();
      refs.btnOther.textContent = '-';
      return;
    } else if (pagination.total === 2) {
      defaultValuePaginat();
      refs.btnThird.textContent = '-';
      refs.btnOther.textContent = '-';
      return;
    } else if (pagination.total === 1) {
      defaultValuePaginat();
      refs.btnThird.textContent = '-';
      refs.btnOther.textContent = '-';
      refs.btnSecond.textContent = '-';
      return;
    } else if (r.totalPages === null) {
      refs.btnThird.textContent = '-';
      refs.btnOther.textContent = '-';
      refs.btnSecond.textContent = '-';
      refs.btnFirst.textContent = '-';
      Notiflix.Notify.failure(`❌ There are no requests with such filters.`);
    }
  });
}

function onChangeTime(e) {
  pagination.times = e.target.value;
  clearCardsList();
  defaultPage();
  getAllRecipes().then(r => {
    createCards(r.results);
    appdateTotal(r.totalPages);
    console.log(pagination.total);
    if (pagination.total > 3) {
      defaultValuePaginat();
      return;
    } else if (pagination.total === 3) {
      defaultValuePaginat();
      refs.btnOther.textContent = '-';
      return;
    } else if (pagination.total === 2) {
      defaultValuePaginat();
      refs.btnThird.textContent = '-';
      refs.btnOther.textContent = '-';
      return;
    } else if (pagination.total === 1) {
      defaultValuePaginat();
      refs.btnThird.textContent = '-';
      refs.btnOther.textContent = '-';
      refs.btnSecond.textContent = '-';
      return;
    } else if (r.totalPages === null) {
      refs.btnThird.textContent = '-';
      refs.btnOther.textContent = '-';
      refs.btnSecond.textContent = '-';
      refs.btnFirst.textContent = '-';
      Notiflix.Notify.failure(`❌ There are no requests with such filters.`);
    }
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

function addActive(itm) {
  itm.classList.add('act');
}

function rmActive(itm) {
  itm.classList.remove('act');
}
