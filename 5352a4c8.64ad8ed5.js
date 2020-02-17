(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{118:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"rightToc",(function(){return a})),n.d(t,"default",(function(){return l}));var c=n(1),r=(n(0),n(179));const o={id:"crud",title:"CRUD",sidebar_label:"Crud"},a=[{value:"Basic Example",id:"basic-example",children:[]},{value:"Used Components",id:"used-components",children:[]},{value:"Outputs",id:"outputs",children:[{value:"columnClicked",id:"columnclicked",children:[]}]},{value:"Inputs",id:"inputs",children:[{value:"config",id:"config",children:[]},{value:"config.methods",id:"configmethods",children:[]},{value:"config.createLabel",id:"configcreatelabel",children:[]},{value:"config.fields",id:"configfields",children:[]}]}],i={rightToc:a};function l({components:e,...t}){return Object(r.b)("wrapper",Object(c.a)({},i,t,{components:e,mdxType:"MDXLayout"}),Object(r.b)("p",null,'The CrudComponent (CRUD stands for Create Read Update Delete) is like the meta component that combines most of the other components. By just passing a model name, it renders a list of the model entries (Read). Pressing the "+" button opens a modal to add new entries (Create). Clicking a row in the list opens a modal to modify (Edit) or remove (Delete) entries.'),Object(r.b)("h2",{id:"basic-example"},"Basic Example"),Object(r.b)("pre",null,Object(r.b)("code",Object(c.a)({parentName:"pre"},{className:"language-html"}),'<ec-crud model="muffin"></ec-crud>\n')),Object(r.b)("h2",{id:"used-components"},"Used Components"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",Object(c.a)({parentName:"li"},{href:"/docs/components/entry-list"}),"entry-list")," available as entryList property"),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",Object(c.a)({parentName:"li"},{href:"entry-pop"}),"entry-pop")," available as entryPop property")),Object(r.b)("h2",{id:"outputs"},"Outputs"),Object(r.b)("h3",{id:"columnclicked"},"columnClicked"),Object(r.b)("p",null,"The columnClicked Output will be emitted when an entry is clicked. You get an Item containing the clicked entry as ",Object(r.b)("em",{parentName:"p"},"$event"),":"),Object(r.b)("pre",null,Object(r.b)("code",Object(c.a)({parentName:"pre"},{className:"language-html"}),'<ec-crud model="muffin" (columnClicked)="clickedMuffin($event)"></ec-crud>\n')),Object(r.b)("p",null,"now you could e.g. navigate to a detail page:"),Object(r.b)("pre",null,Object(r.b)("code",Object(c.a)({parentName:"pre"},{className:"language-ts"}),"clickedMuffin(muffin: Item<EntryResource>) {\n  this.router.navigate(['muffin', muffin.id()]);\n}\n")),Object(r.b)("p",null,"See ",Object(r.b)("a",Object(c.a)({parentName:"p"},{href:"/docs/core-concepts/items"}),"Items")," for more info on the emitted object."),Object(r.b)("p",null,"If you do not use the columnClicked output, clicking an entry will open its edit form."),Object(r.b)("h2",{id:"inputs"},"Inputs"),Object(r.b)("h3",{id:"config"},"config"),Object(r.b)("pre",null,Object(r.b)("code",Object(c.a)({parentName:"pre"},{className:"language-html"}),'<ec-crud model="muffin" [config]="muffinCrudConfig"></ec-crud>\n')),Object(r.b)("p",null,"See "),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",Object(c.a)({parentName:"li"},{href:"../core-concepts/config-pipeline"}),"Config Pipeline")," for other ways to pass configuration."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",Object(c.a)({parentName:"li"},{href:"../core-concepts/form-options"}),"Form API")," for the options affecting the form."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",Object(c.a)({parentName:"li"},{href:"../core-concepts/list-options"}),"List API")," for the options affecting the list."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",Object(c.a)({parentName:"li"},{href:"entry-pop"}),"Entry Pop")," for the options affecting the entry-pop.")),Object(r.b)("h3",{id:"configmethods"},"config.methods"),Object(r.b)("p",null,"You can control the available actions by methods"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"post: Create"),Object(r.b)("li",{parentName:"ul"},"get: Read"),Object(r.b)("li",{parentName:"ul"},"put: Update"),Object(r.b)("li",{parentName:"ul"},"delete: Delete")),Object(r.b)("pre",null,Object(r.b)("code",Object(c.a)({parentName:"pre"},{className:"language-ts"}),"muffinCrudConfig = {\n  methods: ['get', 'put'],\n};\n")),Object(r.b)("p",null,"This will disable creating and deleting entries."),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Default Methods")),Object(r.b)("p",null,"By default, the crud component will respect the active users permissions, meaning a create button will only be visible if the user is allowed to create entries. The same goes for delete and save buttons. See ",Object(r.b)("a",Object(c.a)({parentName:"p"},{href:"/docs/core-concepts/accounts"}),"Accounts & Rights")," for more info. If you pass methods to the config, those will always be used."),Object(r.b)("h3",{id:"configcreatelabel"},"config.createLabel"),Object(r.b)("p",null,"Changes the Label of the create button"),Object(r.b)("h3",{id:"configfields"},"config.fields"),Object(r.b)("p",null,"See ",Object(r.b)("a",Object(c.a)({parentName:"p"},{href:"/docs/core-concepts/config-options"}),"Fields Config"),".\nThe fields option defines which fields should be visible, and how they should look. This will affect the list and form."))}l.isMDXComponent=!0},179:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return f}));var c=n(0),r=n.n(c);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);t&&(c=c.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,c)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,c,r=function(e,t){if(null==e)return{};var n,c,r={},o=Object.keys(e);for(c=0;c<o.length;c++)n=o[c],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(c=0;c<o.length;c++)n=o[c],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var b=r.a.createContext({}),u=function(e){var t=r.a.useContext(b),n=t;return e&&(n="function"==typeof e?e(t):i({},t,{},e)),n},p=function(e){var t=u(e.components);return r.a.createElement(b.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=Object(c.forwardRef)((function(e,t){var n=e.components,c=e.mdxType,o=e.originalType,a=e.parentName,b=l(e,["components","mdxType","originalType","parentName"]),p=u(n),d=c,f=p["".concat(a,".").concat(d)]||p[d]||s[d]||o;return n?r.a.createElement(f,i({ref:t},b,{components:n})):r.a.createElement(f,i({ref:t},b))}));function f(e,t){var n=arguments,c=t&&t.mdxType;if("string"==typeof e||c){var o=n.length,a=new Array(o);a[0]=d;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:c,a[1]=i;for(var b=2;b<o;b++)a[b]=n[b];return r.a.createElement.apply(null,a)}return r.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);