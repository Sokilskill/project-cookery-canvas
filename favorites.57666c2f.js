!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},a=e.parcelRequiref774;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in n){var a=n[e];delete n[e];var s={id:e,exports:{}};return t[e]=s,a.call(s.exports,s,s.exports),s.exports}var c=new Error("Cannot find module '"+e+"'");throw c.code="MODULE_NOT_FOUND",c}).register=function(e,t){n[e]=t},e.parcelRequiref774=a),a("iE7OH").register(JSON.parse('{"1Z6Xn":"favorites.57666c2f.js","d9SZC":"icons.d085dab5.svg","2CpI3":"index.fa2c7b15.js"}')),a("cs7FV"),a("32ZrB"),a("9Di7p"),a("4J3Ot");var s,c=document.querySelector(".favorite-categories"),r=document.querySelector(".card-recipe-favorite"),o=document.querySelector(".category-select"),l=document.querySelector(".js-noone"),d=document.querySelector(".page-pagination-list"),g=JSON.parse(localStorage.getItem("favoriteRecipes"));console.log(g);var u=1;g?(s=g.length,console.log(g.length),o.addEventListener("change",b),f(g),l.classList.add("disactive-message")):(d.style.display="none",c.style.display="none",l.classList.remove("disactive-message"));var v=Math.ceil(s/12);function f(e){var t=12*(u-1),n=t+12,a=e.slice(t,n);r.innerHTML="",function(e){try{r.insertAdjacentHTML("beforeend",e.map((function(e){for(var t=new URL(p),n=Math.round(e.rating),a="",s=0;s<n;s++)a+='<svg class="rat-icon act">\n              <use href="'.concat(t.pathname,'#icon-Star"></use></svg>');if(n<5)for(i=0;i<5-n;i++)a+='<svg class="rat-icon ">\n              <use href="'.concat(t.pathname,'#icon-Star"></use></svg>');return console.log(a),'\n      <li class="recipe-item"> \n        <div class="photo-recipe-card " style="background: linear-gradient( 1deg, rgba(5, 5, 5, 0.6) 50%, rgba(5, 5, 5, 0) 100% ), url(\''.concat(e.preview,'\'); background-repeat: no-repeat; background-size: cover;">\n        <button class="fav-btn" >\n        <svg class="fav-icon activ" data-id="').concat(e._id,'">\n            <use href="').concat(t.pathname,'#icon-heart-full"></use>\n          </svg>\n        </button>\n\n        <div class="info-recipe-card  " >\n          <h2 class="title-recipe-card">\n            ').concat(e.title,'\n          </h2>\n          <p class="descr-recipe-card">\n            ').concat(e.description.slice(0,94),'...\n          </p>\n          <div class="thum-raying-card">\n            <div class="rating-recipe-card">\n            <span class="rating-value ">').concat(e.rating.toFixed(1),"</span>\n          ").concat(a,'\n      \n          </div>\n          <button class="see-recipe-card" data-id="').concat(e._id,'">See recipe</button>\n          </div>\n        </div>\n      </div>\n      </li>')})).join(""))}catch(e){console.log(e)}}(a)}var p;function b(e){var t=e.target.value;if(console.log(t),"0"===t)return f(g);var n=g.filter((function(e){return e.category===t}));return console.log(n),f(n)}p=a("aNJCr").getBundleURL("1Z6Xn")+a("iE7OH").resolve("d9SZC"),d.addEventListener("click",(function(e){e.target.classList.contains("btn-list")&&(e.target.classList.contains("btn-first")?(u=1,e.target.classList.add("act"),console.log(e.target)):e.target.classList.contains("btn-second")?(u=2,e.target.classList.add("act"),console.log(u)):e.target.classList.contains("btn-third")?(u=3,console.log(u),e.target.classList.add("act")):e.target.classList.contains(".btn-show-others")?u=v:e.target.classList.contains("btn-previous")?u>1&&u--:e.target.classList.contains("btn-next")?u<v&&u++:u=parseInt(e.target.textContent))}))}();
//# sourceMappingURL=favorites.57666c2f.js.map
