import { Component } from '@angular/core';
import { mocked } from '../../mocks/data';
import { Item } from '../../packages/core/item/item';

@Component({
  selector: 'ec-form-demo',
  templateUrl: './form-demo.component.html',
})
export class FormDemoComponent {
  tree: Item<any>;
  private mocked = mocked;

  constructor() {
    this.tree = mocked.lists.trees.id(0);
  }

  submitTree(form) {
    console.log('tree value', form.value);
  }
}
