# @ec.components/ui

WARNING: This version is currently experimental as it's part of the x.ui 10 update.

This package contains all angular components that have no ec.datamanager references.
It utilizes the classes of the @ec.components/core package.
Being the middle layer in the abstraction tree, it is still backend agnostic but not framework agnostic.

## Overview

- [Module Overview Page](https://entrecode.github.io/ec.components/modules/UiModule.html)
- [CHANGELOG](https://entrecode.github.io/ec.components/additional-documentation/changelog/ui-changelog.html)

## Installation

### 1. Install package

```sh
npm install @ec.components/ui --save
```

### 2. Add Module

```js
import { UiModule } from '@ec.components/ui';

@NgModule({
  imports: [
    UiModule
  ]
})
export class AppModule {
}
```