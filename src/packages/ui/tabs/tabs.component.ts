import { Component, Input, OnInit } from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { Collection } from '../../core';

@Component({
  selector: 'ec-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  private tabs: Collection<TabComponent>;
  @Input() selected;

  constructor() {
    this.tabs = new Collection([]);
  }

  add(tab: TabComponent) {
    this.tabs.add(tab);
    if (!this.selected) {
      this.selected = tab;
    }
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
  }

}
