import { Component, ComponentFactoryResolver } from '@angular/core';

// import { CustomFieldComponent } from './custom-field.component';

/** This directive can be used to display a field. It is used inside ec-form as well as ec-list. */
@Component({
  // selector: 'ec-dynamic-rack',
  templateUrl: './dynamic-rack.component.html',
})
export class DynamicRackComponent {
  /** The constructor provides the instance of ViewContainerRef which is later used to create embedded views*/
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
}
