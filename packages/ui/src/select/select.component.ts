import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, ViewChild, ViewEncapsulation, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { List, ListConfig, Selection } from '@ec.components/core';
import { Item } from '@ec.components/core/src/item/item';
import { PopComponent } from '../pop/pop.component';
import { SearchbarComponent } from '../list/searchbar/searchbar.component';
import { ListComponent } from '../list/list.component';
import { Subject } from 'rxjs/Subject';
import { LoaderComponent } from '../loader/loader.component';

/**
 * The SelectComponent will render a dropdown of a given list.
 *
 * <example-url>https://components.entrecode.de/ui/select?e=1</example-url>
 * */
@Component({
  selector: 'ec-select',
  templateUrl: './select.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  /** The loader inside the dropdown */
  @ViewChild('dropdownLoader') dropdownLoader: LoaderComponent;
  /** The list in the dropdown */
  @ViewChild(ListComponent) dropdownList: ListComponent<any>;
  /** The nested searchbar */
  @ViewChild(SearchbarComponent) searchbar: SearchbarComponent;
  /** Subject that is nexted when an item is being selected (clicked or entered on) */
  toggleItem: Subject<Item<T>> = new Subject();

  constructor(
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef
  ) {
    this.toggleItem.asObservable().subscribe((item) => {
      if (this.selection.has(item)) {
        this.removeItem(item);
      } else {
        this.addItem(item);
      }
    });
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
    this.cdr.markForCheck();
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
    this.cdr.markForCheck();
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
  public listItemClicked(item) {
    this.toggleItem.next(item);
    // TODO: prevent default to prevent bluring searchbear.
    // refocusing is not possible because that will activate the pop again..
  }

  focus(e) {
    if (this.dropdown && !this.dropdown.active) {
      this.dropdown.show();
    }
  }

  hasSoloSelection() {
    return this.config.solo && !this.selection.isEmpty();
  }

  focusSearchbar() {
    if (this.searchbar) {
      this.searchbar.focusEvent.emit(true);
    }
  }

  /** Fires on selection change. Hides dropdown if solo */
  onChange() {
    this.changed.emit(this.selection);
    if (this.dropdown && this.hasSoloSelection()) {
      this.dropdown.hide();
    } else {
      this.focusSearchbar();
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

  activate(e) {
    if (this.dropdown) {
      this.dropdown.show(e);
    }
    if (this.searchbar) {
      this.searchbar.focusEvent.emit(true);
    }
  }

  preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  }

  handleKey(e, list) {
    const { event, query } = e;
    if (!list) {
      console.warn('no dropdown given');
      return;
    }
    switch (event.key) {
      case 'ArrowUp':
        if (!this.dropdown.active) {
          this.dropdown.show(event);
        } else {
          list.focusPrev();
        }
        this.preventDefault(event);
        break;
      case 'ArrowDown':
        if (!this.dropdown.active) {
          this.dropdown.show(event);
        } else {
          list.focusNext();
        }
        this.preventDefault(event);
        break;
      case 'ArrowRight':
        list.list.pagination.next();
        this.preventDefault(event);
        break;
      case 'ArrowLeft':
        list.list.pagination.prev();
        this.preventDefault(event);
        break;
      case 'Enter':
        if (list.focusItem) {
          if (list.list.isFiltered()) {
            list.list.clearFilter();
          }
          this.toggleItem.next(list.focusItem);
        }
        this.preventDefault(event);
        break;
      case 'Backspace':
        if (!this.selection.isEmpty() && query === '') {
          this.removeItem(this.selection.items[this.selection.items.length - 1])
        }
        break;
      case 'Tab':
        if (this.dropdown) {
          this.dropdown.hide();
        }
        break;
      default:
        return;
    }
  }

  filterDropdownList(listComponent: ListComponent<any>, query) {
    if (!listComponent) {
      console.warn('cannot filter yet: list not ready');
      return;
    }
    this.dropdown.show();
    Promise.resolve(listComponent.filter(this.config.label, query)).then(() => {
      listComponent.focusFirst();
    });
  }
}
