import { ViewContainerRef } from '@angular/core';
/** The field host is a helper to load components inside its view container.
 * see https://angular.io/guide/dynamic-component-loader
 * */
export declare class SlotHostDirective {
    viewContainerRef: ViewContainerRef;
    /** The constructor exposes the viewContainer that is used to load components into from outside.*/
    constructor(viewContainerRef: ViewContainerRef);
}
