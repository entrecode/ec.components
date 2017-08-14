import { Component } from '@angular/core';
import { Field } from '../../core/field/field';
import { Item } from '../../core/item/item';

/** This component holds the templates for all basic field types. */
@Component({
  selector: 'ec-default-input',
  templateUrl: './default-input.component.html',
})
export class DefaultInputComponent {
  /** The field for which the input is meant. */
  field: Field<any>;
  /** The item that is targeted by the input */
  item: Item<any>;
}
