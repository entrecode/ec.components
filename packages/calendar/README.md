# @ec.components/calendar

This package provides calendar and date components as part of [ec.components](https://github.com/entrecode/ec.components).

## Installation

### 1. Install package

```sh
npm install @ec.components/calendar --save
```

### 2. Add Module

```js
import { CalendarModule } from '@ec.components/calendar';

@NgModule({
  imports: [
    CalendarModule
  ]
})
export class AppModule {
}
```

### 3. Use it

```html
 <ec-calendar [(ngModel)]="html" mode="html"></ec-calendar>
```

## Overview

All available components/services are listed on the [Module Overview Page](https://entrecode.github.io/ec.components/modules/CalendarModule.html).