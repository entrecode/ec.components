import { Component } from '@angular/core';
import { Field, Item } from '@ec.components/core';

/** Holds the templates to output item field values. */
@Component({
  selector: 'ec-default-output',
  templateUrl: './default-output.component.html',
})
export class DefaultOutputComponent {
  /** The field that should be displayed */
  field: Field;
  /** The item that is targeted by the input */
  item: Item<any>;
}
