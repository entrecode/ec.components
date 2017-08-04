import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ec-field-host]',
})
export class FieldHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

