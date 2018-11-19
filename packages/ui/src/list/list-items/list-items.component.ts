import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Item, List, Selection } from '@ec.components/core';
import { ListComponent } from '../list.component';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

/** The ListItemsComponent displays the actual list, without all peripherals (header, pagination etc.).
 * It can either be given an Array of Items or just the list parent to control the shown items. */
@Component({
  selector: 'ec-list-items',
  templateUrl: './list-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemsComponent<T> implements OnChanges {
  /** The list instance */
  @Input() list: List<T>;
  /** The selection instance. This is optional. If It is not provided, no checkbox will be visible.*/
  @Input() selection: Selection<T>;
  /** An Optional Array of Item's that should be displayed. If none are provded, the list Items are used.*/
  @Input() items: Item<T>[];
  /** If true, only one item is selectable next */
  @Input() solo: boolean;
  /** The current focused item */
  @Input() focusItem: Item<T>;
  /** Event emitter on item clicked */
  @Output() columnClicked: EventEmitter<Item<T>> = new EventEmitter();


  constructor(public cdr: ChangeDetectorRef) { }
  /** Checks for host and uses its list. */
  ngOnChanges() {
    if (!this.items && this.list) {
      this.items = this.list.page;
    }
    if (this.list) {
      this.list.change$.subscribe(newList => {
        this.cdr.markForCheck();
      });
    }
    if (this.selection) {
      this.selection.update$.subscribe(newList => {
        this.cdr.markForCheck();
      });
    }
  }
  /** yields true if the item is focussed */
  hasFocus(item) {
    return this.focusItem === item;
  }

  isClickable() {
    return this.columnClicked.observers.length || (this.selection && this.list && this.list.config.selectMode);
  }

  /** Propagate clicked item to host or toggle selection. */
  columnClick(item: Item<T>, e: Event) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    if (this.selection && this.list && this.list.config.selectMode) {
      this.selection.toggle(item, this.solo);
    } else if (this.columnClicked.observers.length) {
      this.columnClicked.emit(item);
    }
  }
}
