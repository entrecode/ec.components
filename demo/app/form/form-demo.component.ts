import { Component } from '@angular/core';
import { mocked } from '../../../mocks/data';
import { Item } from '@ec.components/core';

@Component({
  selector: 'ec-form-demo',
  templateUrl: './form-demo.component.html',
})
export class FormDemoComponent {
  tree: Item<any>;
  public mocked = mocked;

  constructor() {
    this.tree = mocked.lists.trees.id(0);
  }

  logValue(form) {
    console.log('form value', form.value);
  }
}
