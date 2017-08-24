import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Collection, List, ListConfig, Selection } from '../../core/index';

/**
 * The ListComponent will render a list containing the given items or collection.
 * */
@Component({
  selector: 'ec-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent {
  /** Configuration Object for List */
  @Input() config: ListConfig;
  /** The visible items */
  @Input() items: Array<any>;
  /** The used collection */
  @Input() collection: Collection<any>;
  /** The used selection */
  @Input() selection: Selection<any>;
  /** If true, only one item is selectable next */
  @Input() solo: boolean;
  /** Event emitter on item selection */
  @Output() select: EventEmitter<any> = new EventEmitter();
  /** Event emitter on selection change */
  @Output() selected: EventEmitter<any> = new EventEmitter();
  /** The Instance of the List */
  @Input() list: List<any>;

  /** Changing items or collection will trigger reconstructing the list with the new items.
   * Changing the selection will reconstruct the selection */
  ngOnChanges() {
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
      this.selection.update$.subscribe((item) => {
        this.selected.emit(item);
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
