import { Component } from '@angular/core';
import { mocked } from '../../../mocks/data';

@Component({
  selector: 'ec-select-demo',
  templateUrl: './select-demo.component.html',
})
export class SelectDemoComponent {

  values = [];
  products = mocked.lists.products;

  constructor() {
    console.log('list', this.products);
  }

  log(x) {
    console.log(x)
  }
}
