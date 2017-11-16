!function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=1)}([function(t,e,n){"use strict";var r,i;"function"==typeof Symbol&&Symbol.iterator;!function(){function n(t){if(void 0===t)throw new Error('Pathformer [constructor]: "element" parameter is required');if(t.constructor===String&&!(t=document.getElementById(t)))throw new Error('Pathformer [constructor]: "element" parameter is not related to an existing ID');if(!(t instanceof window.SVGElement||t instanceof window.SVGGElement||/^svg$/i.test(t.nodeName)))throw new Error('Pathformer [constructor]: "element" parameter must be a string or a SVGelement');this.el=t,this.scan(t)}function a(t,e,n){o(),this.isReady=!1,this.setElement(t,e),this.setOptions(e),this.setCallback(n),this.isReady&&this.init()}n.prototype.TYPES=["line","ellipse","circle","polygon","polyline","rect"],n.prototype.ATTR_WATCH=["cx","cy","points","r","rx","ry","x","x1","x2","y","y1","y2"],n.prototype.scan=function(t){for(var e,n,r,i=t.querySelectorAll(this.TYPES.join(",")),a=0;a<i.length;a++)n=(0,this[(e=i[a]).tagName.toLowerCase()+"ToPath"])(this.parseAttr(e.attributes)),r=this.pathMaker(e,n),e.parentNode.replaceChild(r,e)},n.prototype.lineToPath=function(t){var e={},n=t.x1||0,r=t.y1||0,i=t.x2||0,a=t.y2||0;return e.d="M"+n+","+r+"L"+i+","+a,e},n.prototype.rectToPath=function(t){var e={},n=parseFloat(t.x)||0,r=parseFloat(t.y)||0,i=parseFloat(t.width)||0,a=parseFloat(t.height)||0;if(t.rx||t.ry){var o=parseInt(t.rx,10)||-1,s=parseInt(t.ry,10)||-1;o=Math.min(Math.max(o<0?s:o,0),i/2),s=Math.min(Math.max(s<0?o:s,0),a/2),e.d="M "+(n+o)+","+r+" L "+(n+i-o)+","+r+" A "+o+","+s+",0,0,1,"+(n+i)+","+(r+s)+" L "+(n+i)+","+(r+a-s)+" A "+o+","+s+",0,0,1,"+(n+i-o)+","+(r+a)+" L "+(n+o)+","+(r+a)+" A "+o+","+s+",0,0,1,"+n+","+(r+a-s)+" L "+n+","+(r+s)+" A "+o+","+s+",0,0,1,"+(n+o)+","+r}else e.d="M"+n+" "+r+" L"+(n+i)+" "+r+" L"+(n+i)+" "+(r+a)+" L"+n+" "+(r+a)+" Z";return e},n.prototype.polylineToPath=function(t){var e,n,r={},i=t.points.trim().split(" ");if(-1===t.points.indexOf(",")){var a=[];for(e=0;e<i.length;e+=2)a.push(i[e]+","+i[e+1]);i=a}for(n="M"+i[0],e=1;e<i.length;e++)-1!==i[e].indexOf(",")&&(n+="L"+i[e]);return r.d=n,r},n.prototype.polygonToPath=function(t){var e=n.prototype.polylineToPath(t);return e.d+="Z",e},n.prototype.ellipseToPath=function(t){var e={},n=parseFloat(t.rx)||0,r=parseFloat(t.ry)||0,i=parseFloat(t.cx)||0,a=parseFloat(t.cy)||0,o=i-n,s=a,l=parseFloat(i)+parseFloat(n),u=a;return e.d="M"+o+","+s+"A"+n+","+r+" 0,1,1 "+l+","+u+"A"+n+","+r+" 0,1,1 "+o+","+u,e},n.prototype.circleToPath=function(t){var e={},n=parseFloat(t.r)||0,r=parseFloat(t.cx)||0,i=parseFloat(t.cy)||0,a=r-n,o=i,s=parseFloat(r)+parseFloat(n),l=i;return e.d="M"+a+","+o+"A"+n+","+n+" 0,1,1 "+s+","+l+"A"+n+","+n+" 0,1,1 "+a+","+l,e},n.prototype.pathMaker=function(t,e){var n,r,i=document.createElementNS("http://www.w3.org/2000/svg","path");for(n=0;n<t.attributes.length;n++)r=t.attributes[n],-1===this.ATTR_WATCH.indexOf(r.name)&&i.setAttribute(r.name,r.value);for(n in e)i.setAttribute(n,e[n]);return i},n.prototype.parseAttr=function(t){for(var e,n={},r=0;r<t.length;r++){if(e=t[r],-1!==this.ATTR_WATCH.indexOf(e.name)&&-1!==e.value.indexOf("%"))throw new Error("Pathformer [parseAttr]: a SVG shape got values in percentage. This cannot be transformed into 'path' tags. Please use 'viewBox'.");n[e.name]=e.value}return n};var o,s,l,u;a.LINEAR=function(t){return t},a.EASE=function(t){return-Math.cos(t*Math.PI)/2+.5},a.EASE_OUT=function(t){return 1-Math.pow(1-t,3)},a.EASE_IN=function(t){return Math.pow(t,3)},a.EASE_OUT_BOUNCE=function(t){var e=1-Math.cos(t*(.5*Math.PI)),n=Math.pow(e,1.5),r=Math.pow(1-t,2);return 1-r+(1-Math.abs(Math.cos(n*(2.5*Math.PI))))*r},a.prototype.setElement=function(t,e){if(void 0===t)throw new Error('Vivus [constructor]: "element" parameter is required');if(t.constructor===String&&!(t=document.getElementById(t)))throw new Error('Vivus [constructor]: "element" parameter is not related to an existing ID');if(this.parentEl=t,e&&e.file){var n=document.createElement("object");n.setAttribute("type","image/svg+xml"),n.setAttribute("data",e.file),n.setAttribute("built-by-vivus","true"),t.appendChild(n),t=n}switch(t.constructor){case window.SVGSVGElement:case window.SVGElement:case window.SVGGElement:this.el=t,this.isReady=!0;break;case window.HTMLObjectElement:var r,i;i=this,(r=function(e){if(!i.isReady){if(i.el=t.contentDocument&&t.contentDocument.querySelector("svg"),!i.el&&e)throw new Error("Vivus [constructor]: object loaded does not contain any SVG");return i.el?(t.getAttribute("built-by-vivus")&&(i.parentEl.insertBefore(i.el,t),i.parentEl.removeChild(t),i.el.setAttribute("width","100%"),i.el.setAttribute("height","100%")),i.isReady=!0,i.init(),!0):void 0}})()||t.addEventListener("load",r);break;default:throw new Error('Vivus [constructor]: "element" parameter is not valid (or miss the "file" attribute)')}},a.prototype.setOptions=function(t){var e=["delayed","sync","async","nsync","oneByOne","scenario","scenario-sync"],n=["inViewport","manual","autostart"];if(void 0!==t&&t.constructor!==Object)throw new Error('Vivus [constructor]: "options" parameter must be an object');if((t=t||{}).type&&-1===e.indexOf(t.type))throw new Error("Vivus [constructor]: "+t.type+" is not an existing animation `type`");if(this.type=t.type||e[0],t.start&&-1===n.indexOf(t.start))throw new Error("Vivus [constructor]: "+t.start+" is not an existing `start` option");if(this.start=t.start||n[0],this.isIE=-1!==window.navigator.userAgent.indexOf("MSIE")||-1!==window.navigator.userAgent.indexOf("Trident/")||-1!==window.navigator.userAgent.indexOf("Edge/"),this.duration=u(t.duration,120),this.delay=u(t.delay,null),this.dashGap=u(t.dashGap,1),this.forceRender=t.hasOwnProperty("forceRender")?!!t.forceRender:this.isIE,this.reverseStack=!!t.reverseStack,this.selfDestroy=!!t.selfDestroy,this.onReady=t.onReady,this.map=[],this.frameLength=this.currentFrame=this.delayUnit=this.speed=this.handle=null,this.ignoreInvisible=!!t.hasOwnProperty("ignoreInvisible")&&!!t.ignoreInvisible,this.animTimingFunction=t.animTimingFunction||a.LINEAR,this.pathTimingFunction=t.pathTimingFunction||a.LINEAR,this.delay>=this.duration)throw new Error("Vivus [constructor]: delay must be shorter than duration")},a.prototype.setCallback=function(t){if(t&&t.constructor!==Function)throw new Error('Vivus [constructor]: "callback" parameter must be a function');this.callback=t||function(){}},a.prototype.mapping=function(){var t,e,n,r,i,a,o,s;for(s=a=o=0,e=this.el.querySelectorAll("path"),t=0;t<e.length;t++)n=e[t],this.isInvisible(n)||(i={el:n,length:Math.ceil(n.getTotalLength())},isNaN(i.length)?window.console&&console.warn&&console.warn("Vivus [mapping]: cannot retrieve a path element length",n):(this.map.push(i),n.style.strokeDasharray=i.length+" "+(i.length+2*this.dashGap),n.style.strokeDashoffset=i.length+this.dashGap,i.length+=this.dashGap,a+=i.length,this.renderPath(t)));for(a=0===a?1:a,this.delay=null===this.delay?this.duration/3:this.delay,this.delayUnit=this.delay/(e.length>1?e.length-1:1),this.reverseStack&&this.map.reverse(),t=0;t<this.map.length;t++){switch(i=this.map[t],this.type){case"delayed":i.startAt=this.delayUnit*t,i.duration=this.duration-this.delay;break;case"oneByOne":i.startAt=o/a*this.duration,i.duration=i.length/a*this.duration;break;case"sync":case"async":case"nsync":i.startAt=0,i.duration=this.duration;break;case"scenario-sync":n=i.el,r=this.parseAttr(n),i.startAt=s+(u(r["data-delay"],this.delayUnit)||0),i.duration=u(r["data-duration"],this.duration),s=void 0!==r["data-async"]?i.startAt:i.startAt+i.duration,this.frameLength=Math.max(this.frameLength,i.startAt+i.duration);break;case"scenario":n=i.el,r=this.parseAttr(n),i.startAt=u(r["data-start"],this.delayUnit)||0,i.duration=u(r["data-duration"],this.duration),this.frameLength=Math.max(this.frameLength,i.startAt+i.duration)}o+=i.length,this.frameLength=this.frameLength||this.duration}},a.prototype.drawer=function(){var t=this;if(this.currentFrame+=this.speed,this.currentFrame<=0)this.stop(),this.reset();else{if(!(this.currentFrame>=this.frameLength))return this.trace(),void(this.handle=s(function(){t.drawer()}));this.stop(),this.currentFrame=this.frameLength,this.trace(),this.selfDestroy&&this.destroy()}this.callback(this),this.instanceCallback&&(this.instanceCallback(this),this.instanceCallback=null)},a.prototype.trace=function(){var t,e,n,r;for(r=this.animTimingFunction(this.currentFrame/this.frameLength)*this.frameLength,t=0;t<this.map.length;t++)e=(r-(n=this.map[t]).startAt)/n.duration,e=this.pathTimingFunction(Math.max(0,Math.min(1,e))),n.progress!==e&&(n.progress=e,n.el.style.strokeDashoffset=Math.floor(n.length*(1-e)),this.renderPath(t))},a.prototype.renderPath=function(t){if(this.forceRender&&this.map&&this.map[t]){var e=this.map[t],n=e.el.cloneNode(!0);e.el.parentNode.replaceChild(n,e.el),e.el=n}},a.prototype.init=function(){this.frameLength=0,this.currentFrame=0,this.map=[],new n(this.el),this.mapping(),this.starter(),this.onReady&&this.onReady(this)},a.prototype.starter=function(){switch(this.start){case"manual":return;case"autostart":this.play();break;case"inViewport":var t=this,e=function e(){t.isInViewport(t.parentEl,1)&&(t.play(),window.removeEventListener("scroll",e))};window.addEventListener("scroll",e),e()}},a.prototype.getStatus=function(){return 0===this.currentFrame?"start":this.currentFrame===this.frameLength?"end":"progress"},a.prototype.reset=function(){return this.setFrameProgress(0)},a.prototype.finish=function(){return this.setFrameProgress(1)},a.prototype.setFrameProgress=function(t){return t=Math.min(1,Math.max(0,t)),this.currentFrame=Math.round(this.frameLength*t),this.trace(),this},a.prototype.play=function(t,e){if(this.instanceCallback=null,t&&"function"==typeof t)this.instanceCallback=t,t=null;else if(t&&"number"!=typeof t)throw new Error("Vivus [play]: invalid speed");return e&&"function"==typeof e&&!this.instanceCallback&&(this.instanceCallback=e),this.speed=t||1,this.handle||this.drawer(),this},a.prototype.stop=function(){return this.handle&&(l(this.handle),this.handle=null),this},a.prototype.destroy=function(){this.stop();var t,e;for(t=0;t<this.map.length;t++)(e=this.map[t]).el.style.strokeDashoffset=null,e.el.style.strokeDasharray=null,this.renderPath(t)},a.prototype.isInvisible=function(t){var e,n=t.getAttribute("data-ignore");return null!==n?"false"!==n:!!this.ignoreInvisible&&(!(e=t.getBoundingClientRect()).width&&!e.height)},a.prototype.parseAttr=function(t){var e,n={};if(t&&t.attributes)for(var r=0;r<t.attributes.length;r++)n[(e=t.attributes[r]).name]=e.value;return n},a.prototype.isInViewport=function(t,e){var n=this.scrollY(),r=n+this.getViewportH(),i=t.getBoundingClientRect(),a=i.height,o=n+i.top,s=o+a;return e=e||0,o+a*e<=r&&s>=n},a.prototype.getViewportH=function(){var t=this.docElem.clientHeight,e=window.innerHeight;return t<e?e:t},a.prototype.scrollY=function(){return window.pageYOffset||this.docElem.scrollTop},o=function(){a.prototype.docElem||(a.prototype.docElem=window.document.documentElement,s=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)},l=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame||function(t){return window.clearTimeout(t)})},u=function(t,e){var n=parseInt(t,10);return n>=0?n:e},r=[],void 0!==(i=function(){return a}.apply(e,r))&&(t.exports=i)}()},function(t,e,n){"use strict";var r=function(t){return t&&t.__esModule?t:{default:t}}(n(0));window.addEventListener("load",function(){var t=document.querySelector(".part-1"),e=document.querySelector(".part-2"),n=document.querySelector(".part-3"),i=document.querySelector(".part-4"),a=document.querySelector(".part-5"),o=document.querySelector(".part-6"),s=document.querySelectorAll(".background"),l=document.querySelector(".title"),u=document.querySelector(".description"),h=document.querySelector(".slogans");setTimeout(function(){h.classList.add("show")},500),setTimeout(function(){h.classList.add("animate")},600);var c={animation:new r.default(a,{type:"oneByOne",duration:230,animTimingFunction:r.default.EASE},function(){o.classList.add("show")}),play:function(){c.animation.play()}},d={animation:new r.default(i,{type:"oneByOne",duration:200,animTimingFunction:r.default.EASE}),play:function(){d.animation.play()}},p={animation:new r.default(n,{type:"oneByOne",duration:80,animTimingFunction:r.default.EASE},d.play),play:function(){p.animation.play()}},m={animation:new r.default(e,{type:"oneByOne",duration:180,animTimingFunction:r.default.EASE},c.play),play:function(){m.animation.play(),p.animation.play()}};({animation:new r.default(t,{type:"oneByOne",duration:100,animTimingFunction:r.default.EASE},m.play)}).animation.play(),document.body.classList.add("show"),setTimeout(function(){document.body.classList.add("showContent"),h.classList.add("hide"),s[0].classList.add("show"),s[1].classList.add("show"),setTimeout(function(){l.classList.add("show"),u.classList.add("show")},500)},5500)});var i=document.documentElement.clientHeight;alert(i),document.querySelector(".down").style.top=i-40+"px"}]);