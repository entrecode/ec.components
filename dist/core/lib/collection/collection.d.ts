import { Observable, Subject } from 'rxjs';
/**
 * A Collection is a more sophisticated Array. It is fundamental for other classes like List.
 */
export declare class Collection<T> {
    /**
     * The items must all have the same type T.
     */
    items: Array<T>;
    /** Subject that is nexted when the items update */
    protected update: Subject<Collection<T>>;
    /** Subject that is nexted when the items change */
    update$: Observable<Collection<T>>;
    /**
     * Constructs the collection with the given item Array (optional).
     * @example
     * ```typescript
     *  const numbers = new Collection([1, 2, 3]);
     * ```
     */
    constructor(items?: Array<T>);
    /** Returns the index of the given item */
    index(item: T): number;
    /**
     * Checks if the Collection contains the given item.
     * @example
     * ```typescript
     * numbers.has(2); //true
     * ```
     */
    has(item: T): boolean;
    /**
     * Checks if the Collection contains all given items.
     * @example
     * ```typescript
     * numbers.has([1,2]); //true
     * ```
     */
    hasAll(items?: Array<T>): boolean;
    /**
     * Adds the given item to the Collection. If the unique flag is set, the item will only be added
     * if it is not contained.
     * @example
     * ```typescript
     * numbers.add(4);
     * ```
     */
    add(item: T, unique?: boolean, event?: boolean): boolean;
    /**
     * Adds the given items to the Collection. If the unique flag is set, only items that are not
     * contained will be added.
     * @example
     * ```typescript
     * numbers.addAll([5, 6, 7]);
     * ```
     */
    addAll(items?: Array<T>, unique?: boolean, event?: boolean): void;
    /**
     * Removes the given item from the Collection.
     * @example
     * ```typescript
     * numbers.remove(4);
     * ```
     */
    remove(item: T, event?: boolean): boolean;
    /**
     * Removes all items from the Collection.
     * @example
     * ```typescript
     * numbers.removeAll();
     * ```
     */
    removeAll(items?: Array<T>, event?: boolean): void;
    /** Toggles the item in and out of collection */
    toggle(item: T, event?: boolean): void;
    /** Replaces all current items with the given items. */
    replaceWith(items: Array<T>, event?: boolean): void;
    /** Returns true if the collection is empty */
    isEmpty(): boolean;
    /** Moves the given item to the given array index. */
    move(item: T, index: number, event?: boolean): void;
}
