var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},s=e.parcelRequiref774;null==s&&((s=function(e){if(e in t)return t[e].exports;if(e in n){var s=n[e];delete n[e];var a={id:e,exports:{}};return t[e]=a,s.call(a.exports,a,a.exports),a.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){n[e]=t},e.parcelRequiref774=s),s("kyEFX").register(JSON.parse('{"bTGq4":"favorites.666fb7bf.js","hm5VY":"icons.d085dab5.svg","eBmCf":"index.0e4cb2c2.js"}')),s("8FnLx"),s("ghT7p"),s("kV9l4"),s("95rAy");const a=document.querySelector(".favorite-categories"),r=document.querySelector(".card-recipe-favorite"),c=document.querySelector(".category-select"),o=document.querySelector(".js-noone"),i=document.querySelector(".page-pagination-list"),l={btnBegin:document.querySelector(".btn-beginning"),btnPrev:document.querySelector(".btn-previous"),btnFirst:document.querySelector(".btn-first"),btnSecond:document.querySelector(".btn-second"),btnThird:document.querySelector(".btn-third"),btnOther:document.querySelector(".btn-show-others"),btnNext:document.querySelector(".btn-next"),btnEnd:document.querySelector(".btn-end")},d=JSON.parse(localStorage.getItem("FAVORITE_RECIPE"));console.log(d);let g=1;const u=d.length,b=Math.ceil(u/12);function v(e){const t=12*(g-1),n=t+12,s=e.slice(t,n);var a;r.innerHTML=" ",console.log(r.innerHTML),a=s,r.insertAdjacentHTML("beforeend",a.map((e=>{let t=new URL(p);const n=Math.round(e.rating);let s="";for(let e=0;e<n;e++)s+=`<svg class="rat-icon act">\n              <use href="${t.pathname}#icon-Star"></use></svg>`;if(n<5)for(let e=0;e<5-n;e++)s+=`<svg class="rat-icon ">\n              <use href="${t.pathname}#icon-Star"></use></svg>`;return`\n    <li class="recipe-item">\n      <div class="photo-recipe-card " style="background-image: linear-gradient( 1deg, rgba(5, 5, 5, 0.6) 50%, rgba(5, 5, 5, 0) 100% ), url('${e.preview}'); background-repeat: no-repeat; background-size: cover;">\n      <button class="fav-btn" >\n      <svg class="fav-icon activ" data-id="${e._id}">\n          <use href=""></use>\n        </svg>\n      </button>\n\n      <div class="info-recipe-card  " >\n        <h2 class="title-recipe-card">\n          ${e.title}\n        </h2>\n        <p class="descr-recipe-card">\n          ${e.description.slice(0,94)}...\n        </p>\n        <div class="thum-raying-card">\n          <div class="rating-recipe-card">\n          <span class="rating-value ">${e.rating.toFixed(1)}</span>\n        ${s}\n\n        </div>\n        <button class="see-recipe-card" data-id="${e._id}">See recipe</button>\n        </div>\n      </div>\n    </div>\n    </li>`})).join(""))}console.log(d.length),d?(c.addEventListener("change",f),v(d),o.classList.add("disactive-message")):(i.style.display="none",a.style.display="none",o.classList.remove("disactive-message"));var p;function f(e){const t=e.target.value;if(console.log(t),"0"===t)v(slicedMarkup);else{const e=d.filter((e=>e.category===t));console.log(e),v(e)}}p=new URL(s("kyEFX").resolve("hm5VY"),import.meta.url).toString(),i.addEventListener("click",(e=>{e.target.classList.contains("btn-list")&&(e.target.classList.contains("btn-first")?(g=1,e.target.classList.add("act"),l.btnSecond.classList.remove("act"),l.btnThird.classList.remove("act"),v(d),console.log(e.target)):e.target.classList.contains("btn-second")?(g=2,e.target.classList.add("act"),l.btnFirst.classList.remove("act"),l.btnThird.classList.remove("act"),v(d),console.log(g)):e.target.classList.contains("btn-third")?(g=3,console.log(g),e.target.classList.add("act"),l.btnSecond.classList.remove("act"),l.btnSecond.classList.remove("act"),v(d),e.target.classList.add("act")):e.target.classList.contains(".btn-show-others")?g=b:e.target.classList.contains("btn-previous")?g>1&&g--:e.target.classList.contains("btn-next")?g<b&&g++:g=parseInt(e.target.textContent))}));
//# sourceMappingURL=favorites.666fb7bf.js.map
