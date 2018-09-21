/**
 * Created by felix on 26.05.17.
 */
import { Component, EventEmitter, Input, Output, HostBinding, OnInit } from '@angular/core';
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
  /** The used type on the host element */
  @Input() type: string;
  // tslint:disable-next-line:no-output-rename
  @Output('toggle') _toggle: EventEmitter<boolean> = new EventEmitter();

  constructor(protected popService: PopService) {
  }

  /** Shows if not active, hides if active. */
  public toggle(active: boolean = !this.active, emit: boolean = false) {
    if (!active) {
      this.hide();
    } else {
      this.show();
    }
    if (emit) {
      this._toggle.emit(active);
    }
  }

  /** Shows the pop. Sets active true and adds pop to popService.stack */
  public show() {
    this.active = true;
    this.popService.stack.add(this);
  }

  /** Hides the pop. Sets active false and removes pop from popService.stack */
  public hide() {
    this.popService.stack.remove(this);
    this.active = false;
  }
}
