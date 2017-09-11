import { Component, Input } from '@angular/core';
import { Item, List, Selection } from '@ec.components/core';
import { ListComponent } from '../list.component';

/** The ListItemsComponent displays the actual list, without all peripherals (header, pagination etc.).
 * It can either be given an Array of Items or just the list parent to control the shown items. */
@Component({
  selector: 'ec-list-items',
  template: require('./list-items.component.html'),
  styles: [require('./list-items.component.scss')]
})
export class ListItemsComponent<T> {
  /** The list instance */
  @Input() list: List<T>;
  /** The selection instance. This is optional. If It is not provided, no checkbox will be visible.*/
  @Input() selection: Selection<T>;
  /** An Optional Array of Item's that should be displayed. If none are provded, the list Items are used.*/
  @Input() items: Item<T>[];
  /** You pass in the entire parent list component */
  @Input() host: ListComponent<T>;
  /** If true, only one item is selectable next */
  @Input() solo: boolean;

  /** Checks for host and uses its list. */
  private ngOnChanges() {
    if (this.host) {
      this.list = this.host.list;
      this.selection = this.host.selection;
    }
    if (!this.items && this.list) {
      this.items = this.list.page;
    }
  }

  /** Propagate clicked item to host or toggle selection. */
  columnClick(item: Item<any>) {
    if (this.host) {
      this.host.columnClick(item);
    } else if (this.selection) {
      this.selection.toggle(item, this.solo);
    }
  }
}
