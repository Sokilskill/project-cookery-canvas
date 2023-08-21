const openModalBtn = document.querySelector('.hero-order-btn');
const modalContainer = document.getElementById('modalContainer');
let player;

openModalBtn.addEventListener('click', async function () {
  try {
    const recipeID = '6462a8f74c3d0ddd288980d4';
    const response = await fetch(
      `https://tasty-treats-backend.p.goit.global/api/recipes/${recipeID}`
    );
    const data = await response.json();

    if (data._id !== recipeID) {
      modalContainer.innerHTML = `
                    <div class="modal-content">
                        <span class="close">&times;</span>
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

    const ingredientsResponse = await fetch(
      `https://tasty-treats-backend.p.goit.global/api/ingredients`
    );
    const ingredientsData = await ingredientsResponse.json();

    const ingredientItems = data.ingredients
      .map(ingredientData => {
        const ingredientInfo = ingredientsData.find(
          item => item._id === ingredientData.id
        );
        const ingredientName = ingredientInfo
          ? ingredientInfo.name
          : 'Unknown Ingredient';
        return `
                    <div class="ingredient-item">
                        <span class="ingredient-name">${ingredientName}</span>
                        <span class="ingredient-measure">${ingredientData.measure}</span>
                    </div>`;
      })
      .join('');

    const ingredientList = `<div class="ingredient-list">${ingredientItems}</div>`;

    modalContainer.innerHTML = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2 style="text-transform: uppercase;">${data.title}</h2>
                    <div id="youtubePlayer"></div>
                    <p class="rating-and-time">${ratingAndTime}</p>
                    ${ingredientList}
                    <p class="tag-button">#${data.tags[0]}</p>
                    <p class="instruction-text">${data.instructions}</p>
                    <button class="button addToFavorite">Add to favorite</button>
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
      modalContainer.style.top = `${window.innerHeight - modalRect.height}px`;
    }

    const addToFavoriteBtn = modalContainer.querySelector('.addToFavorite');
    addToFavoriteBtn.addEventListener('click', function () {
      toggleFavorite(recipeID);
      updateFavoriteButtonText(addToFavoriteBtn, recipeID);
    });

    window.addEventListener('click', function (event) {
      if (event.target === modalContainer) {
        closeModal();
      }
    });

    modalContainer.addEventListener('click', function (event) {
      if (event.target.classList.contains('close')) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeModal();
      }
    });

    function toggleFavorite(recipeID) {
      const favorites = getFavoritesFromStorage();
      const index = favorites.indexOf(recipeID);

      if (index === -1) {
        favorites.push(recipeID);
      } else {
        favorites.splice(index, 1);
      }

      saveFavoritesToStorage(favorites);
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
  } catch (error) {
    console.error('Error loading recipe data:', error);
  }
});
