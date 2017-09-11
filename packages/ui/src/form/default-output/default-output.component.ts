import { Component } from '@angular/core';
import { Field } from '@ec.components/core/src/field/field';
import { Item } from '@ec.components/core/src/item/item';

/** Holds the templates to output item field values. */
@Component({
  selector: 'ec-default-output',
  styles: [require('./default-output.component.scss')],
  template: require('./default-output.component.html'),
})
export class DefaultOutputComponent {
  /** The field that should be displayed */
  field: Field<any>;
  /** The item that is targeted by the input */
  item: Item<any>;
}
