import { Component } from '@angular/core';
import { Field } from '../../core/field/field';
import { Item } from '../../core/item/item';

/** This component holds the input templates for all field types that can not be represented by the default input template. */
@Component({
  selector: 'ec-default-entry-input',
  templateUrl: './default-entry-input.component.html',
})
export class DefaultEntryInputComponent {
  /** The field for which the input is meant. */
  field: Field<any>;
  /** The item that is targeted by the input */
  item: Item<any>;
}
