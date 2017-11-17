import { Component, EventEmitter, Input, Output, OnChanges, Type } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { DynamicSlotComponent } from '../dynamic-slot/dynamic-slot.component';
import { DefaultInputComponent } from '../../form/default-input/default-input.component';
import { Field } from '@ec.components/core/field/field';
import { Item } from '@ec.components/core/item/item';
import { Form } from '@ec.components/core/form/form';

/** This directive can be used to display a field. It is used inside ec-form as well as ec-list. */
@Component({
  selector: 'ec-input',
  templateUrl: '../dynamic-slot/dynamic-slot.component.html',
})
export class InputComponent extends DynamicSlotComponent implements OnChanges {
  /** The belonging form group */
  @Input() group: FormGroup;
  /** The belonging form control. This is not required if you pass in a field and group. */
  @Input() control: FormControl;
  /** The changed ouput emits whenever the form control of the input changes. */
  @Output() changed = new EventEmitter();
  /** Debounce time in ms before the changed event emits. */
  @Input() debounce = 0;
  /** The instance of field that should be used in the template, can also be a property name. */
  @Input() field: Field;
  /** The property name that is edited. Expects a form as item input */
  @Input() property: string;
  /** The belonging item */
  @Input() item: Item<any>;
  /** Overrides the default component */
  @Input() component: Type<any>;

  ngOnChanges() {
    if (this.property && this.item instanceof Form) {
      this.field = this.item.getField(this.property);
    }
    if (!this.field) {
      return;
    }
    const data = {
      group: this.group,
      control: this.control || this.group ? this.group.get(this.field.property) : null,
      item: this.item,
      field: this.field
    };

    const componentRef = this.loadComponent(this.component || this.field.input || DefaultInputComponent, data);
    if (componentRef.instance.control) {
      componentRef.instance.control.valueChanges
        .debounceTime(this.debounce)
        .subscribe((change) => {
          this.changed.emit(change);
        });
    }
  }
}
