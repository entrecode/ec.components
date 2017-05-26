/**
 * Created by felix on 26.05.17.
 */
import { Component } from '@angular/core';

@Component({
  selector: 'ec-pop',
  templateUrl: './pop.component.html',
  styleUrls: ['./pop.component.scss']
})
export class PopComponent {
  active: boolean;
  visible: boolean;
  delay: number = 0;

  constructor() {
    console.log('pop constructed !');
  }

  public show() {
    this.active = true;
    setTimeout(() => {
      this.visible = true;
    }, this.delay);
  }

  public hide() {
    this.visible = false;
    if (this.delay) {
      setTimeout(() => {
        this.active = false;
      }, this.delay);
    }
  }
}