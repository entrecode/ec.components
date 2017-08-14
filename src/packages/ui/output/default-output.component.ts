import { Component } from '@angular/core';
import { Field } from '../../core/field/field';

/** Holds the templates to output item field values. */
@Component({
  selector: 'ec-default-output',
  templateUrl: './default-output.component.html',
})
export class DefaultOutputComponent {
  /** The field that should be displayed */
  field: Field<any>;
}
