!function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/digi-demo/dist/",n(n.s=12)}([function(e,t,n){"use strict";function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){return toString.call(e)},c={stringTag:o(""),objectTag:o({}),arrayTag:o([]),numberTag:o(1),functionTag:o(toString),undefinedTag:o(void 0),nullTag:o(null)},i=c.objectTag,l=c.arrayTag,s=function e(t){var n,a=o(t);if(a!==l&&a!==i)return t;for(var c in n=a===i?Object.assign({},t):r(t))n[c]=e(n[c]);return n},u=function(e,t){for(var n in e)if(e.hasOwnProperty(n)&&!1===t(e[n],n))break},d=function(e,t){o(e)===l?function(e,t){for(var n=0;n<e.length&&!1!==t(e[n],n);n++);}(e,t):u(e,t)},f=function(e){return a(e)},p={tofObjectTag:f({})},h={},m=function(e,t,n){var a="is"+t[0].toUpperCase()+t.replace(/^.|Tag$/g,"");h[a]=function(t){return n(t)===e},Object.defineProperty(h[a],"name",{value:a})};u(c,function(e,t){return m(e,t,o)}),u(p,function(e,t){return m(e,t,f)});var g=h.isString,v=h.isObject,b=h.isTofObject,y=h.isFunction,x=h.isArray,w=h.isNumber,N=h.isUndefined,$=h.isNull,O=/[\u005b\u005d]/g,S=/\.{2,}/g,j=/^\.|\.$/g,E=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.join(".").replace(O,".").replace(S,".").replace(j,"")},k=function(e){return e.replace(O,".").replace(S,".").replace(j,"").split(".")},P=function(e,t){g(t)&&(t=[t]);var n={};return d(t,function(t){e.hasOwnProperty(t)&&(n[t]=e[t])}),n},C=function(e,t,n){g(t)&&(t=k(t));var a=e,r=t.pop();d(t,function(e){N(a[e])&&(a[e]={}),a=a[e]}),a[r]=n},T=JSON.stringify({}),D=function(e){return!(x(e)&&e.length>0)&&(!v(e)||T===JSON.stringify(e))},V=Object.freeze({cloneDeep:s,forEach:d,isString:g,isObject:v,isTofObject:b,isFunction:y,isArray:x,isNumber:w,isUndefined:N,isNull:$,pathJoin:E,pathSplit:k,pick:P,set:C,isEmpty:D}),A={},_=function e(t,n){x(t)?e(t[0],t[1]):v(t)?(A[t.property]=t.handler,t.options&&n&&Object.assign(t.options,n)):(window.console.error("plugins Error: ",t),window.console.log("View document: https://digi1874.github.io/digi-doc/1.0.1/global.html#plugins"))},I=function(e){return d(e,function(e){return _(e)})},R={};window.watchs=R;var U=function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];R[e]||(R[e]=[],Object.defineProperties(R[e],{newVal:{writable:!0},oldVal:{writable:!0}})),t&&-1===R[e].indexOf(t)&&(R[e].push(t),n&&t(R[e].newVal,R[e].oldVal))},F={},M=function e(t){var n=[];return d(t,function(e){return x(e)?n.push(e):n.push([e])}),F[++e.id]=n,e.id};Object.defineProperty(M,"id",{value:0,writable:!0});var W=function(e){var t=F[e];return delete F[e],t},J=function(e,t){return F[e]=t},L=function e(t,n){var a={get:function(e,t){return e[t]},set:function(t,a,r){var o=t[a];if(JSON.stringify(r)===JSON.stringify(o))return!0;var c=E(n,a);if(function e(t,n,a){!R[t]&&U(t),n=s(n),a=s(a),R[t].newVal=n,R[t].oldVal=a,d(R[t],function(e){return e(n,a)}),b(a)&&toString.call(n)!==toString.call(a)&&d(a,function(n,a){return e(E(t,a),void 0,n)})}(c,r,o),v(r))v(o)||(t[a]=e({},c)),d(t[a],(e,n)=>{r.hasOwnProperty(n)||(t[a][n]=void 0,delete t[a][n])}),d(r,function(e,n){return t[a][n]=e});else if(x(r)){x(o)||(t[a]=e([],c));for(let e=r.length;e<t[a].length;e++)t[a][e]=void 0,delete t[a][e];d(r,function(e,n){return t[a][n]=e})}else t[a]=r;return!0}};return new Proxy(t,a)},B=function e(t){var n=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).watch,a=++e.id,r=L({},a);return d(t,function(e,t){return r[t]=e}),d(n,function(e,t){return U(E(a,t),e,!1)}),Object.defineProperty(r,"$tp",{value:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];if(0===n.length)return"{{".concat(e,"}}");var r=M(n);return"{{".concat(e,"|").concat(r,"}}")}.apply(void 0,[E(a,e)].concat(n))}}),r};Object.defineProperty(B,"id",{value:0,writable:!0});var K=function(e,t,n){var a=e;d(t,function(e){d(e.tp,function(t){var n,o=e.val;t.filterId&&d((n=t.filterId,F[n]),function(e){var t=(e=r(e))[0];e[0]=o,o=t.apply(void 0,r(e))});var c=o;b(c)?c=JSON.stringify(c):N(c)||$(c)?c="":Object.is(c,NaN)&&(c=0),a=a.replace(t.RE,c),""!==c&&a===c+""&&(a=o)})}),n(a)},z=function(e,t,n,a,r){var o={},c=[],i={};d(a,function(e,i){o[i]=function(o){e.val=o,K(n,a,function(e){return r(e,t)})},d(e.tp,function(e){return e.filterId&&c.push(e.filterId)})});var l=e.$removeWatch;e.$removeWatch=function(){d(o,function(e,t){return a=e,void(-1!==(r=R[n=t].indexOf(a))&&R[n].splice(r,1));var n,a,r}),l&&l()};var s=e.$addWatch;e.$addWatch=function(){d(o,function(e,t){return U(t,e)}),s&&s()};var u=e.$removeFilter;e.$removeFilter=function(){d(c,function(e){return i[e]=W(e)||i[e]}),u&&u()};var f=e.$restoreFilter;e.$restoreFilter=function(){d(i,function(e,t){return J(t,e)}),f&&f()}},X=/{{(([\s\S]+?)(?:\|([0-9]+))?)}}/g,Y=function e(t,n,a,r){if(v(a)||x(a))d(a,function(a,o){return e(t,E(n,o),a,r)});else{r(a,n);var o={},c="";do{if(null!==(c=X.exec(a))){var i=c[1],l=c[2];o[l]||(o[l]={val:"",tp:{}}),o[l].tp[i]||(o[l].tp[i]={RE:RegExp(c[0].replace("|","\\|"),"g"),filterId:c[3]})}}while(null!==c);!D(o)&&z(t,n,a,o,r)}},q=function(e){var t=!1;Object.defineProperty(e,"$isUpdate",{get:function(){return t},set:function(n){n!==t&&(n&&e.parentNode&&e.parentNode.$isUpdate?(t=n,function(e){e.$restoreFilter&&e.$restoreFilter(),e.$addWatch&&e.$addWatch(),d(e.childNodes,function(e){return e.$isUpdate=!0})}(e)):n||(t=n,function(e){e.$removeWatch&&e.$removeWatch(),e.$removeFilter&&e.$removeFilter(),d(e.childNodes,function(e){return e.$isUpdate=!1})}(e)))}})},G=function(e){var t=document.createTextNode(e);return Y(t,"nodeValue",e,function(e){return t.nodeValue=e}),q(t),t},H=/^text[0-9]*$/,Q=/^child[0-9]*$/,Z=function e(t){if((g(t)||N(t))&&(t={tagName:t}),!v(t))return window.console.error("createElement Error: ",t),void window.console.log("View document: https://digi1874.github.io/digi-doc/1.0.1/global.html#digi");var n=document.createElement(t.tagName||"div");return delete(t=s(t)).tagName,d(t,function(t,a){if(Q.test(a))if(x(t))d(t,function(t){var a=e(t);a&&n.appendChild(a)});else{var r=e(t);r&&n.appendChild(r)}else if(H.test(a)){var o=G(t);o&&n.appendChild(o)}else Y(n,a,t,function(e,r){A.hasOwnProperty(a)?(t=function(e,t,n,a){return b(e)&&t!==n?(C(e,n.replace(t+".",""),a),e):a}(t,a,r,e),A[a](n,t,r,e)):C(n,r,e)})}),q(n),n},ee=function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e.el;if(x(t))d(t,function(e){var t=Z(e);t&&n.appendChild(t)});else{var a=Z(t);a&&n.appendChild(a)}};Object.defineProperties(ee,{el:{value:document.getElementById("digi")||document.body},createElement:{value:Z},createTextNode:{value:G},utils:{value:{}},createData:{value:B},plugins:{value:I}}),d(V,function(e,t){Object.defineProperty(ee.utils,t,{value:e,enumerable:!0})}),ee.el.$isUpdate=!0,document.body.$isUpdate=!0,new MutationObserver(function(e){d(e,function(e){d(e.removedNodes,function(e){e.$isUpdate=!1}),d(e.addedNodes,function(e){e.$isUpdate=!0})})}).observe(document.body,{childList:!0,subtree:!0}),t.default=ee,t.createElement=Z,t.createTextNode=G,t.createData=B,t.plugins=I,t.cloneDeep=s,t.forEach=d,t.isString=g,t.isObject=v,t.isTofObject=b,t.isFunction=y,t.isArray=x,t.isNumber=w,t.isUndefined=N,t.isNull=$,t.pathJoin=E,t.pathSplit=k,t.pick=P,t.set=C,t.isEmpty=D},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={},r=0,o=toString.call([]);Object.defineProperties(a,{property:{value:"ref"},handler:{value:function(e,t){a[t]?(toString.call(a[t])!==o&&(a[t]=[a[t]]),a[t].push(e)):a[t]=e,e.oldRemove=e.remove,e.remove=function(){toString.call(a[t])!==o?delete a[t]:(a[t].splice(a[t].indexOf(e),1),0===a[t].length&&delete a[t]),e.oldRemove()}}},allotId:{value:function(){return r++}}});var c=a.allotId;t.allotId=c,t.default=a},function(e,t,n){"use strict";function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}Object.defineProperty(t,"__esModule",{value:!0});var o=toString.call([]),c=function(e){var t=[];for(var n in e){if(e.hasOwnProperty(n))e[n]&&t.push(n)}return t},i=new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n,i;return t=e,(n=[{key:"handler",value:function(e,t){if("object"!==a(t))e.className=t;else{var n=[];n=toString.call(t)===o?[].concat(n).concat(function(e){for(var t=[],n=0;n<e.length;n++){var r=e[n];"object"!==a(r)?r&&t.push(r):toString.call(r)===o?r[1]&&t.push(r[0]):t=[].concat(t).concat(c(r))}return t}(t)):[].concat(n).concat(c(t)),e.className=n.join(" ")}}},{key:"property",get:function(){return"className"}}])&&r(t.prototype,n),i&&r(t,i),e}());t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=toString.call([]),r=toString.call(/./),o=toString.call(""),c=toString.call({});var i=document.createElement("a"),l=/([^&=?]+)=([^&=]+)/g,s=["hash","host","hostname","href","origin","pathname","protocol","search"],u=function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);var r=toString.call(t);if(r===o)i.href=t;else{if(r!==c)throw new TypeError(t);t=Object.assign({},t),i.href=t.href||document.location.href,delete t.href,t.params&&(t.search?t.search+="&":t.search="?",Object.keys(t.params).forEach(function(e){t.search+="".concat(e,"=").concat(t.params[e],"&")}),t.search.replace(/[&]$/,"")),Object.keys(t).forEach(function(e){i[e]=t[e]})}i.pathname=i.pathname.replace(/\/$/,""),s.forEach(function(e){n[e]=i[e]});for(var u={},d=l.exec(i.search);null!==d;){var f=d[1],p=d[2],h=u[f];h?(toString.call(h)!==a&&(h=[h]),h.push(p)):h=p,u[f]=h,d=l.exec(i.search)}this.params=u,this.path=i.pathname+i.search+i.hash},d={},f={},p=/\u003a[^\u002f]+/g,h=new u(window.location.href),m=function(e){h=e;var t=!1;Object.keys(f).forEach(function(n){var a=f[n],r=a.RE.exec(e.pathname);if(r&&!t){for(var o=1;o<r.length;o++)e.params[a.paramKeys[o]]=r[o];!function(e,t){d[e]&&d[e].forEach(function(e){return e(t)})}(n,e),function(e){e.el.forEach(function(t,n){"none"===t.style.display&&(t.style.display=e.showElDisplay[n])})}(a),t=!0}else!function(e){e.el.forEach(function(t,n){"none"!==t.style.display&&(e.showElDisplay[n]=t.style.display,t.style.display="none")})}(a)})},g={};Object.defineProperties(g,{property:{value:"path"},handler:{value:function(e,t){var n,a=t;c===toString.call(t)&&(a=t.pathname,n=t.watch),toString.call(a)===r&&(a=a.source.replace(/(^\^)|(\$$)/g,"").replace(/\\([^\\])/g,"$1")),n&&function(e,t){d[e]=d[e]||[],-1===d[e].indexOf(t)&&d[e].push(t)}(a,n),function(e,t){var n=f[e];n||((n={el:[],showElDisplay:[]}).RE=new RegExp("^"+e.replace(p,"([^/]+)")+"$"),n.execArray=n.RE.exec(e),n.execArray&&n.execArray.length>1&&(n.paramKeys=[],n.execArray.forEach(function(e){return n.paramKeys.push(e.replace(/^:/,""))})),f[e]=n),-1===n.el.indexOf(t)&&(n.el.push(t),n.showElDisplay.push(t.style.display)),m(h)}(a,e);var o=e.remove;e.remove=function(){n&&function(e,t){var n=d[e].indexOf(t);-1!==n&&d[e].splice(n,1)}(a,n),function(e,t){var n=f[e].el,a=n.indexOf(t);-1!==a&&(n.splice(a,1),f[e].showElDisplay.splice(a,1))}(a,e),o.call(e)}}}}),window.addEventListener("popstate",function(){return m(new u(window.location.href))});var v=function(e){e=new u(e),m(e),window.history.pushState(e,"",e.href)},b=function(e){e=new u(e),m(e),window.history.pushState(e,"",e.href)},y=document.createElement("a").tagName,x={};Object.defineProperties(x,{property:{value:"to"},handler:{value:function(e,t){e.tagName===y&&(e.href=new u(t).href);var n=toString.call(t);e.addEventListener("click",function(e){e.preventDefault(),n===c&&t.replace?b(t):v(t)})}}});var w=[g,x];Object.defineProperties(w,{push:{value:v},replace:{value:b},Location:{value:u},currentLocation:{get:function(){return h}}}),t.default=w},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);n(4);var a=n(0),r=n.n(a),o=n(1),c=n.n(o),i=n(2),l=n.n(i),s=n(3),u=n.n(s);const d=Object(a.createData)({newVal:"",oldVal:123}),f=Object(a.createData)({a:123},{watch:{a:(e,t)=>{d.newVal=e,d.oldVal=t}}});var p=[{tagName:"h3",text:"绑定数据"},{text:f.$tp("a")},{text:"单向绑定：",child:{tagName:"input",value:f.a,oninput(){f.a=this.value}}},{text:"双向绑定：",child:{tagName:"input",value:f.$tp("a"),oninput(){f.a=this.value}}},{text:`新值：${d.$tp("newVal")}，旧值：${d.$tp("oldVal")}`},{child:[{tagName:"button",text:"添加显示",onclick(){r()({text:"点击删除："+f.$tp("a"),onclick(e){e.stopPropagation(),this.remove()}},this.parentNode)}}]}];const h=Object(a.createData)({a:"2019-01-01"});var m=[{tagName:"h3",text:"过滤器"},{tagName:"input",type:"date",value:h.a,oninput(){h.a=this.value}},{text:h.$tp("a",e=>e+" 0:00:",e=>e+"00")},{text:h.$tp("a",[(e,t,n,a)=>e.replace("-",t).replace("-",n)+a,"年","月","日"])}];const g=Object(a.createData)({select:""});var v=[{tagName:"h3",text:"选择"},{tagName:"select",onchange(){g.select=this.value},child:[{tagName:"option",value:"",text:"选择"},{tagName:"option",value:1,text:"选择1"},{tagName:"option",value:2,text:"选择2"}]},{text:"选择了："+g.$tp("select")}];const b=Object(a.createData)({color:{r:0,g:0,b:0,a:1}});var y=[{tagName:"h3",text:"颜色"},{style:{width:"200px",height:"100px",backgroundColor:`rgba(${b.$tp("color.r")}, ${b.$tp("color.g")}, ${b.$tp("color.b")}, ${b.$tp("color.a")})`}},{text:"r: ",child:{tagName:"input",type:"number",min:0,max:255,value:b.$tp("color.r"),oninput(){b.color.r=this.value}}},{text:"g: ",child:{tagName:"input",type:"number",min:0,max:255,value:b.$tp("color.g"),oninput(){b.color.g=this.value}}},{text:"b: ",child:{tagName:"input",type:"number",min:0,max:255,value:b.$tp("color.b"),oninput(){b.color.b=this.value}}},{text:"a: ",child:{tagName:"input",type:"number",min:0,max:1,step:.01,value:b.$tp("color.a"),oninput(){b.color.a=this.value}}}];const x=Object(o.allotId)();var w=[{tagName:"h3",text:"ref标记元素"},{tagName:"input",oninput(){c.a[x].innerText="输入内容："+this.value}},{ref:x,innerText:"输入内容："}];const N=Object(a.createData)({hide:!1});var $=[{tagName:"h3",text:"className"},{className:"red",text:"字符串className: 'red'"},{text:`className: { hide: ${N.$tp("hide")} }`},{tagName:"button",text:"点击"+N.$tp("hide",e=>e?"show":"hide"),onclick:()=>N.hide=!N.hide},{className:{hide:N.$tp("hide")},text:`对象值className: { hide: ${N.$tp("hide")} }`},{className:[{hide:N.$tp("hide")},"red"],text:`数组+对象值className: [{ hide: ${N.$tp("hide")} }, 'red']`},{className:["red",["hide",N.$tp("hide")]],text:`数组+数组值className: ['red', ['hide', ${N.$tp("hide")}]]`}];const O=document.createElement("style");O.type="text/css";var S=e=>{const t=O.cloneNode(),n=document.createTextNode(e);t.appendChild(n),document.head.appendChild(t)};n(5),n(6);const j="ripple",E=document.createElement("div");E.className="ripple-effect";class k{constructor({color:e}={}){this.className=j,this.onclick=function(t){const n=E.cloneNode();n.style.top=t.offsetY-50+"px",n.style.left=t.offsetX-50+"px",n.style.backgroundColor=e||"#000000",this.appendChild(n),setTimeout(()=>n.remove(),1e3)}}}const P=(e,{back:t,white:n}={})=>{if(!/^#[0-9a-f]{6}$/.test(e))throw new TypeError(e);return(parseInt(e.replace("#",""),16)>>8&255)>204?t||"#333333":n||"#ffffff"},C=(e,t)=>((e,t)=>{if(!/^#[0-9a-f]{6}$/.test(e))throw new TypeError(e);e=e.slice(1);let n=parseInt(e,16),a=(n>>16)+t;a>255?a=255:a<0&&(a=0);let r=(n>>8&255)+t;r>255?r=255:r<0&&(r=0);let o=(255&n)+t;return o>255?o=255:o<0&&(o=0),(16777216+(a<<16|r<<8|o)).toString(16).replace(/1/,"#")})(e,-t),T="btn";let D="#333333";const V=[];class A{constructor({color:e,backgroundColor:t,disabled:n}={}){if(this.tagName="button",n)this.className=[T],this.disabled=!0;else{e=!e&&t?P(t):e||D;let n=`${T}-text-${e.replace("#","")}`,a=e+"14";t&&(n+=t.replace("#",""),a=C(t,20)),-1===V.indexOf(n)&&(V.push(n),S(`\n          .${n} {\n            color            : ${e};\n            background-color : ${t||"transparent"};\n          }\n          .${n}:hover {\n            background-color: ${a};\n          }`)),this.className=[T,n],this.child=new k({color:e})}}}const _=[];class I extends A{constructor({color:e,backgroundColor:t,borderColor:n,disabled:a}={}){if(super({color:e,backgroundColor:t,disabled:a}),a)this.className=[...this.className,`${T}-border-disabled`];else{e=e||(t?"#ffffff":"#333333");let a=`${T}-border-`;if(a+=t?t.replace("#",""):e.replace("#",""),-1===_.indexOf(a)){_.push(a);let r="transparent";"transparent"!==(n=n||t||e)&&(n+="88",r=t||e),S(`\n          .${a} {\n            border: 1px solid ${n};\n          }\n          .${a}:hover {\n            border-color: ${r};\n          }`)}this.className=[...this.className,a]}}}n(7);n(8);const R=toString.call([]),U=toString.call({}),F="badge",M=[];n(9);const W=[],J="navigation";const L=(e,...t)=>(toString.call(e)!==R&&(e=e?[e]:[]),t.forEach(t=>{toString.call(t)===R?e.concat(e):t&&e.push(t)}),e);class B{constructor(e){toString.call(e)===U?Object.keys(e).forEach(t=>{this[t]=e[t]}):this.child=e}}n(10);const K="card";n(11);const z="modal",X=z+"-scroll",Y=Object(a.createData)();r.a.plugins([c.a,l.a,...u.a]);const q={tagName:"hr",style:{margin:"20px 0"}},G=[{id:0,title:"标题1",content:"内容1"},{id:1,title:"标题2",content:"内容2"}],H={tagName:"ul",child:[]};Object(a.forEach)(G,e=>H.child.push({tagName:"li",child:{to:"/list/"+e.id,text:e.title,tagName:"a"}})),H.child.push({tagName:"li",child:{to:"/list/404",text:"已不存在的文章",tagName:"a"}});const Q=new class extends B{constructor(e){super(e),this.scroll=!this.fullScreen&&"modal"===this.scroll,this.className=L([z,[X,this.scroll],[z+"-show",Y.$tp("value")],[z+"-hide",Y.$tp("value",e=>!1===e)]],this.className),this.onclick=(()=>this.value=!1),this.child={className:[z+"-content",[z+"-content-height",!this.scroll&&!this.fullScreen],[z+"-content-fullscreen",this.fullScreen]],onclick:e=>e.stopPropagation(),child:[this.head,{child:this.body,className:[[X,!this.scroll],[z+"-content-fullscreen-body",this.fullScreen]]},this.footer]},delete this.head,delete this.body,delete this.footer,delete this.scroll,delete this.fullScreen}get value(){return Y.value}set value(e){Y.value=!!e,document.body.style.overflow=e?"hidden":""}}({head:{child:{...new I({backgroundColor:"#ffbbff"}),text:"关闭",onclick:()=>Q.value=!1},text:"title",style:{backgroundColor:"#2196f3"}},body:{innerText:"content\ncontent\ncontent\ncontentt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\n\ncontent\ncontent\ncontent",style:{padding:"20px",minWidth:"200px"}},footer:{child:[{...new I({backgroundColor:"#ffbbff"}),text:"取消",onclick:()=>Q.value=!1},{...new I({backgroundColor:"#abcdef"}),text:"确定",onclick:()=>Q.value=!1}],style:{backgroundColor:"#2196f3"}},scroll:"modal"}),Z=Object(a.createData)();window.data=Z,r()([{to:"/",text:"首页",tagName:"a",style:{marginRight:"20px"}},{to:"/ui",text:"ui",tagName:"a",style:{marginRight:"20px"}},{to:"/list",text:"文章列表",tagName:"a",style:{marginRight:"20px"}},{path:"/list/:id",text:Z.$tp("detail.title"),tagName:"span"},q,{path:"/",child:[...p,q,...m,q,...v,q,...y,q,...w,q,...$,q]},{path:"/ui",child:[{...new I,text:"Default"},{...new I({color:"#2196f3"}),text:"Primary"},{...new I({backgroundColor:"#ffbbff",disabled:!0}),text:"Primary"},{...new I({backgroundColor:"#141414"}),text:"Primary"},{...new A({disabled:!0}),text:"TextButton"},{...new class extends A{constructor({color:e,backgroundColor:t,disabled:n}={}){super({color:e,backgroundColor:t=t||"#e0e0e0",disabled:n}),this.className=n?[...this.className,T+"-background-disabled"]:[...this.className,T+"-shadow"]}},text:"ContainedButton"},new class{constructor({text:e,backgroundColor:t,color:n,child:a}={}){t=t||"#e10050",n=n||P(t);const r=`${F}-${n.replace("#","")}${t.replace("#","")}`;-1===M.indexOf(r)&&(M.push(r),S(`\n        .${r} {\n          color            : ${n};\n          background-color : ${t};\n        }`)),a=a||[],toString.call(a)!==R&&(a=[a]),a.push({className:[F,r],text:e}),this.className="badge-content",this.child=a}}({text:4,child:{...new I,text:"Default"}}),q,new class{constructor({child:e,color:t,activeColor:n,onChange:r}={}){if(toString.call(e)!==R)throw new TypeError("Navigation params error:"+JSON.stringify(e));const o=Object(a.createData)();let c=0;n=n||"#2196f3";const i=`${J}-${(t=t||"#333333").replace("#","")}`;(e=[...e]).forEach((t,a)=>{"object"!=typeof t&&(t={text:t}),t={...t,color:n};const l=new A(t);t.child=t.child||[],toString.call(t.child)!==R&&(t.child=[t.child]),t.child=[].concat(l.child).concat(t.child),t.className=t.className||[],toString.call(t.className)!==R&&(t.className=[t.className]);const s=[].concat(l.className).concat([J+"-item",i]).concat(t.className),u=[].concat(l.className).concat([J+"-item"]).concat(t.className);t.active?(o[a]=u,c=a):o[a]=s;for(const e in t)l[e]=t[e];l.className=o.$tp(a),l.onclick=(e=>{c!==a&&(o[c]=s,o[a]=u,c=a,r&&r({index:c,name:t.name,event:e}))}),e[a]=l}),-1===W.indexOf(i)&&(W.push(i),S(`\n        .${i} {\n          color: ${t};\n        }`)),this.child=e,this.className=[J]}}({child:["home",{text:"news",active:!0,child:{text:"news"}},"user"],color:"#ff0000",activeColor:"#00ff00",onChange:e=>console.log(e)}),q,new class extends B{constructor(e){super(e),this.className=L([K],this.className)}}({className:Z.$tp("className"),style:{width:"320px"},child:[{style:{background:"url(http://www.wcwahlj.com/upload/image/20171228/20171228135441_7552.jpg)",backgroundSize:"cover",width:"320px",height:"180px"}},{text:"小猫"}]}),q,{text:"Modal"},{...new I,text:"open Modal",onclick:()=>Q.value=!Q.value},Q]},{path:"/list",child:H},{path:{pathname:"/list/:id",watch:({params:e})=>Z.detail=G[e.id]},tagName:"a",child:{text:Z.$tp("detail.content",e=>e||"文章已被外星生物销毁了")}},{path:/.+/,text:"404"}])}]);