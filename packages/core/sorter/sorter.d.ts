import { Item } from '../item/item';
export declare function sortString(a: any, b: any): number;
export declare function sortNumber(a: any, b: any): number;
export declare function sortBoolean(a: any, b: any): 1 | -1;
/** The Sorter is a singleton that handles all kinds of sorting operations. */
export declare abstract class Sorter<T> {
    /** Contains sorting methods for different value types. */
    static sortType: {
        'string': (a: any, b: any) => number;
        'number': (a: any, b: any) => number;
        'boolean': (a: any, b: any) => 1 | -1;
    };
    /** Returns the sorting algorithm for the given item array. */
    private static getAlgorithm(items, property?);
    /** Sorts a given Array of items after a given property.
     * @param items Array of arbitrary content.
     * @param property Optional property to sort after (For Objects)
     * @param desc Optional Flag that will reverse sort the result (descending).
     * @param resolve Optional resolve function to expose relevant the part of object that contains
     *   the given property. */
    static sort(items: Array<Item<any>>, property?: string, desc?: boolean): Array<any>;
}
