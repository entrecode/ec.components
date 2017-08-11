import { Component } from '@angular/core';
import { Field } from '../../core/field/field';

@Component({
  selector: 'ec-default-entry-output',
  templateUrl: './default-entry-output.component.html',
})
export class DefaultEntryOutputComponent {
  field: Field<any>;
}
