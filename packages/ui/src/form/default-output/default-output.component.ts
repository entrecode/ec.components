import { Component } from '@angular/core';
import { Field } from '../../../../core/src/field/field';
import { Item } from '../../../../core/src/item/item';

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
