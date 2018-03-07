import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, ViewChild, ViewEncapsulation, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { List, ListConfig, Selection } from '@ec.components/core';
import { Item } from '@ec.components/core/src/item/item';
import { PopComponent } from '../pop/pop.component';

/**
 * The SelectComponent will render a dropdown of a given list.
 *
 * <example-url>https://components.entrecode.de/ui/select</example-url>
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
export class SelectComponent<T> implements ControlValueAccessor, OnInit, OnChanges {
  /** Configuration Object for List */
  @Input() config: ListConfig<T>;
  /** The visible items */
  @Input() value: Array<T>;
  /** The used selection */
  @Input() selection: Selection<T>;
  /** Input placeholder */
  @Input() placeholder: string;
  /** Event emitter on item selection */
  @Output() change: EventEmitter<Selection<T>> = new EventEmitter();
  /** Event emitter on selected item click */
  @Output() itemClick: EventEmitter<Item<T>> = new EventEmitter();
  /** The Instance of the List */
  @Input() list: List<T>;
  /** Available Items */
  @Input() values: Array<T>;
  /** Wether or not the selection should be solo */
  @Input() solo: boolean;
  /** The selection pop */
  @ViewChild(PopComponent) pop: PopComponent;

  @HostListener('document:click', ['$event']) clickedOutside($event) {
    if (this.pop) {
      this.pop.hide();
    }
  }
  clickInside(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  ngOnInit() {
    this.initSelection();
  }

  ngOnChanges() {
    this.initSelection();
  }

  /** creates the collection from the config */
  initSelection() {
    if (this.values) {
      if (this.list) {
        console.warn('ec-select: list is overwritten by values', this.list);
      }
      this.list = new List(this.values, this.config);
    }
    if (this.list && !this.config) {
      this.config = this.list.config;
    }
    if (!this.config) { // || !this.config.selectMode
      return;
    }
    this.config = Object.assign({ solo: this.solo }, this.config);
    this.selection = new Selection(this.value || [], this.config);
    this.selection.update$.subscribe(() => {
      this.changed();
    });
  }

  /** Called when the model changes */
  writeValue(value: any) {
    this.use(value);
  }

  /** Uses the given value as selection items */
  use(value) {
    this.value = Array.isArray(value) ? value : (value ? [value] : []);
    Object.assign(this.config || {}, { solo: this.solo });
    if (this.selection && this.value && this.value.length) {
      Object.assign(this.config, { selection: this.selection });
      const list = new List(this.value, this.config);
      this.selection.replaceWith(list.items);
    }
  }

  /** Initializes either with values, collection or list. Creates Selection with config. */
  useConfig(config = {}) {
    this.config = Object.assign(this.config || {}, config);
    this.initSelection();
    this.writeValue(this.value);
  }

  /** Is called when a selected item is clicked*/
  private clickItem(item) {
    this.itemClick.emit(item);
  }

  /** Select handler. Toggles selection. */
  public select(item) {
    this.selection.toggle(item);
  }

  /** Fires on selection change. Hides pop if solo */
  changed() {
    this.change.emit(this.selection);
    if (this.config.solo && this.pop) {
      this.pop.hide();
    }
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
