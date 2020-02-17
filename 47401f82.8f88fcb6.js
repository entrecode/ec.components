(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{116:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return r})),n.d(t,"rightToc",(function(){return i})),n.d(t,"default",(function(){return d}));var a=n(1),o=(n(0),n(179));const r={id:"add-new-package",title:"Adding a new Package in 10 easy steps",sidebar_label:"Adding Packages"},i=[{value:"1. Run CLI command to generate a new library",id:"1-run-cli-command-to-generate-a-new-library",children:[]},{value:"2. Prefix packages/data/package.json#name with @ec.components",id:"2-prefix-packagesdatapackagejsonname-with-eccomponents",children:[]},{value:'3. Prefix root tsconfig.json paths "data" and "data/*" with @ec.components',id:"3-prefix-root-tsconfigjson-paths-data-and-data-with-eccomponents",children:[]},{value:"4. Move src files to packages/data/lib",id:"4-move-src-files-to-packagesdatalib",children:[]},{value:"5. add dependencies (e.g. ec.sdk) to both root and lib package.json",id:"5-add-dependencies-eg-ecsdk-to-both-root-and-lib-packagejson",children:[]},{value:"6. add whitelistedNonPeerDependencies and dest to ng-package.json",id:"6-add-whitelistednonpeerdependencies-and-dest-to-ng-packagejson",children:[]},{value:"7. fix relative imports",id:"7-fix-relative-imports",children:[]},{value:"8. fix rxjs imports",id:"8-fix-rxjs-imports",children:[]},{value:"9. fix other lint errors like semicolon stuff",id:"9-fix-other-lint-errors-like-semicolon-stuff",children:[]},{value:"build it",id:"build-it",children:[]},{value:"run yarn to link dist/data to node_modules",id:"run-yarn-to-link-distdata-to-node_modules",children:[]},{value:"10. add dependency to root package.json",id:"10-add-dependency-to-root-packagejson",children:[]},{value:"11. add CHANGELOG.md of package to summary.json (like others)",id:"11-add-changelogmd-of-package-to-summaryjson-like-others",children:[]},{value:"11. add link to package changelog page to CHANGELOG.md (like others)",id:"11-add-link-to-package-changelog-page-to-changelogmd-like-others",children:[]}],c={rightToc:i};function d({components:e,...t}){return Object(o.b)("wrapper",Object(a.a)({},c,t,{components:e,mdxType:"MDXLayout"}),Object(o.b)("p",null,'The following steps need to be done to generate a new library that is standards compliant.\nJust replace the example name "data" with the new package name.'),Object(o.b)("h2",{id:"1-run-cli-command-to-generate-a-new-library"},"1. Run CLI command to generate a new library"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-sh"}),"ng generate library data -p ec\n")),Object(o.b)("p",null,"This will create a new folder under packages/ (see newProjectRoot in angular.json)."),Object(o.b)("h2",{id:"2-prefix-packagesdatapackagejsonname-with-eccomponents"},"2. Prefix packages/data/package.json#name with @ec.components"),Object(o.b)("p",null,"also make sure the version is correct"),Object(o.b)("h2",{id:"3-prefix-root-tsconfigjson-paths-data-and-data-with-eccomponents"},'3. Prefix root tsconfig.json paths "data" and "data/*" with @ec.components'),Object(o.b)("p",null,'also change value to "packages/data/dist/*"'),Object(o.b)("h2",{id:"4-move-src-files-to-packagesdatalib"},"4. Move src files to packages/data/lib"),Object(o.b)("h2",{id:"5-add-dependencies-eg-ecsdk-to-both-root-and-lib-packagejson"},"5. add dependencies (e.g. ec.sdk) to both root and lib package.json"),Object(o.b)("h2",{id:"6-add-whitelistednonpeerdependencies-and-dest-to-ng-packagejson"},"6. add whitelistedNonPeerDependencies and dest to ng-package.json"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-json"}),'  "dest": "./dist",\n  "whitelistedNonPeerDependencies": [\n    "."\n  ]\n')),Object(o.b)("h2",{id:"7-fix-relative-imports"},"7. fix relative imports"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"import { Notification } from '../../../../ui/src/notifications/notification';\nimport { WithNotifications } from '../../../../ui/src/notifications/with-notifications.interface';\n// replace with\nimport { WithNotifications, Notification } from '@ec.components/ui';\n")),Object(o.b)("h2",{id:"8-fix-rxjs-imports"},"8. fix rxjs imports"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"import { Subject } from 'rxjs/Subject';\n// to\nimport { Subject } from 'rxjs';\n")),Object(o.b)("h2",{id:"9-fix-other-lint-errors-like-semicolon-stuff"},"9. fix other lint errors like semicolon stuff"),Object(o.b)("h2",{id:"build-it"},"build it"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-sh"}),"ng build data\n")),Object(o.b)("h2",{id:"run-yarn-to-link-distdata-to-node_modules"},"run yarn to link dist/data to node_modules"),Object(o.b)("h2",{id:"10-add-dependency-to-root-packagejson"},"10. add dependency to root package.json"),Object(o.b)("h2",{id:"11-add-changelogmd-of-package-to-summaryjson-like-others"},"11. add CHANGELOG.md of package to summary.json (like others)"),Object(o.b)("h2",{id:"11-add-link-to-package-changelog-page-to-changelogmd-like-others"},"11. add link to package changelog page to CHANGELOG.md (like others)"))}d.isMDXComponent=!0},179:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return g}));var a=n(0),o=n.n(a);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=o.a.createContext({}),l=function(e){var t=o.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):c({},t,{},e)),n},p=function(e){var t=l(e.components);return o.a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},b=Object(a.forwardRef)((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,i=e.parentName,s=d(e,["components","mdxType","originalType","parentName"]),p=l(n),b=a,g=p["".concat(i,".").concat(b)]||p[b]||u[b]||r;return n?o.a.createElement(g,c({ref:t},s,{components:n})):o.a.createElement(g,c({ref:t},s))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=b;var c={};for(var d in t)hasOwnProperty.call(t,d)&&(c[d]=t[d]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var s=2;s<r;s++)i[s]=n[s];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);