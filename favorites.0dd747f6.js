var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},s=e.parcelRequiref774;null==s&&((s=function(e){if(e in t)return t[e].exports;if(e in n){var s=n[e];delete n[e];var a={id:e,exports:{}};return t[e]=a,s.call(a.exports,a,a.exports),a.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){n[e]=t},e.parcelRequiref774=s),s("kyEFX").register(JSON.parse('{"bTGq4":"favorites.0dd747f6.js","hm5VY":"icons.d085dab5.svg","eBmCf":"index.0e4cb2c2.js"}')),s("8FnLx"),s("ghT7p"),s("kV9l4"),s("95rAy");const a=document.querySelector(".favorite-categories"),r=document.querySelector(".card-recipe-favorite"),o=document.querySelector(".category-select"),c=document.querySelector(".js-noone"),l=document.querySelector(".page-pagination-list"),d=JSON.parse(localStorage.getItem("favoriteRecipes"));let g;console.log(d);let u=1;d?(g=d.length,console.log(d.length),o.addEventListener("change",b),f(d),c.classList.add("disactive-message")):(l.style.display="none",a.style.display="none",c.classList.remove("disactive-message"));const p=Math.ceil(g/12);function f(e){const t=12*(u-1),n=t+12,s=e.slice(t,n);var a;r.innerHTML="",a=s,r.insertAdjacentHTML("beforeend",a.map((e=>{let t=new URL(v);const n=Math.round(e.rating);let s="";for(let e=0;e<n;e++)s+=`<svg class="rat-icon act">\n              <use href="${t.pathname}#icon-Star"></use></svg>`;if(n<5)for(i=0;i<5-n;i++)s+=`<svg class="rat-icon ">\n              <use href="${t.pathname}#icon-Star"></use></svg>`;return console.log(s),`\n      <li class="recipe-item"> \n        <div class="photo-recipe-card " style="background: linear-gradient( 1deg, rgba(5, 5, 5, 0.6) 50%, rgba(5, 5, 5, 0) 100% ), url('${e.preview}'); background-repeat: no-repeat; background-size: cover;">\n        <button class="fav-btn" >\n        <svg class="fav-icon activ" data-id="${e._id}">\n            <use href="${t.pathname}#icon-heart-full"></use>\n          </svg>\n        </button>\n\n        <div class="info-recipe-card  " >\n          <h2 class="title-recipe-card">\n            ${e.title}\n          </h2>\n          <p class="descr-recipe-card">\n            ${e.description.slice(0,94)}...\n          </p>\n          <div class="thum-raying-card">\n            <div class="rating-recipe-card">\n            <span class="rating-value ">${e.rating.toFixed(1)}</span>\n          ${s}\n      \n          </div>\n          <button class="see-recipe-card" data-id="${e._id}">See recipe</button>\n          </div>\n        </div>\n      </div>\n      </li>`})).join(""))}var v;function b(e){const t=e.target.value;if(console.log(t),"0"===t)return f(d);{const e=d.filter((e=>e.category===t));return console.log(e),f(e)}}v=new URL(s("kyEFX").resolve("hm5VY"),import.meta.url).toString(),l.addEventListener("click",(e=>{e.target.classList.contains("btn-list")&&(e.target.classList.contains("btn-first")?(u=1,e.target.classList.add("act"),console.log(e.target)):e.target.classList.contains("btn-second")?(u=2,e.target.classList.add("act"),console.log(u)):e.target.classList.contains("btn-third")?(u=3,console.log(u),e.target.classList.add("act")):e.target.classList.contains(".btn-show-others")?u=p:e.target.classList.contains("btn-previous")?u>1&&u--:e.target.classList.contains("btn-next")?u<p&&u++:u=parseInt(e.target.textContent))}));
//# sourceMappingURL=favorites.0dd747f6.js.map
