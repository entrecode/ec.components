import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Selection } from '../../core/selection/selection';
import { Item } from '../../core/item/item';
import { ItemConfig } from '../../core/item/item-config.interface';
import { List } from '../../core/list/list';

@Component({
  selector: 'ec-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectionComponent {

  @Input() selection: Selection<any>;
  @Input() config: ItemConfig<any>;
  @Input() items: Item<any>[];
  @Input() list: List<any>;
  @Input() ids: Array<any>[];
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() toggle: EventEmitter<any> = new EventEmitter();
  private open: boolean = false;

  constructor(private detector: ChangeDetectorRef) {
  }

  ngOnChanges(change) {
    if (this.items) {
      this.list = new List(this.items, this.config);
    }
    if (!this.selection) {
      this.selection = new Selection([], this.config);
    }
    if (this.list && this.ids) {
      this.selection.addAll(this.list.items.filter((item) => this.ids.indexOf(item.id()) !== -1));
    }
  }

  toggleOpen() {
    this.open = !this.open;
    this.toggle.emit(this.open);
  }

  hasToggle() {
    return this.toggle.observers.length;
  }

  use(selection) {
    this.selection = selection;
  }
}
