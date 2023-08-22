import Swiper from 'swiper/swiper-bundle.min.mjs';
import '../../node_modules/swiper/swiper-bundle.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';
const END_POINT = 'events';
const swiperEl = document.querySelector('.swiper-wrapper');

const fetchEvents = async () => {
  try {
    // Loading.standard();
    const response = await fetch(`${BASE_URL}${END_POINT}`);
    const events = await response.json();
    const data = await Promise.allSettled(events);
    // Loading.remove(100);
    swiperEl.innerHTML = markupEvents(data);
  } catch (error) {
    // Notify.failure('Sorry, data is currently unavailable. Please try again.');
    console.log(error.message);
  }
};
fetchEvents();

const swiper = new Swiper('.swiper', {
  breakpointsBase: 'hero-slider',
  autoplay: {
    delay: 5000,
  },
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

function markupEvents(arr) {
  return arr
    .map(
      ({
        value: { cook, topic },
      }) => `<div class="swiper-slide my-slide" style="display: flex;"><div class="swiper-card-cook"><img class="hero-cook-img" src="${cook.imgWebpUrl}" alt="${cook.name}"></img></div>
            <div class="swiper-card-prev"><img class="hero-previev-img" src="${topic.previewWebpUrl}" alt="${topic.name}"></img><p class="swiper-dich-text">${topic.name}</p>
        <p class="swiper-origin-text">${topic.area}</p></div>
            <div class="swiper-card-viev"><img class="hero-viev-img" src="${topic.imgWebpUrl}" alt="${topic.name}"></img></div></div>`
    )
    .join('');
}
