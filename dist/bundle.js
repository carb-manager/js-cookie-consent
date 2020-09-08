!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){n(1),e.exports=n(2)},function(e,t,n){"use strict";n.r(t),n.d(t,"cookieConsent",(function(){return o}));var o=function(e){var t=x(null==e?void 0:e.cookieName),n=[],o=document.createElement("div"),r=i(null==e?void 0:e.message,null==e?void 0:e.learnMore),l=d(e,o);if(o.setAttribute("id","js-cookie-consent-box"),o.classList.add("slide-up"),null===t){for(var s=0;s<(null==e?void 0:e.options.length);s++)n.push(null==e?void 0:e.options[s].key);o.appendChild(r),o.appendChild(l);var c=v(e,n,o);o.appendChild(c),document.body.appendChild(o),E(null==e?void 0:e.expiration,o,n)}else o.style.display="none"},i=function(e,t){var n=document.createElement("div"),o=r(e),i=l(t);return n.classList.add("js-cookie-consent-main-text-box"),n.appendChild(o),n.appendChild(i),n},r=function(e){var t=document.createElement("p");return t.classList.add("title"),t.innerHTML=e,t},l=function(e){var t=document.createElement("span"),n=s(e);return t.classList.add("learn-more-box"),t.appendChild(n),t},s=function(e){if(null!=e&&0!==(null==e?void 0:e.length)){var t=document.createElement("a");return t.innerHTML="Learn More",t.setAttribute("href",e),t.setAttribute("target","_blank"),t.setAttribute("rel","noopener noreferrer"),t.classList.add("learn-more"),t}},d=function(e,t){var n=document.createElement("div"),o=[],i=[],r=g(t,null==e?void 0:e.expiration,null==e?void 0:e.color);if(n.classList.add("js-cookie-consent-toogle-box"),(null==e?void 0:e.options.length)>0){for(var l=0;l<(null==e?void 0:e.options.length);l++)c(n,null==e?void 0:e.options[l],null==e?void 0:e.color),e.options[l].checked&&o.push(null==e?void 0:e.options[l].key),i.push(null==e?void 0:e.options[l].key);sessionStorage.setItem("categories",JSON.stringify(o))}return n.appendChild(r),n},c=function(e,t,n){var o=a(),i=u(null==t?void 0:t.title),r=p(null==t?void 0:t.description),l=k(null==t?void 0:t.key),s=L(null==t?void 0:t.checked),d=h(t,n);l.appendChild(s),l.appendChild(d),o.appendChild(i),o.appendChild(l),o.appendChild(r),e.appendChild(o)},a=function(){var e=document.createElement("div");return e.classList.add("js-cookie-consent-toogle-box-inner"),e},u=function(e){var t=document.createElement("p");return t.classList.add("settings-title"),t.innerHTML=e,t},p=function(e){var t=document.createElement("span");return t.classList.add("settings-subtitle"),t.innerHTML=e,t},v=function(e,t,n){var o=document.createElement("div"),i=f(null==e?void 0:e.expiration,n,null==e?void 0:e.color,t),r=m(n);return o.classList.add("btn-box"),o.appendChild(i),o.appendChild(r),o},f=function(e,t,n,o){var i=document.createElement("button");return i.innerHTML="Accept all",i.setAttribute("id","acceptAllCookies"),i.classList.add("btn","accept"),n&&(i.style.backgroundColor=n),i.addEventListener("click",(function(){return C(e,t,o)})),i},m=function(e){var t=document.createElement("button");return t.innerHTML="Cookie settings",t.setAttribute("id","openCookieSettings"),t.classList.add("btn","open-settings"),t.addEventListener("click",(function(){var t=e.classList.contains("slide-up");e.setAttribute("class",t?"slide-down":"slide-up")})),t},g=function(e,t,n){var o=document.createElement("div"),i=b(e,t,n);return o.classList.add("save-cookies-btn-box"),o.appendChild(i),o},b=function(e,t,n){var o=document.createElement("button");return o.innerHTML="Save cookie settings",o.setAttribute("id","saveCookieSettings"),o.classList.add("btn","save-cookies"),n&&(o.style.backgroundColor=n),o.addEventListener("click",(function(){var n=sessionStorage.getItem("categories");S("cookiesGDPR",n,t),e.style.display="none"})),o},h=function(e,t){var n=document.createElement("span");return n.classList.add("slider","round",null==e?void 0:e.key),(null==e?void 0:e.disabled)&&n.classList.add("disabled"),(null==e?void 0:e.checked)&&(n.classList.add("checked"),t&&(n.style.backgroundColor=t)),n.addEventListener("click",(function(n){n.target.className.includes("disabled")?n.preventDefault():(n.target.className.includes("checked")?(n.target.classList.remove("checked"),n.target.style.backgroundColor="#ccc"):(n.target.classList.add("checked"),n.target.style.backgroundColor=t),n.stopPropagation(),y(null==e?void 0:e.key))})),n},k=function(){var e=document.createElement("label");return e.classList.add("switch"),e},L=function(e){var t=document.createElement("input");return t.setAttribute("type","checkbox"),e?t.setAttribute("checked",""):t.removeAttribute("checked"),t},y=function(e){var t=sessionStorage.getItem("categories"),n=JSON.parse(t),o=n.indexOf(e);-1!==o?n.splice(o,1):n.push(e),sessionStorage.setItem("categories",JSON.stringify(n))},C=function(e,t,n){S("cookiesGDPR",JSON.stringify(n),null==e?void 0:e.expiration),t.style.display="none"},E=function(e,t,n){window.addEventListener("scroll",(function o(){window.innerHeight+document.documentElement.scrollTop===document.documentElement.offsetHeight&&(C(e,t,n),window.removeEventListener("click",o))}))},x=function(e){if(document.cookie.length)for(var t=e+"=",n=document.cookie.split(";"),o=0;o<n.length;o++){for(var i=n[o];" "===i.charAt(0);)i=i.substring(1,i.length);if(0===i.indexOf(t))return i.substring(t.length,i.length)}return null},S=function(e,t,n,o){var i=new Date;i.setTime(i.getTime()+24*n*60*60*1e3);var r="expires="+i.toUTCString();document.cookie=e+"="+t+";"+r+";path="+(o||"/")}},function(e,t,n){}]);