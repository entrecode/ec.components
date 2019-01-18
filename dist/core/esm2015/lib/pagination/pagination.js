/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
/**
 * This class can be used to control the loading behaviour of external data.
 * @template T
 */
export class Pagination {
    /**
     * You can init each Pagination instance with an optional config.
     * If no config is provided, it will default to ```{page: 1, size: 25}```.
     * @param {?=} config
     * @param {?=} total
     */
    constructor(config, total) {
        /**
         * Subject for tracking changes.
         */
        this.change = new Subject();
        /**
         * Observable that is nexted when the pagination has changed.
         */
        this.change$ = this.change.asObservable();
        this.config = { page: 1, size: 25 };
        Object.assign(this.config, config);
        Object.assign(this.config, {
            availableSizes: Array.from(new Set([this.config.size]
                .concat(this.config.availableSizes || [10, 25, 50, 100], [this.config.size])
                .sort(((a, b) => a - b))))
        });
        if (total) {
            this.setTotal(total);
        }
    }
    /**
     * Retrieves the current page
     * @return {?}
     */
    getPage() {
        return this.config.page;
    }
    /**
     * Retrieves the number of pages
     * @return {?}
     */
    getPages() {
        return this.pages ? this.pages.length : 0;
    }
    /**
     * Loads the next page. Throws error if already on last page.
     * @return {?}
     */
    next() {
        if (this.isLast()) {
            return; // already last page
        }
        this.config.page += 1;
        this.load();
    }
    /**
     * Loads the previous page. Throws error if already on first page.
     * @return {?}
     */
    prev() {
        if (this.isFirst()) {
            return; // already first page
        }
        this.config.page -= 1;
        this.load();
    }
    /**
     * Sets the total number of items and calculcates the page count.
     *
     * @param {?} total
     * @return {?}
     */
    setTotal(total) {
        /* if (this.total !== total) {
          this.change.next(this.config);
        } */
        this.total = total;
        this.pages = new Array(Math.ceil(this.total / this.config.size));
        if (this.config.page !== 1 && this.config.page > this.pages.length) {
            this.config.page = this.pages.length || 1;
            this.load();
        }
    }
    /**
     * Merges config and fires next on change
     * @protected
     * @param {?=} config
     * @return {?}
     */
    load(config) {
        if (config) {
            Object.assign(this.config, config);
        }
        this.change.next(this.config);
    }
    /**
     * Selects the given page number
     * @param {?} page
     * @param {?=} silent
     * @return {?}
     */
    select(page, silent = false) {
        if (page === this.config.page || silent) {
            this.config.page = page;
            return;
        }
        this.load({ page: page });
    }
    /**
     * Loads the first Page
     * @return {?}
     */
    first() {
        this.load({ page: 1 });
    }
    /**
     * Loads the last page
     * @return {?}
     */
    last() {
        if (!this.pages) {
            throw new Error(`Cannot load last page without knowing the item count.
        Call setTotal(itemCount) before loading.`);
        }
        this.load({ page: this.pages.length });
    }
    /**
     * Returns true if the given page number is currently active.
     * @param {?} page
     * @return {?}
     */
    isActive(page) {
        return this.config.page === page;
    }
    /**
     * Returns true if the current page is the first one
     * @return {?}
     */
    isFirst() {
        return this.config.page === 1;
    }
    /**
     * Returns true if the current page is the last one
     * @return {?}
     */
    isLast() {
        if (!this.pages) {
            return true;
        }
        return this.config.page === this.pages.length;
    }
    /**
     * slices a given array according to the current pagination state
     * @param {?} items
     * @return {?}
     */
    slice(items) {
        return items.slice((this.config.page - 1) * this.config.size, (this.config.page) * this.config.size);
    }
    /**
     * Returns an object with all relevant infos about the current state of pagination
     * @return {?}
     */
    params() {
        return {
            page: this.getPage(),
            pages: this.getPages(),
            total: this.total,
            from: (this.getPage() - 1) * this.config.size + 1,
            to: Math.min(this.getPage() * this.config.size, this.total),
            size: this.config.size,
            availableSizes: this.config.availableSizes,
        };
    }
    /**
     * updates the size of the pages.
     * @param {?} size
     * @return {?}
     */
    updateSize(size) {
        if (!size) {
            return;
        }
        this.load({ size, page: 1 });
    }
}
if (false) {
    /**
     * The total number of items that is being paginated. It can be changed via setTotal.
     * @type {?}
     * @protected
     */
    Pagination.prototype.total;
    /**
     * The pagination config
     * @type {?}
     * @protected
     */
    Pagination.prototype.config;
    /**
     * Array to iterate over the number of pages.
     * @type {?}
     */
    Pagination.prototype.pages;
    /**
     * Subject for tracking changes.
     * @type {?}
     * @private
     */
    Pagination.prototype.change;
    /**
     * Observable that is nexted when the pagination has changed.
     * @type {?}
     */
    Pagination.prototype.change$;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BlYy5jb21wb25lbnRzL2NvcmUvIiwic291cmNlcyI6WyJsaWIvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFjLE1BQU0sTUFBTSxDQUFDOzs7OztBQUkzQyxNQUFNLE9BQU8sVUFBVTs7Ozs7OztJQWNyQixZQUFZLE1BQXNCLEVBQUUsS0FBYzs7OztRQU4xQyxXQUFNLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQzs7OztRQUV4QixZQUFPLEdBQW9CLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7UUFLM0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNuQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDekIsY0FBYyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztpQkFDbEQsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUMzRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0IsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLEtB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QUNSO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMvQixDQUFDO0NBQ0Y7Ozs7Ozs7SUE3SUMsMkJBQXdCOzs7Ozs7SUFFeEIsNEJBQWdDOzs7OztJQUVoQywyQkFBeUI7Ozs7OztJQUV6Qiw0QkFBK0I7Ozs7O0lBRS9CLDZCQUE2RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IExpc3RDb25maWcgfSBmcm9tICcuLi9saXN0L2xpc3QtY29uZmlnLmludGVyZmFjZSc7XG5cbi8qKiBUaGlzIGNsYXNzIGNhbiBiZSB1c2VkIHRvIGNvbnRyb2wgdGhlIGxvYWRpbmcgYmVoYXZpb3VyIG9mIGV4dGVybmFsIGRhdGEuICovXG5leHBvcnQgY2xhc3MgUGFnaW5hdGlvbjxUPiB7XG4gIC8qKiBUaGUgdG90YWwgbnVtYmVyIG9mIGl0ZW1zIHRoYXQgaXMgYmVpbmcgcGFnaW5hdGVkLiBJdCBjYW4gYmUgY2hhbmdlZCB2aWEgc2V0VG90YWwuICovXG4gIHByb3RlY3RlZCB0b3RhbDogbnVtYmVyO1xuICAvKiogVGhlIHBhZ2luYXRpb24gY29uZmlnICovXG4gIHByb3RlY3RlZCBjb25maWc6IExpc3RDb25maWc8VD47XG4gIC8qKiBBcnJheSB0byBpdGVyYXRlIG92ZXIgdGhlIG51bWJlciBvZiBwYWdlcy4gKi9cbiAgcHVibGljIHBhZ2VzOiBBcnJheTxhbnk+O1xuICAvKiogU3ViamVjdCBmb3IgdHJhY2tpbmcgY2hhbmdlcy4gKi9cbiAgcHJpdmF0ZSBjaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xuICAvKiogT2JzZXJ2YWJsZSB0aGF0IGlzIG5leHRlZCB3aGVuIHRoZSBwYWdpbmF0aW9uIGhhcyBjaGFuZ2VkLiAqL1xuICBwdWJsaWMgY2hhbmdlJDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5jaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG5cbiAgLyoqIFlvdSBjYW4gaW5pdCBlYWNoIFBhZ2luYXRpb24gaW5zdGFuY2Ugd2l0aCBhbiBvcHRpb25hbCBjb25maWcuXG4gICAqIElmIG5vIGNvbmZpZyBpcyBwcm92aWRlZCwgaXQgd2lsbCBkZWZhdWx0IHRvIGBgYHtwYWdlOiAxLCBzaXplOiAyNX1gYGAuICovXG4gIGNvbnN0cnVjdG9yKGNvbmZpZz86IExpc3RDb25maWc8VD4sIHRvdGFsPzogbnVtYmVyKSB7XG4gICAgdGhpcy5jb25maWcgPSB7IHBhZ2U6IDEsIHNpemU6IDI1IH07XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLmNvbmZpZywgY29uZmlnKTtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMuY29uZmlnLCB7XG4gICAgICBhdmFpbGFibGVTaXplczogQXJyYXkuZnJvbShuZXcgU2V0KFt0aGlzLmNvbmZpZy5zaXplXVxuICAgICAgICAuY29uY2F0KHRoaXMuY29uZmlnLmF2YWlsYWJsZVNpemVzIHx8IFsxMCwgMjUsIDUwLCAxMDBdLCBbdGhpcy5jb25maWcuc2l6ZV0pXG4gICAgICAgIC5zb3J0KCgoYSwgYikgPT4gYSAtIGIpKSkpXG4gICAgfSk7XG4gICAgaWYgKHRvdGFsKSB7XG4gICAgICB0aGlzLnNldFRvdGFsKHRvdGFsKTtcbiAgICB9XG4gIH1cblxuICAvKiogUmV0cmlldmVzIHRoZSBjdXJyZW50IHBhZ2UgKi9cbiAgZ2V0UGFnZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5wYWdlO1xuICB9XG5cbiAgLyoqIFJldHJpZXZlcyB0aGUgbnVtYmVyIG9mIHBhZ2VzICovXG4gIGdldFBhZ2VzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucGFnZXMgPyB0aGlzLnBhZ2VzLmxlbmd0aCA6IDA7XG4gIH1cblxuICAvKiogTG9hZHMgdGhlIG5leHQgcGFnZS4gVGhyb3dzIGVycm9yIGlmIGFscmVhZHkgb24gbGFzdCBwYWdlLiAqL1xuICBuZXh0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzTGFzdCgpKSB7XG4gICAgICByZXR1cm47IC8vIGFscmVhZHkgbGFzdCBwYWdlXG4gICAgfVxuICAgIHRoaXMuY29uZmlnLnBhZ2UgKz0gMTtcbiAgICB0aGlzLmxvYWQoKTtcbiAgfVxuXG4gIC8qKiBMb2FkcyB0aGUgcHJldmlvdXMgcGFnZS4gVGhyb3dzIGVycm9yIGlmIGFscmVhZHkgb24gZmlyc3QgcGFnZS4gKi9cbiAgcHJldigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0ZpcnN0KCkpIHtcbiAgICAgIHJldHVybjsgLy8gYWxyZWFkeSBmaXJzdCBwYWdlXG4gICAgfVxuICAgIHRoaXMuY29uZmlnLnBhZ2UgLT0gMTtcbiAgICB0aGlzLmxvYWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0b3RhbCBudW1iZXIgb2YgaXRlbXMgYW5kIGNhbGN1bGNhdGVzIHRoZSBwYWdlIGNvdW50LlxuICAgKiAqL1xuICBzZXRUb3RhbCh0b3RhbDogbnVtYmVyKSB7XG4gICAgLyogaWYgKHRoaXMudG90YWwgIT09IHRvdGFsKSB7XG4gICAgICB0aGlzLmNoYW5nZS5uZXh0KHRoaXMuY29uZmlnKTtcbiAgICB9ICovXG4gICAgdGhpcy50b3RhbCA9IHRvdGFsO1xuICAgIHRoaXMucGFnZXMgPSBuZXcgQXJyYXkoTWF0aC5jZWlsKHRoaXMudG90YWwgLyB0aGlzLmNvbmZpZy5zaXplKSk7XG4gICAgaWYgKHRoaXMuY29uZmlnLnBhZ2UgIT09IDEgJiYgdGhpcy5jb25maWcucGFnZSA+IHRoaXMucGFnZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmNvbmZpZy5wYWdlID0gdGhpcy5wYWdlcy5sZW5ndGggfHwgMTtcbiAgICAgIHRoaXMubG9hZCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBNZXJnZXMgY29uZmlnIGFuZCBmaXJlcyBuZXh0IG9uIGNoYW5nZSAqL1xuICBwcm90ZWN0ZWQgbG9hZChjb25maWc/OiBMaXN0Q29uZmlnPFQ+KTogdm9pZCB7XG4gICAgaWYgKGNvbmZpZykge1xuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmNvbmZpZywgY29uZmlnKTtcbiAgICB9XG4gICAgdGhpcy5jaGFuZ2UubmV4dCh0aGlzLmNvbmZpZyk7XG4gIH1cblxuICAvKiogU2VsZWN0cyB0aGUgZ2l2ZW4gcGFnZSBudW1iZXIgKi9cbiAgc2VsZWN0KHBhZ2U6IG51bWJlciwgc2lsZW50ID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAocGFnZSA9PT0gdGhpcy5jb25maWcucGFnZSB8fCBzaWxlbnQpIHtcbiAgICAgIHRoaXMuY29uZmlnLnBhZ2UgPSBwYWdlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmxvYWQoeyBwYWdlOiBwYWdlIH0pO1xuICB9XG5cbiAgLyoqIExvYWRzIHRoZSBmaXJzdCBQYWdlICovXG4gIGZpcnN0KCk6IHZvaWQge1xuICAgIHRoaXMubG9hZCh7IHBhZ2U6IDEgfSk7XG4gIH1cblxuICAvKiogTG9hZHMgdGhlIGxhc3QgcGFnZSAqL1xuICBsYXN0KCkge1xuICAgIGlmICghdGhpcy5wYWdlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgbG9hZCBsYXN0IHBhZ2Ugd2l0aG91dCBrbm93aW5nIHRoZSBpdGVtIGNvdW50LlxuICAgICAgICBDYWxsIHNldFRvdGFsKGl0ZW1Db3VudCkgYmVmb3JlIGxvYWRpbmcuYCk7XG4gICAgfVxuICAgIHRoaXMubG9hZCh7IHBhZ2U6IHRoaXMucGFnZXMubGVuZ3RoIH0pO1xuICB9XG5cbiAgLyoqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gcGFnZSBudW1iZXIgaXMgY3VycmVudGx5IGFjdGl2ZS4qL1xuICBpc0FjdGl2ZShwYWdlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcucGFnZSA9PT0gcGFnZTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHRydWUgaWYgdGhlIGN1cnJlbnQgcGFnZSBpcyB0aGUgZmlyc3Qgb25lICovXG4gIGlzRmlyc3QoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLnBhZ2UgPT09IDE7XG4gIH1cblxuICAvKiogUmV0dXJucyB0cnVlIGlmIHRoZSBjdXJyZW50IHBhZ2UgaXMgdGhlIGxhc3Qgb25lICovXG4gIGlzTGFzdCgpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMucGFnZXMpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jb25maWcucGFnZSA9PT0gdGhpcy5wYWdlcy5sZW5ndGg7XG4gIH1cblxuICAvKiogc2xpY2VzIGEgZ2l2ZW4gYXJyYXkgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2luYXRpb24gc3RhdGUgKi9cbiAgc2xpY2UoaXRlbXM6IEFycmF5PGFueT4pOiBBcnJheTxhbnk+IHtcbiAgICByZXR1cm4gaXRlbXMuc2xpY2UoKHRoaXMuY29uZmlnLnBhZ2UgLSAxKSAqIHRoaXMuY29uZmlnLnNpemUsICh0aGlzLmNvbmZpZy5wYWdlKSAqIHRoaXMuY29uZmlnLnNpemUpO1xuICB9XG5cbiAgLyoqIFJldHVybnMgYW4gb2JqZWN0IHdpdGggYWxsIHJlbGV2YW50IGluZm9zIGFib3V0IHRoZSBjdXJyZW50IHN0YXRlIG9mIHBhZ2luYXRpb24gKi9cbiAgcGFyYW1zKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwYWdlOiB0aGlzLmdldFBhZ2UoKSxcbiAgICAgIHBhZ2VzOiB0aGlzLmdldFBhZ2VzKCksXG4gICAgICB0b3RhbDogdGhpcy50b3RhbCxcbiAgICAgIGZyb206ICh0aGlzLmdldFBhZ2UoKSAtIDEpICogdGhpcy5jb25maWcuc2l6ZSArIDEsXG4gICAgICB0bzogTWF0aC5taW4odGhpcy5nZXRQYWdlKCkgKiB0aGlzLmNvbmZpZy5zaXplLCB0aGlzLnRvdGFsKSxcbiAgICAgIHNpemU6IHRoaXMuY29uZmlnLnNpemUsXG4gICAgICBhdmFpbGFibGVTaXplczogdGhpcy5jb25maWcuYXZhaWxhYmxlU2l6ZXMsXG4gICAgfTtcbiAgfVxuICAvKiogdXBkYXRlcyB0aGUgc2l6ZSBvZiB0aGUgcGFnZXMuICAqL1xuICB1cGRhdGVTaXplKHNpemU6IG51bWJlcikge1xuICAgIGlmICghc2l6ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmxvYWQoeyBzaXplLCBwYWdlOiAxIH0pO1xuICB9XG59XG4iXX0=