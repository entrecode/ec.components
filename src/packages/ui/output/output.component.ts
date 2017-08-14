import { Component, } from '@angular/core';
import { DefaultOutputComponent } from './default-output.component';
import { DynamicFieldComponent } from '../dynamic-field/dynamic-field.component';

/** Outputs the given field of the given item, rendering the component dynamically. */
@Component({
  selector: 'ec-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent extends DynamicFieldComponent {

  /** The component is loade as soon as the field and item are known.
   * If the field has no output property set, the DefaultOutputComponent will be rendered. */
  ngOnChanges() {
    if (this.field && this.item) {
      this.loadComponent(this.field.output || DefaultOutputComponent);
    }
  }
}
