# @ec.components/medium-editor

This package wraps the [medium-editor](https://github.com/yabwe/medium-editor) as an Angular Directive.

## Overview

- [Module Overview Page](https://entrecode.github.io/ec.components/modules/MediumEditorModule.html)
- [CHANGELOG](https://entrecode.github.io/ec.components/additional-documentation/changelog/medium-editor-changelog.html)

## Installation

### 1. Install package

```sh
npm install @ec.components/medium-editor --save
```

### 2. Add Module

```js
import { MediumModule } from '@ec.components/medium-editor';

@NgModule({
  imports: [MediumModule],
})
export class AppModule {}
```

### 3. Use it

```html
<ec-medium-editor
  [(model)]="myHTML"
  [options]="{'toolbar': {'buttons': ['bold', 'italic', 'underline', 'h1', 'h2', 'h3']}}"
></ec-medium-editor>
```
