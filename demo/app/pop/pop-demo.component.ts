import { Component, ViewChild } from '@angular/core';
import { PopComponent } from '@ec.components/ui/src/pop/pop.component';

@Component({
  selector: 'ec-pop-demo',
  templateUrl: './pop-demo.component.html',
})
export class PopDemoComponent {
  private popClass: string;
  @ViewChild('pop') pop: PopComponent;

  constructor() {
  }

  open(popClass: string = 'fullscreen') {
    this.popClass = popClass;
    this.pop.show();
  }
}
