import { Component, Input } from '@angular/core';
import { Item, List, Selection } from '@ec.components/core';
import { ListComponent } from '../list.component';

/** The ListItemsComponent displays the actual list, without all peripherals (header, pagination etc.).
 * It can either be given an Array of Items or just the list parent to control the shown items. */
@Component({
  selector: 'ec-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent {
  /** The list instance */
  @Input() list: List<any>;
  /** The selection instance. This is optional. If It is not provided, no checkbox will be visible.*/
  @Input() selection: Selection<any>;
  /** An Optional Array of Item's that should be displayed. If none are provded, the list Items are used.*/
  @Input() items: Item<any>[];
  /** You pass in the entire parent list component */
  @Input() host: ListComponent;

  private ngOnChanges() {
    if (this.host) {
      this.list = this.host.list;
      this.selection = this.host.selection;
    }
    if (!this.items && this.list) {
      this.items = this.list.page;
    }
  }

  columnClick(item: Item<any>) {
    if (this.host) {
      this.host.columnClick(item);
    } else if (this.selection) {
      this.selection.toggle(item);
    }
  }
}
