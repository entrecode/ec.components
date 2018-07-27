import { Component, EventEmitter, forwardRef, HostListener, Input, OnChanges, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { List, ListConfig, Selection } from '../../../core';
import { Item } from '../../../core/src/item/item';
import { PopComponent } from '../pop/pop.component';

/**
 * The SelectComponent will render a dropdown of a given list.
 *
 * <example-url>https://components.entrecode.de/ui/select</example-url>
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
  @Input() value: Array<T>;
  /** The used selection */
  @Input() selection: Selection<T>;
  /** Input placeholder */
  @Input() placeholder: string;
  /** Event emitter on item selection */
  @Output() changed: EventEmitter<Selection<T>> = new EventEmitter();
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
  /** is intended to be called when clicking inside and the dropdown should not toggle */
  clickInside(e) {
    if (!e) {
      return;
    }
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
      this.onChange();
    });
  }

  /** Called when the model changes */
  writeValue(value: any) {
    this.use(value, false);
  }

  /** Removes the given item from selection + triggers clickInside */
  removeItem(item: Item<any>, e?) {
    this.selection.remove(item);
    this.clickInside(e);
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
      this.clickInside(e);
    }
  }

  /** Select handler. Toggles selection. */
  public select(item) {
    this.selection.toggle(item);
  }

  public toggle(e) {
    if (this.pop) {
      this.pop.toggle();
    }
    this.clickInside(e);
  }

  /** Fires on selection change. Hides pop if solo */
  onChange() {
    this.changed.emit(this.selection);
    if (this.config.solo && this.pop) {
      this.pop.hide();
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
