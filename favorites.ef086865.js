!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},c=e.parcelRequiref774;null==c&&((c=function(e){if(e in t)return t[e].exports;if(e in n){var c=n[e];delete n[e];var s={id:e,exports:{}};return t[e]=s,c.call(s.exports,s,s.exports),s.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){n[e]=t},e.parcelRequiref774=c),c("iE7OH").register(JSON.parse('{"1Z6Xn":"favorites.ef086865.js","d9SZC":"icons.d085dab5.svg","2CpI3":"index.238f9ba6.js"}')),c("cs7FV"),c("32ZrB"),c("9Di7p"),c("4J3Ot");var s,a=document.querySelector(".favorite-categories"),r=document.querySelector(".card-recipe-favorite"),i=document.querySelector(".category-select"),o=document.querySelector(".js-noone"),d=document.querySelector(".page-pagination-list");s=c("aNJCr").getBundleURL("1Z6Xn")+c("iE7OH").resolve("d9SZC");var l=new URL(s),u={btnBegin:document.querySelector(".btn-beginning"),btnPrev:document.querySelector(".btn-previous"),btnFirst:document.querySelector(".btn-first"),btnSecond:document.querySelector(".btn-second"),btnThird:document.querySelector(".btn-third"),btnOther:document.querySelector(".btn-show-others"),btnNext:document.querySelector(".btn-next"),btnEnd:document.querySelector(".btn-end")},b=JSON.parse(localStorage.getItem("FAVORITE_RECIPE"));console.log(b);var v,g,f,p=1,h=6;function y(e){var t;!function(){if(v<=h)return d.style.display="none";1<g<=3&&(u.btnThird.style.display="none"),g<=2&&(u.btnSecond.style.display="none"),u.btnOther.textContent=g}(),t=window.innerWidth,console.log("screenWidth:",t),console.log("itemsPerPage",h),t<768?h=6:t>=768&&1280>t?h=9:t>=1280&&(h=12),console.log("screenWidth:",t),console.log("itemsPerPage",h);var n=(p-1)*h,c=n+h;return e.slice(n,c)}function m(e){var t;r.innerHTML=" ",t=y(e),r.insertAdjacentHTML("beforeend",t.map((function(e){for(var t=Math.round(e.rating),n="",c=0;c<t;c++)n+='<svg class="rat-icon act">\n              <use href="'.concat(l.pathname,'#icon-Star"></use></svg>');if(t<5)for(var s=0;s<5-t;s++)n+='<svg class="rat-icon ">\n              <use href="'.concat(l.pathname,'#icon-Star"></use></svg>');return'\n    <li class="recipe-item">\n      <div class="photo-recipe-card " style="background-image: linear-gradient( 1deg, rgba(5, 5, 5, 0.6) 50%, rgba(5, 5, 5, 0) 100% ), url(\''.concat(e.preview,'\'); background-repeat: no-repeat; background-size: cover;">\n      <button class="fav-btn" >\n      <svg class="fav-icon activ" data-id="').concat(e._id,'">\n          <use href="').concat(l.pathname,'#icon-heart-full"></use>\n        </svg>\n      </button>\n\n      <div class="info-recipe-card  " >\n        <h2 class="title-recipe-card">\n          ').concat(e.title,'\n        </h2>\n        <p class="descr-recipe-card">\n          ').concat(e.description.slice(0,94),'...\n        </p>\n        <div class="thum-raying-card">\n          <div class="rating-recipe-card">\n          <span class="rating-value ">').concat(e.rating.toFixed(1),"</span>\n        ").concat(n,'\n\n        </div>\n        <button class="see-recipe-card" data-id="').concat(e._id,'">See recipe</button>\n        </div>\n      </div>\n    </div>\n    </li>')})).join(""))}function L(){!function(){u.btnPrev.classList.remove("act"),u.btnBegin.classList.remove("act"),u.btnFirst.classList.remove("act"),u.btnSecond.classList.remove("act"),u.btnThird.classList.remove("act"),p>=g&&(u.btnNext.classList.remove("act"),u.btnEnd.classList.remove("act"));p!==g&&u.btnOther.classList.remove("act")}(),function(){p>1&&(u.btnPrev.classList.add("act"),u.btnBegin.classList.add("act"));1===p&&u.btnFirst.classList.add("act");2===p&&u.btnSecond.classList.add("act");3===p&&u.btnThird.classList.add("act");p===g&&u.btnOther.classList.add("act");p>=g&&(u.btnNext.classList.add("bc"),u.btnEnd.classList.add("bc"))}(),m(b)}i.addEventListener("change",(function(e){var t=e.target.value;if("0"===t)m(b);else{var n=b.filter((function(e){return e.category===t}));m(n),console.log(m(n))}})),d.addEventListener("click",(function(e){e.target.classList.contains("btn-list")&&(e.target.classList.contains("btn-first")?p=1:e.target.classList.contains("btn-second")?p=2:e.target.classList.contains("btn-third")?p=3:e.target.classList.contains("btn-show-others")&&(p=g),L())})),u.btnNext.addEventListener("click",(function(){p!==g&&(p+=1,L())})),u.btnPrev.addEventListener("click",(function(){1!==p&&(p-=1,L())})),(f=b)&&f.length?(v=f.length,g=Math.ceil(v/h),m(f)):(d.style.display="none",a.style.display="none",o.style.display="block"),c("4sdbM")}();
//# sourceMappingURL=favorites.ef086865.js.map
