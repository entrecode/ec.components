/**
 * Created by felix on 26.05.17.
 */
import { Component, EventEmitter, Input, Output, HostBinding } from '@angular/core';
import { PopService } from './pop.service';

/** A Pop is an area of content whose visibility can be toggled.
 * It can be used e.g as dialog, drawer or dialog.
 * <example-url>https://components.entrecode.de/ui/pop?e=1</example-url>
 * */
@Component({
  selector: 'ec-pop',
  templateUrl: './pop.component.html',
})
export class PopComponent {
  /** If true, .ec-pop is part of the DOM (*ngIf) + .active is set on .ec-pop-container.  */
  @Input() @HostBinding('class.is-active') active: boolean;
  /** If true, .visible is set on .ec-pop-container.  */
  @Input() visible: boolean;
  /** Emits the value of visible on change. */
  // tslint:disable-next-line:no-output-rename
  @Output('toggle') _toggle: EventEmitter<boolean> = new EventEmitter();

  constructor(protected popService: PopService) {
  }

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
    this.popService.stack.add(this);
    this.visible = true;
  }

  /** Hides the pop. First removes visible and after the delay it removes active. */
  public hide() {
    this.visible = false;
    this.popService.stack.remove(this);
    this.active = false;
  }
}
