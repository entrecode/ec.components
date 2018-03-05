import { Component, HostListener, Input } from '@angular/core';
import { EditorComponent } from '../editor/editor.component';

/** ecvc toolbar containing editing tools. */
@Component({
  selector: 'ec-vc-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  /** The editor to control */
  @Input() editor: EditorComponent;
  /** host click */
  @HostListener('click', ['$event'])
  /** Blocks the incoming event from propagating. */
  blockEvent(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    return false;
  }
  /** blocks event on click */
  click(e: any) {
    return this.blockEvent(e);
  }
  /** Blocks event on focus out */
  @HostListener('focusout', ['$event'])
  focusOut(e: any) {
    return this.blockEvent(e);
  }
}
