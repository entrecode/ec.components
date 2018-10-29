import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { List, ListConfig, Selection } from '@ec.components/core';
import { Item } from '@ec.components/core/src/item/item';
import { PopComponent } from '../pop/pop.component';

/**
 * The SelectComponent will render a dropdown of a given list.
 *
 * <example-url>https://components.entrecode.de/ui/select?e=1</example-url>
 * */
@Component({
  selector: 'ec-select',
  templateUrl: './select.component.html',
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
  /** the current dragged element */
  dragged: Item<T>;
  /** Configuration Object for List */
  @Input() config: ListConfig<T>;
  /** The visible items */
  @Input() value: Array<T> | T;
  /** The used selection */
  @Input() selection: Selection<T>;
  /** Input placeholder */
  @Input() placeholder: string;
  /** Event emitter on item selection */
  @Output() changed: EventEmitter<Selection<T>> = new EventEmitter();
  /** Event emitter on selected item click */
  @Output() itemClick: EventEmitter<Item<T>> = new EventEmitter();
  /** Emits when an item is being removed */
  @Output() remove: EventEmitter<Item<T>> = new EventEmitter();
  /** Emits when an item is being added */
  @Output() add: EventEmitter<Item<T>> = new EventEmitter();
  /** The Instance of the List */
  @Input() list: List<T>;
  /** Available Items */
  @Input() values: Array<T>;
  /** Wether or not the selection should be solo */
  @Input() solo: boolean;
  /** The selection dropdown */
  @ViewChild('dropdown') dropdown: PopComponent;

  constructor(public elementRef: ElementRef) {
  }

  getParentTree(el, tree = []) {
    if (el.parentNode) {
      return tree.concat([el.parentNode]);
    }
    return tree;
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
      delete this.values;
    }
    if (this.list && !this.config) {
      this.config = this.list.config;
    }
    if (!this.config) { // || !this.config.selectMode
      return;
    }
    this.config = Object.assign({ solo: this.solo }, this.config);
    const value: Array<T> = Array.isArray(this.value) ? this.value : this.value ? [this.value] : [];
    this.selection = new Selection(value, this.config);
    this.selection.update$.subscribe(() => {
      this.onChange();
    });
  }

  /** Called when the model changes */
  writeValue(value: any) {
    this.use(value, false);
  }

  /** Removes the given item from selection */
  removeItem(item: Item<any>, e?) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
    if (this.remove.observers.length) {
      this.remove.emit(item);
    } else {
      this.selection.remove(item);
    }
  }
  /** Adds the given ite, emits add output if observed */
  addItem(item: Item<any>) {
    if (this.add.observers.length) {
      this.add.emit(item);
    } else {
      this.selection.toggle(item);
    }
  }

  /** Uses the given value as selection items */
  use(value, event = true) {
    this.value = Array.isArray(value) ? value : (value ? [value] : []);
    Object.assign(this.config || {}, { solo: this.solo });
    if (this.selection && this.value && this.value.length) {
      Object.assign(this.config, { selection: this.selection });
      const list = new List(this.value, this.config);
      this.selection.replaceWith(list.items, event);
    }
  }

  /** Initializes either with values, collection or list. Creates Selection with config. */
  useConfig(config: ListConfig<T> = {}) {
    this.config = Object.assign(this.config || {}, config);
    this.use(this.value, false);
    this.initSelection();
  }

  /** Is called when a selected item is clicked*/
  private clickItem(item, e?) {
    if (this.itemClick.observers.length) {
      this.itemClick.emit(item);
    }
  }

  /** Select handler. Toggles selection. */
  public select(item) {
    if (this.selection.has(item)) {
      this.removeItem(item);
    } else {
      this.addItem(item);
    }
  }

  /** Fires on selection change. Hides dropdown if solo */
  onChange() {
    this.changed.emit(this.selection);
    if (this.config.solo && this.dropdown) {
      this.dropdown.hide();
    }
    this.value = this.selection.getValue();
    return this.propagateChange(this.value);
  }

  /** Propagates formControl/ngModel changes */
  propagateChange = (_: any) => {
  };
  /** registers change method. (handled by angular) */
  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {
  }

  /** is called when an element is dragged by the user. hides element in selection */
  onDragStart(item, e, target = e.target) {
    this.dragged = item;
    window.requestAnimationFrame(function () { target.style.display = 'none'; });
  }
  /** called when the element is dropped. moves item in selection. */
  onDrop(e) {
    if (e.isExternal) {
      return;
    }
    let index = e.index;
    if (this.selection.index(this.dragged) < e.index) {
      index -= 1;
    }
    this.selection.move(this.dragged, index);
  }

  /** is called when the drag stops in any kind of way. */
  cancelDrag(item, e, target = e.target) {
    delete this.dragged;
    window.requestAnimationFrame(function () { target.style.display = 'inherit'; });
  }
}
