/**
 * Created by felix on 26.05.17.
 */
import { Component, EventEmitter, Input, Output, HostBinding, OnInit, HostListener, ElementRef } from '@angular/core';
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
  /** If set to true, the pop will hide when a click happens outside the pop. */
  @Input() hideOnClickOutside = false;
  // tslint:disable-next-line:no-output-rename
  @Output('toggle') _toggle: EventEmitter<boolean> = new EventEmitter();

  clickEvent;

  /** Listens for document:click and hides */
  @HostListener('document:click', ['$event']) clickedOutside($event) {
    if (
      this.hideOnClickOutside &&
      this.active &&
      $event !== this.clickEvent && // to ensure the show event wont hide immediately
      this.elementRef &&
      !this.elementRef.nativeElement.contains($event.target)) {
      this.hide();
    }
  }

  constructor(protected popService: PopService, public elementRef: ElementRef) {
  }

  /** Shows if not active, hides if active. */ // active: boolean = !this.active, emit: boolean = false
  public toggle(e?) {
    if (this.active) {
      this.hide();
    } else {
      this.show(e);
    }
    this._toggle.emit(this.active);
  }

  /** Shows the pop. Sets active true and adds pop to popService.stack */
  public show(e?) {
    this.active = true;
    this.popService.stack.add(this);
    if (e) {
      this.clickEvent = e;
    } else if (this.hideOnClickOutside) {
      console.error('To show a pop with hideOnClickOutside = true, you need to pass the click event to the show method!');
    }
  }

  /** Hides the pop. Sets active false and removes pop from popService.stack */
  public hide() {
    this.popService.stack.remove(this);
    this.active = false;
  }
}
