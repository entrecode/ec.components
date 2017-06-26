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
import { FieldComponent } from '..';

/**
 * The SelectComponent will render a dropdown of a given list.
 * */
@Component({
  selector: 'ec-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectComponent {
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
  /** A field component inside the ec-list tags interpreted as a custom template */
  @ContentChildren(FieldComponent, { descendants: true }) templates: QueryList<FieldComponent>;

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
