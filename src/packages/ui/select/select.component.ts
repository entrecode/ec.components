import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Collection, List, ListConfig, Selection } from '../../core';
import { Item } from '../../core/item/item';

/**
 * The SelectComponent will render a dropdown of a given list.
 * */
@Component({
  selector: 'ec-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {
  /** Configuration Object for List */
  @Input() config: ListConfig;
  /** The visible items */
  @Input() value: Array<any>;
  /** The used collection */
  @Input() collection: Collection<any>;
  /** The used selection */
  @Input() selection: Selection<any>;
  /** Event emitter on item selection */
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  /** Event emitter on selected item click */
  @Output() itemClick: EventEmitter<Item<any>> = new EventEmitter();
  /** Event that emits when the plus is clicked. */
  @Output('toggle') _toggle: EventEmitter<Selection<any>> = new EventEmitter();
  /** The Instance of the List */
  @Input() list: List<any>;
  /** True if the selection is active */
  @Input() active: boolean;

  /** Initializes either with values, collection or list. Creates Selection with config. */
  init() {
    if (this.value) {
      this.list = new List(this.value, this.config);
    } else if (this.collection) {
      this.list = new List(this.collection.items, this.config);
    }
    if (!this.list) {
      return;
    }
    if (!this.selection && this.config && !this.config.disableSelection) {
      this.selection = new Selection([], this.config);
    }
  }

  /** Returns true if the toggle button should be shown.
   * Is hidden when all items are selection and the toggle output has no observers. */
  canToggle() {
    return this._toggle.observers.length || !this.selection.hasAll(this.list.items);
  }

  /** Called when clicking the toggle button. emits toggle event with current selection. */
  toggle(active: boolean = !this.active, emit: boolean = false) {
    this.active = active;
    this._toggle.emit(this.selection);
  }

  /** Is called when a selected item is clicked*/
  private clickItem(item) {
    this.itemClick.emit(item);
  }

  /** Column click handler. Triggers onSelect.emit(item) with fallback to selection.toggle*/
  columnClick(item) {
    if (this.onSelect.observers.length) {
      return this.onSelect.emit(item);
    }
    if (this.selection) {
      this.selection.toggle(item);
    }
  }

  private addItem(item) {
    this.selection.toggle(item);
    this.change();
  }

  private removeItem(item) {
    this.selection.remove(item);
    this.change();
  }

  change() {
    return this.propagateChange(this.selection.getValue());
  }

  /** Called when the model changes */
  writeValue(value: any) {
    this.value = Array.isArray(value) ? value : (value ? [value] : []);
    this.init();
    this.selection.removeAll();
    this.selection.addAll(this.list.items);
  }

  propagateChange = (_: any) => {
  };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {

  }
}
