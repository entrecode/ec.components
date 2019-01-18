/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
/**
 * A Collection is a more sophisticated Array. It is fundamental for other classes like List.
 * @template T
 */
var /**
 * A Collection is a more sophisticated Array. It is fundamental for other classes like List.
 * @template T
 */
Collection = /** @class */ (function () {
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
        /**
         * Subject that is nexted when the items update
         */
        this.update = new Subject();
        /**
         * Subject that is nexted when the items change
         */
        this.update$ = this.update.asObservable();
        this.items = [];
        items.forEach(function (item) {
            _this.items.push(item);
        });
    }
    /** Returns the index of the given item */
    /**
     * Returns the index of the given item
     * @param {?} item
     * @return {?}
     */
    Collection.prototype.index = /**
     * Returns the index of the given item
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return this.items.indexOf(item);
    };
    /**
     * Checks if the Collection contains the given item.
     * @example
     * ```typescript
     * numbers.has(2); //true
     * ```
     */
    /**
     * Checks if the Collection contains the given item.
     * \@example
     * ```typescript
     * numbers.has(2); //true
     * ```
     * @param {?} item
     * @return {?}
     */
    Collection.prototype.has = /**
     * Checks if the Collection contains the given item.
     * \@example
     * ```typescript
     * numbers.has(2); //true
     * ```
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return this.index(item) !== -1;
    };
    /**
     * Checks if the Collection contains all given items.
     * @example
     * ```typescript
     * numbers.has([1,2]); //true
     * ```
     */
    /**
     * Checks if the Collection contains all given items.
     * \@example
     * ```typescript
     * numbers.has([1,2]); //true
     * ```
     * @param {?=} items
     * @return {?}
     */
    Collection.prototype.hasAll = /**
     * Checks if the Collection contains all given items.
     * \@example
     * ```typescript
     * numbers.has([1,2]); //true
     * ```
     * @param {?=} items
     * @return {?}
     */
    function (items) {
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
    /**
     * Adds the given item to the Collection. If the unique flag is set, the item will only be added
     * if it is not contained.
     * \@example
     * ```typescript
     * numbers.add(4);
     * ```
     * @param {?} item
     * @param {?=} unique
     * @param {?=} event
     * @return {?}
     */
    Collection.prototype.add = /**
     * Adds the given item to the Collection. If the unique flag is set, the item will only be added
     * if it is not contained.
     * \@example
     * ```typescript
     * numbers.add(4);
     * ```
     * @param {?} item
     * @param {?=} unique
     * @param {?=} event
     * @return {?}
     */
    function (item, unique, event) {
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
    /**
     * Adds the given items to the Collection. If the unique flag is set, only items that are not
     * contained will be added.
     * \@example
     * ```typescript
     * numbers.addAll([5, 6, 7]);
     * ```
     * @param {?=} items
     * @param {?=} unique
     * @param {?=} event
     * @return {?}
     */
    Collection.prototype.addAll = /**
     * Adds the given items to the Collection. If the unique flag is set, only items that are not
     * contained will be added.
     * \@example
     * ```typescript
     * numbers.addAll([5, 6, 7]);
     * ```
     * @param {?=} items
     * @param {?=} unique
     * @param {?=} event
     * @return {?}
     */
    function (items, unique, event) {
        var _this = this;
        if (items === void 0) { items = []; }
        if (unique === void 0) { unique = false; }
        if (event === void 0) { event = true; }
        /** @type {?} */
        var length = this.items.length;
        items.forEach(function (item) {
            _this.add(item, unique, false);
        });
        if (this.items.length > length && event) {
            this.update.next(this);
        }
    };
    /**
     * Removes the given item from the Collection.
     * @example
     * ```typescript
     * numbers.remove(4);
     * ```
     */
    /**
     * Removes the given item from the Collection.
     * \@example
     * ```typescript
     * numbers.remove(4);
     * ```
     * @param {?} item
     * @param {?=} event
     * @return {?}
     */
    Collection.prototype.remove = /**
     * Removes the given item from the Collection.
     * \@example
     * ```typescript
     * numbers.remove(4);
     * ```
     * @param {?} item
     * @param {?=} event
     * @return {?}
     */
    function (item, event) {
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
    /**
     * Removes all items from the Collection.
     * \@example
     * ```typescript
     * numbers.removeAll();
     * ```
     * @param {?=} items
     * @param {?=} event
     * @return {?}
     */
    Collection.prototype.removeAll = /**
     * Removes all items from the Collection.
     * \@example
     * ```typescript
     * numbers.removeAll();
     * ```
     * @param {?=} items
     * @param {?=} event
     * @return {?}
     */
    function (items, event) {
        var _this = this;
        if (event === void 0) { event = true; }
        /** @type {?} */
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
    /** Toggles the item in and out of collection */
    /**
     * Toggles the item in and out of collection
     * @param {?} item
     * @param {?=} event
     * @return {?}
     */
    Collection.prototype.toggle = /**
     * Toggles the item in and out of collection
     * @param {?} item
     * @param {?=} event
     * @return {?}
     */
    function (item, event) {
        if (event === void 0) { event = true; }
        if (this.has(item)) {
            this.remove(item, event);
        }
        else {
            this.add(item, event);
        }
    };
    /** Replaces all current items with the given items. */
    /**
     * Replaces all current items with the given items.
     * @param {?} items
     * @param {?=} event
     * @return {?}
     */
    Collection.prototype.replaceWith = /**
     * Replaces all current items with the given items.
     * @param {?} items
     * @param {?=} event
     * @return {?}
     */
    function (items, event) {
        if (event === void 0) { event = true; }
        if (this.items && this.items.length) {
            this.removeAll(undefined, false);
        }
        if (items.length) {
            this.addAll(items, false, false);
        }
        if (event) {
            this.update.next(this);
        }
    };
    /** Returns true if the collection is empty */
    /**
     * Returns true if the collection is empty
     * @return {?}
     */
    Collection.prototype.isEmpty = /**
     * Returns true if the collection is empty
     * @return {?}
     */
    function () {
        return this.items.length === 0;
    };
    /** Moves the given item to the given array index. */
    /**
     * Moves the given item to the given array index.
     * @param {?} item
     * @param {?} index
     * @param {?=} event
     * @return {?}
     */
    Collection.prototype.move = /**
     * Moves the given item to the given array index.
     * @param {?} item
     * @param {?} index
     * @param {?=} event
     * @return {?}
     */
    function (item, index, event) {
        if (event === void 0) { event = true; }
        if (!this.has(item) || this.items.indexOf(item) === index) {
            return;
        }
        this.items.splice(index, 0, this.items.splice(this.items.indexOf(item), 1)[0]);
        if (event) {
            this.update.next(this);
        }
    };
    return Collection;
}());
/**
 * A Collection is a more sophisticated Array. It is fundamental for other classes like List.
 * @template T
 */
export { Collection };
if (false) {
    /**
     * The items must all have the same type T.
     * @type {?}
     */
    Collection.prototype.items;
    /**
     * Subject that is nexted when the items update
     * @type {?}
     * @protected
     */
    Collection.prototype.update;
    /**
     * Subject that is nexted when the items change
     * @type {?}
     */
    Collection.prototype.update$;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BlYy5jb21wb25lbnRzL2NvcmUvIiwic291cmNlcyI6WyJsaWIvY29sbGVjdGlvbi9jb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7OztBQUszQzs7Ozs7SUFVRTs7Ozs7O09BTUc7SUFDSCxvQkFBWSxLQUFvQjtRQUFwQixzQkFBQSxFQUFBLFVBQW9CO1FBQWhDLGlCQUtDOzs7O1FBaEJTLFdBQU0sR0FBMkIsSUFBSSxPQUFPLEVBQUUsQ0FBQzs7OztRQUVsRCxZQUFPLEdBQThCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7UUFVckUsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7WUFDakIsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsMENBQTBDOzs7Ozs7SUFDMUMsMEJBQUs7Ozs7O0lBQUwsVUFBTSxJQUFPO1FBQ1gsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7Ozs7OztPQU1HOzs7Ozs7Ozs7O0lBQ0gsd0JBQUc7Ozs7Ozs7OztJQUFILFVBQUksSUFBTztRQUNULE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7OztPQU1HOzs7Ozs7Ozs7O0lBQ0gsMkJBQU07Ozs7Ozs7OztJQUFOLFVBQU8sS0FBb0I7UUFBM0IsaUJBUUM7UUFSTSxzQkFBQSxFQUFBLFVBQW9CO1FBQ3pCLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtZQUNsQiw2Q0FBNkM7WUFD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QUU7WUFDekQsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9FLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDeEI7SUFDSCxDQUFDO0lBQ0gsaUJBQUM7QUFBRCxDQUFDLEFBeEtELElBd0tDOzs7Ozs7Ozs7OztJQXBLQywyQkFBdUI7Ozs7OztJQUV2Qiw0QkFBeUQ7Ozs7O0lBRXpELDZCQUF1RSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBBIENvbGxlY3Rpb24gaXMgYSBtb3JlIHNvcGhpc3RpY2F0ZWQgQXJyYXkuIEl0IGlzIGZ1bmRhbWVudGFsIGZvciBvdGhlciBjbGFzc2VzIGxpa2UgTGlzdC5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbGxlY3Rpb248VD4ge1xuICAvKipcbiAgICogVGhlIGl0ZW1zIG11c3QgYWxsIGhhdmUgdGhlIHNhbWUgdHlwZSBULlxuICAgKi9cbiAgcHVibGljIGl0ZW1zOiBBcnJheTxUPjtcbiAgLyoqIFN1YmplY3QgdGhhdCBpcyBuZXh0ZWQgd2hlbiB0aGUgaXRlbXMgdXBkYXRlICovXG4gIHByb3RlY3RlZCB1cGRhdGU6IFN1YmplY3Q8Q29sbGVjdGlvbjxUPj4gPSBuZXcgU3ViamVjdCgpO1xuICAvKiogU3ViamVjdCB0aGF0IGlzIG5leHRlZCB3aGVuIHRoZSBpdGVtcyBjaGFuZ2UgKi9cbiAgcHVibGljIHVwZGF0ZSQ6IE9ic2VydmFibGU8Q29sbGVjdGlvbjxUPj4gPSB0aGlzLnVwZGF0ZS5hc09ic2VydmFibGUoKTtcblxuICAvKipcbiAgICogQ29uc3RydWN0cyB0aGUgY29sbGVjdGlvbiB3aXRoIHRoZSBnaXZlbiBpdGVtIEFycmF5IChvcHRpb25hbCkuXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogIGNvbnN0IG51bWJlcnMgPSBuZXcgQ29sbGVjdGlvbihbMSwgMiwgM10pO1xuICAgKiBgYGBcbiAgICovXG4gIGNvbnN0cnVjdG9yKGl0ZW1zOiBBcnJheTxUPiA9IFtdKSB7XG4gICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgZ2l2ZW4gaXRlbSAqL1xuICBpbmRleChpdGVtOiBUKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5pdGVtcy5pbmRleE9mKGl0ZW0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgQ29sbGVjdGlvbiBjb250YWlucyB0aGUgZ2l2ZW4gaXRlbS5cbiAgICogQGV4YW1wbGVcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiBudW1iZXJzLmhhcygyKTsgLy90cnVlXG4gICAqIGBgYFxuICAgKi9cbiAgaGFzKGl0ZW06IFQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pbmRleChpdGVtKSAhPT0gLTE7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBDb2xsZWN0aW9uIGNvbnRhaW5zIGFsbCBnaXZlbiBpdGVtcy5cbiAgICogQGV4YW1wbGVcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiBudW1iZXJzLmhhcyhbMSwyXSk7IC8vdHJ1ZVxuICAgKiBgYGBcbiAgICovXG4gIGhhc0FsbChpdGVtczogQXJyYXk8VD4gPSBbXSk6IGJvb2xlYW4ge1xuICAgIGlmIChpdGVtcyA9PT0gbnVsbCkge1xuICAgICAgLy8gY29uc29sZS53YXJuKCdoYXMgYWxsIGZhaWwnLCB0aGlzLCBpdGVtcyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBpdGVtcy5yZWR1Y2UoKGhhcywgaXRlbSkgPT4ge1xuICAgICAgcmV0dXJuIGhhcyAmJiB0aGlzLmhhcyhpdGVtKTtcbiAgICB9LCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSBnaXZlbiBpdGVtIHRvIHRoZSBDb2xsZWN0aW9uLiBJZiB0aGUgdW5pcXVlIGZsYWcgaXMgc2V0LCB0aGUgaXRlbSB3aWxsIG9ubHkgYmUgYWRkZWRcbiAgICogaWYgaXQgaXMgbm90IGNvbnRhaW5lZC5cbiAgICogQGV4YW1wbGVcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiBudW1iZXJzLmFkZCg0KTtcbiAgICogYGBgXG4gICAqL1xuICBhZGQoaXRlbTogVCwgdW5pcXVlPzogYm9vbGVhbiwgZXZlbnQ6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgaWYgKHVuaXF1ZSAmJiB0aGlzLmhhcyhpdGVtKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLml0ZW1zLnB1c2goaXRlbSk7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICB0aGlzLnVwZGF0ZS5uZXh0KHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSBnaXZlbiBpdGVtcyB0byB0aGUgQ29sbGVjdGlvbi4gSWYgdGhlIHVuaXF1ZSBmbGFnIGlzIHNldCwgb25seSBpdGVtcyB0aGF0IGFyZSBub3RcbiAgICogY29udGFpbmVkIHdpbGwgYmUgYWRkZWQuXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogbnVtYmVycy5hZGRBbGwoWzUsIDYsIDddKTtcbiAgICogYGBgXG4gICAqL1xuICBhZGRBbGwoaXRlbXM6IEFycmF5PFQ+ID0gW10sIHVuaXF1ZTogYm9vbGVhbiA9IGZhbHNlLCBldmVudDogYm9vbGVhbiA9IHRydWUpIHtcbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLml0ZW1zLmxlbmd0aDtcbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICB0aGlzLmFkZChpdGVtLCB1bmlxdWUsIGZhbHNlKTtcbiAgICB9KTtcbiAgICBpZiAodGhpcy5pdGVtcy5sZW5ndGggPiBsZW5ndGggJiYgZXZlbnQpIHtcbiAgICAgIHRoaXMudXBkYXRlLm5leHQodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIGdpdmVuIGl0ZW0gZnJvbSB0aGUgQ29sbGVjdGlvbi5cbiAgICogQGV4YW1wbGVcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiBudW1iZXJzLnJlbW92ZSg0KTtcbiAgICogYGBgXG4gICAqL1xuICByZW1vdmUoaXRlbTogVCwgZXZlbnQ6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgaWYgKCF0aGlzLmhhcyhpdGVtKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLml0ZW1zLnNwbGljZSh0aGlzLmluZGV4KGl0ZW0pLCAxKTtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIHRoaXMudXBkYXRlLm5leHQodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIGl0ZW1zIGZyb20gdGhlIENvbGxlY3Rpb24uXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogbnVtYmVycy5yZW1vdmVBbGwoKTtcbiAgICogYGBgXG4gICAqL1xuICByZW1vdmVBbGwoaXRlbXM/OiBBcnJheTxUPiwgZXZlbnQ6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5pdGVtcy5sZW5ndGg7XG4gICAgaWYgKGl0ZW1zKSB7XG4gICAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHRoaXMucmVtb3ZlKGl0ZW0sIGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLml0ZW1zLmxlbmd0aCA9IDA7XG4gICAgfVxuICAgIGlmICh0aGlzLml0ZW1zLmxlbmd0aCA8IGxlbmd0aCAmJiBldmVudCkge1xuICAgICAgdGhpcy51cGRhdGUubmV4dCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvKiogVG9nZ2xlcyB0aGUgaXRlbSBpbiBhbmQgb3V0IG9mIGNvbGxlY3Rpb24gKi9cbiAgdG9nZ2xlKGl0ZW06IFQsIGV2ZW50OiBib29sZWFuID0gdHJ1ZSkge1xuICAgIGlmICh0aGlzLmhhcyhpdGVtKSkge1xuICAgICAgdGhpcy5yZW1vdmUoaXRlbSwgZXZlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZChpdGVtLCBldmVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFJlcGxhY2VzIGFsbCBjdXJyZW50IGl0ZW1zIHdpdGggdGhlIGdpdmVuIGl0ZW1zLiAqL1xuICByZXBsYWNlV2l0aChpdGVtczogQXJyYXk8VD4sIGV2ZW50OiBib29sZWFuID0gdHJ1ZSkge1xuICAgIGlmICh0aGlzLml0ZW1zICYmIHRoaXMuaXRlbXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnJlbW92ZUFsbCh1bmRlZmluZWQsIGZhbHNlKTtcbiAgICB9XG4gICAgaWYgKGl0ZW1zLmxlbmd0aCkge1xuICAgICAgdGhpcy5hZGRBbGwoaXRlbXMsIGZhbHNlLCBmYWxzZSk7XG4gICAgfVxuICAgIGlmIChldmVudCkge1xuICAgICAgdGhpcy51cGRhdGUubmV4dCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvKiogUmV0dXJucyB0cnVlIGlmIHRoZSBjb2xsZWN0aW9uIGlzIGVtcHR5ICovXG4gIGlzRW1wdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXRlbXMubGVuZ3RoID09PSAwO1xuICB9XG5cbiAgLyoqIE1vdmVzIHRoZSBnaXZlbiBpdGVtIHRvIHRoZSBnaXZlbiBhcnJheSBpbmRleC4gKi9cbiAgbW92ZShpdGVtOiBULCBpbmRleDogbnVtYmVyLCBldmVudDogYm9vbGVhbiA9IHRydWUpIHtcbiAgICBpZiAoIXRoaXMuaGFzKGl0ZW0pIHx8IHRoaXMuaXRlbXMuaW5kZXhPZihpdGVtKSA9PT0gaW5kZXgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5pdGVtcy5zcGxpY2UoaW5kZXgsIDAsIHRoaXMuaXRlbXMuc3BsaWNlKHRoaXMuaXRlbXMuaW5kZXhPZihpdGVtKSwgMSlbMF0pO1xuICAgIGlmIChldmVudCkge1xuICAgICAgdGhpcy51cGRhdGUubmV4dCh0aGlzKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==