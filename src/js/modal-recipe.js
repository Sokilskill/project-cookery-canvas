import onClickAddToFavoritInModal from './filter';
const modalContainer = document.getElementById('modalContainer');
let player;

document.body.addEventListener('click', async function (event) {
  if (event.target.classList.contains('see-recipe-card')) {
    const recipeID = event.target.dataset.id;
    openRecipeModal(recipeID);
  }
});

const recipe_list = document.querySelector('.popular-recipe-list');
if (recipe_list) {
  recipe_list.addEventListener('click', async function (event) {
    const clickedRecipe = event.target.closest('.popular-recipe-list-li');
    if (clickedRecipe) {
      const recipeID = clickedRecipe.dataset.recipeId;
      openRecipeModal(recipeID);
    }
  });
}

async function openRecipeModal(recipeID) {
  try {
    const response = await fetch(
      `https://tasty-treats-backend.p.goit.global/api/recipes/${recipeID}`
    );
    const data = await response.json();

    if (data._id !== recipeID) {
      modalContainer.innerHTML = `
                    <div class="modal-content">
                        <span class="close-button">&times;</span>
                        <h2>Recipe Not Found</h2>
                        <p>Sorry, the requested recipe could not be found.</p>
                    </div>
                `;
      modalContainer.style.display = 'block';
      return;
    }

    const ratingStars = generateRatingStars(data.rating);
    const ratingAndTime = `${data.rating.toFixed(1)} ${generateRatingStars(
      data.rating
    )} | ${data.time} min`;

    const ingredientItems = data.ingredients.map(ingredientData => {
      const ingredientName = ingredientData.name || 'Unknown ingredient';
      return `
        <div class="ingredient-item">
          <span class="ingredient-name">${ingredientName}</span>
          <span class="ingredient-measure">${ingredientData.measure}</span>
        </div>`;
    });

    const ingredientList = `<div class="ingredient-list">${ingredientItems.join(
      ''
    )}</div>`;

    modalContainer.innerHTML = `
      <div class="modal-content" data-id="${recipeID}">
          <span class="close-button">&times;</span>
          <h2 class="title-modal-recipe">${data.title}</h2>
          <div id="youtubePlayer"></div>
          <p class="rating-and-time">${data.tags
            .map(tag => `<p class="tag-button">#${tag}</p>`)
            .join('')} ${ratingAndTime}</p>
          ${ingredientList}
          <p class="instruction-text">${data.instructions}</p>
          <button class="button addToFavorite">Add to Favorites</button>
          <button class="button giveRating">Give a rating</button>
      </div>
    `;

    modalContainer.style.display = 'block';

    player = new YT.Player('youtubePlayer', {
      height: '315',
      width: '100%',
      videoId: extractVideoId(data.youtube),
    });

    modalContainer.scrollTop = 0;
    const modalRect = modalContainer.getBoundingClientRect();
    if (modalRect.bottom > window.innerHeight) {
      modalContainer.style.top = `0px`;
    }

    const addToFavoriteBtn = modalContainer.querySelector('.addToFavorite');
    addToFavoriteBtn.addEventListener('click', function () {
      toggleFavorite(recipeID, data);
      updateFavoriteButtonText(addToFavoriteBtn, recipeID);
      // if (document.querySelector('.cards-recipe')) {

      // }
      onClickAddToFavoritInModal();
    });

    updateFavoriteButtonText(addToFavoriteBtn, recipeID);

    window.addEventListener('click', function (event) {
      if (event.target === modalContainer) {
        closeModal();
      }
    });

    modalContainer.addEventListener('click', function (event) {
      if (event.target.classList.contains('close-button')) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeModal();
      }
    });

    document.body.classList.add('my-body-noscroll-class');
  } catch (error) {
    console.error('Error loading recipe data:', error);
  }
}

window.addEventListener('click', function (event) {
  if (event.target === modalContainer) {
    modalContainer.style.display = 'none';
  }
});

modalContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('close-button')) {
    modalContainer.style.display = 'none';
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && modalContainer.style.display === 'block') {
    modalContainer.style.display = 'none';
  }
});

function toggleFavorite(recipeID, recipeData) {
  const favorites = getFavoritesFromStorage();
  const favoriteRecipes = getFavoriteRecipesFromStorage();

  const existingIndex = favoriteRecipes.findIndex(
    recipe => recipe._id === recipeID
  );

  if (existingIndex === -1) {
    favorites.push(recipeID);
    favoriteRecipes.push(recipeData);
  } else {
    favorites.splice(existingIndex, 1);
    favoriteRecipes.splice(existingIndex, 1);
  }

  saveFavoritesToStorage(favorites);
  saveFavoriteRecipesToStorage(favoriteRecipes);
}

function getFavoriteRecipesFromStorage() {
  const favoriteRecipesJson = localStorage.getItem('FAVORITE_RECIPE');
  return favoriteRecipesJson ? JSON.parse(favoriteRecipesJson) : [];
}

function saveFavoriteRecipesToStorage(favoriteRecipes) {
  const favoriteRecipesJson = JSON.stringify(favoriteRecipes);
  localStorage.setItem('FAVORITE_RECIPE', favoriteRecipesJson);
}

function updateFavoriteButtonText(button, recipeID) {
  const favorites = getFavoritesFromStorage();
  const isFavorite = favorites.includes(recipeID);
  button.textContent = isFavorite
    ? 'Remove from Favorites'
    : 'Add to Favorites';
}

function getFavoritesFromStorage() {
  const favoritesJson = localStorage.getItem('favorites');
  return favoritesJson ? JSON.parse(favoritesJson) : [];
}

function saveFavoritesToStorage(favorites) {
  const favoritesJson = JSON.stringify(favorites);
  localStorage.setItem('favorites', favoritesJson);
}

function closeModal() {
  if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {
    player.stopVideo();
  }
  modalContainer.style.display = 'none';
  document.body.classList.remove('my-body-noscroll-class');
}

function generateRatingStars(rating) {
  const starIconFilled =
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFD700" class="bi bi-star-fill" viewBox="0 0 16 16"><path d="M6.612.499a1.5 1.5 0 0 1 2.776 0l1.976 4.787 5.038.434a1.5 1.5 0 0 1 .832 2.572l-3.843 3.143 1.259 4.889a1.5 1.5 0 0 1-2.302 1.583L8 13.347l-4.67 3.163a1.5 1.5 0 0 1-2.302-1.582l1.259-4.89-3.843-3.142a1.5 1.5 0 0 1 .832-2.572l5.038-.434L6.612.499z"/></svg>';
  const starIconEmpty =
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgba(128, 128, 128, 0.5)" class="bi bi-star" viewBox="0 0 16 16"><path d="M6.612.499a1.5 1.5 0 0 1 2.776 0l1.976 4.787 5.038.434a1.5 1.5 0 0 1 .832 2.572l-3.843 3.143 1.259 4.889a1.5 1.5 0 0 1-2.302 1.583L8 13.347l-4.67 3.163a1.5 1.5 0 0 1-2.302-1.582l1.259-4.89-3.843-3.142a1.5 1.5 0 0 1 .832-2.572l5.038-.434L6.612.499z"/></svg>';
  const roundedRating = Math.round(rating);
  const filledStars = starIconFilled.repeat(roundedRating);
  const emptyStars = starIconEmpty.repeat(5 - roundedRating);
  return filledStars + emptyStars;
}

function extractVideoId(videoUrl) {
  const match = videoUrl.match(
    /(?:\/embed\/|v=|\/v\/|youtu\.be\/|\/v=|^v=)([-_a-zA-Z0-9]+)/i
  );
  return (match && match[1]) || null;
}
