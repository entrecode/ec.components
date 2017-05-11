import { Component, Input } from '@angular/core';
import { TabComponent } from '..';
import { Collection } from '../../core';
/** The TabsComponent holds serveral instances of TabComponent. */
@Component({
  selector: 'ec-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  private tabs: Collection<TabComponent>;
  /** You can set the initially selected tab by passing a TabComponent in (e.g. via #variable) */
  @Input() selected: TabComponent;

  /** The constructor inits the collection of tabs */
  constructor() {
    this.tabs = new Collection([]);
  }

  /** This method adds a new tab to the tabs collection and auto selects if it is the first. */
  add(tab: TabComponent) {
    this.tabs.add(tab);
    if (!this.selected) {
      this.selected = tab;
    }
  }
}
