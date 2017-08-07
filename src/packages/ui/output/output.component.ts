import { Component, Input, } from '@angular/core';
import { DefaultOutputComponent } from './default-output.component';
import { DynamicFieldComponent } from '../dynamic-field/dynamic-field.component';

/** This component can be used to define a custom template for a field (e.g. a list field or a form field).
 * You can either use the property or the type input as a kind of selector to define when the
 * template should be applied. */
@Component({
  selector: 'ec-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent extends DynamicFieldComponent {
  /** The type for which the field stands for */
  @Input() view: string;

  ngOnChanges() {
    if (this.field && this.item) {
      const component = this.loadComponent(this.field.output || DefaultOutputComponent);
      component.instance.field = this.field;
    }
  }
}
