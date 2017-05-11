import { Component, Input, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { Item, List, Selection } from '../../core';
import { ListComponent } from '..';

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
  /** If true, only one item is selectable next */
  @Input() solo: boolean;
  @ViewChildren('cells', { read: ViewContainerRef }) private cells: QueryList<ViewContainerRef>;

  private ngOnChanges(changes) {
    if (this.host) {
      this.list = this.host.list;
      this.selection = this.host.selection;
    }
    if (!this.items && this.list) {
      this.items = this.list.page;
    }
  }

  private ngAfterViewInit() {
    setTimeout(() => this.renderTemplates(), 0);
  }

  /** Renders all custom cell templates on the current page */
  renderTemplates(): void {
    if (!this.host) {
      return;
    }
    this.host.fields.forEach((field) => {
      this.cells.forEach((cell, index) => {
        const row = index % this.list.fields.length;
        const col = Math.floor(index / this.list.fields.length);
        if (field.template && (field.type === cell.element.nativeElement.getAttribute('type') || field.property === cell.element.nativeElement.getAttribute('property'))) {
          const context = {
            item: this.items[col],
            field: this.list.fields[row],
          };
          cell.element.nativeElement.innerHTML = '';
          cell.clear();
          cell.createEmbeddedView(field.template, Object.assign(context,
            { value: context.item.resolve(context.field.property) }), index);
        }
      });
    });
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
