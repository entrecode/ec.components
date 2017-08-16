import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { DynamicSlotComponent } from '../dynamic-slot/dynamic-slot.component';
import { DefaultInputComponent } from './default-input.component';
import { Field } from '../../core/field/field';
import { Item } from '../../core/item/item';

/** This directive can be used to display a field. It is used inside ec-form as well as ec-list. */
@Component({
  selector: 'ec-input',
  templateUrl: '../dynamic-slot/dynamic-slot.component.html',
})
export class InputComponent extends DynamicSlotComponent {
  /** The belonging form group */
  @Input() group: FormGroup;
  /** The changed ouput emits whenever the form control of the input changes. */
  @Output() changed = new EventEmitter();
  /** Debounce time in ms before the changed event emits. */
  @Input() debounce: number = 0;
  /** The instance of field that should be used in the template */
  @Input() field: Field<any>;
  /** The belonging item */
  @Input() item: Item<any>;

  ngOnChanges() {
    if (this.field && this.group) {
      const data = {
        group: this.group,
        control: this.group.get(this.field.property),
        item: this.item,
        field: this.field
      };

      const componentRef = this.loadComponent(this.field.input || DefaultInputComponent, data);
      if (componentRef.instance.control) {
        componentRef.instance.control.valueChanges
        .debounceTime(this.debounce)
        .subscribe((change) => {
          this.changed.emit(change);
        });
      }
    }
  }
}
