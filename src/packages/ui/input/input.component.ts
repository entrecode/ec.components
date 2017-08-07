import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { DynamicFieldComponent } from '../dynamic-field/dynamic-field.component';
import { DefaultInputComponent } from './default-input.component';

/** This directive can be used to display a field. It is used inside ec-form as well as ec-list. */
@Component({
  selector: 'ec-input',
  templateUrl: './input.component.html',
})
export class InputComponent extends DynamicFieldComponent {
  /** The belonging form group */
  @Input() group: FormGroup;
  /** The changed ouput emits whenever the form control of the input changes. */
  @Output() changed = new EventEmitter();

  ngOnChanges() {
    if (this.field && this.group) {
      const componentRef = this.loadComponent(this.field.input || DefaultInputComponent);
      componentRef.instance.field = this.field;
      componentRef.instance.group = this.group;
      componentRef.instance.control = this.group.get(this.field.property);

      if (componentRef.instance.control) {
        componentRef.instance.control.valueChanges
        .subscribe((change) => {
          this.changed.emit(change);
        });
      }
    }
  }
}
