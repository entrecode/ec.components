/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 *  Configuration for List Classes.
 *
 * @record
 * @template T
 */
export function ListConfig() { }
if (false) {
    /**
     * For lists with primitive values only: the title of the list header
     * @type {?|undefined}
     */
    ListConfig.prototype.title;
    /**
     * The property name that is sorted after
     * @type {?|undefined}
     */
    ListConfig.prototype.sortBy;
    /**
     * Array of properties that is sorted after, experimental...
     * @type {?|undefined}
     */
    ListConfig.prototype.sort;
    /**
     * If set to true, the sorting will be descending
     * @type {?|undefined}
     */
    ListConfig.prototype.desc;
    /**
     * If true, the list will show its checkboxes and will select on column click.
     * The columnClicked output will be ignored as long selectMode is active
     * @type {?|undefined}
     */
    ListConfig.prototype.selectMode;
    /**
     * If true, no select dropdown will be shown on ec-select
     * @type {?|undefined}
     */
    ListConfig.prototype.disableSearchbar;
    /**
     * If true, the list will have no header.
     * @type {?|undefined}
     */
    ListConfig.prototype.disableHeader;
    /**
     * If true, the header will also be shown when the list is empty. Defaults to false
     * @type {?|undefined}
     */
    ListConfig.prototype.alwaysShowHeader;
    /**
     * If true, no column filter will be shown in the list header
     * @type {?|undefined}
     */
    ListConfig.prototype.disableColumnFilter;
    /**
     * If true, select items cannot be dragged
     * @type {?|undefined}
     */
    ListConfig.prototype.disableDrag;
    /**
     * If true, the default pagination will not be visible.
     * @type {?|undefined}
     */
    ListConfig.prototype.hidePagination;
    /**
     * The current active page
     * @type {?|undefined}
     */
    ListConfig.prototype.page;
    /**
     * The number of items per page
     * @type {?|undefined}
     */
    ListConfig.prototype.size;
    /**
     * The available sizes. If not set, the size cannot be changed
     * @type {?|undefined}
     */
    ListConfig.prototype.availableSizes;
    /**
     * Should the selection be solo?
     * @type {?|undefined}
     */
    ListConfig.prototype.solo;
    /**
     * tells the list to show only items that match the filter
     * @type {?|undefined}
     */
    ListConfig.prototype.filter;
    /**
     * a query that will be turned in to a filter
     * @type {?|undefined}
     */
    ListConfig.prototype.query;
    /**
     * Maximal visible columns. Defaults to 8
     * @type {?|undefined}
     */
    ListConfig.prototype.maxColumns;
    /**
     * how many columns should the pop have?
     * @type {?|undefined}
     */
    ListConfig.prototype.popColumns;
    /**
     * If true, the list will automatically load on change
     * @type {?|undefined}
     */
    ListConfig.prototype.autoload;
    /**
     * The key that should store the lists config in the local storage.
     * If set, the key will be populated on config changes.
     * @type {?|undefined}
     */
    ListConfig.prototype.storageKey;
    /**
     * Transforms the Items before they are displayed, e.g. to apply a filter for the view *
     * @type {?|undefined}
     */
    ListConfig.prototype.display;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1jb25maWcuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGVjLmNvbXBvbmVudHMvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9saXN0L2xpc3QtY29uZmlnLmludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBT0EsZ0NBK0NDOzs7Ozs7SUE3Q0MsMkJBQWU7Ozs7O0lBRWYsNEJBQWdCOzs7OztJQUVoQiwwQkFBZ0I7Ozs7O0lBRWhCLDBCQUFlOzs7Ozs7SUFHZixnQ0FBcUI7Ozs7O0lBRXJCLHNDQUEyQjs7Ozs7SUFFM0IsbUNBQXdCOzs7OztJQUV4QixzQ0FBMkI7Ozs7O0lBRTNCLHlDQUE4Qjs7Ozs7SUFFOUIsaUNBQXNCOzs7OztJQUV0QixvQ0FBeUI7Ozs7O0lBRXpCLDBCQUFjOzs7OztJQUVkLDBCQUFjOzs7OztJQUVkLG9DQUEwQjs7Ozs7SUFFMUIsMEJBQWU7Ozs7O0lBRWYsNEJBQWdDOzs7OztJQUVoQywyQkFBK0I7Ozs7O0lBRS9CLGdDQUFvQjs7Ozs7SUFFcEIsZ0NBQW9COzs7OztJQUVwQiw4QkFBbUI7Ozs7OztJQUduQixnQ0FBa0Q7Ozs7O0lBRWxELDZCQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEl0ZW1Db25maWcgfSBmcm9tICcuLi9pdGVtL2l0ZW0tY29uZmlnLmludGVyZmFjZSc7XG5pbXBvcnQgeyBMaXN0IH0gZnJvbSAnLi4vbGlzdC9saXN0JztcbmltcG9ydCB7IEl0ZW0gfSBmcm9tICcuLi9pdGVtL2l0ZW0nO1xuXG4vKipcbiAqICBDb25maWd1cmF0aW9uIGZvciBMaXN0IENsYXNzZXMuXG4gKiAqL1xuZXhwb3J0IGludGVyZmFjZSBMaXN0Q29uZmlnPFQ+IGV4dGVuZHMgSXRlbUNvbmZpZzxUPiB7XG4gIC8qKiBGb3IgbGlzdHMgd2l0aCBwcmltaXRpdmUgdmFsdWVzIG9ubHk6IHRoZSB0aXRsZSBvZiB0aGUgbGlzdCBoZWFkZXIgKi9cbiAgdGl0bGU/OiBzdHJpbmc7XG4gIC8qKiBUaGUgcHJvcGVydHkgbmFtZSB0aGF0IGlzIHNvcnRlZCBhZnRlciAqL1xuICBzb3J0Qnk/OiBzdHJpbmc7XG4gIC8qKiBBcnJheSBvZiBwcm9wZXJ0aWVzIHRoYXQgaXMgc29ydGVkIGFmdGVyLCBleHBlcmltZW50YWwuLi4gKi9cbiAgc29ydD86IHN0cmluZ1tdO1xuICAvKiogSWYgc2V0IHRvIHRydWUsIHRoZSBzb3J0aW5nIHdpbGwgYmUgZGVzY2VuZGluZyAqL1xuICBkZXNjPzogYm9vbGVhbjtcbiAgLyoqIElmIHRydWUsIHRoZSBsaXN0IHdpbGwgc2hvdyBpdHMgY2hlY2tib3hlcyBhbmQgd2lsbCBzZWxlY3Qgb24gY29sdW1uIGNsaWNrLlxuICAgKiBUaGUgY29sdW1uQ2xpY2tlZCBvdXRwdXQgd2lsbCBiZSBpZ25vcmVkIGFzIGxvbmcgc2VsZWN0TW9kZSBpcyBhY3RpdmUgKi9cbiAgc2VsZWN0TW9kZT86IGJvb2xlYW47XG4gIC8qKiBJZiB0cnVlLCBubyBzZWxlY3QgZHJvcGRvd24gd2lsbCBiZSBzaG93biBvbiBlYy1zZWxlY3QgKi9cbiAgZGlzYWJsZVNlYXJjaGJhcj86IGJvb2xlYW47XG4gIC8qKiBJZiB0cnVlLCB0aGUgbGlzdCB3aWxsIGhhdmUgbm8gaGVhZGVyLiAqL1xuICBkaXNhYmxlSGVhZGVyPzogYm9vbGVhbjtcbiAgLyoqIElmIHRydWUsIHRoZSBoZWFkZXIgd2lsbCBhbHNvIGJlIHNob3duIHdoZW4gdGhlIGxpc3QgaXMgZW1wdHkuIERlZmF1bHRzIHRvIGZhbHNlICovXG4gIGFsd2F5c1Nob3dIZWFkZXI/OiBib29sZWFuO1xuICAvKiogSWYgdHJ1ZSwgbm8gY29sdW1uIGZpbHRlciB3aWxsIGJlIHNob3duIGluIHRoZSBsaXN0IGhlYWRlciAqL1xuICBkaXNhYmxlQ29sdW1uRmlsdGVyPzogYm9vbGVhbjtcbiAgLyoqIElmIHRydWUsIHNlbGVjdCBpdGVtcyBjYW5ub3QgYmUgZHJhZ2dlZCAqL1xuICBkaXNhYmxlRHJhZz86IGJvb2xlYW47XG4gIC8qKiBJZiB0cnVlLCB0aGUgZGVmYXVsdCBwYWdpbmF0aW9uIHdpbGwgbm90IGJlIHZpc2libGUuICovXG4gIGhpZGVQYWdpbmF0aW9uPzogYm9vbGVhbjtcbiAgLyoqIFRoZSBjdXJyZW50IGFjdGl2ZSBwYWdlICovXG4gIHBhZ2U/OiBudW1iZXI7XG4gIC8qKiBUaGUgbnVtYmVyIG9mIGl0ZW1zIHBlciBwYWdlICovXG4gIHNpemU/OiBudW1iZXI7XG4gIC8qKiBUaGUgYXZhaWxhYmxlIHNpemVzLiBJZiBub3Qgc2V0LCB0aGUgc2l6ZSBjYW5ub3QgYmUgY2hhbmdlZCAqL1xuICBhdmFpbGFibGVTaXplcz86IG51bWJlcltdO1xuICAvKiogU2hvdWxkIHRoZSBzZWxlY3Rpb24gYmUgc29sbz8gKi9cbiAgc29sbz86IGJvb2xlYW47XG4gIC8qKiB0ZWxscyB0aGUgbGlzdCB0byBzaG93IG9ubHkgaXRlbXMgdGhhdCBtYXRjaCB0aGUgZmlsdGVyICovXG4gIGZpbHRlcj86IHsgW2tleTogc3RyaW5nXTogYW55IH07XG4gIC8qKiBhIHF1ZXJ5IHRoYXQgd2lsbCBiZSB0dXJuZWQgaW4gdG8gYSBmaWx0ZXIgKi9cbiAgcXVlcnk/OiB7IFtrZXk6IHN0cmluZ106IGFueSB9O1xuICAvKiogTWF4aW1hbCB2aXNpYmxlIGNvbHVtbnMuIERlZmF1bHRzIHRvIDggKi9cbiAgbWF4Q29sdW1ucz86IG51bWJlcjtcbiAgLyoqIGhvdyBtYW55IGNvbHVtbnMgc2hvdWxkIHRoZSBwb3AgaGF2ZT8gKi9cbiAgcG9wQ29sdW1ucz86IG51bWJlcjtcbiAgLyoqIElmIHRydWUsIHRoZSBsaXN0IHdpbGwgYXV0b21hdGljYWxseSBsb2FkIG9uIGNoYW5nZSAqL1xuICBhdXRvbG9hZD86IGJvb2xlYW47XG4gIC8qKiBUaGUga2V5IHRoYXQgc2hvdWxkIHN0b3JlIHRoZSBsaXN0cyBjb25maWcgaW4gdGhlIGxvY2FsIHN0b3JhZ2UuXG4gICAqIElmIHNldCwgdGhlIGtleSB3aWxsIGJlIHBvcHVsYXRlZCBvbiBjb25maWcgY2hhbmdlcy4gKi9cbiAgc3RvcmFnZUtleT86IHN0cmluZyB8ICgobGlzdDogTGlzdDxUPikgPT4gc3RyaW5nKTtcbiAgLyoqIFRyYW5zZm9ybXMgdGhlIEl0ZW1zIGJlZm9yZSB0aGV5IGFyZSBkaXNwbGF5ZWQsIGUuZy4gdG8gYXBwbHkgYSBmaWx0ZXIgZm9yIHRoZSB2aWV3ICoqL1xuICBkaXNwbGF5PzogKGl0ZW1zOiBJdGVtPFQ+W10pID0+IEl0ZW08VD5bXTtcbn1cbiJdfQ==