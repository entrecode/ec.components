import { EventEmitter } from '@angular/core';
import { Collection, List, ListConfig, Selection } from '@ec.components/core';
import { Item } from '@ec.components/core/src/item/item';
/**
 * The ListComponent will render a list containing the given items or collection.
 * */
export declare class ListComponent<T> {
    /** The current list config */
    config: ListConfig<T>;
    /** Config input for List */
    configInput: ListConfig<T>;
    /** The visible items */
    items: Array<T>;
    /** The used collection */
    collection: Collection<T>;
    /** The used selection */
    selection: Selection<T>;
    /** If true, only one item is selectable next */
    solo: boolean;
    /** Event emitter on item selection */
    select: EventEmitter<Item<T>>;
    /** Event emitter on selection change */
    selected: EventEmitter<Selection<T>>;
    /** The Instance of the List */
    list: List<T>;
    /** Changing items or collection will trigger reconstructing the list with the new items.
     * Changing the selection will reconstruct the selection */
    ngOnChanges(): void;
    /** Column click handler. Triggers select.emit(item) with fallback to selection.toggle*/
    columnClick(item: any): void;
}
