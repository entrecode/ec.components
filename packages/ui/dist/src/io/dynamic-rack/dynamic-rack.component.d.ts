import { ComponentFactoryResolver } from '@angular/core';
/** This directive can be used to display a field. It is used inside ec-form as well as ec-list. */
export declare class DynamicRackComponent {
    private componentFactoryResolver;
    /** The constructor provides the instance of ViewContainerRef which is later used to create embedded views*/
    constructor(componentFactoryResolver: ComponentFactoryResolver);
}
