import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Field } from '../../core/field/field';
import { Item } from '../../core/item/item';

/** This component holds the templates for all basic field types. */
@Component({
  templateUrl: './default-input.component.html',
})
export class DefaultInputComponent {
  /** The field for which the input is meant. */
  protected field: Field<any>;
  /** The item that is targeted by the input */
  protected item: Item<any>;
  /** The form group that is used */
  protected group: FormGroup;
  /** The form control that is used */
  protected control: FormControl;
}
