import { Component } from '@angular/core';
import { Field } from '../../core/field/field';

@Component({
  selector: 'ec-default-entry-input',
  templateUrl: './default-entry-input.component.html',
})
export class DefaultEntryInputComponent {
  field: Field<any>;

  constructor() {
  }

  ngOnChanges() {
  }
}
