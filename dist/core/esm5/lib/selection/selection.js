/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { List } from '../list/list';
/**
 * Extension of List that keeps track of selected items. It can keep track of items via identifier
 * property even if the object references are being replaced, e.g. when reloading a set if items.
 * It supports solo and multiple selection.
 * @template T
 */
var /**
 * Extension of List that keeps track of selected items. It can keep track of items via identifier
 * property even if the object references are being replaced, e.g. when reloading a set if items.
 * It supports solo and multiple selection.
 * @template T
 */
Selection = /** @class */ (function (_super) {
    tslib_1.__extends(Selection, _super);
    function Selection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** Adds item to selection. If solo is true, all other items will be removed. */
    /**
     * Adds item to selection. If solo is true, all other items will be removed.
     * @param {?} item
     * @param {?=} solo
     * @return {?}
     */
    Selection.prototype.select = /**
     * Adds item to selection. If solo is true, all other items will be removed.
     * @param {?} item
     * @param {?=} solo
     * @return {?}
     */
    function (item, solo) {
        if (solo === void 0) { solo = this.config.solo; }
        if (solo) {
            this.removeAll();
            this.add(item);
        }
        else {
            this.add(item, true);
        }
    };
    /** Returns the index of the given item or an item that has the same identifier or value. */
    /**
     * Returns the index of the given item or an item that has the same identifier or value.
     * @param {?} item
     * @return {?}
     */
    Selection.prototype.index = /**
     * Returns the index of the given item or an item that has the same identifier or value.
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (this.config.identifier) {
            return this.items.indexOf(this.id(item.resolve(this.config.identifier)));
        }
        return this.items.indexOf(this.items.find(function (i) { return i.resolve() === item.resolve(); }));
    };
    /**
     * @param {?} item
     * @return {?}
     */
    Selection.prototype.has = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return _super.prototype.has.call(this, item) || this.index(item) !== -1;
    };
    /** Toggle item in and out of selection.
     * The solo property will change the behaviour like you would expect it to behave :) */
    /**
     * Toggle item in and out of selection.
     * The solo property will change the behaviour like you would expect it to behave :)
     * @param {?} item
     * @param {?=} solo
     * @param {?=} event
     * @return {?}
     */
    Selection.prototype.toggle = /**
     * Toggle item in and out of selection.
     * The solo property will change the behaviour like you would expect it to behave :)
     * @param {?} item
     * @param {?=} solo
     * @param {?=} event
     * @return {?}
     */
    function (item, solo, event) {
        if (solo === void 0) { solo = this.config.solo; }
        if (event === void 0) { event = true; }
        if (!item) {
            console.warn('toggle malicious item', item);
            return;
        }
        if (!this.has(item)) {
            if (solo) {
                return this.replaceWith([item], event);
            }
            this.add(item, event);
        }
        else if (solo) {
            if (this.items.length > 1) {
                // if multiple are selected => keep item
                return this.replaceWith([item], event);
            }
            this.removeAll();
        }
        else {
            this.remove(item, event);
        }
    };
    /** Toggle multiple items. You can control if the items should be kept, flipped, or be kept unique*/
    /**
     * Toggle multiple items. You can control if the items should be kept, flipped, or be kept unique
     * @template THIS
     * @this {THIS}
     * @param {?} items
     * @param {?=} flip
     * @param {?=} keep
     * @return {THIS}
     */
    Selection.prototype.toggleAll = /**
     * Toggle multiple items. You can control if the items should be kept, flipped, or be kept unique
     * @template THIS
     * @this {THIS}
     * @param {?} items
     * @param {?=} flip
     * @param {?=} keep
     * @return {THIS}
     */
    function (items, flip, keep) {
        var _this = this;
        items = items || [];
        // items = Array.isArray(items) ? items : [items];
        if (!flip && !keep && (/** @type {?} */ (this)).hasAll(items)) {
            (/** @type {?} */ (this)).removeAll(items);
            return (/** @type {?} */ (this));
        }
        items.forEach(function (item) {
            if (flip) {
                (/** @type {?} */ (_this)).toggle(item, (/** @type {?} */ (_this)).config.solo, false);
            }
            else if (!(/** @type {?} */ (_this)).hasAll(items)) {
                (/** @type {?} */ (_this)).add(item, true, false);
            }
        });
        (/** @type {?} */ (this)).update.next((/** @type {?} */ (this)));
        return (/** @type {?} */ (this));
    };
    /** Flips all items. */
    /**
     * Flips all items.
     * @template THIS
     * @this {THIS}
     * @param {?} items
     * @return {THIS}
     */
    Selection.prototype.flipAll = /**
     * Flips all items.
     * @template THIS
     * @this {THIS}
     * @param {?} items
     * @return {THIS}
     */
    function (items) {
        return (/** @type {?} */ (this)).toggleAll(items, true);
    };
    /** Returns an Array containing the current value. If an identifier is set, the array will consist of the identifier values,
     * if not, it will resolve the item contents. */
    /**
     * Returns an Array containing the current value. If an identifier is set, the array will consist of the identifier values,
     * if not, it will resolve the item contents.
     * @param {?=} solo
     * @return {?}
     */
    Selection.prototype.getValue = /**
     * Returns an Array containing the current value. If an identifier is set, the array will consist of the identifier values,
     * if not, it will resolve the item contents.
     * @param {?=} solo
     * @return {?}
     */
    function (solo) {
        var _this = this;
        if (solo === void 0) { solo = this.config.solo; }
        /** @type {?} */
        var value = this.items.map(function (item) { return _this.config.identifier ? item.id() : item.resolve(); });
        if (solo) {
            return value.length ? value[0] : null;
        }
        return value;
    };
    return Selection;
}(List));
/**
 * Extension of List that keeps track of selected items. It can keep track of items via identifier
 * property even if the object references are being replaced, e.g. when reloading a set if items.
 * It supports solo and multiple selection.
 * @template T
 */
export { Selection };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGVjLmNvbXBvbmVudHMvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZWxlY3Rpb24vc2VsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGNBQWMsQ0FBQzs7Ozs7OztBQU9wQzs7Ozs7OztJQUFrQyxxQ0FBTztJQUF6Qzs7SUFpRkEsQ0FBQztJQS9FQyxnRkFBZ0Y7Ozs7Ozs7SUFDaEYsMEJBQU07Ozs7OztJQUFOLFVBQU8sSUFBYSxFQUFFLElBQXVCO1FBQXZCLHFCQUFBLEVBQUEsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUk7UUFDM0MsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNoQjthQUFNO1lBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDdEI7SUFDSCxDQUFDO0lBRUQsNEZBQTRGOzs7Ozs7SUFDNUYseUJBQUs7Ozs7O0lBQUwsVUFBTSxJQUFhO1FBQ2pCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUU7WUFDMUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUU7UUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBOUIsQ0FBOEIsQ0FBQyxDQUFDLENBQUM7SUFDbEYsQ0FBQzs7Ozs7SUFFRCx1QkFBRzs7OztJQUFILFVBQUksSUFBYTtRQUNmLE9BQU8saUJBQU0sR0FBRyxZQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVEOzJGQUN1Rjs7Ozs7Ozs7O0lBQ3ZGLDBCQUFNOzs7Ozs7OztJQUFOLFVBQU8sSUFBYSxFQUFFLElBQXVCLEVBQUUsS0FBcUI7UUFBOUMscUJBQUEsRUFBQSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSTtRQUFFLHNCQUFBLEVBQUEsWUFBcUI7UUFDbEUsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE9BQU8sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDNUMsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDbkIsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDeEM7WUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN2QjthQUFNLElBQUksSUFBSSxFQUFFO1lBQ2YsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3pCLHdDQUF3QztnQkFDeEMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDeEM7WUFDRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDbEI7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUVELG9HQUFvRzs7Ozs7Ozs7OztJQUNwRyw2QkFBUzs7Ozs7Ozs7O0lBQVQsVUFBVSxLQUFxQixFQUFFLElBQWMsRUFBRSxJQUFjO1FBQS9ELGlCQWdCQztRQWZDLEtBQUssR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ3BCLGtEQUFrRDtRQUNsRCxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLG1CQUFBLElBQUksRUFBQSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN4QyxtQkFBQSxJQUFJLEVBQUEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEIsT0FBTyxtQkFBQSxJQUFJLEVBQUEsQ0FBQztTQUNiO1FBQ0QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7WUFDakIsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsbUJBQUEsS0FBSSxFQUFBLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxtQkFBQSxLQUFJLEVBQUEsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQzVDO2lCQUFNLElBQUksQ0FBQyxtQkFBQSxLQUFJLEVBQUEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzlCLG1CQUFBLEtBQUksRUFBQSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQzdCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxtQkFBQSxJQUFJLEVBQUEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFBLElBQUksRUFBQSxDQUFDLENBQUM7UUFDdkIsT0FBTyxtQkFBQSxJQUFJLEVBQUEsQ0FBQztJQUNkLENBQUM7SUFFRCx1QkFBdUI7Ozs7Ozs7O0lBQ3ZCLDJCQUFPOzs7Ozs7O0lBQVAsVUFBUSxLQUFLO1FBQ1gsT0FBTyxtQkFBQSxJQUFJLEVBQUEsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRDtvREFDZ0Q7Ozs7Ozs7SUFDaEQsNEJBQVE7Ozs7OztJQUFSLFVBQVMsSUFBZ0M7UUFBekMsaUJBTUM7UUFOUSxxQkFBQSxFQUFBLE9BQWdCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSTs7WUFDakMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFuRCxDQUFtRCxDQUFDO1FBQzNGLElBQUksSUFBSSxFQUFFO1lBQ1IsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztTQUN2QztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVILGdCQUFDO0FBQUQsQ0FBQyxBQWpGRCxDQUFrQyxJQUFJLEdBaUZyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEl0ZW0gfSBmcm9tICcuLi9pdGVtL2l0ZW0nO1xuaW1wb3J0IHsgTGlzdCB9IGZyb20gJy4uL2xpc3QvbGlzdCc7XG5cbi8qKlxuICogRXh0ZW5zaW9uIG9mIExpc3QgdGhhdCBrZWVwcyB0cmFjayBvZiBzZWxlY3RlZCBpdGVtcy4gSXQgY2FuIGtlZXAgdHJhY2sgb2YgaXRlbXMgdmlhIGlkZW50aWZpZXJcbiAqIHByb3BlcnR5IGV2ZW4gaWYgdGhlIG9iamVjdCByZWZlcmVuY2VzIGFyZSBiZWluZyByZXBsYWNlZCwgZS5nLiB3aGVuIHJlbG9hZGluZyBhIHNldCBpZiBpdGVtcy5cbiAqIEl0IHN1cHBvcnRzIHNvbG8gYW5kIG11bHRpcGxlIHNlbGVjdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIFNlbGVjdGlvbjxUPiBleHRlbmRzIExpc3Q8VD4ge1xuXG4gIC8qKiBBZGRzIGl0ZW0gdG8gc2VsZWN0aW9uLiBJZiBzb2xvIGlzIHRydWUsIGFsbCBvdGhlciBpdGVtcyB3aWxsIGJlIHJlbW92ZWQuICovXG4gIHNlbGVjdChpdGVtOiBJdGVtPFQ+LCBzb2xvID0gdGhpcy5jb25maWcuc29sbykge1xuICAgIGlmIChzb2xvKSB7XG4gICAgICB0aGlzLnJlbW92ZUFsbCgpO1xuICAgICAgdGhpcy5hZGQoaXRlbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkKGl0ZW0sIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgZ2l2ZW4gaXRlbSBvciBhbiBpdGVtIHRoYXQgaGFzIHRoZSBzYW1lIGlkZW50aWZpZXIgb3IgdmFsdWUuICovXG4gIGluZGV4KGl0ZW06IEl0ZW08VD4pOiBudW1iZXIge1xuICAgIGlmICh0aGlzLmNvbmZpZy5pZGVudGlmaWVyKSB7XG4gICAgICByZXR1cm4gdGhpcy5pdGVtcy5pbmRleE9mKHRoaXMuaWQoaXRlbS5yZXNvbHZlKHRoaXMuY29uZmlnLmlkZW50aWZpZXIpKSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLml0ZW1zLmluZGV4T2YodGhpcy5pdGVtcy5maW5kKGkgPT4gaS5yZXNvbHZlKCkgPT09IGl0ZW0ucmVzb2x2ZSgpKSk7XG4gIH1cblxuICBoYXMoaXRlbTogSXRlbTxUPikge1xuICAgIHJldHVybiBzdXBlci5oYXMoaXRlbSkgfHwgdGhpcy5pbmRleChpdGVtKSAhPT0gLTE7XG4gIH1cblxuICAvKiogVG9nZ2xlIGl0ZW0gaW4gYW5kIG91dCBvZiBzZWxlY3Rpb24uXG4gICAqIFRoZSBzb2xvIHByb3BlcnR5IHdpbGwgY2hhbmdlIHRoZSBiZWhhdmlvdXIgbGlrZSB5b3Ugd291bGQgZXhwZWN0IGl0IHRvIGJlaGF2ZSA6KSAqL1xuICB0b2dnbGUoaXRlbTogSXRlbTxUPiwgc29sbyA9IHRoaXMuY29uZmlnLnNvbG8sIGV2ZW50OiBib29sZWFuID0gdHJ1ZSkge1xuICAgIGlmICghaXRlbSkge1xuICAgICAgY29uc29sZS53YXJuKCd0b2dnbGUgbWFsaWNpb3VzIGl0ZW0nLCBpdGVtKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmhhcyhpdGVtKSkge1xuICAgICAgaWYgKHNvbG8pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVwbGFjZVdpdGgoW2l0ZW1dLCBldmVudCk7XG4gICAgICB9XG4gICAgICB0aGlzLmFkZChpdGVtLCBldmVudCk7XG4gICAgfSBlbHNlIGlmIChzb2xvKSB7XG4gICAgICBpZiAodGhpcy5pdGVtcy5sZW5ndGggPiAxKSB7XG4gICAgICAgIC8vIGlmIG11bHRpcGxlIGFyZSBzZWxlY3RlZCA9PiBrZWVwIGl0ZW1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVwbGFjZVdpdGgoW2l0ZW1dLCBldmVudCk7XG4gICAgICB9XG4gICAgICB0aGlzLnJlbW92ZUFsbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZShpdGVtLCBldmVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFRvZ2dsZSBtdWx0aXBsZSBpdGVtcy4gWW91IGNhbiBjb250cm9sIGlmIHRoZSBpdGVtcyBzaG91bGQgYmUga2VwdCwgZmxpcHBlZCwgb3IgYmUga2VwdCB1bmlxdWUqL1xuICB0b2dnbGVBbGwoaXRlbXM6IEFycmF5PEl0ZW08VD4+LCBmbGlwPzogYm9vbGVhbiwga2VlcD86IGJvb2xlYW4pIHtcbiAgICBpdGVtcyA9IGl0ZW1zIHx8IFtdO1xuICAgIC8vIGl0ZW1zID0gQXJyYXkuaXNBcnJheShpdGVtcykgPyBpdGVtcyA6IFtpdGVtc107XG4gICAgaWYgKCFmbGlwICYmICFrZWVwICYmIHRoaXMuaGFzQWxsKGl0ZW1zKSkge1xuICAgICAgdGhpcy5yZW1vdmVBbGwoaXRlbXMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmIChmbGlwKSB7XG4gICAgICAgIHRoaXMudG9nZ2xlKGl0ZW0sIHRoaXMuY29uZmlnLnNvbG8sIGZhbHNlKTtcbiAgICAgIH0gZWxzZSBpZiAoIXRoaXMuaGFzQWxsKGl0ZW1zKSkge1xuICAgICAgICB0aGlzLmFkZChpdGVtLCB0cnVlLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy51cGRhdGUubmV4dCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKiBGbGlwcyBhbGwgaXRlbXMuICovXG4gIGZsaXBBbGwoaXRlbXMpIHtcbiAgICByZXR1cm4gdGhpcy50b2dnbGVBbGwoaXRlbXMsIHRydWUpO1xuICB9XG5cbiAgLyoqIFJldHVybnMgYW4gQXJyYXkgY29udGFpbmluZyB0aGUgY3VycmVudCB2YWx1ZS4gSWYgYW4gaWRlbnRpZmllciBpcyBzZXQsIHRoZSBhcnJheSB3aWxsIGNvbnNpc3Qgb2YgdGhlIGlkZW50aWZpZXIgdmFsdWVzLFxuICAgKiBpZiBub3QsIGl0IHdpbGwgcmVzb2x2ZSB0aGUgaXRlbSBjb250ZW50cy4gKi9cbiAgZ2V0VmFsdWUoc29sbzogYm9vbGVhbiA9IHRoaXMuY29uZmlnLnNvbG8pIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuaXRlbXMubWFwKChpdGVtKSA9PiB0aGlzLmNvbmZpZy5pZGVudGlmaWVyID8gaXRlbS5pZCgpIDogaXRlbS5yZXNvbHZlKCkpO1xuICAgIGlmIChzb2xvKSB7XG4gICAgICByZXR1cm4gdmFsdWUubGVuZ3RoID8gdmFsdWVbMF0gOiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxufVxuIl19