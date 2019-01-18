/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { List } from '../list/list';
/**
 * Extension of List that keeps track of selected items. It can keep track of items via identifier
 * property even if the object references are being replaced, e.g. when reloading a set if items.
 * It supports solo and multiple selection.
 * @template T
 */
export class Selection extends List {
    /**
     * Adds item to selection. If solo is true, all other items will be removed.
     * @param {?} item
     * @param {?=} solo
     * @return {?}
     */
    select(item, solo = this.config.solo) {
        if (solo) {
            this.removeAll();
            this.add(item);
        }
        else {
            this.add(item, true);
        }
    }
    /**
     * Returns the index of the given item or an item that has the same identifier or value.
     * @param {?} item
     * @return {?}
     */
    index(item) {
        if (this.config.identifier) {
            return this.items.indexOf(this.id(item.resolve(this.config.identifier)));
        }
        return this.items.indexOf(this.items.find(i => i.resolve() === item.resolve()));
    }
    /**
     * @param {?} item
     * @return {?}
     */
    has(item) {
        return super.has(item) || this.index(item) !== -1;
    }
    /**
     * Toggle item in and out of selection.
     * The solo property will change the behaviour like you would expect it to behave :)
     * @param {?} item
     * @param {?=} solo
     * @param {?=} event
     * @return {?}
     */
    toggle(item, solo = this.config.solo, event = true) {
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
    }
    /**
     * Toggle multiple items. You can control if the items should be kept, flipped, or be kept unique
     * @template THIS
     * @this {THIS}
     * @param {?} items
     * @param {?=} flip
     * @param {?=} keep
     * @return {THIS}
     */
    toggleAll(items, flip, keep) {
        items = items || [];
        // items = Array.isArray(items) ? items : [items];
        if (!flip && !keep && (/** @type {?} */ (this)).hasAll(items)) {
            (/** @type {?} */ (this)).removeAll(items);
            return (/** @type {?} */ (this));
        }
        items.forEach((item) => {
            if (flip) {
                (/** @type {?} */ (this)).toggle(item, (/** @type {?} */ (this)).config.solo, false);
            }
            else if (!(/** @type {?} */ (this)).hasAll(items)) {
                (/** @type {?} */ (this)).add(item, true, false);
            }
        });
        (/** @type {?} */ (this)).update.next((/** @type {?} */ (this)));
        return (/** @type {?} */ (this));
    }
    /**
     * Flips all items.
     * @template THIS
     * @this {THIS}
     * @param {?} items
     * @return {THIS}
     */
    flipAll(items) {
        return (/** @type {?} */ (this)).toggleAll(items, true);
    }
    /**
     * Returns an Array containing the current value. If an identifier is set, the array will consist of the identifier values,
     * if not, it will resolve the item contents.
     * @param {?=} solo
     * @return {?}
     */
    getValue(solo = this.config.solo) {
        /** @type {?} */
        const value = this.items.map((item) => this.config.identifier ? item.id() : item.resolve());
        if (solo) {
            return value.length ? value[0] : null;
        }
        return value;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGVjLmNvbXBvbmVudHMvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZWxlY3Rpb24vc2VsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7Ozs7O0FBT3BDLE1BQU0sT0FBTyxTQUFhLFNBQVEsSUFBTzs7Ozs7OztJQUd2QyxNQUFNLENBQUMsSUFBYSxFQUFFLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUk7UUFDM0MsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNoQjthQUFNO1lBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDdEI7SUFDSCxDQUFDOzs7Ozs7SUFHRCxLQUFLLENBQUMsSUFBYTtRQUNqQixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO1lBQzFCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFFO1FBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7Ozs7O0lBRUQsR0FBRyxDQUFDLElBQWE7UUFDZixPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUss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LEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1NBQ3ZDO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0NBRUYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJdGVtIH0gZnJvbSAnLi4vaXRlbS9pdGVtJztcbmltcG9ydCB7IExpc3QgfSBmcm9tICcuLi9saXN0L2xpc3QnO1xuXG4vKipcbiAqIEV4dGVuc2lvbiBvZiBMaXN0IHRoYXQga2VlcHMgdHJhY2sgb2Ygc2VsZWN0ZWQgaXRlbXMuIEl0IGNhbiBrZWVwIHRyYWNrIG9mIGl0ZW1zIHZpYSBpZGVudGlmaWVyXG4gKiBwcm9wZXJ0eSBldmVuIGlmIHRoZSBvYmplY3QgcmVmZXJlbmNlcyBhcmUgYmVpbmcgcmVwbGFjZWQsIGUuZy4gd2hlbiByZWxvYWRpbmcgYSBzZXQgaWYgaXRlbXMuXG4gKiBJdCBzdXBwb3J0cyBzb2xvIGFuZCBtdWx0aXBsZSBzZWxlY3Rpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBTZWxlY3Rpb248VD4gZXh0ZW5kcyBMaXN0PFQ+IHtcblxuICAvKiogQWRkcyBpdGVtIHRvIHNlbGVjdGlvbi4gSWYgc29sbyBpcyB0cnVlLCBhbGwgb3RoZXIgaXRlbXMgd2lsbCBiZSByZW1vdmVkLiAqL1xuICBzZWxlY3QoaXRlbTogSXRlbTxUPiwgc29sbyA9IHRoaXMuY29uZmlnLnNvbG8pIHtcbiAgICBpZiAoc29sbykge1xuICAgICAgdGhpcy5yZW1vdmVBbGwoKTtcbiAgICAgIHRoaXMuYWRkKGl0ZW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZChpdGVtLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvKiogUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGdpdmVuIGl0ZW0gb3IgYW4gaXRlbSB0aGF0IGhhcyB0aGUgc2FtZSBpZGVudGlmaWVyIG9yIHZhbHVlLiAqL1xuICBpbmRleChpdGVtOiBJdGVtPFQ+KTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5jb25maWcuaWRlbnRpZmllcikge1xuICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuaW5kZXhPZih0aGlzLmlkKGl0ZW0ucmVzb2x2ZSh0aGlzLmNvbmZpZy5pZGVudGlmaWVyKSkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5pdGVtcy5pbmRleE9mKHRoaXMuaXRlbXMuZmluZChpID0+IGkucmVzb2x2ZSgpID09PSBpdGVtLnJlc29sdmUoKSkpO1xuICB9XG5cbiAgaGFzKGl0ZW06IEl0ZW08VD4pIHtcbiAgICByZXR1cm4gc3VwZXIuaGFzKGl0ZW0pIHx8IHRoaXMuaW5kZXgoaXRlbSkgIT09IC0xO1xuICB9XG5cbiAgLyoqIFRvZ2dsZSBpdGVtIGluIGFuZCBvdXQgb2Ygc2VsZWN0aW9uLlxuICAgKiBUaGUgc29sbyBwcm9wZXJ0eSB3aWxsIGNoYW5nZSB0aGUgYmVoYXZpb3VyIGxpa2UgeW91IHdvdWxkIGV4cGVjdCBpdCB0byBiZWhhdmUgOikgKi9cbiAgdG9nZ2xlKGl0ZW06IEl0ZW08VD4sIHNvbG8gPSB0aGlzLmNvbmZpZy5zb2xvLCBldmVudDogYm9vbGVhbiA9IHRydWUpIHtcbiAgICBpZiAoIWl0ZW0pIHtcbiAgICAgIGNvbnNvbGUud2FybigndG9nZ2xlIG1hbGljaW91cyBpdGVtJywgaXRlbSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghdGhpcy5oYXMoaXRlbSkpIHtcbiAgICAgIGlmIChzb2xvKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcGxhY2VXaXRoKFtpdGVtXSwgZXZlbnQpO1xuICAgICAgfVxuICAgICAgdGhpcy5hZGQoaXRlbSwgZXZlbnQpO1xuICAgIH0gZWxzZSBpZiAoc29sbykge1xuICAgICAgaWYgKHRoaXMuaXRlbXMubGVuZ3RoID4gMSkge1xuICAgICAgICAvLyBpZiBtdWx0aXBsZSBhcmUgc2VsZWN0ZWQgPT4ga2VlcCBpdGVtXG4gICAgICAgIHJldHVybiB0aGlzLnJlcGxhY2VXaXRoKFtpdGVtXSwgZXZlbnQpO1xuICAgICAgfVxuICAgICAgdGhpcy5yZW1vdmVBbGwoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmUoaXRlbSwgZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBUb2dnbGUgbXVsdGlwbGUgaXRlbXMuIFlvdSBjYW4gY29udHJvbCBpZiB0aGUgaXRlbXMgc2hvdWxkIGJlIGtlcHQsIGZsaXBwZWQsIG9yIGJlIGtlcHQgdW5pcXVlKi9cbiAgdG9nZ2xlQWxsKGl0ZW1zOiBBcnJheTxJdGVtPFQ+PiwgZmxpcD86IGJvb2xlYW4sIGtlZXA/OiBib29sZWFuKSB7XG4gICAgaXRlbXMgPSBpdGVtcyB8fCBbXTtcbiAgICAvLyBpdGVtcyA9IEFycmF5LmlzQXJyYXkoaXRlbXMpID8gaXRlbXMgOiBbaXRlbXNdO1xuICAgIGlmICghZmxpcCAmJiAha2VlcCAmJiB0aGlzLmhhc0FsbChpdGVtcykpIHtcbiAgICAgIHRoaXMucmVtb3ZlQWxsKGl0ZW1zKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZiAoZmxpcCkge1xuICAgICAgICB0aGlzLnRvZ2dsZShpdGVtLCB0aGlzLmNvbmZpZy5zb2xvLCBmYWxzZSk7XG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLmhhc0FsbChpdGVtcykpIHtcbiAgICAgICAgdGhpcy5hZGQoaXRlbSwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMudXBkYXRlLm5leHQodGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKiogRmxpcHMgYWxsIGl0ZW1zLiAqL1xuICBmbGlwQWxsKGl0ZW1zKSB7XG4gICAgcmV0dXJuIHRoaXMudG9nZ2xlQWxsKGl0ZW1zLCB0cnVlKTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIGFuIEFycmF5IGNvbnRhaW5pbmcgdGhlIGN1cnJlbnQgdmFsdWUuIElmIGFuIGlkZW50aWZpZXIgaXMgc2V0LCB0aGUgYXJyYXkgd2lsbCBjb25zaXN0IG9mIHRoZSBpZGVudGlmaWVyIHZhbHVlcyxcbiAgICogaWYgbm90LCBpdCB3aWxsIHJlc29sdmUgdGhlIGl0ZW0gY29udGVudHMuICovXG4gIGdldFZhbHVlKHNvbG86IGJvb2xlYW4gPSB0aGlzLmNvbmZpZy5zb2xvKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLml0ZW1zLm1hcCgoaXRlbSkgPT4gdGhpcy5jb25maWcuaWRlbnRpZmllciA/IGl0ZW0uaWQoKSA6IGl0ZW0ucmVzb2x2ZSgpKTtcbiAgICBpZiAoc29sbykge1xuICAgICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA/IHZhbHVlWzBdIDogbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbn1cbiJdfQ==