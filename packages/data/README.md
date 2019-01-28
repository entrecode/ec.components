# @ec.components/data

This package contains all ec.datamanager related components.
Being wether framework agnostic nor backend agnostic, it is lowest fruit on the abstraction tree.
It extends the classes of the core module to create datamanager specific classes that are then used in the components.

## Overview

- [Module Overview Page](https://entrecode.github.io/ec.components/modules/DataModule.html)
- [CHANGELOG](https://entrecode.github.io/ec.components/additional-documentation/changelog/data-changelog.html)

## Installation

### 1. Install package

```sh
npm install @ec.components/data --save
```

### 2. Add Module

```js
import { DataModule } from '@ec.components/data';

@NgModule({
  imports: [
    DataModule
  ]
})
export class AppModule {
}
```