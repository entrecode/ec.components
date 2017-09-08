import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { List, ListConfig, Selection } from '@ec.components/core';
import { Item } from '@ec.components/core/src/item/item';
/**
 * The SelectComponent will render a dropdown of a given list.
 * */
export declare class SelectComponent<T> implements ControlValueAccessor {
    /** Configuration Object for List */
    config: ListConfig<T>;
    /** The visible items */
    value: Array<any>;
    /** The used selection */
    selection: Selection<T>;
    /** Event emitter on item selection */
    change: EventEmitter<Selection<T>>;
    /** Event emitter on selected item click */
    itemClick: EventEmitter<Item<T>>;
    /** Event that emits when the plus is clicked. */
    _toggle: EventEmitter<Selection<T>>;
    /** The Instance of the List */
    list: List<T>;
    /** True if the selection is active */
    active: boolean;
    /** Wether or not the selection should be solo */
    solo: boolean;
    /** is emitted when a new value has been written from the outside */
    ngOnInit(): void;
    ngOnChanges(): void;
    /** creates the collection from the config */
    initSelection(): void;
    /** Called when the model changes */
    writeValue(value: any): void;
    /** Initializes either with values, collection or list. Creates Selection with config. */
    useConfig(config?: {}): void;
    /** Returns true if the toggle button should be shown.
     * Is hidden when all items are selection and the toggle output has no observers. */
    canToggle(): number | boolean;
    /** Called when clicking the toggle button. emits toggle event with current selection. */
    toggle(active?: boolean, emit?: boolean): void;
    /** Is called when a selected item is clicked*/
    private clickItem(item);
    /** Column click handler. Triggers onSelect.emit(item) with fallback to selection.toggle*/
    columnClick(item: any): void;
    private addItem(item);
    private removeItem(item);
    changed(): void;
    propagateChange: (_: any) => void;
    registerOnChange(fn: any): void;
    registerOnTouched(): void;
}
