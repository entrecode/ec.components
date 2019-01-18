import { Item } from '../item/item';
import { List } from '../list/list';
/**
 * Extension of List that keeps track of selected items. It can keep track of items via identifier
 * property even if the object references are being replaced, e.g. when reloading a set if items.
 * It supports solo and multiple selection.
 */
export declare class Selection<T> extends List<T> {
    /** Adds item to selection. If solo is true, all other items will be removed. */
    select(item: Item<T>, solo?: boolean): void;
    /** Returns the index of the given item or an item that has the same identifier or value. */
    index(item: Item<T>): number;
    has(item: Item<T>): boolean;
    /** Toggle item in and out of selection.
     * The solo property will change the behaviour like you would expect it to behave :) */
    toggle(item: Item<T>, solo?: boolean, event?: boolean): void;
    /** Toggle multiple items. You can control if the items should be kept, flipped, or be kept unique*/
    toggleAll(items: Array<Item<T>>, flip?: boolean, keep?: boolean): this;
    /** Flips all items. */
    flipAll(items: any): this;
    /** Returns an Array containing the current value. If an identifier is set, the array will consist of the identifier values,
     * if not, it will resolve the item contents. */
    getValue(solo?: boolean): any;
}
