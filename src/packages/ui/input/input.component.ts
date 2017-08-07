import { Component, Input } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { DynamicFieldComponent } from '../dynamic-field/dynamic-field.component';
import { DefaultInputComponent } from './default-input.component';

// import { CustomFieldComponent } from './custom-field.component';

/** This directive can be used to display a field. It is used inside ec-form as well as ec-list. */
@Component({
  selector: 'ec-input',
  templateUrl: './input.component.html',
})
export class InputComponent extends DynamicFieldComponent {
  /** The belonging form group */
  @Input() group: FormGroup;

  ngOnChanges() {
    if (this.field && this.group) {
      const componentRef = this.loadComponent(this.field.input || DefaultInputComponent);
      componentRef.instance.field = this.field;
      componentRef.instance.group = this.group;
    }
  }
}
