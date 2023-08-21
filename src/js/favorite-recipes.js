const recipe_list = document.querySelector('.popular-recipe-list');

fetch('https://tasty-treats-backend.p.goit.global/api/recipes/popular')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Помилка запиту: ${response.status}`);
    }
    return response.json();
  })
  .catch(err => console.log(err))

  .then(data => {
    const recipe = data
      .map(data => {
        const dataDesctiptionSlice = data.description.slice(0, 84);
        return `<li class="popular-recipe-list-li" data-recipe-id="${data._id}">
        <div class="favorite-list-img">
        <img class="round-img-1" src="${data.preview}" alt="${data.title}">
      </div>
        <div class="popular-recipe-div-list">
          <h2 class="favorite-list-h2">${data.title}</h2>
          <h3 class="favorite-list-h3" >${dataDesctiptionSlice} ...</h3>
        </div>
        </li>`;
      })
      .join('');
    // console.log(recipe);
    recipe_list.insertAdjacentHTML('beforeend', recipe);
  });
