# @ec.components/core

This package contains all the core typescript classes.
It is the highest abstraction layer and is therefor framework and backend agnostic.
This means it contains no angular or ec.datamanager references.

## Overview

- [CHANGELOG](https://entrecode.github.io/ec.components/additional-documentation/changelog/core-changelog.html)
- [Available Classes](https://github.com/entrecode/ec.components/tree/master/packages/core/src/lib)

## Installation

```sh
npm i @ec.components/core
```

```ts
import { Item } from '@ec.components/core';
const primitive = new Item('a');
```