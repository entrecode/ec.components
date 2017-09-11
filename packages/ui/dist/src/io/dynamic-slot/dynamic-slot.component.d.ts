import { ComponentFactoryResolver, ComponentRef, Type } from '@angular/core';
import { SlotHostDirective } from '../slot-host.directive';
/** This directive can be used to display a field. It is used inside ec-form as well as ec-list. */
export declare class DynamicSlotComponent {
    private componentFactoryResolver;
    /** The FieldHostDirective will  be used to nest custom components into the field */
    fieldHost: SlotHostDirective;
    /** The constructor provides the instance of ViewContainerRef which is later used to create embedded views*/
    constructor(componentFactoryResolver: ComponentFactoryResolver);
    /** Loads the given component inside the fieldHost. Sets current item and field by default. */
    loadComponent(component: Type<any>, data?: Object): ComponentRef<any>;
}
