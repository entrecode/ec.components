# @ec.components/location

This package wraps the [angular-google-maps](https://github.com/SebastianM/angular-google-maps) to be suitable for forms.

## Installation

### 1. Install package

```sh
npm install @ec.components/location --save
```

### 2. Add Module

```js
import { LocationModule } from '@ec.components/location';

@NgModule({
  imports: [
    LocationModule
  ]
})
export class AppModule {
}
```

### 3. Use it as default input for location fields

```ts
  constructor(private typeConfig: TypeConfigService) {
    this.typeConfig.set('location', {
      input: LocationPickerComponent
    });
```

## Overview

All available components/services are listed on the [Module Overview Page](https://entrecode.github.io/ec.components/modules/LocationModule.html).