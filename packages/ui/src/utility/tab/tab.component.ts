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
  @Input() route: string;
  @Output() activated: EventEmitter<void> = new EventEmitter();
  @Output() deactivated: EventEmitter<void> = new EventEmitter();

  parent: TabsComponent;

  /** The constructor adds the tab itself to its TabsComponent parent. */

  constructor(public el: ElementRef) {
  }

  /** Returns true if the tab is currently selected. */
  isSelected() {
    return this.parent && this.parent.isSelected(this);
  }
}
