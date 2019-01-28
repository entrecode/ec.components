# @ec.components/ace

This package wraps the [ace editor](https://github.com/ajaxorg/ace) as an Angular Component.

## Overview

- [Module Overview Page](https://entrecode.github.io/ec.components/modules/AceModule.html)
- [CHANGELOG](https://entrecode.github.io/ec.components/additional-documentation/changelog/ace-changelog.html)

## Installation

### 1. Install package

```sh
npm install @ec.components/ace --save
```

### 2. Add Module

```js
import { AceModule } from '@ec.components/ace';

@NgModule({
  imports: [
    AceModule
  ]
})
export class AppModule {
}
```

### 3. Add CDN

Either add the cdn src to your index.html:

```html
  <script src="//cdn.bootcss.com/ace/1.2.8/ace.js"></script>
````

Or import from ace-builds (in app.module):

```js
import 'ace-builds/src-noconflict/ace.js';
```

When importing, you also need to import all extensions/modes/themes that you want to use manually.

### 4. Use it

```html
 <ec-ace [(ngModel)]="html" mode="html"></ec-ace>
```