---
id: routes
sidebar_label: Routes
title: Adding Routes
---

This short tutorial demonstrates how to quickly generate routes with components.
In the following tutorials, refer to this when you are called to create a new route.

## 1. Create Component

Generate a new component

```sh
ng generate component muffins
```

Add template to _src/app/muffins/muffins.component.html_

```html
<ec-crud model="muffin"></ec-crud>
```

## 2. Add a Route

_src/app/app-routing.module.ts_:

```js
import { MuffinsComponent } from './muffins/muffins.component';

const routes: Routes = [
  {
    path: '',
    children: []
  },
  {
    path: 'muffins',
    component: MuffinsComponent
  }
];
```

## 3. Run the Route

Now you can access the muffin crud at https://localhost:4200/muffins