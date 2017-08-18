import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output
} from '@angular/core';
import { Selection } from '../../core/selection/selection';
import { Item } from '../../core/item/item';
import { ItemConfig } from '../../core/item/item-config.interface';
import { List } from '../../core/list/list';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ec-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectionComponent),
      multi: true
    }
  ]
})
export class SelectionComponent implements ControlValueAccessor {

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

  writeValue(value: any) {
    //value is a model value => array of identifiers
    /*if (!this.items) {
      this.items = value || [];
      this.selection.addAll(this.list.items);
    }*/
  }

  propagateChange = (_: any) => {
  };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {

  }
}
