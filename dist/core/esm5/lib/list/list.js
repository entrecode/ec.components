/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Collection } from '../collection/collection';
import { Field } from '../field/field';
import { Item } from '../item/item';
import { Pagination } from '../pagination/pagination';
import { Sorter } from '../sorter/sorter';
/**
 * A more sophisticated Collection of Objects with arbitrary content.
 * It comes with features like resolve functions, identifiers, display formatting and sorting.
 * @template T
 */
var /**
 * A more sophisticated Collection of Objects with arbitrary content.
 * It comes with features like resolve functions, identifiers, display formatting and sorting.
 * @template T
 */
List = /** @class */ (function (_super) {
    tslib_1.__extends(List, _super);
    /**
     * Constructs the List. Populates the items and instantiates the fields.
     */
    function List(values, config, pagination) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, []) || this;
        /**
         * Current Value Groups (Different Unique Values).
         */
        _this.groups = [];
        /**
         * The items of the current page
         */
        _this.page = [];
        /**
         * Subject that should be nexted when loading is finished
         */
        _this.change = new Subject();
        /**
         * Observable that is nexted when the list has changed.
         */
        _this.change$ = _this.change.asObservable();
        if (values) {
            _super.prototype.addAll.call(_this, values.map(function (value) { return new Item(value, Object.assign({}, config)); }), false, false);
        }
        _this.config = Object.assign({ page: 1, maxColumns: 8 }, config || {});
        _this.fields = _this.getFields();
        _this.hideOverflowFields();
        _this.pagination = pagination || new Pagination(_this.config, _this.items.length);
        _this.change$.subscribe(function () {
            _this.pagination.select(_this.config.page || 1, true);
        });
        if (!pagination) { // load if no custom pagination was given
            _this.pagination.change$.pipe(debounceTime(200))
                .subscribe(function (_config) { return _this.load(_config); });
            _this.load();
        }
        return _this;
    }
    Object.defineProperty(List.prototype, "display", {
        /** Getter for items, calls transform */
        get: /**
         * Getter for items, calls transform
         * @return {?}
         */
        function () {
            if (!this.config || !this.config.display) {
                return this.items;
            }
            return this.config.display(this.items);
        },
        enumerable: true,
        configurable: true
    });
    /** Loads the list page with the given config or, if none given, uses the current config.
     * Reapplies grouping (if any) and calls the change Subject. */
    /**
     * Loads the list page with the given config or, if none given, uses the current config.
     * Reapplies grouping (if any) and calls the change Subject.
     * @param {?=} config
     * @return {?}
     */
    List.prototype.load = /**
     * Loads the list page with the given config or, if none given, uses the current config.
     * Reapplies grouping (if any) and calls the change Subject.
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        if (config) {
            Object.assign(this.config, config);
        }
        this.page = this.pagination.slice(this.items);
        this.groupBy(this.config.sortBy);
        this.change.next(this);
    };
    /** Adds the given item to the list and assigns the list config to the item*/
    /**
     * Adds the given item to the list and assigns the list config to the item
     * @param {?} item
     * @param {?=} unique
     * @param {?=} event
     * @return {?}
     */
    List.prototype.add = /**
     * Adds the given item to the list and assigns the list config to the item
     * @param {?} item
     * @param {?=} unique
     * @param {?=} event
     * @return {?}
     */
    function (item, unique, event) {
        if (event === void 0) { event = true; }
        item.useConfig(this.config);
        return _super.prototype.add.call(this, item, unique, event);
    };
    /**
     * Distills Array of item properties. Either uses keys of config.fields or parses the item
     * properties directly.
     */
    /**
     * Distills Array of item properties. Either uses keys of config.fields or parses the item
     * properties directly.
     * @protected
     * @return {?}
     */
    List.prototype.getFields = /**
     * Distills Array of item properties. Either uses keys of config.fields or parses the item
     * properties directly.
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.config && this.config.fields) {
            return Object.keys(this.config.fields)
                .filter(function (key) { return _this.config.fields[key].list !== false; })
                .map(function (field) { return new Field(field, _this.config.fields[field]); });
        }
        /** @type {?} */
        var fields = [];
        this.items.forEach(function (item) {
            item.getProperties().forEach(function (property) {
                if (!fields.find(function (f) { return f.property === property; })) {
                    fields.push(new Field(property, { type: typeof item.resolve(property) }));
                }
            });
        });
        return fields;
    };
    /**
     * @param {?} field
     * @return {?}
     */
    List.prototype.toggleVisibility = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        field.hideInList = !field.hideInList;
        this.change.next(this);
    };
    /** Sets all fields that exceed the maxColumns to hidden */
    /**
     * Sets all fields that exceed the maxColumns to hidden
     * @protected
     * @return {?}
     */
    List.prototype.hideOverflowFields = /**
     * Sets all fields that exceed the maxColumns to hidden
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.config && this.config.maxColumns) {
            this.fields.filter(function (f) { return !f.hideInList; }).forEach(function (field, index) {
                if (index >= _this.config.maxColumns && field.hideInList === undefined) {
                    field.hideInList = true;
                }
            });
        }
    };
    /**
     * Resolves the item with the given Array index or identifier (if configured)
     */
    /**
     * Resolves the item with the given Array index or identifier (if configured)
     * @param {?} identifier
     * @return {?}
     */
    List.prototype.id = /**
     * Resolves the item with the given Array index or identifier (if configured)
     * @param {?} identifier
     * @return {?}
     */
    function (identifier) {
        if (identifier === undefined) {
            throw new Error("cannot get item with identifier \"" + identifier + "\"");
        }
        return this.items.find(function (item, key) {
            if (!item.config.identifier) {
                return false;
            }
            return item.id() === identifier;
        }) || this.items[identifier];
    };
    /** Filters the list after the given property and value */
    /**
     * Filters the list after the given property and value
     * @param {?} property
     * @param {?=} value
     * @param {?=} operator
     * @return {?}
     */
    List.prototype.filter = /**
     * Filters the list after the given property and value
     * @param {?} property
     * @param {?=} value
     * @param {?=} operator
     * @return {?}
     */
    function (property, value, operator) {
        if (value === void 0) { value = ''; }
        if (operator === void 0) { operator = 'exact'; }
        var _a;
        this.config.filter = (_a = {}, _a[property] = value, _a);
        if (value === null) {
            this.load();
            return;
            // this.page = [].concat(this.items);
        }
        // TODO find way to filter with pagination and without loosing filtered out items
        this.page = this.items.filter(function (item) {
            return item.resolve(property).toLowerCase().includes(value.toLowerCase()); // TODO: better filter
        }).slice(0, this.config.size || 100);
    };
    /** Clears the filter for given property or all properties if none given. */
    /**
     * Clears the filter for given property or all properties if none given.
     * @param {?=} property
     * @return {?}
     */
    List.prototype.clearFilter = /**
     * Clears the filter for given property or all properties if none given.
     * @param {?=} property
     * @return {?}
     */
    function (property) {
        if (property) {
            return this.filter(property, null);
        }
        this.load({
            page: 1,
            filter: {}
        });
    };
    /** Helper function. Returns true if the given query value is empty (also recognizes empty array) */
    /**
     * Helper function. Returns true if the given query value is empty (also recognizes empty array)
     * @param {?} query
     * @return {?}
     */
    List.prototype.isEmptyFilter = /**
     * Helper function. Returns true if the given query value is empty (also recognizes empty array)
     * @param {?} query
     * @return {?}
     */
    function (query) {
        return query === '' ||
            query === null ||
            query === undefined ||
            (Array.isArray(query) && !query.length);
    };
    /** Returns true if the given property has a filter set. If no property is given it returns true when no property has a filter. */
    /**
     * Returns true if the given property has a filter set. If no property is given it returns true when no property has a filter.
     * @param {?=} property
     * @return {?}
     */
    List.prototype.isFiltered = /**
     * Returns true if the given property has a filter set. If no property is given it returns true when no property has a filter.
     * @param {?=} property
     * @return {?}
     */
    function (property) {
        var _this = this;
        if (!this.config.filter) {
            return false;
        }
        if (!property) {
            return Object.keys(this.config.filter)
                .filter(function (key) { return !_this.isEmptyFilter(_this.config.filter[key]); })
                .length > 0;
        }
        return !this.isEmptyFilter(this.config.filter[property]);
    };
    /** Returns the filter */
    /**
     * Returns the filter
     * @param {?=} property
     * @return {?}
     */
    List.prototype.getFilterValue = /**
     * Returns the filter
     * @param {?=} property
     * @return {?}
     */
    function (property) {
        if (!property) {
            property = this.config.label;
        }
        if (!this.config.filter || !property) {
            return undefined;
        }
        return this.config.filter[property];
    };
    /** Changes the config's sort variables to reflect the given sorting */
    /**
     * Changes the config's sort variables to reflect the given sorting
     * @protected
     * @param {?} property
     * @param {?=} desc
     * @return {?}
     */
    List.prototype.sortProperty = /**
     * Changes the config's sort variables to reflect the given sorting
     * @protected
     * @param {?} property
     * @param {?=} desc
     * @return {?}
     */
    function (property, desc) {
        if (property !== this.config.sortBy) {
            delete this.config.desc;
            this.config.sortBy = property;
        }
        else if (this.config.desc) {
            delete this.config.sortBy;
        }
        this.config.desc = this.config.desc === undefined ? desc || false : !this.config.desc;
    };
    /** Returns true if the given sort state is active. You can either just check for a property + desc flag */
    /**
     * Returns true if the given sort state is active. You can either just check for a property + desc flag
     * @param {?} property
     * @param {?=} desc
     * @return {?}
     */
    List.prototype.isSorted = /**
     * Returns true if the given sort state is active. You can either just check for a property + desc flag
     * @param {?} property
     * @param {?=} desc
     * @return {?}
     */
    function (property, desc) {
        if (typeof desc === 'undefined') {
            return this.config.sortBy === property;
        }
        return this.config.sortBy === property && this.config.desc === desc;
    };
    /** Sorts with given sorting, using the Sorter */
    /**
     * Sorts with given sorting, using the Sorter
     * @param {?} property
     * @param {?=} desc
     * @return {?}
     */
    List.prototype.toggleSort = /**
     * Sorts with given sorting, using the Sorter
     * @param {?} property
     * @param {?=} desc
     * @return {?}
     */
    function (property, desc) {
        this.sortProperty(property, desc);
        Sorter.sort(this.items, property, this.config.desc);
        this.load(this.config);
    };
    /** Toggles selectMode of list config */
    /**
     * Toggles selectMode of list config
     * @return {?}
     */
    List.prototype.toggleSelectMode = /**
     * Toggles selectMode of list config
     * @return {?}
     */
    function () {
        this.config = Object.assign({}, this.config, {
            selectMode: !this.config.selectMode
        });
        this.change.next(this);
    };
    /** Returns an Array of all unique values of the given property */
    /**
     * Returns an Array of all unique values of the given property
     * @param {?} property
     * @return {?}
     */
    List.prototype.groupBy = /**
     * Returns an Array of all unique values of the given property
     * @param {?} property
     * @return {?}
     */
    function (property) {
        var _this = this;
        delete this.groups;
        /** @type {?} */
        var page = this.pagination ? this.pagination.getPage() : 0;
        if (!property || !this.config.fields || !this.config.fields[property] || !this.config.fields[property].group) {
            this.groups = [{
                    page: page,
                    sortBy: this.config.sortBy,
                    desc: this.config.desc
                }];
            return;
        }
        /** @type {?} */
        var groups = [];
        this.page.forEach(function (item) {
            /** @type {?} */
            var value = item.group(property);
            if (!groups.find(function (g) { return g.value === value; })) {
                groups.push({
                    value: value,
                    page: page,
                    property: _this.config.sortBy,
                    desc: _this.config.desc
                });
            }
        });
        this.groups = groups;
    };
    /** Item tracking for *ngFor. */
    /**
     * Item tracking for *ngFor.
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    List.prototype.trackItem = /**
     * Item tracking for *ngFor.
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    function (index, item) {
        return index;
    };
    /** Returns an array of all sortable fields */
    /**
     * Returns an array of all sortable fields
     * @return {?}
     */
    List.prototype.sortableFields = /**
     * Returns an array of all sortable fields
     * @return {?}
     */
    function () {
        return this.fields.filter(function (field) { return field.sortable; });
    };
    /** Returns true if the given field index in the visible fields is higher than maxColumns.  */
    /**
     * Returns true if the given field index in the visible fields is higher than maxColumns.
     * @param {?} field
     * @return {?}
     */
    List.prototype.isOverTheMax = /**
     * Returns true if the given field index in the visible fields is higher than maxColumns.
     * @param {?} field
     * @return {?}
     */
    function (field) {
        return this.fields.filter(function (f) { return !f.hideInList; }).indexOf(field) >= this.config.maxColumns;
    };
    return List;
}(Collection));
/**
 * A more sophisticated Collection of Objects with arbitrary content.
 * It comes with features like resolve functions, identifiers, display formatting and sorting.
 * @template T
 */
export { List };
if (false) {
    /**
     * Array of Properties that are relevant for each item. The fields are populated on construction
     * via getFields method.
     * @type {?}
     */
    List.prototype.fields;
    /**
     * The List Configuration, click on ListConfig for details. Can be given an optional ListConfig.
     * @type {?}
     */
    List.prototype.config;
    /**
     * Current Value Groups (Different Unique Values).
     * @type {?}
     */
    List.prototype.groups;
    /**
     * The list's pagination (Optional)
     * @type {?}
     */
    List.prototype.pagination;
    /**
     * The items of the current page
     * @type {?}
     */
    List.prototype.page;
    /**
     * Subject that should be nexted when loading is finished
     * @type {?}
     * @protected
     */
    List.prototype.change;
    /**
     * Observable that is nexted when the list has changed.
     * @type {?}
     */
    List.prototype.change$;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BlYy5jb21wb25lbnRzL2NvcmUvIiwic291cmNlcyI6WyJsaWIvbGlzdC9saXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7OztBQU8xQzs7Ozs7O0lBQTZCLGdDQUFtQjtJQStCOUM7O09BRUc7SUFDSCxjQUFZLE1BQWlCLEVBQUUsTUFBMEIsRUFBRSxVQUEwQjtRQUF0RCx1QkFBQSxFQUFBLFdBQTBCO1FBQXpELFlBQ0Usa0JBQU0sRUFBRSxDQUFDLFNBZ0JWOzs7O1FBdENELFlBQU0sR0FBRyxFQUFFLENBQUM7Ozs7UUFJTCxVQUFJLEdBQW1CLEVBQUUsQ0FBQzs7OztRQUV2QixZQUFNLEdBQXFCLElBQUksT0FBTyxFQUFFLENBQUM7Ozs7UUFFNUMsYUFBTyxHQUF3QixLQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBZS9ELElBQUksTUFBTSxFQUFFO1lBQ1YsaUJBQU0sTUFBTSxhQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBMUMsQ0FBMEMsQ0FBQyxFQUFFLEtBQUssRUFBRSxL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Q0FBQztJQUVELGdDQUFnQzs7Ozs7OztJQUN6Qix3QkFBUzs7Ozs7O0lBQWhCLFVBQWlCLEtBQUssRUFBRSxJQUFJO1FBQzFCLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUNELDhDQUE4Qzs7Ozs7SUFDdkMsNkJBQWM7Ozs7SUFBckI7UUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLFFBQVEsRUFBZCxDQUFjLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBQ0QsOEZBQThGOzs7Ozs7SUFDdkYsMkJBQVk7Ozs7O0lBQW5CLFVBQW9CLEtBQVk7UUFDOUIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBYixDQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDekYsQ0FBQztJQUNILFdBQUM7QUFBRCxDQUFDLEFBM1BELENBQTZCLFVBQVUsR0EyUHRDOzs7Ozs7Ozs7Ozs7O0lBdFBDLHNCQUE0Qjs7Ozs7SUFJNUIsc0JBQTZCOzs7OztJQUk3QixzQkFBWTs7Ozs7SUFFWiwwQkFBaUM7Ozs7O0lBRWpDLG9CQUFpQzs7Ozs7O0lBRWpDLHNCQUFtRDs7Ozs7SUFFbkQsdUJBQWlFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ29sbGVjdGlvbiB9IGZyb20gJy4uL2NvbGxlY3Rpb24vY29sbGVjdGlvbic7XG5pbXBvcnQgeyBGaWVsZCB9IGZyb20gJy4uL2ZpZWxkL2ZpZWxkJztcbmltcG9ydCB7IEl0ZW0gfSBmcm9tICcuLi9pdGVtL2l0ZW0nO1xuaW1wb3J0IHsgUGFnaW5hdGlvbiB9IGZyb20gJy4uL3BhZ2luYXRpb24vcGFnaW5hdGlvbic7XG5pbXBvcnQgeyBTb3J0ZXIgfSBmcm9tICcuLi9zb3J0ZXIvc29ydGVyJztcbmltcG9ydCB7IExpc3RDb25maWcgfSBmcm9tICcuL2xpc3QtY29uZmlnLmludGVyZmFjZSc7XG5cbi8qKlxuICogQSBtb3JlIHNvcGhpc3RpY2F0ZWQgQ29sbGVjdGlvbiBvZiBPYmplY3RzIHdpdGggYXJiaXRyYXJ5IGNvbnRlbnQuXG4gKiBJdCBjb21lcyB3aXRoIGZlYXR1cmVzIGxpa2UgcmVzb2x2ZSBmdW5jdGlvbnMsIGlkZW50aWZpZXJzLCBkaXNwbGF5IGZvcm1hdHRpbmcgYW5kIHNvcnRpbmcuXG4gKi9cbmV4cG9ydCBjbGFzcyBMaXN0PFQ+IGV4dGVuZHMgQ29sbGVjdGlvbjxJdGVtPFQ+PiB7XG4gIC8qKlxuICAgKiBBcnJheSBvZiBQcm9wZXJ0aWVzIHRoYXQgYXJlIHJlbGV2YW50IGZvciBlYWNoIGl0ZW0uIFRoZSBmaWVsZHMgYXJlIHBvcHVsYXRlZCBvbiBjb25zdHJ1Y3Rpb25cbiAgICogdmlhIGdldEZpZWxkcyBtZXRob2QuXG4gICAqL1xuICBwdWJsaWMgZmllbGRzOiBBcnJheTxGaWVsZD47XG4gIC8qKlxuICAgKiBUaGUgTGlzdCBDb25maWd1cmF0aW9uLCBjbGljayBvbiBMaXN0Q29uZmlnIGZvciBkZXRhaWxzLiBDYW4gYmUgZ2l2ZW4gYW4gb3B0aW9uYWwgTGlzdENvbmZpZy5cbiAgICovXG4gIHB1YmxpYyBjb25maWc6IExpc3RDb25maWc8VD47XG4gIC8qKlxuICAgKiBDdXJyZW50IFZhbHVlIEdyb3VwcyAoRGlmZmVyZW50IFVuaXF1ZSBWYWx1ZXMpLlxuICAgKi9cbiAgZ3JvdXBzID0gW107XG4gIC8qKiBUaGUgbGlzdCdzIHBhZ2luYXRpb24gKE9wdGlvbmFsKSAqL1xuICBwdWJsaWMgcGFnaW5hdGlvbjogUGFnaW5hdGlvbjxUPjtcbiAgLyoqIFRoZSBpdGVtcyBvZiB0aGUgY3VycmVudCBwYWdlICovXG4gIHB1YmxpYyBwYWdlOiBBcnJheTxJdGVtPFQ+PiA9IFtdO1xuICAvKiogU3ViamVjdCB0aGF0IHNob3VsZCBiZSBuZXh0ZWQgd2hlbiBsb2FkaW5nIGlzIGZpbmlzaGVkICovXG4gIHByb3RlY3RlZCBjaGFuZ2U6IFN1YmplY3Q8TGlzdDxUPj4gPSBuZXcgU3ViamVjdCgpO1xuICAvKiogT2JzZXJ2YWJsZSB0aGF0IGlzIG5leHRlZCB3aGVuIHRoZSBsaXN0IGhhcyBjaGFuZ2VkLiAqL1xuICBwdWJsaWMgY2hhbmdlJDogT2JzZXJ2YWJsZTxMaXN0PFQ+PiA9IHRoaXMuY2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIC8qKiBHZXR0ZXIgZm9yIGl0ZW1zLCBjYWxscyB0cmFuc2Zvcm0gKi9cbiAgZ2V0IGRpc3BsYXkoKSB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZyB8fCAhdGhpcy5jb25maWcuZGlzcGxheSkge1xuICAgICAgcmV0dXJuIHRoaXMuaXRlbXM7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNvbmZpZy5kaXNwbGF5KHRoaXMuaXRlbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgdGhlIExpc3QuIFBvcHVsYXRlcyB0aGUgaXRlbXMgYW5kIGluc3RhbnRpYXRlcyB0aGUgZmllbGRzLlxuICAgKi9cbiAgY29uc3RydWN0b3IodmFsdWVzPzogQXJyYXk8VD4sIGNvbmZpZzogTGlzdENvbmZpZzxUPiA9IHt9LCBwYWdpbmF0aW9uPzogUGFnaW5hdGlvbjxUPikge1xuICAgIHN1cGVyKFtdKTtcbiAgICBpZiAodmFsdWVzKSB7XG4gICAgICBzdXBlci5hZGRBbGwodmFsdWVzLm1hcCh2YWx1ZSA9PiBuZXcgSXRlbSh2YWx1ZSwgT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnKSkpLCBmYWxzZSwgZmFsc2UpO1xuICAgIH1cbiAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oeyBwYWdlOiAxLCBtYXhDb2x1bW5zOiA4IH0sIGNvbmZpZyB8fCB7fSk7XG4gICAgdGhpcy5maWVsZHMgPSB0aGlzLmdldEZpZWxkcygpO1xuICAgIHRoaXMuaGlkZU92ZXJmbG93RmllbGRzKCk7XG4gICAgdGhpcy5wYWdpbmF0aW9uID0gcGFnaW5hdGlvbiB8fCBuZXcgUGFnaW5hdGlvbih0aGlzLmNvbmZpZywgdGhpcy5pdGVtcy5sZW5ndGgpO1xuICAgIHRoaXMuY2hhbmdlJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5wYWdpbmF0aW9uLnNlbGVjdCh0aGlzLmNvbmZpZy5wYWdlIHx8IDEsIHRydWUpO1xuICAgIH0pO1xuICAgIGlmICghcGFnaW5hdGlvbikgeyAvLyBsb2FkIGlmIG5vIGN1c3RvbSBwYWdpbmF0aW9uIHdhcyBnaXZlblxuICAgICAgdGhpcy5wYWdpbmF0aW9uLmNoYW5nZSQucGlwZShkZWJvdW5jZVRpbWUoMjAwKSlcbiAgICAgICAgLnN1YnNjcmliZShfY29uZmlnID0+IHRoaXMubG9hZChfY29uZmlnKSk7XG4gICAgICB0aGlzLmxvYWQoKTtcbiAgICB9XG4gIH1cblxuICAvKiogTG9hZHMgdGhlIGxpc3QgcGFnZSB3aXRoIHRoZSBnaXZlbiBjb25maWcgb3IsIGlmIG5vbmUgZ2l2ZW4sIHVzZXMgdGhlIGN1cnJlbnQgY29uZmlnLlxuICAgKiBSZWFwcGxpZXMgZ3JvdXBpbmcgKGlmIGFueSkgYW5kIGNhbGxzIHRoZSBjaGFuZ2UgU3ViamVjdC4gKi9cbiAgcHVibGljIGxvYWQoY29uZmlnPzogTGlzdENvbmZpZzxUPikge1xuICAgIGlmIChjb25maWcpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5jb25maWcsIGNvbmZpZyk7XG4gICAgfVxuICAgIHRoaXMucGFnZSA9IHRoaXMucGFnaW5hdGlvbi5zbGljZSh0aGlzLml0ZW1zKTtcbiAgICB0aGlzLmdyb3VwQnkodGhpcy5jb25maWcuc29ydEJ5KTtcbiAgICB0aGlzLmNoYW5nZS5uZXh0KHRoaXMpO1xuICB9XG5cbiAgLyoqIEFkZHMgdGhlIGdpdmVuIGl0ZW0gdG8gdGhlIGxpc3QgYW5kIGFzc2lnbnMgdGhlIGxpc3QgY29uZmlnIHRvIHRoZSBpdGVtKi9cbiAgYWRkKGl0ZW06IEl0ZW08VD4sIHVuaXF1ZT86IGJvb2xlYW4sIGV2ZW50OiBib29sZWFuID0gdHJ1ZSkge1xuICAgIGl0ZW0udXNlQ29uZmlnKHRoaXMuY29uZmlnKTtcbiAgICByZXR1cm4gc3VwZXIuYWRkKGl0ZW0sIHVuaXF1ZSwgZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3RpbGxzIEFycmF5IG9mIGl0ZW0gcHJvcGVydGllcy4gRWl0aGVyIHVzZXMga2V5cyBvZiBjb25maWcuZmllbGRzIG9yIHBhcnNlcyB0aGUgaXRlbVxuICAgKiBwcm9wZXJ0aWVzIGRpcmVjdGx5LlxuICAgKi9cbiAgcHJvdGVjdGVkIGdldEZpZWxkcygpOiBBcnJheTxGaWVsZD4ge1xuICAgIGlmICh0aGlzLmNvbmZpZyAmJiB0aGlzLmNvbmZpZy5maWVsZHMpIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmNvbmZpZy5maWVsZHMpXG4gICAgICAgIC5maWx0ZXIoKGtleSkgPT4gdGhpcy5jb25maWcuZmllbGRzW2tleV0ubGlzdCAhPT0gZmFsc2UpXG4gICAgICAgIC5tYXAoKGZpZWxkKSA9PiBuZXcgRmllbGQoZmllbGQsIHRoaXMuY29uZmlnLmZpZWxkc1tmaWVsZF0pKTtcbiAgICB9XG4gICAgY29uc3QgZmllbGRzID0gW107XG4gICAgdGhpcy5pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpdGVtLmdldFByb3BlcnRpZXMoKS5mb3JFYWNoKHByb3BlcnR5ID0+IHtcbiAgICAgICAgaWYgKCFmaWVsZHMuZmluZCgoZikgPT4gZi5wcm9wZXJ0eSA9PT0gcHJvcGVydHkpKSB7XG4gICAgICAgICAgZmllbGRzLnB1c2gobmV3IEZpZWxkKHByb3BlcnR5LCB7IHR5cGU6IHR5cGVvZiBpdGVtLnJlc29sdmUocHJvcGVydHkpIH0pKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZpZWxkcztcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVWaXNpYmlsaXR5KGZpZWxkKSB7XG4gICAgZmllbGQuaGlkZUluTGlzdCA9ICFmaWVsZC5oaWRlSW5MaXN0O1xuICAgIHRoaXMuY2hhbmdlLm5leHQodGhpcyk7XG4gIH1cblxuICAvKiogU2V0cyBhbGwgZmllbGRzIHRoYXQgZXhjZWVkIHRoZSBtYXhDb2x1bW5zIHRvIGhpZGRlbiAqL1xuICBwcm90ZWN0ZWQgaGlkZU92ZXJmbG93RmllbGRzKCkge1xuICAgIGlmICh0aGlzLmNvbmZpZyAmJiB0aGlzLmNvbmZpZy5tYXhDb2x1bW5zKSB7XG4gICAgICB0aGlzLmZpZWxkcy5maWx0ZXIoZiA9PiAhZi5oaWRlSW5MaXN0KS5mb3JFYWNoKChmaWVsZCwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGluZGV4ID49IHRoaXMuY29uZmlnLm1heENvbHVtbnMgJiYgZmllbGQuaGlkZUluTGlzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZmllbGQuaGlkZUluTGlzdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNvbHZlcyB0aGUgaXRlbSB3aXRoIHRoZSBnaXZlbiBBcnJheSBpbmRleCBvciBpZGVudGlmaWVyIChpZiBjb25maWd1cmVkKVxuICAgKi9cbiAgaWQoaWRlbnRpZmllcjogYW55KTogSXRlbTxUPiB7XG4gICAgaWYgKGlkZW50aWZpZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgZ2V0IGl0ZW0gd2l0aCBpZGVudGlmaWVyIFwiJHtpZGVudGlmaWVyfVwiYCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLml0ZW1zLmZpbmQoKGl0ZW0sIGtleSkgPT4ge1xuICAgICAgaWYgKCFpdGVtLmNvbmZpZy5pZGVudGlmaWVyKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVtLmlkKCkgPT09IGlkZW50aWZpZXI7XG4gICAgfSkgfHwgdGhpcy5pdGVtc1tpZGVudGlmaWVyXTtcbiAgfVxuXG4gIC8qKiBGaWx0ZXJzIHRoZSBsaXN0IGFmdGVyIHRoZSBnaXZlbiBwcm9wZXJ0eSBhbmQgdmFsdWUgKi9cbiAgcHVibGljIGZpbHRlcihwcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogYW55ID0gJycsIG9wZXJhdG9yOiBzdHJpbmcgPSAnZXhhY3QnKSB7XG4gICAgdGhpcy5jb25maWcuZmlsdGVyID0geyBbcHJvcGVydHldOiB2YWx1ZSB9O1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5sb2FkKCk7XG4gICAgICByZXR1cm47XG4gICAgICAvLyB0aGlzLnBhZ2UgPSBbXS5jb25jYXQodGhpcy5pdGVtcyk7XG4gICAgfVxuICAgIC8vIFRPRE8gZmluZCB3YXkgdG8gZmlsdGVyIHdpdGggcGFnaW5hdGlvbiBhbmQgd2l0aG91dCBsb29zaW5nIGZpbHRlcmVkIG91dCBpdGVtc1xuICAgIHRoaXMucGFnZSA9IHRoaXMuaXRlbXMuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICByZXR1cm4gaXRlbS5yZXNvbHZlKHByb3BlcnR5KS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHZhbHVlLnRvTG93ZXJDYXNlKCkpOyAvLyBUT0RPOiBiZXR0ZXIgZmlsdGVyXG4gICAgfSkuc2xpY2UoMCwgdGhpcy5jb25maWcuc2l6ZSB8fCAxMDApO1xuICB9XG5cbiAgLyoqIENsZWFycyB0aGUgZmlsdGVyIGZvciBnaXZlbiBwcm9wZXJ0eSBvciBhbGwgcHJvcGVydGllcyBpZiBub25lIGdpdmVuLiAqL1xuICBjbGVhckZpbHRlcihwcm9wZXJ0eT86IHN0cmluZykge1xuICAgIGlmIChwcm9wZXJ0eSkge1xuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyKHByb3BlcnR5LCBudWxsKTtcbiAgICB9XG4gICAgdGhpcy5sb2FkKHtcbiAgICAgIHBhZ2U6IDEsXG4gICAgICBmaWx0ZXI6IHt9XG4gICAgfSk7XG4gIH1cblxuICAvKiogSGVscGVyIGZ1bmN0aW9uLiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIHF1ZXJ5IHZhbHVlIGlzIGVtcHR5IChhbHNvIHJlY29nbml6ZXMgZW1wdHkgYXJyYXkpICovXG4gIGlzRW1wdHlGaWx0ZXIocXVlcnk6IG51bGwgfCB1bmRlZmluZWQgfCBzdHJpbmcgfCBBcnJheTxhbnk+KSB7XG4gICAgcmV0dXJuIHF1ZXJ5ID09PSAnJyB8fFxuICAgICAgcXVlcnkgPT09IG51bGwgfHxcbiAgICAgIHF1ZXJ5ID09PSB1bmRlZmluZWQgfHxcbiAgICAgIChBcnJheS5pc0FycmF5KHF1ZXJ5KSAmJiAhcXVlcnkubGVuZ3RoKTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIHByb3BlcnR5IGhhcyBhIGZpbHRlciBzZXQuIElmIG5vIHByb3BlcnR5IGlzIGdpdmVuIGl0IHJldHVybnMgdHJ1ZSB3aGVuIG5vIHByb3BlcnR5IGhhcyBhIGZpbHRlci4gKi9cbiAgaXNGaWx0ZXJlZChwcm9wZXJ0eT86IHN0cmluZykge1xuICAgIGlmICghdGhpcy5jb25maWcuZmlsdGVyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghcHJvcGVydHkpIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmNvbmZpZy5maWx0ZXIpXG4gICAgICAgIC5maWx0ZXIoa2V5ID0+ICF0aGlzLmlzRW1wdHlGaWx0ZXIodGhpcy5jb25maWcuZmlsdGVyW2tleV0pKVxuICAgICAgICAubGVuZ3RoID4gMDtcbiAgICB9XG4gICAgcmV0dXJuICF0aGlzLmlzRW1wdHlGaWx0ZXIodGhpcy5jb25maWcuZmlsdGVyW3Byb3BlcnR5XSk7XG4gIH1cblxuICAvKiogUmV0dXJucyB0aGUgZmlsdGVyICovXG4gIGdldEZpbHRlclZhbHVlKHByb3BlcnR5Pzogc3RyaW5nKSB7XG4gICAgaWYgKCFwcm9wZXJ0eSkge1xuICAgICAgcHJvcGVydHkgPSB0aGlzLmNvbmZpZy5sYWJlbDtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmNvbmZpZy5maWx0ZXIgfHwgIXByb3BlcnR5KSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jb25maWcuZmlsdGVyW3Byb3BlcnR5XTtcbiAgfVxuXG4gIC8qKiBDaGFuZ2VzIHRoZSBjb25maWcncyBzb3J0IHZhcmlhYmxlcyB0byByZWZsZWN0IHRoZSBnaXZlbiBzb3J0aW5nICovXG4gIHByb3RlY3RlZCBzb3J0UHJvcGVydHkocHJvcGVydHk6IHN0cmluZywgZGVzYz86IGJvb2xlYW4pIHtcbiAgICBpZiAocHJvcGVydHkgIT09IHRoaXMuY29uZmlnLnNvcnRCeSkge1xuICAgICAgZGVsZXRlIHRoaXMuY29uZmlnLmRlc2M7XG4gICAgICB0aGlzLmNvbmZpZy5zb3J0QnkgPSBwcm9wZXJ0eTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29uZmlnLmRlc2MpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLmNvbmZpZy5zb3J0Qnk7XG4gICAgfVxuICAgIHRoaXMuY29uZmlnLmRlc2MgPSB0aGlzLmNvbmZpZy5kZXNjID09PSB1bmRlZmluZWQgPyBkZXNjIHx8IGZhbHNlIDogIXRoaXMuY29uZmlnLmRlc2M7XG4gIH1cblxuICAvKiogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBzb3J0IHN0YXRlIGlzIGFjdGl2ZS4gWW91IGNhbiBlaXRoZXIganVzdCBjaGVjayBmb3IgYSBwcm9wZXJ0eSArIGRlc2MgZmxhZyAqL1xuICBwdWJsaWMgaXNTb3J0ZWQocHJvcGVydHk6IHN0cmluZywgZGVzYz86IGJvb2xlYW4pIHtcbiAgICBpZiAodHlwZW9mIGRlc2MgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25maWcuc29ydEJ5ID09PSBwcm9wZXJ0eTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLnNvcnRCeSA9PT0gcHJvcGVydHkgJiYgdGhpcy5jb25maWcuZGVzYyA9PT0gZGVzYztcbiAgfVxuXG4gIC8qKiBTb3J0cyB3aXRoIGdpdmVuIHNvcnRpbmcsIHVzaW5nIHRoZSBTb3J0ZXIgKi9cbiAgdG9nZ2xlU29ydChwcm9wZXJ0eTogc3RyaW5nLCBkZXNjPzogYm9vbGVhbikge1xuICAgIHRoaXMuc29ydFByb3BlcnR5KHByb3BlcnR5LCBkZXNjKTtcbiAgICBTb3J0ZXIuc29ydCh0aGlzLml0ZW1zLCBwcm9wZXJ0eSwgdGhpcy5jb25maWcuZGVzYyk7XG4gICAgdGhpcy5sb2FkKHRoaXMuY29uZmlnKTtcbiAgfVxuICAvKiogVG9nZ2xlcyBzZWxlY3RNb2RlIG9mIGxpc3QgY29uZmlnICovXG4gIHRvZ2dsZVNlbGVjdE1vZGUoKSB7XG4gICAgdGhpcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmNvbmZpZywge1xuICAgICAgc2VsZWN0TW9kZTogIXRoaXMuY29uZmlnLnNlbGVjdE1vZGVcbiAgICB9KTtcbiAgICB0aGlzLmNoYW5nZS5uZXh0KHRoaXMpO1xuICB9XG5cbiAgLyoqIFJldHVybnMgYW4gQXJyYXkgb2YgYWxsIHVuaXF1ZSB2YWx1ZXMgb2YgdGhlIGdpdmVuIHByb3BlcnR5ICovXG4gIGdyb3VwQnkocHJvcGVydHkpIHtcbiAgICBkZWxldGUgdGhpcy5ncm91cHM7XG4gICAgY29uc3QgcGFnZSA9IHRoaXMucGFnaW5hdGlvbiA/IHRoaXMucGFnaW5hdGlvbi5nZXRQYWdlKCkgOiAwO1xuICAgIGlmICghcHJvcGVydHkgfHwgIXRoaXMuY29uZmlnLmZpZWxkcyB8fCAhdGhpcy5jb25maWcuZmllbGRzW3Byb3BlcnR5XSB8fCAhdGhpcy5jb25maWcuZmllbGRzW3Byb3BlcnR5XS5ncm91cCkge1xuICAgICAgdGhpcy5ncm91cHMgPSBbe1xuICAgICAgICBwYWdlLFxuICAgICAgICBzb3J0Qnk6IHRoaXMuY29uZmlnLnNvcnRCeSxcbiAgICAgICAgZGVzYzogdGhpcy5jb25maWcuZGVzY1xuICAgICAgfV07XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGdyb3VwcyA9IFtdO1xuICAgIHRoaXMucGFnZS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBpdGVtLmdyb3VwKHByb3BlcnR5KTtcbiAgICAgIGlmICghZ3JvdXBzLmZpbmQoKGcpID0+IGcudmFsdWUgPT09IHZhbHVlKSkge1xuICAgICAgICBncm91cHMucHVzaCh7XG4gICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgcGFnZSxcbiAgICAgICAgICBwcm9wZXJ0eTogdGhpcy5jb25maWcuc29ydEJ5LFxuICAgICAgICAgIGRlc2M6IHRoaXMuY29uZmlnLmRlc2NcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5ncm91cHMgPSBncm91cHM7XG4gIH1cblxuICAvKiogSXRlbSB0cmFja2luZyBmb3IgKm5nRm9yLiAqL1xuICBwdWJsaWMgdHJhY2tJdGVtKGluZGV4LCBpdGVtKSB7XG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG4gIC8qKiBSZXR1cm5zIGFuIGFycmF5IG9mIGFsbCBzb3J0YWJsZSBmaWVsZHMgKi9cbiAgcHVibGljIHNvcnRhYmxlRmllbGRzKCkge1xuICAgIHJldHVybiB0aGlzLmZpZWxkcy5maWx0ZXIoZmllbGQgPT4gZmllbGQuc29ydGFibGUpO1xuICB9XG4gIC8qKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIGZpZWxkIGluZGV4IGluIHRoZSB2aXNpYmxlIGZpZWxkcyBpcyBoaWdoZXIgdGhhbiBtYXhDb2x1bW5zLiAgKi9cbiAgcHVibGljIGlzT3ZlclRoZU1heChmaWVsZDogRmllbGQpIHtcbiAgICByZXR1cm4gdGhpcy5maWVsZHMuZmlsdGVyKGYgPT4gIWYuaGlkZUluTGlzdCkuaW5kZXhPZihmaWVsZCkgPj0gdGhpcy5jb25maWcubWF4Q29sdW1ucztcbiAgfVxufVxuIl19