var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},s=e.parcelRequiref774;null==s&&((s=function(e){if(e in t)return t[e].exports;if(e in n){var s=n[e];delete n[e];var r={id:e,exports:{}};return t[e]=r,s.call(r.exports,r,r.exports),r.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){n[e]=t},e.parcelRequiref774=s),s("kyEFX").register(JSON.parse('{"bTGq4":"favorites.77be2d17.js","hm5VY":"icons.d085dab5.svg","eBmCf":"index.875aa7bd.js"}')),s("8FnLx"),s("ghT7p"),s("kV9l4"),s("95rAy");const r=document.querySelector(".favorite-categories"),a=document.querySelector(".card-recipe-favorite"),c=document.querySelector(".category-select"),o=document.querySelector(".js-noone"),i=document.querySelector(".page-pagination-list");var l;l=new URL(s("kyEFX").resolve("hm5VY"),import.meta.url).toString();const d=new URL(l),u={btnBegin:document.querySelector(".btn-beginning"),btnPrev:document.querySelector(".btn-previous"),btnFirst:document.querySelector(".btn-first"),btnSecond:document.querySelector(".btn-second"),btnThird:document.querySelector(".btn-third"),btnOther:document.querySelector(".btn-show-others"),btnNext:document.querySelector(".btn-next"),btnEnd:document.querySelector(".btn-end")},g=JSON.parse(localStorage.getItem("FAVORITE_RECIPE"));console.log(g);let b,v=1;const p=Math.ceil(b/12);function f(e){const t=12*(v-1),n=t+12,s=e.slice(t,n);var r;a.innerHTML=" ",r=s,a.insertAdjacentHTML("beforeend",r.map((e=>{const t=Math.round(e.rating);let n="";for(let e=0;e<t;e++)n+=`<svg class="rat-icon act">\n              <use href="${d.pathname}#icon-Star"></use></svg>`;if(t<5)for(let e=0;e<5-t;e++)n+=`<svg class="rat-icon ">\n              <use href="${d.pathname}#icon-Star"></use></svg>`;return`\n    <li class="recipe-item">\n      <div class="photo-recipe-card " style="background-image: linear-gradient( 1deg, rgba(5, 5, 5, 0.6) 50%, rgba(5, 5, 5, 0) 100% ), url('${e.preview}'); background-repeat: no-repeat; background-size: cover;">\n      <button class="fav-btn" >\n      <svg class="fav-icon activ" data-id="${e._id}">\n          <use href="${d.pathname}#icon-heart-full"></use>\n        </svg>\n      </button>\n\n      <div class="info-recipe-card  " >\n        <h2 class="title-recipe-card">\n          ${e.title}\n        </h2>\n        <p class="descr-recipe-card">\n          ${e.description.slice(0,94)}...\n        </p>\n        <div class="thum-raying-card">\n          <div class="rating-recipe-card">\n          <span class="rating-value ">${e.rating.toFixed(1)}</span>\n        ${n}\n\n        </div>\n        <button class="see-recipe-card" data-id="${e._id}">See recipe</button>\n        </div>\n      </div>\n    </div>\n    </li>`})).join(""))}function m(e){const t=e.target.value;if(console.log(t),"0"===t)f(g);else{const e=g.filter((e=>e.category===t));console.log(e),f(e)}}g?(b=g.length,c.addEventListener("change",m),f(g),o.classList.add("disactive-message")):(i.style.display="none",r.style.display="none",o.classList.remove("disactive-message")),i.addEventListener("click",(e=>{e.target.classList.contains("btn-list")&&(e.target.classList.contains("btn-first")?(v=1,e.target.classList.add("act"),u.btnSecond.classList.remove("act"),u.btnThird.classList.remove("act")):e.target.classList.contains("btn-second")?(v=2,e.target.classList.add("act"),u.btnFirst.classList.remove("act"),u.btnThird.classList.remove("act")):e.target.classList.contains("btn-third")?(v=3,e.target.classList.add("act"),u.btnSecond.classList.remove("act"),u.btnSecond.classList.remove("act")):e.target.classList.contains("btn-show-others")?v=p:e.target.classList.contains("btn-previous")?(console.log(e.target),console.log("currentPage",v),v>1&&v--):e.target.classList.contains("btn-next")?v<p&&v++:v=parseInt(e.target.textContent),f(g))}));
//# sourceMappingURL=favorites.77be2d17.js.map
