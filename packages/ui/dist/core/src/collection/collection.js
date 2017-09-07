"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
/**
 * A Collection is a more sophisticated Array. It is fundamental for other classes like List.
 */
class Collection {
    /**
     * Constructs the collection with the given item Array (optional).
     * @example
     * ```typescript
     *  const numbers = new Collection([1, 2, 3]);
     * ```
     */
    constructor(items = []) {
        /** Subject that is nexted when the items update */
        this.update = new rxjs_1.Subject();
        /** Subject that is nexted when the items change */
        this.update$ = this.update.asObservable();
        this.items = [];
        items.forEach((item) => {
            this.items.push(item);
        });
    }
    /** Returns the index of the given item */
    index(item) {
        return this.items.indexOf(item);
    }
    /**
     * Checks if the Collection contains the given item.
     * @example
     * ```typescript
     * numbers.has(2); //true
     * ```
     */
    has(item) {
        return this.index(item) !== -1;
    }
    /**
     * Checks if the Collection contains all given items.
     * @example
     * ```typescript
     * numbers.has([1,2]); //true
     * ```
     */
    hasAll(items = []) {
        if (items === null) {
            // console.warn('has all fail', this, items);
            return;
        }
        return items.reduce((has, item) => {
            return has && this.has(item);
        }, true);
    }
    /**
     * Adds the given item to the Collection. If the unique flag is set, the item will only be added
     * if it is not contained.
     * @example
     * ```typescript
     * numbers.add(4);
     * ```
     */
    add(item, unique, event = true) {
        if (unique && this.has(item)) {
            return false;
        }
        this.items.push(item);
        if (event) {
            this.update.next(this);
        }
    }
    /**
     * Adds the given items to the Collection. If the unique flag is set, only items that are not
     * contained will be added.
     * @example
     * ```typescript
     * numbers.addAll([5, 6, 7]);
     * ```
     */
    addAll(items = [], unique = false, event = true) {
        const length = this.items.length;
        items.forEach((item) => {
            this.add(item, unique, false);
        });
        if (this.items.length > length && event) {
            this.update.next(this);
        }
    }
    ;
    /**
     * Removes the given item from the Collection.
     * @example
     * ```typescript
     * numbers.remove(4);
     * ```
     */
    remove(item, event = true) {
        if (!this.has(item)) {
            return false;
        }
        this.items.splice(this.index(item), 1);
        if (event) {
            this.update.next(this);
        }
    }
    /**
     * Removes all items from the Collection.
     * @example
     * ```typescript
     * numbers.removeAll();
     * ```
     */
    removeAll(items, event = true) {
        const length = this.items.length;
        if (items) {
            items.forEach((item) => {
                this.remove(item, false);
            });
        }
        else {
            this.items.length = 0;
        }
        if (this.items.length < length && event) {
            this.update.next(this);
        }
    }
    /** Replaces all current items with the given items. */
    replaceWith(items, event = true) {
        if (this.items && this.items.length) {
            this.removeAll(null, false);
        }
        if (items.length) {
            this.addAll(items, false, false);
        }
        if (event) {
            this.update.next(this);
        }
    }
    /** Returns true if the collection is empty */
    isEmpty() {
        return this.items.length === 0;
    }
}
exports.Collection = Collection;
//# sourceMappingURL=collection.js.map