import { Component, ContentChild, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Field } from '../../core/field/field';
/** This component can be used to define a custom template for a field (e.g. a list field or a form field).
 * You can either use the property or the type input as a kind of selector to define when the
 * template should be applied. */
@Component({
  selector: 'ec-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent {
  /** The instance of field that should be used in the template */
  @Input() field: Field<any>;
  /** The property name for which the field stands for*/
  @Input() property: string;
  /** The type for which the field stands for */
  @Input() type: string;
  /** The type for which the field stands for */
  @Input() view: string;
  /** The field template. It will be defined if the ec-field tags contain an ng-template. */
  @ContentChild(TemplateRef) template: any;

  /** The constructor provides the instance of ViewContainerRef which is later used to create embedded views*/
  constructor(private viewRef: ViewContainerRef) {
  }

  /** This method returns true if the given instance of Field matches with */
  matches(field: Field<any>) {
    return this.template && ((field.view && this.view === field.view) || (field.property && this.property === field.property))
  }

  /** Clears the view and renders the given template with the given context into the view */
  renderTemplate(template: TemplateRef<any>, context = {}, index = 0) {
    if (!template) {
      return;
    }
    this.viewRef.clear();
    this.viewRef.element.nativeElement.innerHTML = '';
    this.viewRef.createEmbeddedView(template, context, index);
  }
}
