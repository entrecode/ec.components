import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { TabComponent } from '../tab/tab.component';

class EventEmitter {
}

/** The TabsComponent holds serveral instances of TabComponent. */
@Component({
  selector: 'ec-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  constructor(private router: Router) {
  }

  /** You can set the initially selected tab by passing a TabComponent in (e.g. via #variable) */
  @Input() selected: TabComponent;

  ngAfterContentInit() {
    this.tabs.forEach((tab) => {
      tab.parent = this;
      if (tab.el.nativeElement.getAttribute('selected') !== null) {
        this.select(tab);
      }
    });
  }

  select(tab: TabComponent) {
    this.selected.deactivated.next();
    this.selected = tab;
    tab.activated.next();
  }

  isSelected(tab: TabComponent) {
    return this.selected === tab;
  }

}
