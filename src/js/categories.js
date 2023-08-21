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
    console.log('data: ', data);

    if (categoryHome) {
      renderCategoriesHome(data);
    } else if (categoryFavorites) {
      renderCategoriesFavorites(data);
    }
    // return data;
  })
  .catch(error => {
    console.log(error);
  });

// console.log(categories);

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

// Используй это событие и categorySelect для получения категории
// categorySelect.addEventListener("change",()=>{
//     console.log(categorySelect.value)
//
// })

function renderCategoriesHome(categories) {
  console.log(categories, categorySelect.value);

  categories.forEach(category => {
    const htmlButton = `
        <li class="category-item"><button data-value="${category._id}" class="category-btn">${category.name}</button></li>
              `;
    const htmlOption = `<option value = "${category._id}">${category.name}</option>`;
    categoryHome.insertAdjacentHTML('beforeend', htmlButton);
    categorySelect.insertAdjacentHTML('beforeend', htmlOption);
  });
}

function renderCategoriesFavorites(categories) {
  console.log(categories, categorySelect.value);
  categories.forEach(category => {
    const htmlButton = `
        <li class="favorite-category-item"><button data-value="${category._id}" class="favorite-categories-btn">${category.name}</button></li>
              `;
    const htmlOption = `<option value = "${category._id}">${category.name}</option>`;
    categoryFavorites.insertAdjacentHTML('beforeend', htmlButton);
    categorySelect.insertAdjacentHTML('beforeend', htmlOption);
  });
}
