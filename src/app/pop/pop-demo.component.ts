import { Component, ViewChild } from '@angular/core';
import { PopComponent } from '@ec.components/ui';
import { mocked } from '../../mocks/data';

@Component({
  selector: 'ec-pop-demo',
  templateUrl: './pop-demo.component.html',
})
export class PopDemoComponent {
  private popClass: string;
  @ViewChild('pop', { static: false }) pop: PopComponent;

  constructor() {}

  open(popClass: string = 'fullscreen') {
    this.popClass = 'ec-pop_' + popClass;
    this.pop.show();
  }
}
