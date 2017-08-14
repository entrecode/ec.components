/**
 * Created by felix on 26.05.17.
 */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ec-pop',
  templateUrl: './pop.component.html',
  styleUrls: ['./pop.component.scss']
})
/** A Pop is an area of content whose visibility can be toggled.
 * It can be used e.g as popup, modal or dropdown.*/
export class PopComponent {
  /** If true, .ec-pop is part of the DOM (*ngIf) + .active is set on .ec-pop-container.  */
  @Input() active: boolean;
  /** If true, .visible is set on .ec-pop-container.  */
  @Input() visible: boolean;
  /** The amount of time between setting active and visible. Defaults to 0. */
  delay: number = 0;

  /** Shows if not visible, hides if visible. */
  public toggle() {
    if (this.visible) {
      this.hide();
    } else {
      this.show();
    }
  }

  /** Shows the pop. First sets active and after the delay it sets visible. */
  public show() {
    this.active = true;
    setTimeout(() => {
      this.visible = true;
    }, this.delay);
  }

  /** Hides the pop. First removes visible and after the delay it removes active. */
  public hide() {
    this.visible = false;
    if (this.delay) {
      setTimeout(() => {
        this.active = false;
      }, this.delay);
    }
  }
}