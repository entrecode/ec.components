(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{136:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return n})),r.d(t,"rightToc",(function(){return l})),r.d(t,"default",(function(){return i}));var a=r(1),o=(r(0),r(179));const n={id:"loaders",title:"Loaders",sidebar_label:"Loaders"},l=[{value:"Show global loader",id:"show-global-loader",children:[]},{value:"Show local loader",id:"show-local-loader",children:[]},{value:"Components that use loaders",id:"components-that-use-loaders",children:[]}],c={rightToc:l};function i({components:e,...t}){return Object(o.b)("wrapper",Object(a.a)({},c,t,{components:e,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Loaders indicate active change happening. They are used by most components by default. Like notifications, you need to place a default loader somewhere on your page:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-html"}),'<ec-loader class="ec-loader ec-loader_global"></ec-loader>\n')),Object(o.b)("p",null,"The available classes can be found ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/entrecode/ec.components/tree/master/packages/style/scss/ec-loader"}),"here"),"."),Object(o.b)("h2",{id:"show-global-loader"},"Show global loader"),Object(o.b)("p",null,"To show the loader when you are doing something by yourself, you can use the loaderService:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"import { LoaderService }\xa0from '@ec.components/ui';\n\nclass AppComponent {\n  constructor(loader: LoaderService) {}\n\n  showLoader() {\n    const loadBreadTopping = BreadAPI.loadToppings();\n    this.loader.wait(loadBreadTopping); // pass promise to wait\n  }\n}\n")),Object(o.b)("p",null,"The important thing is that you need to pass a ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Promise"}),"Promise"),' to the wait method. The loader will be visible whenever a promise is not resolved yet. This is better than a "showLoader" because it can be in async concurrency. '),Object(o.b)("h2",{id:"show-local-loader"},"Show local loader"),Object(o.b)("p",null,"You could also pass a specific loader to the wait method:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-html"}),'<ec-loader class="ec-loader" #myLoader></ec-loader>\n')),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"import { LoaderService }\xa0from '@ec.components/ui';\n\nclass AppComponent {\n\n  @ViewChild('myLoader') myLoader: LoaderComponent; \n  constructor(loader: LoaderService) {}\n\n  showLoader() {\n    const loadBreadTopping = BreadAPI.loadToppings();\n    this.loader.wait(loadBreadTopping, this.myLoader);\n  }\n}\n")),Object(o.b)("p",null,"This will show your local loader. It can be helpful to show a local loader to keep the rest of the app clickable (not overlayed by a global loader)."),Object(o.b)("h2",{id:"components-that-use-loaders"},"Components that use loaders"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"login"),Object(o.b)("li",{parentName:"ul"},"login-form"),Object(o.b)("li",{parentName:"ul"},"signup-form"),Object(o.b)("li",{parentName:"ul"},"password-reset"),Object(o.b)("li",{parentName:"ul"},"signup"),Object(o.b)("li",{parentName:"ul"},"entries"),Object(o.b)("li",{parentName:"ul"},"entry"),Object(o.b)("li",{parentName:"ul"},"resource-delete-pop"),Object(o.b)("li",{parentName:"ul"},"crud"),Object(o.b)("li",{parentName:"ul"},"entry-form"),Object(o.b)("li",{parentName:"ul"},"upload"),Object(o.b)("li",{parentName:"ul"},"resource-list"),Object(o.b)("li",{parentName:"ul"},"history.service"),Object(o.b)("li",{parentName:"ul"},"form")))}i.isMDXComponent=!0},179:function(e,t,r){"use strict";r.d(t,"a",(function(){return b})),r.d(t,"b",(function(){return m}));var a=r(0),o=r.n(a);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,a,o=function(e,t){if(null==e)return{};var r,a,o={},n=Object.keys(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var p=o.a.createContext({}),s=function(e){var t=o.a.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):c({},t,{},e)),r},b=function(e){var t=s(e.components);return o.a.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},d=Object(a.forwardRef)((function(e,t){var r=e.components,a=e.mdxType,n=e.originalType,l=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),b=s(r),d=a,m=b["".concat(l,".").concat(d)]||b[d]||u[d]||n;return r?o.a.createElement(m,c({ref:t},p,{components:r})):o.a.createElement(m,c({ref:t},p))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var n=r.length,l=new Array(n);l[0]=d;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:a,l[1]=c;for(var p=2;p<n;p++)l[p]=r[p];return o.a.createElement.apply(null,l)}return o.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"}}]);