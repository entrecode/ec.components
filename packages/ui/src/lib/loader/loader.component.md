# Loader

The loader can be used to indicate any kind of loading activity

## Template

```html
<ec-loader #globalLoader class="ec-loader ec-loader_overlay ec-loader_global"></ec-loader>
<ec-loader #localLoader class="ec-loader"></ec-loader>
<button (click)="globalLoader()">Global Loader</button>
<button (click)="localLoader()">Local Loader</button>
```

The default classes [can be found here](https://github.com/entrecode/ec.components/blob/master/packages/style/loader/ec-loader.scss).

## Usage

You can use a global loader that handles every action or use multiple local loaders:

```ts
import { LoaderComponent, LoaderService } from '@ec.components/ui';
export class MyApp {
  @ViewChild('globalLoader') globalLoader: LoaderComponent;
  @ViewChild('localLoader') localLoader: LoaderComponent;
  constructor(private loaderService: LoaderService) {
      this.loaderService.use(this.globalLoader); // set global loader
  }
  globalLoader() { // When not passing a loader to .wait, the global loader (set by .use) is used.
    this.loaderService.wait(new Promise((resolve) => setTimeout(resolve, 2000)));
  }
  localLoader() {
    this.loaderService.wait(new Promise((resolve) => setTimeout(resolve, 2000)), this.localLoader);
    // this.localLoader.wait(new Promise((resolve) => setTimeout(resolve, 2000))); // alternative way
  }
}
```

The advantage of local loaders is that you can place them in specific places of your template to only "disable" a part of your site while loading and not the whole page.
See the commented out line in localLoader for a direct way to trigger a loader without the service.

# How it works

Each time .wait is called on the LoaderService, the target loader throws the given promise on a stack. When all promises on the stack have been resolved, the loader is hidden. This is better than just a boolean switch because multiple loading activies do not interfere with each other.