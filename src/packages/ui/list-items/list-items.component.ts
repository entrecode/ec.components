import {
  Component,
  ContentChildren,
  forwardRef,
  Input,
  QueryList,
  ViewChildren
} from '@angular/core';
import { Item, List, Selection } from '../../core';
import { FieldComponent, ListComponent } from '..';

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
  @ViewChildren(forwardRef(() => FieldComponent)) private fields: QueryList<FieldComponent>;
  /** A field component inside the ec-lis-items tags interpreted as a custom template */
  @ContentChildren(forwardRef(() => FieldComponent), { descendants: true }) templates: QueryList<FieldComponent>;

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
    if (!this.templates) {
      return;
    }
    if (!this.templates.length && this.host && this.host.templates.length) {
      //if no direct ec-field contentchildren are found, try the host's
      this.templates = this.host.templates;
    }
    this.templates.forEach((field) => {
      this.fields.forEach((cell, index) => {
        if (cell.matches(field)) {
          const row = index % this.list.fields.length;
          const col = Math.floor(index / this.list.fields.length);
          const context = {
            item: this.items[col],
            field: this.list.fields[row],
          };
          cell.renderTemplate(field.template, Object.assign(context,
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
