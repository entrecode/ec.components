import { Component } from '@angular/core';
import { Field } from '../../core/field/field';

@Component({
  selector: 'ec-default-output',
  templateUrl: './default-output.component.html',
})
export class DefaultOutputComponent {
  field: Field<any>;

  constructor() {
  }

  ngOnChanges() {
  }
}
