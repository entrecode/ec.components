import { Component, Input } from '@angular/core';

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

  /** The constructor adds the tab itself to its TabsComponent parent. */

  /*constructor(@Host() public parent: TabsComponent, private el: ElementRef) {
    parent.add(this); //TODO twist logic with ContentChildren
  }*/

  /** Returns true if the tab is currently selected. */
  isSelected() {
    // return this.parent.selected === this;
  }

  /** On init, the tab is selected if its selected attribute is set. It has to be done from here because it utilizes the element attribute directly. This makes it possible to just add <ec-tab selected>. */
  /*ngOnInit() {
    if (this.el.nativeElement.getAttribute('selected') !== null) {
      this.parent.selected = this;
    }
  }*/
}
