import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { List, ListConfig, Selection } from '@ec.components/core';
import { Item } from '@ec.components/core/src/item/item';

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
export class SelectComponent<T> implements ControlValueAccessor {
  /** Configuration Object for List */
  @Input() config: ListConfig<T>;
  /** The visible items */
  @Input() value: Array<T>;
  /** The used selection */
  @Input() selection: Selection<T>;
  /** Event emitter on item selection */
  @Output() change: EventEmitter<Selection<T>> = new EventEmitter();
  /** Event emitter on selected item click */
  @Output() itemClick: EventEmitter<Item<T>> = new EventEmitter();
  /** Event that emits when the plus is clicked. */
  @Output('toggle') _toggle: EventEmitter<Selection<T>> = new EventEmitter();
  /** The Instance of the List */
  @Input() list: List<T>;
  /** True if the selection is active */
  @Input() active: boolean;
  /** Wether or not the selection should be solo */
  @Input() solo: boolean;
  /** is emitted when a new value has been written from the outside */
  // written: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.initSelection();
  }

  ngOnChanges() {
    this.initSelection();
  }

  /** creates the collection from the config */
  initSelection() {
    if (!this.config || this.config.disableSelection) {
      return;
    }
    this.selection = new Selection(this.value || [], this.config);
    this.selection.update$.subscribe(() => {
      this.changed();
    });
  }

  /** Called when the model changes */
  writeValue(value: any) {
    this.value = Array.isArray(value) ? value : (value ? [value] : []);
    Object.assign(this.config || {}, { solo: this.solo });
    this.list = new List(this.value, this.config);
    if (this.selection && this.value && this.value.length) {
      Object.assign(this.config, { selection: this.selection });
      this.selection.replaceWith(this.list.items);
    }
  }

  /** Initializes either with values, collection or list. Creates Selection with config. */
  useConfig(config = {}) {
    this.config = Object.assign(this.config || {}, config);
    this.initSelection();
    this.writeValue(this.value);
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
    if (this.selection) {
      this.selection.toggle(item);
    }
  }

  private addItem(item) {
    this.selection.toggle(item);
    this.changed();
  }

  private removeItem(item) {
    this.selection.remove(item);
    this.changed();
  }

  changed() {
    this.change.emit(this.selection);
    return this.propagateChange(this.selection.getValue());
  }

  propagateChange = (_: any) => {
  };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {

  }
}
