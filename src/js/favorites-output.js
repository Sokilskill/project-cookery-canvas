const nooneMESSAGE = document.querySelector('.js-noone');

// number of favorites
let fav = JSON.parse( localStorage.favorites );

// console.log(fav);
// console.log(fav.length);

// noone message show
if (fav.length > 0) {
    nooneMESSAGE.classList.add('close');
    // console.log('close');
} else{
    // console.log('show');
};



// function addingCards(el) {
//     return el
//       .map(({ title, description, _id, rating, thumb }) => {
//         const descr = description.slice(0, 94);
//         let stars = ``
//         let heart = 'icon-heart';
//         const fav = favorit
    
  
//         if (fav.includes(_id)) {
//           heart = 'icon-heart-full';
//         }
  
//         if (rating >= 4.5) {
//           stars = `<svg class="rat-icon act">
//                 <use href="../img/icons.svg#icon-Star"></use>
//               </svg><svg class="rat-icon act">
//                 <use href="../img/icons.svg#icon-Star"></use>
//               </svg><svg class="rat-icon act">
//                 <use href="../img/icons.svg#icon-Star"></use>
//               </svg><svg class="rat-icon act">
//                 <use href="../img/icons.svg#icon-Star"></use>
//               </svg><svg class="rat-icon act">
//                 <use href="../img/icons.svg#icon-Star"></use>
//               </svg>`;
//         } else if (rating >= 4 || rating >= 3.5) {
//           stars = `<svg class="rat-icon act">
//                 <use href="../img/icons.svg#icon-Star"></use>
//               </svg><svg class="rat-icon act">
//                 <use href="../img/icons.svg#icon-Star"></use>
//               </svg><svg class="rat-icon act">
//                 <use href="../img/icons.svg#icon-Star"></use>
//               </svg><svg class="rat-icon act">
//                 <use href="../img/icons.svg#icon-Star"></use>
//               </svg><svg class="rat-icon ">
//                 <use href="../img/icons.svg#icon-Star"></use>
//               </svg>`;
//         } else if (rating >= 3 || rating >= 2.5) {
//           stars = `<svg class="rat-icon act">
//                 <use href="../img/icons.svg#icon-Star"></use>
//               </svg><svg class="rat-icon act">
//                 <use href="../img/icons.svg#icon-Star"></use>
//               </svg><svg class="rat-icon act">
//                 <use href="../img/icons.svg#icon-Star"></use>
//               </svg><svg class="rat-icon">
//                 <use href="../img/icons.svg#icon-Star"></use>
//               </svg><svg class="rat-icon">
//                 <use href="../img/icons.svg#icon-Star"></use>
//               </svg>`;
//         } else if (rating >= 2 || rating >= 1.5) {
//           stars = `<svg class="rat-icon act">
//                 <use href="../img/icons.svg#icon-Star"></use>
//               </svg><svg class="rat-icon act">
//                 <use href="../img/icons.svg#icon-Star"></use>
//               </svg><svg class="rat-icon ">
//                 <use href="../img/icons.svg#icon-Star"></use>
//               </svg><svg class="rat-icon ">
//                 <use href="../img/icons.svg#icon-Star"></use>
//               </svg><svg class="rat-icon ">
//                 <use href="../img/icons.svg#icon-Star"></use>
//               </svg>`;
//         } else if (rating >= 1) {
//           stars = `<svg class="rat-icon act">
//                 <use href="../img/icons.svg#icon-Star"></use>
//               </svg><svg class="rat-icon ">
//                 <use href="../img/icons.svg#icon-Star"></use>
//               </svg><svg class="rat-icon ">
//                 <use href="../img/icons.svg#icon-Star"></use>
//               </svg><svg class="rat-icon ">
//                 <use href="../img/icons.svg#icon-Star"></use>
//               </svg><svg class="rat-icon ">
//                 <use href="../img/icons.svg#icon-Star"></use>
//               </svg>`;
//         } else {
//           stars = `<svg class="rat-icon ">
//                 <use href="../img/icons.svg#icon-Star"></use>
//               </svg><svg class="rat-icon ">
//                 <use href="../img/icons.svg#icon-Star"></use>
//               </svg><svg class="rat-icon ">
//                 <use href="../img/icons.svg#icon-Star"></use>
//               </svg><svg class="rat-icon ">
//                 <use href="../img/icons.svg#icon-Star"></use>
//               </svg><svg class="rat-icon ">
//                 <use href="../img/icons.svg#icon-Star"></use>
//               </svg>`;
//         }
  
//         return `
//         <div class="photo-recipe-card" style="background-image: url(${thumb}); background-repeat: no-repeat; background-size:cover;">
//           <button class="fav-btn" data-id="${_id}">
//             <svg class="fav-icon">
//               <use href="./img/icons.svg#${heart}"></use>
//             </svg>
//           </button>
  
//           <div class="info-recipe-card" >
//             <h2 class="title-recipe-card">
//               ${title}
//             </h2>
//             <p class="descr-recipe-card">
//               ${descr}...
//             </p>
//             <div class="thum-raying-card">
//               <div class="rating-recipe-card">
//               <span class="rating-value">${rating}</span>
//               ${stars}
//             </div>
//             <button class="see-recipe-card" data-id="${_id}">See recipe</button>
//             </div>
//           </div>
//         </div>`;
//       })
//       .join('');
//   }