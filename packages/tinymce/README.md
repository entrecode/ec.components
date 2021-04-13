# @ec.components/tinymce

This package wraps the [tinymce editor](https://github.com/tinymce/tinymce) as an Angular Component.

## Overview

- [Module Overview Page](https://entrecode.github.io/ec.components/modules/TinymceModule.html)
- [CHANGELOG](https://entrecode.github.io/ec.components/additional-documentation/changelog/tinymce-changelog.html)

## Installation

### 1. Install package

```sh
npm install @ec.components/tinymce --save
```

### 2. Add Module

```js
import { TinymceModule } from '@ec.components/tinymce';

@NgModule({
  imports: [TinymceModule],
})
export class AppModule {}
```

### 3. Add styles files to angular.json

```json
"styles": [
  "node_modules/tinymce/skins/lightgray/skin.min.css",
  "node_modules/tinymce/skins/lightgray/content.min.css"
],
```

### 4. Use it

```html
<ec-tinymce [(ngModel)]="html" (change)="change($event)"></ec-tinymce>
```
