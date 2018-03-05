import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { TabsComponent } from '../tabs/tabs.component';

/** A Tab is meant to be placed inside TabsComponent */
@Component({
  selector: 'ec-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {
  /** The tab's label */
  @Input() label: string;
  /** If set to true, the tab will be selected at start. */
  @Input() selected: boolean;
  /** If set, the tab will be selected when the given (relative) route is active. */
  @Input() route: string;
  /** Output that emits when the tab is activated */
  @Output() activated: EventEmitter<any> = new EventEmitter();
  /** Output that emits when the tab is deactivated */
  @Output() deactivated: EventEmitter<any> = new EventEmitter();
  /** The parent TabsComponent */
  parent: TabsComponent;

  /** The constructor adds the tab itself to its TabsComponent parent. */
  constructor(public el: ElementRef) {
  }
  /** Selects the tab and nexts activated */
  activate() {
    this.selected = true;
    this.activated.next();
  }
  /** Deselects the tab and nexts activated */
  deactivate() {
    this.selected = false;
    this.deactivated.next();
  }
}
