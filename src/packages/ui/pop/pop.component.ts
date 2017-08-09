/**
 * Created by felix on 26.05.17.
 */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ec-pop',
  templateUrl: './pop.component.html',
  styleUrls: ['./pop.component.scss']
})
export class PopComponent {
  @Input() active: boolean;
  @Input() visible: boolean;
  delay: number = 0;

  constructor() {
  }

  public toggle() {
    if (this.visible) {
      this.hide();
    } else {
      this.show();
    }
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