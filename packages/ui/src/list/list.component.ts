import { Component, EventEmitter, Input, OnChanges, Output, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Collection, List, ListConfig, Selection, Pagination } from '@ec.components/core';
import { Item } from '@ec.components/core/src/item/item';
import { PaginationConfig } from './pagination/pagination-config.interface';
import { ListConfigService } from './list-config.service';

/**
 * The ListComponent will render a list containing the given items or collection.
 *
 * <example-url>https://components.entrecode.de/ui/list/basic?e=1</example-url>
 * <example-url>https://components.entrecode.de/ui/list/transforms?e=1</example-url>
 * */
@Component({
  selector: 'ec-list',
  templateUrl: './list.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent<T> implements OnChanges {
  /** The current list config */
  config: ListConfig<T> = {};
  /** Config input for List */
  /** Flag that flips true when loading. */
  isLoading = false;
  // tslint:disable-next-line:no-input-rename
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
  @Output() columnClicked: EventEmitter<Item<T>> = new EventEmitter();
  /** Event emitter on selection change */
  @Output() selected: EventEmitter<Selection<T>> = new EventEmitter();
  /** The Instance of the List */
  @Input() list: List<T>;
  /** Pagination that should be used */
  @Input() pagination: Pagination<T>;
  /** Custom PaginationConfig */
  @Input() paginationConfig: PaginationConfig;

  constructor(
    public listConfig: ListConfigService,
    public cdr: ChangeDetectorRef
  ) {
  }

  /** Changing items or collection will trigger reconstructing the list with the new items.
   * Changing the selection will reconstruct the selection */
  ngOnChanges(changes?) {
    this.config = Object.assign(this.config || {}, this.configInput || {});
    if (this.items) {
      this.list = new List(this.items, this.config, this.pagination);
    } else if (this.collection) {
      this.list = new List(this.collection.items, this.config, this.pagination);
    }
    if (!this.list) {
      return;
    }
    this.listConfig.applyConfig(this.list);
    this.list.change$.subscribe(() => {
      this.cdr.markForCheck();
    });
    if (!this.selection) {
      this.selection = new Selection([], this.list.config);
    }
    if (this.selection) {
      this.selection.update$.subscribe((selection: Selection<T>) => {
        this.selected.emit(selection);
      })
    }
  }

  /** Column click handler. Triggers select.emit(item) with fallback to selection.toggle*/
  columnClick(item) {
    if (this.list.config.selectMode && this.selection) {
      this.selection.toggle(item, this.solo);
    } else if (this.columnClicked.observers.length) {
      return this.columnClicked.emit(item);
    }
  }
  /** Decides if the header should be visible or not */
  showHeader() {
    return this.list && this.list.config && !this.list.config.disableHeader && (this.list.fields.length || this.list.config.title)
    /* && (this.list.config.alwaysShowHeader || !this.list.isEmpty()); */
  }

  /** Selects the item with the given index */
  selectIndex(index: number) {
    if (!this.selection || this.list.isEmpty() || !this.list.items[index]) {
      return;
    }
    this.selection.select(this.list.items[index]);
  }

  /** Selects the next item */
  selectNext() {
    let index = 0;
    if (!this.selection.isEmpty()) {
      index = this.list.items.indexOf(this.selection.items[0]) + 1;
    }
    this.selection.removeAll();
    this.selectIndex(index % this.list.items.length);
  }

  /** Selects the previous item */
  selectPrev() {
    let index = this.list.items.length - 1;
    if (!this.selection.isEmpty()) {
      index = this.list.items.indexOf(this.selection.items[0]) + this.list.items.length - 1;
    }
    this.selection.removeAll();
    this.selectIndex(index % this.list.items.length);
  }
}
