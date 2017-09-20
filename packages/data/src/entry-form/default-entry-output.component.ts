import { Component } from '@angular/core';
import { Field } from '@ec.components/core/src/field/field';

/** This component holds the templates for all output types that cannot be represented by the default output component. */
@Component({
  selector: 'ec-default-entry-output',
  templateUrl: './default-entry-output.component.html',
})
export class DefaultEntryOutputComponent {
  /** The field to output. */
  field: Field;
}
