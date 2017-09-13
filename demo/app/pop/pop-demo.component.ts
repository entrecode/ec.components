import { Component, ViewChild } from '@angular/core';
import { PopComponent } from '@ec.components/ui/src/pop/pop.component';
import { mocked } from '../../../mocks/data';

@Component({
  selector: 'ec-pop-demo',
  templateUrl: './pop-demo.component.html',
})
export class PopDemoComponent {
  private popClass: string;
  private markup = require('./pop.markup.html');
  @ViewChild('pop') pop: PopComponent;

  public listHeader = mocked.lists.pop_test;

  constructor() {
  }

  open(popClass: string = 'fullscreen') {
    this.popClass = 'ec-pop_' + popClass;
    this.pop.show();
  }
}
