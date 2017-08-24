import { Component, ComponentFactoryResolver, Type, ViewChild } from '@angular/core';
import { SlotHostDirective } from '../slot-host.directive';

// import { CustomFieldComponent } from './custom-field.component';

/** This directive can be used to display a field. It is used inside ec-form as well as ec-list. */
@Component({
  // selector: 'ec-dynamic-field',
  templateUrl: './dynamic-slot.component.html'
})
export class DynamicSlotComponent {
  /** The FieldHostDirective will  be used to nest custom components into the field */
  @ViewChild(SlotHostDirective) fieldHost: SlotHostDirective;

  /** The constructor provides the instance of ViewContainerRef which is later used to create embedded views*/
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  /** Loads the given component inside the fieldHost. Sets current item and field by default. */
  loadComponent(component: Type<any>, data: Object = {}) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const viewContainerRef = this.fieldHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    Object.assign(componentRef.instance, data);
    //custom field component is the component each custom field should inherit
    return componentRef;
  }
}
