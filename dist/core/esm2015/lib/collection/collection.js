/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
/**
 * A Collection is a more sophisticated Array. It is fundamental for other classes like List.
 * @template T
 */
export class Collection {
    /**
     * Constructs the collection with the given item Array (optional).
     * \@example
     * ```typescript
     *  const numbers = new Collection([1, 2, 3]);
     * ```
     * @param {?=} items
     */
    constructor(items = []) {
        /**
         * Subject that is nexted when the items update
         */
        this.update = new Subject();
        /**
         * Subject that is nexted when the items change
         */
        this.update$ = this.update.asObservable();
        this.items = [];
        items.forEach((item) => {
            this.items.push(item);
        });
    }
    /**
     * Returns the index of the given item
     * @param {?} item
     * @return {?}
     */
    index(item) {
        return this.items.indexOf(item);
    }
    /**
     * Checks if the Collection contains the given item.
     * \@example
     * ```typescript
     * numbers.has(2); //true
     * ```
     * @param {?} item
     * @return {?}
     */
    has(item) {
        return this.index(item) !== -1;
    }
    /**
     * Checks if the Collection contains all given items.
     * \@example
     * ```typescript
     * numbers.has([1,2]); //true
     * ```
     * @param {?=} items
     * @return {?}
     */
    hasAll(items = []) {
        if (items === null) {
            // console.warn('has all fail', this, items);
            return false;
        }
        return items.reduce((has, item) => {
            return has && this.has(item);
        }, true);
    }
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
     * \@example
     * ```typescript
     * numbers.addAll([5, 6, 7]);
     * ```
     * @param {?=} items
     * @param {?=} unique
     * @param {?=} event
     * @return {?}
     */
    addAll(items = [], unique = false, event = true) {
        /** @type {?} */
        const length = this.items.length;
        items.forEach((item) => {
            this.add(item, unique, false);
        });
        if (this.items.length > length && event) {
            this.update.next(this);
        }
    }
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
     * \@example
     * ```typescript
     * numbers.removeAll();
     * ```
     * @param {?=} items
     * @param {?=} event
     * @return {?}
     */
    removeAll(items, event = true) {
        /** @type {?} */
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
    /**
     * Toggles the item in and out of collection
     * @param {?} item
     * @param {?=} event
     * @return {?}
     */
    toggle(item, event = true) {
        if (this.has(item)) {
            this.remove(item, event);
        }
        else {
            this.add(item, event);
        }
    }
    /**
     * Replaces all current items with the given items.
     * @param {?} items
     * @param {?=} event
     * @return {?}
     */
    replaceWith(items, event = true) {
        if (this.items && this.items.length) {
            this.removeAll(undefined, false);
        }
        if (items.length) {
            this.addAll(items, false, false);
        }
        if (event) {
            this.update.next(this);
        }
    }
    /**
     * Returns true if the collection is empty
     * @return {?}
     */
    isEmpty() {
        return this.items.length === 0;
    }
    /**
     * Moves the given item to the given array index.
     * @param {?} item
     * @param {?} index
     * @param {?=} event
     * @return {?}
     */
    move(item, index, event = true) {
        if (!this.has(item) || this.items.indexOf(item) === index) {
            return;
        }
        this.items.splice(index, 0, this.items.splice(this.items.indexOf(item), 1)[0]);
        if (event) {
            this.update.next(this);
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BlYy5jb21wb25lbnRzL2NvcmUvIiwic291cmNlcyI6WyJsaWIvY29sbGVjdGlvbi9jb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7OztBQUszQyxNQUFNLE9BQU8sVUFBVTs7Ozs7Ozs7O0lBaUJyQixZQUFZLFFBQWtCLEVBQUU7Ozs7UUFYdEIsV0FBTSxHQUEyQixJQUFJLE9BQU8sRUFBRSxDQUFDOzs7O1FBRWxELFlBQU8sR0FBOEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQVVyRSxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNoQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7SUFHRCxLQUFLLENBQUMsSUFBTztRQUNYLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7Ozs7Ozs7OztJQVNELEdBQUcsQ0FBQyxJQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7Ozs7Ozs7Ozs7SUFTRCxNQUFNLENBQUMsUUFBa0IsRUFBRTtRQUN6QixJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDbEIsNkNBQTZDO1lBQzdDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDaEMsT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJ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SyxDQUFDLE1BQU0sRUFBRTtZQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDbEM7UUFDRCxJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQzs7Ozs7SUFHRCxPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQzs7Ozs7Ozs7SUFHRCxJQUFJLENBQUMsSUFBTyxFQUFFLEtBQWEsRUFBRSxRQUFpQixJQUFJO1FBQ2hELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssRUFBRTtZQUN6RCxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0UsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN4QjtJQUNILENBQUM7Q0FDRjs7Ozs7O0lBcEtDLDJCQUF1Qjs7Ozs7O0lBRXZCLDRCQUF5RDs7Ozs7SUFFekQsNkJBQXVFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG4vKipcbiAqIEEgQ29sbGVjdGlvbiBpcyBhIG1vcmUgc29waGlzdGljYXRlZCBBcnJheS4gSXQgaXMgZnVuZGFtZW50YWwgZm9yIG90aGVyIGNsYXNzZXMgbGlrZSBMaXN0LlxuICovXG5leHBvcnQgY2xhc3MgQ29sbGVjdGlvbjxUPiB7XG4gIC8qKlxuICAgKiBUaGUgaXRlbXMgbXVzdCBhbGwgaGF2ZSB0aGUgc2FtZSB0eXBlIFQuXG4gICAqL1xuICBwdWJsaWMgaXRlbXM6IEFycmF5PFQ+O1xuICAvKiogU3ViamVjdCB0aGF0IGlzIG5leHRlZCB3aGVuIHRoZSBpdGVtcyB1cGRhdGUgKi9cbiAgcHJvdGVjdGVkIHVwZGF0ZTogU3ViamVjdDxDb2xsZWN0aW9uPFQ+PiA9IG5ldyBTdWJqZWN0KCk7XG4gIC8qKiBTdWJqZWN0IHRoYXQgaXMgbmV4dGVkIHdoZW4gdGhlIGl0ZW1zIGNoYW5nZSAqL1xuICBwdWJsaWMgdXBkYXRlJDogT2JzZXJ2YWJsZTxDb2xsZWN0aW9uPFQ+PiA9IHRoaXMudXBkYXRlLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIHRoZSBjb2xsZWN0aW9uIHdpdGggdGhlIGdpdmVuIGl0ZW0gQXJyYXkgKG9wdGlvbmFsKS5cbiAgICogQGV4YW1wbGVcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiAgY29uc3QgbnVtYmVycyA9IG5ldyBDb2xsZWN0aW9uKFsxLCAyLCAzXSk7XG4gICAqIGBgYFxuICAgKi9cbiAgY29uc3RydWN0b3IoaXRlbXM6IEFycmF5PFQ+ID0gW10pIHtcbiAgICB0aGlzLml0ZW1zID0gW107XG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgdGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBnaXZlbiBpdGVtICovXG4gIGluZGV4KGl0ZW06IFQpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLml0ZW1zLmluZGV4T2YoaXRlbSk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBDb2xsZWN0aW9uIGNvbnRhaW5zIHRoZSBnaXZlbiBpdGVtLlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIG51bWJlcnMuaGFzKDIpOyAvL3RydWVcbiAgICogYGBgXG4gICAqL1xuICBoYXMoaXRlbTogVCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmluZGV4KGl0ZW0pICE9PSAtMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIENvbGxlY3Rpb24gY29udGFpbnMgYWxsIGdpdmVuIGl0ZW1zLlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIG51bWJlcnMuaGFzKFsxLDJdKTsgLy90cnVlXG4gICAqIGBgYFxuICAgKi9cbiAgaGFzQWxsKGl0ZW1zOiBBcnJheTxUPiA9IFtdKTogYm9vbGVhbiB7XG4gICAgaWYgKGl0ZW1zID09PSBudWxsKSB7XG4gICAgICAvLyBjb25zb2xlLndhcm4oJ2hhcyBhbGwgZmFpbCcsIHRoaXMsIGl0ZW1zKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGl0ZW1zLnJlZHVjZSgoaGFzLCBpdGVtKSA9PiB7XG4gICAgICByZXR1cm4gaGFzICYmIHRoaXMuaGFzKGl0ZW0pO1xuICAgIH0sIHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgdGhlIGdpdmVuIGl0ZW0gdG8gdGhlIENvbGxlY3Rpb24uIElmIHRoZSB1bmlxdWUgZmxhZyBpcyBzZXQsIHRoZSBpdGVtIHdpbGwgb25seSBiZSBhZGRlZFxuICAgKiBpZiBpdCBpcyBub3QgY29udGFpbmVkLlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIG51bWJlcnMuYWRkKDQpO1xuICAgKiBgYGBcbiAgICovXG4gIGFkZChpdGVtOiBULCB1bmlxdWU/OiBib29sZWFuLCBldmVudDogYm9vbGVhbiA9IHRydWUpIHtcbiAgICBpZiAodW5pcXVlICYmIHRoaXMuaGFzKGl0ZW0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIHRoaXMudXBkYXRlLm5leHQodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgdGhlIGdpdmVuIGl0ZW1zIHRvIHRoZSBDb2xsZWN0aW9uLiBJZiB0aGUgdW5pcXVlIGZsYWcgaXMgc2V0LCBvbmx5IGl0ZW1zIHRoYXQgYXJlIG5vdFxuICAgKiBjb250YWluZWQgd2lsbCBiZSBhZGRlZC5cbiAgICogQGV4YW1wbGVcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiBudW1iZXJzLmFkZEFsbChbNSwgNiwgN10pO1xuICAgKiBgYGBcbiAgICovXG4gIGFkZEFsbChpdGVtczogQXJyYXk8VD4gPSBbXSwgdW5pcXVlOiBib29sZWFuID0gZmFsc2UsIGV2ZW50OiBib29sZWFuID0gdHJ1ZSkge1xuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMuaXRlbXMubGVuZ3RoO1xuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIHRoaXMuYWRkKGl0ZW0sIHVuaXF1ZSwgZmFsc2UpO1xuICAgIH0pO1xuICAgIGlmICh0aGlzLml0ZW1zLmxlbmd0aCA+IGxlbmd0aCAmJiBldmVudCkge1xuICAgICAgdGhpcy51cGRhdGUubmV4dCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgZ2l2ZW4gaXRlbSBmcm9tIHRoZSBDb2xsZWN0aW9uLlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIG51bWJlcnMucmVtb3ZlKDQpO1xuICAgKiBgYGBcbiAgICovXG4gIHJlbW92ZShpdGVtOiBULCBldmVudDogYm9vbGVhbiA9IHRydWUpIHtcbiAgICBpZiAoIXRoaXMuaGFzKGl0ZW0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuaXRlbXMuc3BsaWNlKHRoaXMuaW5kZXgoaXRlbSksIDEpO1xuICAgIGlmIChldmVudCkge1xuICAgICAgdGhpcy51cGRhdGUubmV4dCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgaXRlbXMgZnJvbSB0aGUgQ29sbGVjdGlvbi5cbiAgICogQGV4YW1wbGVcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiBudW1iZXJzLnJlbW92ZUFsbCgpO1xuICAgKiBgYGBcbiAgICovXG4gIHJlbW92ZUFsbChpdGVtcz86IEFycmF5PFQ+LCBldmVudDogYm9vbGVhbiA9IHRydWUpIHtcbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLml0ZW1zLmxlbmd0aDtcbiAgICBpZiAoaXRlbXMpIHtcbiAgICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgdGhpcy5yZW1vdmUoaXRlbSwgZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXRlbXMubGVuZ3RoID0gMDtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXRlbXMubGVuZ3RoIDwgbGVuZ3RoICYmIGV2ZW50KSB7XG4gICAgICB0aGlzLnVwZGF0ZS5uZXh0KHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBUb2dnbGVzIHRoZSBpdGVtIGluIGFuZCBvdXQgb2YgY29sbGVjdGlvbiAqL1xuICB0b2dnbGUoaXRlbTogVCwgZXZlbnQ6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgaWYgKHRoaXMuaGFzKGl0ZW0pKSB7XG4gICAgICB0aGlzLnJlbW92ZShpdGVtLCBldmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkKGl0ZW0sIGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICAvKiogUmVwbGFjZXMgYWxsIGN1cnJlbnQgaXRlbXMgd2l0aCB0aGUgZ2l2ZW4gaXRlbXMuICovXG4gIHJlcGxhY2VXaXRoKGl0ZW1zOiBBcnJheTxUPiwgZXZlbnQ6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgaWYgKHRoaXMuaXRlbXMgJiYgdGhpcy5pdGVtcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMucmVtb3ZlQWxsKHVuZGVmaW5lZCwgZmFsc2UpO1xuICAgIH1cbiAgICBpZiAoaXRlbXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmFkZEFsbChpdGVtcywgZmFsc2UsIGZhbHNlKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICB0aGlzLnVwZGF0ZS5uZXh0KHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHRydWUgaWYgdGhlIGNvbGxlY3Rpb24gaXMgZW1wdHkgKi9cbiAgaXNFbXB0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5pdGVtcy5sZW5ndGggPT09IDA7XG4gIH1cblxuICAvKiogTW92ZXMgdGhlIGdpdmVuIGl0ZW0gdG8gdGhlIGdpdmVuIGFycmF5IGluZGV4LiAqL1xuICBtb3ZlKGl0ZW06IFQsIGluZGV4OiBudW1iZXIsIGV2ZW50OiBib29sZWFuID0gdHJ1ZSkge1xuICAgIGlmICghdGhpcy5oYXMoaXRlbSkgfHwgdGhpcy5pdGVtcy5pbmRleE9mKGl0ZW0pID09PSBpbmRleCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLml0ZW1zLnNwbGljZShpbmRleCwgMCwgdGhpcy5pdGVtcy5zcGxpY2UodGhpcy5pdGVtcy5pbmRleE9mKGl0ZW0pLCAxKVswXSk7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICB0aGlzLnVwZGF0ZS5uZXh0KHRoaXMpO1xuICAgIH1cbiAgfVxufVxuIl19