var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},s=e.parcelRequiref774;null==s&&((s=function(e){if(e in t)return t[e].exports;if(e in n){var s=n[e];delete n[e];var c={id:e,exports:{}};return t[e]=c,s.call(c.exports,c,c.exports),c.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){n[e]=t},e.parcelRequiref774=s),s("kyEFX").register(JSON.parse('{"bTGq4":"favorites.8402ff05.js","hm5VY":"icons.d085dab5.svg","eBmCf":"index.0d6cf991.js"}')),s("8FnLx"),s("ghT7p"),s("kV9l4"),s("95rAy");const c=document.querySelector(".favorite-categories"),r=document.querySelector(".card-recipe-favorite"),a=document.querySelector(".category-select"),i=document.querySelector(".js-noone"),o=document.querySelector(".page-pagination-list");var d;d=new URL(s("kyEFX").resolve("hm5VY"),import.meta.url).toString();const l=new URL(d),u={btnBegin:document.querySelector(".btn-beginning"),btnPrev:document.querySelector(".btn-previous"),btnFirst:document.querySelector(".btn-first"),btnSecond:document.querySelector(".btn-second"),btnThird:document.querySelector(".btn-third"),btnOther:document.querySelector(".btn-show-others"),btnNext:document.querySelector(".btn-next"),btnEnd:document.querySelector(".btn-end")},b=JSON.parse(localStorage.getItem("FAVORITE_RECIPE"));console.log(b);let v,f,g=1,p=6;function h(){y(b)}function y(e){e&&e.length?(v=e.length,window.scrollTo({top:0,behavior:"smooth"}),function(){const e=window.innerWidth;e<768?p=6:e>=768&&1280>e?p=9:e>=1280&&(p=12)}(),f=Math.ceil(v/p),function(e){const t=function(e){!function(){if(1===f)return o.style.display="none";o.style.display="flex";1<f<=3&&(u.btnThird.style.display="none");f<=2&&(u.btnSecond.style.display="none");u.btnOther.textContent=f}();const t=(g-1)*p,n=t+p;return e.slice(t,n)}(e);r.innerHTML=" ";const n=(s=t,s.map((e=>{const t=Math.round(e.rating);let n="";for(let e=0;e<t;e++)n+=`<svg class="rat-icon act">\n              <use href="${l.pathname}#icon-Star"></use></svg>`;if(t<5)for(let e=0;e<5-t;e++)n+=`<svg class="rat-icon ">\n              <use href="${l.pathname}#icon-Star"></use></svg>`;return`\n    <li class="recipe-item">\n      <div class="photo-recipe-card " style="background: linear-gradient( 1deg, rgba(5, 5, 5, 0.6) 50%, rgba(5, 5, 5, 0) 100% ), url('${e.preview}'); background-repeat: no-repeat; background-size: cover;">\n      <button class="fav-btn" >\n      <svg class="fav-icon activ" data-id="${e._id}">\n          <use href="${l.pathname}#icon-heart-full"></use>\n        </svg>\n      </button>\n\n      <div class="info-recipe-card  " >\n        <h2 class="title-recipe-card">\n          ${e.title}\n        </h2>\n        <p class="descr-recipe-card">\n          ${e.description.slice(0,94)}...\n        </p>\n        <div class="thum-raying-card">\n          <div class="rating-recipe-card">\n          <span class="rating-value ">${e.rating.toFixed(1)}</span>\n        ${n}\n\n        </div>\n        <button class="see-recipe-card" data-id="${e._id}">See recipe</button>\n        </div>\n      </div>\n    </div>\n    </li>`})).join(""));var s;r.insertAdjacentHTML("beforeend",n)}(e)):(o.style.display="none",c.style.display="none",i.style.display="block")}function m(){!function(){u.btnPrev.classList.remove("act"),u.btnBegin.classList.remove("act"),u.btnFirst.classList.remove("act"),u.btnSecond.classList.remove("act"),u.btnThird.classList.remove("act"),g===f&&(u.btnNext.classList.remove("act"),u.btnEnd.classList.remove("act"));g!==f&&u.btnOther.classList.remove("act")}(),function(){g>1&&(u.btnPrev.classList.add("act"),u.btnBegin.classList.add("act"));1===g&&u.btnFirst.classList.add("act");2===g&&u.btnSecond.classList.add("act");3===g&&u.btnThird.classList.add("act");g===f&&u.btnOther.classList.add("act");g<f&&(u.btnNext.classList.add("act"),u.btnEnd.classList.add("act"))}(),y(b)}h(),window.addEventListener("resize",h),a.addEventListener("change",(function(e){const t=e.target.value;if("0"===t)y(b);else{const e=b.filter((e=>e.category===t));g=1,y(e)}})),o.addEventListener("click",(e=>{e.target.classList.contains("btn-list")&&(e.target.classList.contains("btn-first")?g=1:e.target.classList.contains("btn-second")?g=2:e.target.classList.contains("btn-third")?g=3:e.target.classList.contains("btn-show-others")&&(g=f),m())})),u.btnBegin.addEventListener("click",(()=>{g=1})),u.btnPrev.addEventListener("click",(()=>{g>1&&(g--,m())})),u.btnNext.addEventListener("click",(()=>{g!==f&&(g+=1,m())})),u.btnEnd.addEventListener("click",(()=>{g=f,m()})),s("94NtY"),s("4ZS0N");
//# sourceMappingURL=favorites.8402ff05.js.map
