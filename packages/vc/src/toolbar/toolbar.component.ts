import { Component, HostListener, Input } from '@angular/core';
import { EditorComponent } from '../editor/editor.component';

@Component({
  selector: 'ec-vc-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  blockEvent(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    return false;
  }

  @Input() editor: EditorComponent;

  @HostListener('click', ['$event'])
  click(e: any) {
    return this.blockEvent(e);
  }

  @HostListener('focusout', ['$event'])
  focusOut(e: any) {
    return this.blockEvent(e);
  }

  constructor() {
  }

  ngOnChanges() {
    // console.log('instance', this.editor);

  }

}
