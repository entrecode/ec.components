"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = require("rxjs/Subject");
/**
 * A Collection is a more sophisticated Array. It is fundamental for other classes like List.
 */
var Collection = /** @class */ (function () {
    /**
     * Constructs the collection with the given item Array (optional).
     * @example
     * ```typescript
     *  const numbers = new Collection([1, 2, 3]);
     * ```
     */
    function Collection(items) {
        if (items === void 0) { items = []; }
        var _this = this;
        /** Subject that is nexted when the items update */
        this.update = new Subject_1.Subject();
        /** Subject that is nexted when the items change */
        this.update$ = this.update.asObservable();
        this.items = [];
        items.forEach(function (item) {
            _this.items.push(item);
        });
    }
    /** Returns the index of the given item */
    Collection.prototype.index = function (item) {
        return this.items.indexOf(item);
    };
    /**
     * Checks if the Collection contains the given item.
     * @example
     * ```typescript
     * numbers.has(2); //true
     * ```
     */
    Collection.prototype.has = function (item) {
        return this.index(item) !== -1;
    };
    /**
     * Checks if the Collection contains all given items.
     * @example
     * ```typescript
     * numbers.has([1,2]); //true
     * ```
     */
    Collection.prototype.hasAll = function (items) {
        var _this = this;
        if (items === void 0) { items = []; }
        if (items === null) {
            // console.warn('has all fail', this, items);
            return false;
        }
        return items.reduce(function (has, item) {
            return has && _this.has(item);
        }, true);
    };
    /**
     * Adds the given item to the Collection. If the unique flag is set, the item will only be added
     * if it is not contained.
     * @example
     * ```typescript
     * numbers.add(4);
     * ```
     */
    Collection.prototype.add = function (item, unique, event) {
        if (event === void 0) { event = true; }
        if (unique && this.has(item)) {
            return false;
        }
        this.items.push(item);
        if (event) {
            this.update.next(this);
        }
    };
    /**
     * Adds the given items to the Collection. If the unique flag is set, only items that are not
     * contained will be added.
     * @example
     * ```typescript
     * numbers.addAll([5, 6, 7]);
     * ```
     */
    Collection.prototype.addAll = function (items, unique, event) {
        var _this = this;
        if (items === void 0) { items = []; }
        if (unique === void 0) { unique = false; }
        if (event === void 0) { event = true; }
        var length = this.items.length;
        items.forEach(function (item) {
            _this.add(item, unique, false);
        });
        if (this.items.length > length && event) {
            this.update.next(this);
        }
    };
    ;
    /**
     * Removes the given item from the Collection.
     * @example
     * ```typescript
     * numbers.remove(4);
     * ```
     */
    Collection.prototype.remove = function (item, event) {
        if (event === void 0) { event = true; }
        if (!this.has(item)) {
            return false;
        }
        this.items.splice(this.index(item), 1);
        if (event) {
            this.update.next(this);
        }
    };
    /**
     * Removes all items from the Collection.
     * @example
     * ```typescript
     * numbers.removeAll();
     * ```
     */
    Collection.prototype.removeAll = function (items, event) {
        var _this = this;
        if (event === void 0) { event = true; }
        var length = this.items.length;
        if (items) {
            items.forEach(function (item) {
                _this.remove(item, false);
            });
        }
        else {
            this.items.length = 0;
        }
        if (this.items.length < length && event) {
            this.update.next(this);
        }
    };
    /** Replaces all current items with the given items. */
    Collection.prototype.replaceWith = function (items, event) {
        if (event === void 0) { event = true; }
        if (this.items && this.items.length) {
            this.removeAll(null, false);
        }
        if (items.length) {
            this.addAll(items, false, false);
        }
        if (event) {
            this.update.next(this);
        }
    };
    /** Returns true if the collection is empty */
    Collection.prototype.isEmpty = function () {
        return this.items.length === 0;
    };
    return Collection;
}());
exports.Collection = Collection;
