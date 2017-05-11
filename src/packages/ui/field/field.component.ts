import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
/** This component can be used to define a custom template for a field (e.g. a list field or a form field).
 * You can either use the property or the type input as a kind of selector to define when the
 * template should be applied. */
@Component({
  selector: 'ec-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent {
  /** The property name for which the field stands for*/
  @Input() property: string;
  /** The type for which the field stands for */
  @Input() type: string;
  /** The field template. It will be defined if the ec-field tags contain an ng-template. */
  @ContentChild(TemplateRef) template: any;
}
