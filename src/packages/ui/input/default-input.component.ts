import { Component } from '@angular/core';
import { Field } from '../../core/field/field';

@Component({
  selector: 'ec-default-input',
  templateUrl: './default-input.component.html',
})
export class DefaultInputComponent {
  field: Field<any>;

  constructor() {
  }

  ngOnChanges() {
  }
}
