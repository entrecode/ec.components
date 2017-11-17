import { Component, EventEmitter, Input, Output, ViewEncapsulation, OnChanges } from '@angular/core';
import { Collection, List, ListConfig, Selection } from '@ec.components/core';
import { Item } from '@ec.components/core/item/item';

/**
 * The ListComponent will render a list containing the given items or collection.
 * */
@Component({
  selector: 'ec-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent<T> implements OnChanges {
  /** The current list config */
  config: ListConfig<T> = {};
  /** Config input for List */
  @Input('config') configInput: ListConfig<T>;
  /** The visible items */
  @Input() items: Array<T>;
  /** The used collection */
  @Input() collection: Collection<T>;
  /** The used selection */
  @Input() selection: Selection<T>;
  /** If true, only one item is selectable next */
  @Input() solo: boolean;
  /** Event emitter on item selection */
  @Output() select: EventEmitter<Item<T>> = new EventEmitter();
  /** Event emitter on selection change */
  @Output() selected: EventEmitter<Selection<T>> = new EventEmitter();
  /** The Instance of the List */
  @Input() list: List<T>;

  /** Changing items or collection will trigger reconstructing the list with the new items.
   * Changing the selection will reconstruct the selection */
  ngOnChanges() {
    Object.assign(this.config || {}, this.configInput || {});
    if (this.items) {
      this.list = new List(this.items, this.config);
    } else if (this.collection) {
      this.list = new List(this.collection.items, this.config);
    }
    if (!this.list) {
      return;
    }
    if (!this.selection && this.list.config && !this.list.config.disableSelection) {
      this.selection = new Selection([], this.list.config);
    }
    if (this.selection) {
      this.selection.update$.subscribe((selection: Selection<T>) => {
        this.selected.emit(selection);
      })
    }
    /*this.list.update$.subscribe(() => {
      this.list.load();
    });*/
  }

  /** Column click handler. Triggers select.emit(item) with fallback to selection.toggle*/
  columnClick(item) {
    if (this.select.observers.length) {
      return this.select.emit(item);
    }
    if (this.selection) {
      this.selection.toggle(item, this.solo);
    }
  }
}
