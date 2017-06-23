import { Component } from '@angular/core';
import { mocked } from '../../mocks/data';

@Component({
  selector: 'ec-form-demo',
  templateUrl: './form-demo.component.html',
})
export class FormDemoComponent {
  private mocked = mocked;

  constructor() {
  }
}
