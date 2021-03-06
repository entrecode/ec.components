import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { DemoModule } from './app/demo.module';
import "@angular/compiler";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(DemoModule)
  .catch((err) => console.error(err));
