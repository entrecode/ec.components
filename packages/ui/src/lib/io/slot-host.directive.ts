import { Directive, ViewContainerRef } from '@angular/core';

/** The field host is a helper to load components inside its view container.
 * see https://angular.io/guide/dynamic-component-loader
 * */
@Directive({
  selector: '[ecSlotHost]',
})
export class SlotHostDirective {
  /** The constructor exposes the viewContainer that is used to load components into from outside.*/
  constructor(public viewContainerRef: ViewContainerRef) {}
}
