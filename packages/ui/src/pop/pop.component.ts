/**
 * Created by felix on 26.05.17.
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';

/** A Pop is an area of content whose visibility can be toggled.
 * It can be used e.g as dialog, drawer or dialog.*/
@Component({
  selector: 'ec-pop',
  templateUrl: './pop.component.html',
  styleUrls: ['./pop.component.scss']
})
export class PopComponent {
  /** If true, .ec-pop is part of the DOM (*ngIf) + .active is set on .ec-pop-container.  */
  @Input() active: boolean;
  /** If true, .visible is set on .ec-pop-container.  */
  @Input() visible: boolean;
  /** Emits the value of visible on change. */
  @Output('toggle') _toggle: EventEmitter<boolean> = new EventEmitter();
  /** The amount of time between setting active and visible. Defaults to 0. */
  delay = 0;

  /** Shows if not visible, hides if visible. */
  public toggle(visible: boolean = !this.visible, emit: boolean = false) {
    if (!visible) {
      this.hide();
    } else {
      this.show();
    }
    if (emit) {
      this._toggle.emit(visible);
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
    if (!this.delay) {
      return;
    }
    setTimeout(() => {
      this.active = false;
    }, this.delay);
  }
}