var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},a=e.parcelRequiref774;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in n){var a=n[e];delete n[e];var s={id:e,exports:{}};return t[e]=s,a.call(s.exports,s,s.exports),s.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){n[e]=t},e.parcelRequiref774=a),a("kyEFX").register(JSON.parse('{"bTGq4":"favorites.8866707b.js","hm5VY":"icons.d085dab5.svg","eBmCf":"index.0e4cb2c2.js"}')),a("8FnLx"),a("ghT7p"),a("kV9l4"),a("95rAy");const s=document.querySelector(".favorite-categories"),r=document.querySelector(".card-recipe-favorite"),i=document.querySelector(".category-select"),c=document.querySelector(".js-noone"),o=document.querySelector(".page-pagination-list"),l=JSON.parse(localStorage.getItem("FAVORITE_RECIPE"));let d;console.log(l);let g=1;l?(d=l.length,console.log(l.length),i.addEventListener("change",v),p(l),c.classList.add("disactive-message")):(o.style.display="none",s.style.display="none",c.classList.remove("disactive-message"));const u=Math.ceil(d/12);function p(e){const t=12*(g-1),n=t+12,a=e.slice(t,n);var s;r.innerHTML="",s=a,r.insertAdjacentHTML("beforeend",s.map((e=>{let t=new URL(f);const n=Math.round(e.rating);let a="";for(let e=0;e<n;e++)a+=`<svg class="rat-icon act">\n              <use href="${t.pathname}#icon-Star"></use></svg>`;if(n<5)for(let e=0;e<5-n;e++)a+=`<svg class="rat-icon ">\n              <use href="${t.pathname}#icon-Star"></use></svg>`;return`\n    <li class="recipe-item">\n      <div class="photo-recipe-card " style="background-image: linear-gradient( 1deg, rgba(5, 5, 5, 0.6) 50%, rgba(5, 5, 5, 0) 100% ), url('${e.preview}'); background-repeat: no-repeat; background-size: cover;">\n      <button class="fav-btn" >\n      <svg class="fav-icon activ" data-id="${e._id}">\n          <use href="${t.pathname}#icon-heart-full"></use>\n        </svg>\n      </button>\n\n      <div class="info-recipe-card  " >\n        <h2 class="title-recipe-card">\n          ${e.title}\n        </h2>\n        <p class="descr-recipe-card">\n          ${e.description.slice(0,94)}...\n        </p>\n        <div class="thum-raying-card">\n          <div class="rating-recipe-card">\n          <span class="rating-value ">${e.rating.toFixed(1)}</span>\n        ${a}\n\n        </div>\n        <button class="see-recipe-card" data-id="${e._id}">See recipe</button>\n        </div>\n      </div>\n    </div>\n    </li>`})).join(""))}var f;function v(e){const t=e.target.value;if(console.log(t),"0"===t)return p(l);{const e=l.filter((e=>e.category===t));return console.log(e),p(e)}}f=new URL(a("kyEFX").resolve("hm5VY"),import.meta.url).toString(),o.addEventListener("click",(e=>{e.target.classList.contains("btn-list")&&(e.target.classList.contains("btn-first")?(g=1,e.target.classList.add("act"),console.log(e.target)):e.target.classList.contains("btn-second")?(g=2,e.target.classList.add("act"),console.log(g)):e.target.classList.contains("btn-third")?(g=3,console.log(g),e.target.classList.add("act")):e.target.classList.contains(".btn-show-others")?g=u:e.target.classList.contains("btn-previous")?g>1&&g--:e.target.classList.contains("btn-next")?g<u&&g++:g=parseInt(e.target.textContent))}));
//# sourceMappingURL=favorites.8866707b.js.map
