export default document.addEventListener('DOMContentLoaded', async function () {
  const openModalBtn = document.querySelector('.see-recipe-card');
  const modalContainer = document.getElementById('modalContainer');

  openModalBtn.addEventListener('click', async function () {
    try {
      const recipeID = '6462a8f74c3d0ddd288980d4';
      const response = await fetch(
        `https://tasty-treats-backend.p.goit.global/api/recipes/${recipeID}`
      );
      const data = await response.json();

      if (data._id === recipeID) {
        const ratingStars = generateRatingStars(data.rating);
        const ratingAndTime = `${data.rating.toFixed(1)} ${ratingStars} | ${
          data.time
        } min`;

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
            return `<div class="ingredient-item">
                    <span class="ingredient-name">${ingredientName}</span>
                    <span class="ingredient-measure">${ingredientData.measure}</span>
                  </div>`;
          })
          .join('');

        const ingredientList = `<div class="ingredient-list">${ingredientItems}</div>`;

        // Верстка контента модального окна
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

        // Встраивание плеера YouTube
        const player = new YT.Player('youtubePlayer', {
          height: '315',
          width: '100%',
          videoId: extractVideoId(data.youtube), // Извлекаю ID видео
        });

        // Прокручивание до верхней части модального окна
        modalContainer.scrollTop = 0;
        const modalRect = modalContainer.getBoundingClientRect();
        if (modalRect.bottom > window.innerHeight) {
          modalContainer.style.top =
            window.innerHeight - modalRect.height + 'px';
        }
      } else {
        modalContainer.innerHTML = `
          <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Recipe Not Found</h2>
            <p>Sorry, the requested recipe could not be found.</p>
          </div>
        `;
        modalContainer.style.display = 'block';
      }
    } catch (error) {
      console.error('Error loading recipe data:', error);
    }
  });

  window.addEventListener('click', function (event) {
    if (event.target === modalContainer) {
      modalContainer.style.display = 'none';
    }
  });

  modalContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('close')) {
      modalContainer.style.display = 'none';
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modalContainer.style.display === 'block') {
      modalContainer.style.display = 'none';
    }
  });

  // Функция для формирования рейтинга звездочками
  function generateRatingStars(rating) {
    const starIconFilled = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFD700" class="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M6.612.499a1.5 1.5 0 0 1 2.776 0l1.976 4.787 5.038.434a1.5 1.5 0 0 1 .832 2.572l-3.843 3.143 1.259 4.889a1.5 1.5 0 0 1-2.302 1.583L8 13.347l-4.67 3.163a1.5 1.5 0 0 1-2.302-1.582l1.259-4.89-3.843-3.142a1.5 1.5 0 0 1 .832-2.572l5.038-.434L6.612.499z"/>
    </svg>`;
    const starIconEmpty = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgba(128, 128, 128, 0.5)" class="bi bi-star" viewBox="0 0 16 16">
        <path d="M6.612.499a1.5 1.5 0 0 1 2.776 0l1.976 4.787 5.038.434a1.5 1.5 0 0 1 .832 2.572l-3.843 3.143 1.259 4.889a1.5 1.5 0 0 1-2.302 1.583L8 13.347l-4.67 3.163a1.5 1.5 0 0 1-2.302-1.582l1.259-4.89-3.843-3.142a1.5 1.5 0 0 1 .832-2.572l5.038-.434L6.612.499z"/>
    </svg>`;
    const roundedRating = Math.round(rating);
    const filledStars = starIconFilled.repeat(roundedRating);
    const emptyStars = starIconEmpty.repeat(5 - roundedRating);
    return filledStars + emptyStars;
  }

  // Функция для извлечения ID видео из ссылки
  function extractVideoId(videoUrl) {
    const match = videoUrl.match(
      /(?:\/embed\/|v=|\/v\/|youtu\.be\/|\/v=|^v=)([-_a-zA-Z0-9]+)/i
    );
    return (match && match[1]) || null;
  }
});
