import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Collection } from '../collection/collection';
import { Item } from '../item/item';
import { Field } from '../field/field';
import { ListConfig } from './list-config.interface';
import { Pagination } from '../pagination/pagination';
import 'rxjs/add/operator/debounceTime';
/**
 * A more sophisticated Collection of Objects with arbitrary content.
 * It comes with features like resolve functions, identifiers, display formatting and sorting.
 */
export declare class List<T> extends Collection<Item<T>> {
    /**
     * Array of Properties that are relevant for each item. The fields are populated on construction
     * via getFields method.
     */
    fields: Array<Field>;
    /**
     * The List Configuration, click on ListConfig for details. Can be given an optional ListConfig.
     */
    config: ListConfig<T>;
    /**
     * Current Value Groups (Different Unique Values).
     */
    groups: any[];
    /** The list's pagination (Optional) */
    pagination: Pagination<T>;
    /** The items of the current page */
    page: Array<Item<T>>;
    /** Subject that should be nexted when loading is finished */
    protected change: Subject<List<T>>;
    /** Observable that is nexted when the list has changed. */
    change$: Observable<List<T>>;
    /**
     * Constructs the List. Populates the items and instantiates the fields.
     */
    constructor(values?: Array<T>, config?: ListConfig<T>, pagination?: Pagination<T>);
    /** Loads the list page with the given config or, if none given, uses the current config.
     * Reapplies grouping (if any) and calls the change Subject. */
    load(config?: ListConfig<T>): void;
    /** Adds the given item to the list and assigns the list config to the item*/
    add(item: Item<T>, unique?: boolean, event?: boolean): false | undefined;
    /**
     * Distills Array of item properties. Either uses keys of config.fields or parses the item
     * properties directly.
     */
    protected getFields(): Array<Field>;
    /**
     * Resolves the item with the given Array index or identifier (if configured)
     */
    id(identifier: any): Item<T>;
    /** Filters the list after the given property and value */
    filter(property: string, value?: any, operator?: string): void;
    /** Changes the config's sort variables to reflect the given sorting */
    protected sortProperty(property: string, desc?: boolean): void;
    /** Sorts with given sorting, using the Sorter */
    toggleSort(property: string, desc?: boolean): void;
    /** Returns an Array of all unique values of the given property */
    groupBy(property: any): void;
    /** Item tracking for *ngFor. */
    trackItem(index: any, item: any): any;
}
