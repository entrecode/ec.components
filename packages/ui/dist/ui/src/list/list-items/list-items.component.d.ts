import { Item, List, Selection } from '@ec.components/core';
import { ListComponent } from '../list.component';
/** The ListItemsComponent displays the actual list, without all peripherals (header, pagination etc.).
 * It can either be given an Array of Items or just the list parent to control the shown items. */
export declare class ListItemsComponent<T> {
    /** The list instance */
    list: List<T>;
    /** The selection instance. This is optional. If It is not provided, no checkbox will be visible.*/
    selection: Selection<T>;
    /** An Optional Array of Item's that should be displayed. If none are provded, the list Items are used.*/
    items: Item<T>[];
    /** You pass in the entire parent list component */
    host: ListComponent<T>;
    /** If true, only one item is selectable next */
    solo: boolean;
    /** Checks for host and uses its list. */
    private ngOnChanges();
    /** Propagate clicked item to host or toggle selection. */
    columnClick(item: Item<any>): void;
}
