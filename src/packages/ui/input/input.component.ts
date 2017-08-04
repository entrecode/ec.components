import { Component, Input, } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { Field } from '../../core/field/field';
import { Item } from '../../core/item/item';
import { DynamicFieldComponent } from '../dynamic-field/dynamic-field.component';
import { DefaultInputComponent } from './default-input.component';

// import { CustomFieldComponent } from './custom-field.component';

/** This directive can be used to display a field. It is used inside ec-form as well as ec-list. */
@Component({
  selector: 'ec-input',
  templateUrl: './input.component.html',
})
export class InputComponent extends DynamicFieldComponent {
  /** The instance of field that should be used in the template */
  @Input() field: Field<any>;
  /** The property name for which the field stands for*/
  @Input() property: string;
  /** The type for which the field stands for */
  @Input() type: string;
  /** The type for which the field stands for */
  @Input() view: string;
  /** The belonging form group */
  @Input() group: FormGroup;
  /** The belonging item */
  @Input() item: Item<any>;

  ngOnChanges() {
    if (this.field && this.group) {
      const componentRef = this.loadComponent(this.field.input || DefaultInputComponent);
      componentRef.instance.field = this.field;
      componentRef.instance.group = this.group;
      componentRef.instance.item = this.item;
    }
  }
}
