import { Component, ContentChild, Input, TemplateRef, } from '@angular/core';
import { Field } from '../../core/field/field';
import { DefaultOutputComponent } from './default-output.component';
import { Item } from '../../core/item/item';
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
  /** The instance of field that should be used in the template */
  @Input() field: Field<any>;
  /** The property name for which the field stands for*/
  @Input() property: string;
  /** The type for which the field stands for */
  @Input() type: string;
  /** The type for which the field stands for */
  @Input() view: string;
  /** The belonging form group */
  @Input() item: Item<any>;
  /** The field template. It will be defined if the ec-field tags contain an ng-template. */
  @ContentChild(TemplateRef) template: any;

  ngOnChanges() {
    if (this.field && this.item) {
      const component = this.loadComponent(this.field.output || DefaultOutputComponent);
      component.instance.item = this.item;
      component.instance.field = this.field;
    }
  }
}
