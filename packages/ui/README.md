# @ec.components/ui

This package contains all angular components that have no ec.datamanager references.
It utilizes the classes of the @ec.components/core package.
Being the middle layer in the abstraction tree, it is still backend agnostic but not framework agnostic.

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

## Overview

All available components/services are listed on the [Module Overview Page](https://entrecode.github.io/ec.components/modules/UiModule.html).