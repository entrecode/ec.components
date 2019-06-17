---
id: loaders
title: Loaders
sidebar_label: Loaders
---

Loaders indicate active change happening. They are used by most components by default. Like notifications, you need to place a default loader somewhere on your page:

```html
<ec-loader class="ec-loader ec-loader_global"></ec-loader>
```

The available classes can be found [here](https://github.com/entrecode/ec.components/tree/master/packages/style/scss/ec-loader).

## Show global loader

To show the loader when you are doing something by yourself, you can use the loaderService:

```ts
import { LoaderService } from '@ec.components/ui';

class AppComponent {
  constructor(loader: LoaderService) {}

  showLoader() {
    const loadBreadTopping = BreadAPI.loadToppings();
    this.loader.wait(loadBreadTopping); // pass promise to wait
  }
}
```

The important thing is that you need to pass a [Promise](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Promise) to the wait method. The loader will be visible whenever a promise is not resolved yet. This is better than a "showLoader" because it can be in async concurrency. 

## Show local loader

You could also pass a specific loader to the wait method:

```html
<ec-loader class="ec-loader" #myLoader></ec-loader>
```

```ts
import { LoaderService } from '@ec.components/ui';

class AppComponent {

  @ViewChild('myLoader') myLoader: LoaderComponent; 
  constructor(loader: LoaderService) {}

  showLoader() {
    const loadBreadTopping = BreadAPI.loadToppings();
    this.loader.wait(loadBreadTopping, this.myLoader);
  }
}
```

This will show your local loader. It can be helpful to show a local loader to keep the rest of the app clickable (not overlayed by a global loader).

## Components that use loaders

- login
- login-form
- signup-form
- password-reset
- signup
- entries
- entry
- resource-delete-pop
- crud
- entry-form
- upload
- resource-list
- history.service
- form