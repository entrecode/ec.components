import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { Collection, List, ListConfig, Selection } from '../../core';
import { InputComponent } from '..';

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
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
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
  }

  /** Column click handler. Triggers onSelect.emit(item) with fallback to selection.toggle*/
  columnClick(item) {
    if (this.onSelect.observers.length) {
      return this.onSelect.emit(item);
    }
    if (this.selection) {
      this.selection.toggle(item, this.solo);
    }
  }
}
