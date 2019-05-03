import { Component, ViewChild } from '@angular/core';
import { PopComponent } from '@ec.components/ui';

@Component({
  selector: 'ec-pop-trigger',
  template: `
    <h6>fullscreen</h6>
    <p><a (click)="open('fullscreen')" class="tag">.ec-pop_fullscreen</a></p>
    <h6>dialog</h6>
    <p><a (click)="open('dialog ec-pop_overlay')" class="tag">.ec-pop_dialog</a></p>
    <h6>drawer</h6>
    <p>
      <a (click)="open('drawer-left')" class="tag">.ec-pop_drawer-left</a>
      <a (click)="open('drawer-right')" class="tag">.ec-pop_drawer-right</a>
      <a (click)="open('drawer-top')" class="tag">.ec-pop_drawer-top</a>
      <a (click)="open('drawer-bottom')" class="tag">.ec-pop_drawer-bottom</a>
    </p>
    <h6>toast</h6>
    <p>
      <a (click)="open('toast-top')" class="tag">.ec-pop_toast-top</a>
      <a (click)="open('toast-bottom')" class="tag">.ec-pop_toast-bottom</a>
    </p>
    <ec-pop [ngClass]="popClass" #pop><ng-content></ng-content></ec-pop>
  `,
})
export class PopTriggerComponent {
  popClass: string;
  @ViewChild('pop') pop: PopComponent;

  constructor() {}

  open(popClass: string = 'fullscreen') {
    this.popClass = 'ec-pop_' + popClass;
    this.pop.show();
  }
}
