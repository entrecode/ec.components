import { Injectable } from '@angular/core';
import { LoaderComponent } from './loader.component';

@Injectable()
export class LoaderService {
  wait(loader: LoaderComponent, promise: Promise<any>) {
    if (!loader || !promise) {
      return;
    }
    return loader.wait(promise);
  }
}