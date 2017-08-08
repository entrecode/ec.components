import { Component, ComponentFactoryResolver, Input, Type, ViewChild } from '@angular/core';
import { FieldHostDirective } from './field-host.directive';
import { Item } from '../../core/item/item';
import { Field } from '../../core/field/field';

// import { CustomFieldComponent } from './custom-field.component';

/** This directive can be used to display a field. It is used inside ec-form as well as ec-list. */
@Component({
  // selector: 'ec-dynamic-field',
  templateUrl: './dynamic-field.component.html'
})
export class DynamicFieldComponent {
  /** The FieldHostDirective will  be used to nest custom components into the field */
  @ViewChild(FieldHostDirective) fieldHost: FieldHostDirective;
  /** The instance of field that should be used in the template */
  @Input() field: Field<any>;
  /** The belonging item */
  @Input() item: Item<any>;

  /** The constructor provides the instance of ViewContainerRef which is later used to create embedded views*/
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  loadComponent(component: Type<any>) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    let viewContainerRef = this.fieldHost.viewContainerRef;
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);
    //custom field component is the component each custom field should inherit
    componentRef.instance.item = this.item;
    return componentRef;
  }
}
