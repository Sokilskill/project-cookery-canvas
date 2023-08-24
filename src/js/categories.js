import axios from 'axios';

const categoryHome = document.querySelector('.categories-list');
const categoryFavorites = document.querySelector('.favorite-categories-list');
const categorySelect = document.querySelector('.category-select');

async function fetchCategories() {
  const response = await axios.get(
    'https://tasty-treats-backend.p.goit.global/api/categories'
  );
  return await response.data;
}

// await без async неможе бути
// const categories = (await fetchCategories()).data;

const categories = fetchCategories()
  .then(data => {
    // console.log('data: ', data);

    if (categoryHome) {
      renderCategoriesHome(data);
    } else if (categoryFavorites) {
      renderCategoriesFavorites(data);
    }

    document.querySelectorAll('.category-btn').forEach(el => {
      el.addEventListener('click', evt => {
        const selID = evt.currentTarget.dataset.value;
        categorySelect.value = selID;

        document
          .querySelector('.active-category')
          ?.classList.remove('active-category');
        document
          .querySelector('.active-all-categories')
          ?.classList.remove('active-all-categories');

        evt.currentTarget.classList.add('active-category');

        categorySelect.dispatchEvent(new Event('change'));
      });
    });

    document.querySelectorAll('.all-categories-btn').forEach(el => {
      el.addEventListener('click', evt => {
        const selID = evt.currentTarget.dataset.value;
        categorySelect.value = selID;

        document
          .querySelector('.active-category')
          ?.classList.remove('active-category');
        evt.currentTarget.classList.add('active-all-categories');

        categorySelect.dispatchEvent(new Event('change'));
      });
    });

    document.querySelectorAll('.favorite-categories-btn').forEach(el => {
      el.addEventListener('click', evt => {
        const selID = evt.currentTarget.dataset.value;
        categorySelect.value = selID;

        document
          .querySelector('.active-favorite-categories')
          ?.classList.remove('active-favorite-categories');
        evt.currentTarget.classList.add('active-favorite-categories');

        categorySelect.dispatchEvent(new Event('change'));
      });
    });
    // return data;
  })
  .catch(error => {
    console.log(error);
  });

// console.log(categories)

// Используй это событие и categorySelect для получения категории
// categorySelect.addEventListener("change",()=>{
//     console.log(categorySelect.value)
//
// })

function renderCategoriesHome(categories) {
  categories.forEach(category => {
    const htmlButton = `
        <li class="category-item"><button data-value="${category.name}" class="category-btn">${category.name}</button></li>
              `;
    const htmlOption = `<option value = "${category._id}">${category.name}</option>`;
    categoryHome.insertAdjacentHTML('beforeend', htmlButton);
    categorySelect.insertAdjacentHTML('beforeend', htmlOption);
  });
}

function renderCategoriesFavorites(categories) {
  const categoriesFavorites = JSON.parse(
    (localStorage.getItem('FAVORITE_RECIPE')??"[]")
  ).map(item => {
    return item.category;
  });
  categories.forEach(category => {
    if (categoriesFavorites.includes(category.name)) {
      const htmlButton = `
        <li class="favorite-category-item"><button data-value="${category.name}" class="favorite-categories-btn">${category.name}</button></li>
              `;
      const htmlOption = `<option value = "${category.name}">${category.name}</option>`;

      categoryFavorites.insertAdjacentHTML('beforeend', htmlButton);
      categorySelect.insertAdjacentHTML('beforeend', htmlOption);
    }
  });
  setScroll();
  // if(!categoriesFavorites.length){
  //   categoryFavorites.style.display = 'none';
  // }
}

function setScroll() {
  categoryFavorites.style.cursor = 'grab';

  let pos = { top: 0, left: 0, x: 0, y: 0 };

  const mouseDownHandler = function (e) {
    categoryFavorites.style.cursor = 'grabbing';
    categoryFavorites.style.userSelect = 'none';

    pos = {
      left: categoryFavorites.scrollLeft,
      top: categoryFavorites.scrollTop,
      // Get the current mouse position
      x: e.clientX,
      y: e.clientY,
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  const mouseMoveHandler = function (e) {
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    // Scroll the element
    categoryFavorites.scrollTop = pos.top - dy;
    categoryFavorites.scrollLeft = pos.left - dx;
  };

  const mouseUpHandler = function () {
    categoryFavorites.style.cursor = 'grab';
    categoryFavorites.style.removeProperty('user-select');

    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  // Attach the handler
  categoryFavorites.addEventListener('mousedown', mouseDownHandler);
}
