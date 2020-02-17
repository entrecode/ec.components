(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{107:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return c}));var r=n(1),a=(n(0),n(179));const i={title:"visual regression tests",author:"felixroos",authorURL:"https://github.com/felixroos",authorImageURL:"https://avatars2.githubusercontent.com/u/12023032?s=460&v=4"},s=[{value:"What",id:"what",children:[]},{value:"How",id:"how",children:[]}],o={rightToc:s};function c({components:e,...t}){return Object(a.b)("wrapper",Object(r.a)({},o,t,{components:e,mdxType:"MDXLayout"}),Object(a.b)("p",null,"ec.components now use visual regression testing"),Object(a.b)("h2",{id:"what"},"What"),Object(a.b)("p",null,"Using ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://pptr.dev/"}),"puppeteer")," with ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://www.npmjs.com/package/jest-image-snapshot"}),"jest-image-snapshot"),", the components are now able to track pixel differences via automated screenshots."),Object(a.b)("p",null,"The generated screenshots are then also used in the docs to always show the latest look!"),Object(a.b)("p",null,"The two tasks are new:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"test:screenshots")," takes new screenshots and compares them to the existing snapshots"),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"test:screenshots-update")," overrides snapshots with current state (without testing)")),Object(a.b)("h2",{id:"how"},"How"),Object(a.b)("p",null,"This is how its done:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"const puppeteer = require('puppeteer');\nconst { toMatchImageSnapshot } = require('jest-image-snapshot');\nexpect.extend({ toMatchImageSnapshot });\nconst fs = require('fs');\nconst testDir = '../website/static/img/screenshots';\n\nasync function takeAndCompareScreenshot(page, route, filePrefix) {\n  let fileName = filePrefix + '/' + (route ? route : 'index').replace('/', '--');\n  await page.goto(`https://127.0.0.1:1337/${route}?e=1`);\n  const filePath = `${testDir}/${fileName}.png`;\n  await page.screenshot({ path: filePath });\n  const img = fs.readFileSync(filePath);\n  expect(img).toMatchImageSnapshot({ customSnapshotsDir: './snapshots', customDiffDir: './diffs' });\n}\n\ndescribe('Screenshot test', function() {\n  let browser, page;\n  beforeAll(async () => {\n    if (!fs.existsSync(testDir)) fs.mkdirSync(testDir);\n    if (!fs.existsSync(`${testDir}/wide`)) fs.mkdirSync(`${testDir}/wide`);\n    if (!fs.existsSync(`${testDir}/narrow`)) fs.mkdirSync(`${testDir}/narrow`);\n    return true;\n  });\n\n  beforeEach(async function() {\n    browser = await puppeteer.launch({\n      ignoreHTTPSErrors: true,\n    });\n    page = await browser.newPage();\n  });\n\n  afterEach(() => browser.close());\n\n  describe('wide screen', function() {\n    beforeEach(async () => page.setViewport({ width: 800, height: 600 }));\n    it('/ui/icons', async () => takeAndCompareScreenshot(page, 'ui/icons', 'wide'));\n    it('/ui/list-basic', async () => takeAndCompareScreenshot(page, 'ui/list-basic', 'wide'));\n    it('/ui/list-transforms', async () => takeAndCompareScreenshot(page, 'ui/list-transforms', 'wide'));\n    it('/ui/list-pagination', async () => takeAndCompareScreenshot(page, 'ui/list-pagination', 'wide'));\n    it('/ui/form', async () => takeAndCompareScreenshot(page, 'ui/form', 'wide'));\n    it('/ui/select', async () => takeAndCompareScreenshot(page, 'ui/select', 'wide'));\n    it('/ui/datetime', async () => takeAndCompareScreenshot(page, 'ui/datetime', 'wide'));\n    it('/ui/login-form', async () => takeAndCompareScreenshot(page, 'ui/login-form', 'wide'));\n  });\n\n  describe('narrow screen', function() {\n    beforeEach(async () => page.setViewport({ width: 375, height: 667 }));\n    it('/ui/list-basic', async () => takeAndCompareScreenshot(page, 'ui/list-basic', 'narrow'));\n  });\n});\n")),Object(a.b)("p",null,"inspired by ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://meowni.ca/posts/2017-puppeteer-tests/"}),"Atomatic visual diffing with Puppeteer"),"."))}c.isMDXComponent=!0},179:function(e,t,n){"use strict";n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return b}));var r=n(0),a=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=a.a.createContext({}),u=function(e){var t=a.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o({},t,{},e)),n},l=function(e){var t=u(e.components);return a.a.createElement(p.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},h=Object(r.forwardRef)((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),l=u(n),h=r,b=l["".concat(s,".").concat(h)]||l[h]||f[h]||i;return n?a.a.createElement(b,o({ref:t},p,{components:n})):a.a.createElement(b,o({ref:t},p))}));function b(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,s=new Array(i);s[0]=h;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o.mdxType="string"==typeof e?e:r,s[1]=o;for(var p=2;p<i;p++)s[p]=n[p];return a.a.createElement.apply(null,s)}return a.a.createElement.apply(null,n)}h.displayName="MDXCreateElement"}}]);