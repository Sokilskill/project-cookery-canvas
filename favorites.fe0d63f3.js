!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},a=e.parcelRequiref774;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in n){var a=n[e];delete n[e];var c={id:e,exports:{}};return t[e]=c,a.call(c.exports,c,c.exports),c.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){n[e]=t},e.parcelRequiref774=a),a("iE7OH").register(JSON.parse('{"1Z6Xn":"favorites.fe0d63f3.js","d9SZC":"icons.d085dab5.svg","2CpI3":"index.e4de2c70.js"}')),a("cs7FV"),a("32ZrB"),a("9Di7p"),a("4J3Ot");var c,r=document.querySelector(".favorite-categories"),s=document.querySelector(".card-recipe-favorite"),o=document.querySelector(".category-select"),i=document.querySelector(".js-noone"),l=document.querySelector(".page-pagination-list");c=a("aNJCr").getBundleURL("1Z6Xn")+a("iE7OH").resolve("d9SZC");var d=new URL(c),u={btnBegin:document.querySelector(".btn-beginning"),btnPrev:document.querySelector(".btn-previous"),btnFirst:document.querySelector(".btn-first"),btnSecond:document.querySelector(".btn-second"),btnThird:document.querySelector(".btn-third"),btnOther:document.querySelector(".btn-show-others"),btnNext:document.querySelector(".btn-next"),btnEnd:document.querySelector(".btn-end")},g=JSON.parse(localStorage.getItem("FAVORITE_RECIPE"));console.log(g);var v,b=1,p=Math.ceil(v/12);function f(e){var t,n=12*(b-1),a=n+12,c=e.slice(n,a);s.innerHTML=" ",t=c,s.insertAdjacentHTML("beforeend",t.map((function(e){for(var t=Math.round(e.rating),n="",a=0;a<t;a++)n+='<svg class="rat-icon act">\n              <use href="'.concat(d.pathname,'#icon-Star"></use></svg>');if(t<5)for(var c=0;c<5-t;c++)n+='<svg class="rat-icon ">\n              <use href="'.concat(d.pathname,'#icon-Star"></use></svg>');return'\n    <li class="recipe-item">\n      <div class="photo-recipe-card " style="background-image: linear-gradient( 1deg, rgba(5, 5, 5, 0.6) 50%, rgba(5, 5, 5, 0) 100% ), url(\''.concat(e.preview,'\'); background-repeat: no-repeat; background-size: cover;">\n      <button class="fav-btn" >\n      <svg class="fav-icon activ" data-id="').concat(e._id,'">\n          <use href="').concat(d.pathname,'#icon-heart-full"></use>\n        </svg>\n      </button>\n\n      <div class="info-recipe-card  " >\n        <h2 class="title-recipe-card">\n          ').concat(e.title,'\n        </h2>\n        <p class="descr-recipe-card">\n          ').concat(e.description.slice(0,94),'...\n        </p>\n        <div class="thum-raying-card">\n          <div class="rating-recipe-card">\n          <span class="rating-value ">').concat(e.rating.toFixed(1),"</span>\n        ").concat(n,'\n\n        </div>\n        <button class="see-recipe-card" data-id="').concat(e._id,'">See recipe</button>\n        </div>\n      </div>\n    </div>\n    </li>')})).join(""))}function m(e){var t=e.target.value;if(console.log(t),"0"===t)f(g);else{var n=g.filter((function(e){return e.category===t}));console.log(n),f(n)}}g?(v=g.length,o.addEventListener("change",m),f(g),i.classList.add("disactive-message")):(l.style.display="none",r.style.display="none",i.classList.remove("disactive-message")),l.addEventListener("click",(function(e){e.target.classList.contains("btn-list")&&(e.target.classList.contains("btn-first")?(b=1,e.target.classList.add("act"),u.btnSecond.classList.remove("act"),u.btnThird.classList.remove("act")):e.target.classList.contains("btn-second")?(b=2,e.target.classList.add("act"),u.btnFirst.classList.remove("act"),u.btnThird.classList.remove("act")):e.target.classList.contains("btn-third")?(b=3,e.target.classList.add("act"),u.btnSecond.classList.remove("act"),u.btnSecond.classList.remove("act")):e.target.classList.contains("btn-show-others")?b=p:e.target.classList.contains("btn-previous")?(console.log(e.target),console.log("currentPage",b),b>1&&b--):e.target.classList.contains("btn-next")?b<p&&b++:b=parseInt(e.target.textContent),f(g))}))}();
//# sourceMappingURL=favorites.fe0d63f3.js.map
