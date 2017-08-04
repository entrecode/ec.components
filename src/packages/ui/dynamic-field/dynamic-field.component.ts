import { Component, ComponentFactoryResolver, Type, ViewChild, } from '@angular/core';
import { FieldHostDirective } from './field-host.directive';

// import { CustomFieldComponent } from './custom-field.component';

/** This directive can be used to display a field. It is used inside ec-form as well as ec-list. */
@Component({
  // selector: 'ec-dynamic-field',
  templateUrl: './dynamic-field.component.html'
})
export class DynamicFieldComponent {
  /** The FieldHostDirective will  be used to nest custom components into the field */
  @ViewChild(FieldHostDirective) fieldHost: FieldHostDirective;

  /** The constructor provides the instance of ViewContainerRef which is later used to create embedded views*/
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  loadComponent(component: Type<any>) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    let viewContainerRef = this.fieldHost.viewContainerRef;
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);
    //custom field component is the component each custom field should inherit
    return componentRef;
  }
}
