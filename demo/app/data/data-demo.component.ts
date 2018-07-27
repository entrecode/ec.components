import { Component } from '@angular/core';
import { SdkService } from '../../../packages/data';

@Component({
  selector: 'ec-data-demo',
  templateUrl: './data-demo.component.html',
})
export class DataDemoComponent {
  constructor(public sdk: SdkService) {
  }

  changeEnv(env) {
    this.sdk.init(env);
  }
}
