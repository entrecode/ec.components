import { Component, ElementRef, Host, Input, OnInit } from '@angular/core';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'ec-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  @Input() label: string;
  @Input() selected: boolean;

  constructor(@Host() public parent: TabsComponent, private el: ElementRef) {
    parent.add(this);
  }

  isSelected() {
    return this.parent.selected === this;
  }

  ngOnInit() {
    if (this.el.nativeElement.getAttribute('selected') !== null) {
      this.parent.selected = this;
    }
  }

}
