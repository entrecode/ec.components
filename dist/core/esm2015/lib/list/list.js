/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class List extends Collection {
    /**
     * Constructs the List. Populates the items and instantiates the fields.
     * @param {?=} values
     * @param {?=} config
     * @param {?=} pagination
     */
    constructor(values, config = {}, pagination) {
        super([]);
        /**
         * Current Value Groups (Different Unique Values).
         */
        this.groups = [];
        /**
         * The items of the current page
         */
        this.page = [];
        /**
         * Subject that should be nexted when loading is finished
         */
        this.change = new Subject();
        /**
         * Observable that is nexted when the list has changed.
         */
        this.change$ = this.change.asObservable();
        if (values) {
            super.addAll(values.map(value => new Item(value, Object.assign({}, config))), false, false);
        }
        this.config = Object.assign({ page: 1, maxColumns: 8 }, config || {});
        this.fields = this.getFields();
        this.hideOverflowFields();
        this.pagination = pagination || new Pagination(this.config, this.items.length);
        this.change$.subscribe(() => {
            this.pagination.select(this.config.page || 1, true);
        });
        if (!pagination) { // load if no custom pagination was given
            this.pagination.change$.pipe(debounceTime(200))
                .subscribe(_config => this.load(_config));
            this.load();
        }
    }
    /**
     * Getter for items, calls transform
     * @return {?}
     */
    get display() {
        if (!this.config || !this.config.display) {
            return this.items;
        }
        return this.config.display(this.items);
    }
    /**
     * Loads the list page with the given config or, if none given, uses the current config.
     * Reapplies grouping (if any) and calls the change Subject.
     * @param {?=} config
     * @return {?}
     */
    load(config) {
        if (config) {
            Object.assign(this.config, config);
        }
        this.page = this.pagination.slice(this.items);
        this.groupBy(this.config.sortBy);
        this.change.next(this);
    }
    /**
     * Adds the given item to the list and assigns the list config to the item
     * @param {?} item
     * @param {?=} unique
     * @param {?=} event
     * @return {?}
     */
    add(item, unique, event = true) {
        item.useConfig(this.config);
        return super.add(item, unique, event);
    }
    /**
     * Distills Array of item properties. Either uses keys of config.fields or parses the item
     * properties directly.
     * @protected
     * @return {?}
     */
    getFields() {
        if (this.config && this.config.fields) {
            return Object.keys(this.config.fields)
                .filter((key) => this.config.fields[key].list !== false)
                .map((field) => new Field(field, this.config.fields[field]));
        }
        /** @type {?} */
        const fields = [];
        this.items.forEach((item) => {
            item.getProperties().forEach(property => {
                if (!fields.find((f) => f.property === property)) {
                    fields.push(new Field(property, { type: typeof item.resolve(property) }));
                }
            });
        });
        return fields;
    }
    /**
     * @param {?} field
     * @return {?}
     */
    toggleVisibility(field) {
        field.hideInList = !field.hideInList;
        this.change.next(this);
    }
    /**
     * Sets all fields that exceed the maxColumns to hidden
     * @protected
     * @return {?}
     */
    hideOverflowFields() {
        if (this.config && this.config.maxColumns) {
            this.fields.filter(f => !f.hideInList).forEach((field, index) => {
                if (index >= this.config.maxColumns && field.hideInList === undefined) {
                    field.hideInList = true;
                }
            });
        }
    }
    /**
     * Resolves the item with the given Array index or identifier (if configured)
     * @param {?} identifier
     * @return {?}
     */
    id(identifier) {
        if (identifier === undefined) {
            throw new Error(`cannot get item with identifier "${identifier}"`);
        }
        return this.items.find((item, key) => {
            if (!item.config.identifier) {
                return false;
            }
            return item.id() === identifier;
        }) || this.items[identifier];
    }
    /**
     * Filters the list after the given property and value
     * @param {?} property
     * @param {?=} value
     * @param {?=} operator
     * @return {?}
     */
    filter(property, value = '', operator = 'exact') {
        this.config.filter = { [property]: value };
        if (value === null) {
            this.load();
            return;
            // this.page = [].concat(this.items);
        }
        // TODO find way to filter with pagination and without loosing filtered out items
        this.page = this.items.filter((item) => {
            return item.resolve(property).toLowerCase().includes(value.toLowerCase()); // TODO: better filter
        }).slice(0, this.config.size || 100);
    }
    /**
     * Clears the filter for given property or all properties if none given.
     * @param {?=} property
     * @return {?}
     */
    clearFilter(property) {
        if (property) {
            return this.filter(property, null);
        }
        this.load({
            page: 1,
            filter: {}
        });
    }
    /**
     * Helper function. Returns true if the given query value is empty (also recognizes empty array)
     * @param {?} query
     * @return {?}
     */
    isEmptyFilter(query) {
        return query === '' ||
            query === null ||
            query === undefined ||
            (Array.isArray(query) && !query.length);
    }
    /**
     * Returns true if the given property has a filter set. If no property is given it returns true when no property has a filter.
     * @param {?=} property
     * @return {?}
     */
    isFiltered(property) {
        if (!this.config.filter) {
            return false;
        }
        if (!property) {
            return Object.keys(this.config.filter)
                .filter(key => !this.isEmptyFilter(this.config.filter[key]))
                .length > 0;
        }
        return !this.isEmptyFilter(this.config.filter[property]);
    }
    /**
     * Returns the filter
     * @param {?=} property
     * @return {?}
     */
    getFilterValue(property) {
        if (!property) {
            property = this.config.label;
        }
        if (!this.config.filter || !property) {
            return undefined;
        }
        return this.config.filter[property];
    }
    /**
     * Changes the config's sort variables to reflect the given sorting
     * @protected
     * @param {?} property
     * @param {?=} desc
     * @return {?}
     */
    sortProperty(property, desc) {
        if (property !== this.config.sortBy) {
            delete this.config.desc;
            this.config.sortBy = property;
        }
        else if (this.config.desc) {
            delete this.config.sortBy;
        }
        this.config.desc = this.config.desc === undefined ? desc || false : !this.config.desc;
    }
    /**
     * Returns true if the given sort state is active. You can either just check for a property + desc flag
     * @param {?} property
     * @param {?=} desc
     * @return {?}
     */
    isSorted(property, desc) {
        if (typeof desc === 'undefined') {
            return this.config.sortBy === property;
        }
        return this.config.sortBy === property && this.config.desc === desc;
    }
    /**
     * Sorts with given sorting, using the Sorter
     * @param {?} property
     * @param {?=} desc
     * @return {?}
     */
    toggleSort(property, desc) {
        this.sortProperty(property, desc);
        Sorter.sort(this.items, property, this.config.desc);
        this.load(this.config);
    }
    /**
     * Toggles selectMode of list config
     * @return {?}
     */
    toggleSelectMode() {
        this.config = Object.assign({}, this.config, {
            selectMode: !this.config.selectMode
        });
        this.change.next(this);
    }
    /**
     * Returns an Array of all unique values of the given property
     * @param {?} property
     * @return {?}
     */
    groupBy(property) {
        delete this.groups;
        /** @type {?} */
        const page = this.pagination ? this.pagination.getPage() : 0;
        if (!property || !this.config.fields || !this.config.fields[property] || !this.config.fields[property].group) {
            this.groups = [{
                    page,
                    sortBy: this.config.sortBy,
                    desc: this.config.desc
                }];
            return;
        }
        /** @type {?} */
        const groups = [];
        this.page.forEach(item => {
            /** @type {?} */
            const value = item.group(property);
            if (!groups.find((g) => g.value === value)) {
                groups.push({
                    value,
                    page,
                    property: this.config.sortBy,
                    desc: this.config.desc
                });
            }
        });
        this.groups = groups;
    }
    /**
     * Item tracking for *ngFor.
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackItem(index, item) {
        return index;
    }
    /**
     * Returns an array of all sortable fields
     * @return {?}
     */
    sortableFields() {
        return this.fields.filter(field => field.sortable);
    }
    /**
     * Returns true if the given field index in the visible fields is higher than maxColumns.
     * @param {?} field
     * @return {?}
     */
    isOverTheMax(field) {
        return this.fields.filter(f => !f.hideInList).indexOf(field) >= this.config.maxColumns;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BlYy5jb21wb25lbnRzL2NvcmUvIiwic291cmNlcyI6WyJsaWIvbGlzdC9saXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDcEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7O0FBTzFDLE1BQU0sT0FBTyxJQUFRLFNBQVEsVUFBbUI7Ozs7Ozs7SUFrQzlDLFlBQVksTUFBaUIsRUFBRSxTQUF3QixFQUFFLEVBQUUsVUFBMEI7UUFDbkYsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzs7O1FBdEJaLFdBQU0sR0FBRyxFQUFFLENBQUM7Ozs7UUFJTCxTQUFJLEdBQW1CLEVBQUUsQ0FBQzs7OztRQUV2QixXQUFNLEdBQXFCLElBQUksT0FBTyxFQUFFLENBQUM7Ozs7UUFFNUMsWUFBTyxHQUF3QixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBZS9ELElBQUksTUFBTSxFQUFFO1lBQ1YsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDN0Y7UUFDRCxJ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c2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENvbGxlY3Rpb24gfSBmcm9tICcuLi9jb2xsZWN0aW9uL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLi9maWVsZC9maWVsZCc7XG5pbXBvcnQgeyBJdGVtIH0gZnJvbSAnLi4vaXRlbS9pdGVtJztcbmltcG9ydCB7IFBhZ2luYXRpb24gfSBmcm9tICcuLi9wYWdpbmF0aW9uL3BhZ2luYXRpb24nO1xuaW1wb3J0IHsgU29ydGVyIH0gZnJvbSAnLi4vc29ydGVyL3NvcnRlcic7XG5pbXBvcnQgeyBMaXN0Q29uZmlnIH0gZnJvbSAnLi9saXN0LWNvbmZpZy5pbnRlcmZhY2UnO1xuXG4vKipcbiAqIEEgbW9yZSBzb3BoaXN0aWNhdGVkIENvbGxlY3Rpb24gb2YgT2JqZWN0cyB3aXRoIGFyYml0cmFyeSBjb250ZW50LlxuICogSXQgY29tZXMgd2l0aCBmZWF0dXJlcyBsaWtlIHJlc29sdmUgZnVuY3Rpb25zLCBpZGVudGlmaWVycywgZGlzcGxheSBmb3JtYXR0aW5nIGFuZCBzb3J0aW5nLlxuICovXG5leHBvcnQgY2xhc3MgTGlzdDxUPiBleHRlbmRzIENvbGxlY3Rpb248SXRlbTxUPj4ge1xuICAvKipcbiAgICogQXJyYXkgb2YgUHJvcGVydGllcyB0aGF0IGFyZSByZWxldmFudCBmb3IgZWFjaCBpdGVtLiBUaGUgZmllbGRzIGFyZSBwb3B1bGF0ZWQgb24gY29uc3RydWN0aW9uXG4gICAqIHZpYSBnZXRGaWVsZHMgbWV0aG9kLlxuICAgKi9cbiAgcHVibGljIGZpZWxkczogQXJyYXk8RmllbGQ+O1xuICAvKipcbiAgICogVGhlIExpc3QgQ29uZmlndXJhdGlvbiwgY2xpY2sgb24gTGlzdENvbmZpZyBmb3IgZGV0YWlscy4gQ2FuIGJlIGdpdmVuIGFuIG9wdGlvbmFsIExpc3RDb25maWcuXG4gICAqL1xuICBwdWJsaWMgY29uZmlnOiBMaXN0Q29uZmlnPFQ+O1xuICAvKipcbiAgICogQ3VycmVudCBWYWx1ZSBHcm91cHMgKERpZmZlcmVudCBVbmlxdWUgVmFsdWVzKS5cbiAgICovXG4gIGdyb3VwcyA9IFtdO1xuICAvKiogVGhlIGxpc3QncyBwYWdpbmF0aW9uIChPcHRpb25hbCkgKi9cbiAgcHVibGljIHBhZ2luYXRpb246IFBhZ2luYXRpb248VD47XG4gIC8qKiBUaGUgaXRlbXMgb2YgdGhlIGN1cnJlbnQgcGFnZSAqL1xuICBwdWJsaWMgcGFnZTogQXJyYXk8SXRlbTxUPj4gPSBbXTtcbiAgLyoqIFN1YmplY3QgdGhhdCBzaG91bGQgYmUgbmV4dGVkIHdoZW4gbG9hZGluZyBpcyBmaW5pc2hlZCAqL1xuICBwcm90ZWN0ZWQgY2hhbmdlOiBTdWJqZWN0PExpc3Q8VD4+ID0gbmV3IFN1YmplY3QoKTtcbiAgLyoqIE9ic2VydmFibGUgdGhhdCBpcyBuZXh0ZWQgd2hlbiB0aGUgbGlzdCBoYXMgY2hhbmdlZC4gKi9cbiAgcHVibGljIGNoYW5nZSQ6IE9ic2VydmFibGU8TGlzdDxUPj4gPSB0aGlzLmNoYW5nZS5hc09ic2VydmFibGUoKTtcblxuICAvKiogR2V0dGVyIGZvciBpdGVtcywgY2FsbHMgdHJhbnNmb3JtICovXG4gIGdldCBkaXNwbGF5KCkge1xuICAgIGlmICghdGhpcy5jb25maWcgfHwgIXRoaXMuY29uZmlnLmRpc3BsYXkpIHtcbiAgICAgIHJldHVybiB0aGlzLml0ZW1zO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jb25maWcuZGlzcGxheSh0aGlzLml0ZW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIHRoZSBMaXN0LiBQb3B1bGF0ZXMgdGhlIGl0ZW1zIGFuZCBpbnN0YW50aWF0ZXMgdGhlIGZpZWxkcy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHZhbHVlcz86IEFycmF5PFQ+LCBjb25maWc6IExpc3RDb25maWc8VD4gPSB7fSwgcGFnaW5hdGlvbj86IFBhZ2luYXRpb248VD4pIHtcbiAgICBzdXBlcihbXSk7XG4gICAgaWYgKHZhbHVlcykge1xuICAgICAgc3VwZXIuYWRkQWxsKHZhbHVlcy5tYXAodmFsdWUgPT4gbmV3IEl0ZW0odmFsdWUsIE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZykpKSwgZmFsc2UsIGZhbHNlKTtcbiAgICB9XG4gICAgdGhpcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHsgcGFnZTogMSwgbWF4Q29sdW1uczogOCB9LCBjb25maWcgfHwge30pO1xuICAgIHRoaXMuZmllbGRzID0gdGhpcy5nZXRGaWVsZHMoKTtcbiAgICB0aGlzLmhpZGVPdmVyZmxvd0ZpZWxkcygpO1xuICAgIHRoaXMucGFnaW5hdGlvbiA9IHBhZ2luYXRpb24gfHwgbmV3IFBhZ2luYXRpb24odGhpcy5jb25maWcsIHRoaXMuaXRlbXMubGVuZ3RoKTtcbiAgICB0aGlzLmNoYW5nZSQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMucGFnaW5hdGlvbi5zZWxlY3QodGhpcy5jb25maWcucGFnZSB8fCAxLCB0cnVlKTtcbiAgICB9KTtcbiAgICBpZiAoIXBhZ2luYXRpb24pIHsgLy8gbG9hZCBpZiBubyBjdXN0b20gcGFnaW5hdGlvbiB3YXMgZ2l2ZW5cbiAgICAgIHRoaXMucGFnaW5hdGlvbi5jaGFuZ2UkLnBpcGUoZGVib3VuY2VUaW1lKDIwMCkpXG4gICAgICAgIC5zdWJzY3JpYmUoX2NvbmZpZyA9PiB0aGlzLmxvYWQoX2NvbmZpZykpO1xuICAgICAgdGhpcy5sb2FkKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIExvYWRzIHRoZSBsaXN0IHBhZ2Ugd2l0aCB0aGUgZ2l2ZW4gY29uZmlnIG9yLCBpZiBub25lIGdpdmVuLCB1c2VzIHRoZSBjdXJyZW50IGNvbmZpZy5cbiAgICogUmVhcHBsaWVzIGdyb3VwaW5nIChpZiBhbnkpIGFuZCBjYWxscyB0aGUgY2hhbmdlIFN1YmplY3QuICovXG4gIHB1YmxpYyBsb2FkKGNvbmZpZz86IExpc3RDb25maWc8VD4pIHtcbiAgICBpZiAoY29uZmlnKSB7XG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMuY29uZmlnLCBjb25maWcpO1xuICAgIH1cbiAgICB0aGlzLnBhZ2UgPSB0aGlzLnBhZ2luYXRpb24uc2xpY2UodGhpcy5pdGVtcyk7XG4gICAgdGhpcy5ncm91cEJ5KHRoaXMuY29uZmlnLnNvcnRCeSk7XG4gICAgdGhpcy5jaGFuZ2UubmV4dCh0aGlzKTtcbiAgfVxuXG4gIC8qKiBBZGRzIHRoZSBnaXZlbiBpdGVtIHRvIHRoZSBsaXN0IGFuZCBhc3NpZ25zIHRoZSBsaXN0IGNvbmZpZyB0byB0aGUgaXRlbSovXG4gIGFkZChpdGVtOiBJdGVtPFQ+LCB1bmlxdWU/OiBib29sZWFuLCBldmVudDogYm9vbGVhbiA9IHRydWUpIHtcbiAgICBpdGVtLnVzZUNvbmZpZyh0aGlzLmNvbmZpZyk7XG4gICAgcmV0dXJuIHN1cGVyLmFkZChpdGVtLCB1bmlxdWUsIGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXN0aWxscyBBcnJheSBvZiBpdGVtIHByb3BlcnRpZXMuIEVpdGhlciB1c2VzIGtleXMgb2YgY29uZmlnLmZpZWxkcyBvciBwYXJzZXMgdGhlIGl0ZW1cbiAgICogcHJvcGVydGllcyBkaXJlY3RseS5cbiAgICovXG4gIHByb3RlY3RlZCBnZXRGaWVsZHMoKTogQXJyYXk8RmllbGQ+IHtcbiAgICBpZiAodGhpcy5jb25maWcgJiYgdGhpcy5jb25maWcuZmllbGRzKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5jb25maWcuZmllbGRzKVxuICAgICAgICAuZmlsdGVyKChrZXkpID0+IHRoaXMuY29uZmlnLmZpZWxkc1trZXldLmxpc3QgIT09IGZhbHNlKVxuICAgICAgICAubWFwKChmaWVsZCkgPT4gbmV3IEZpZWxkKGZpZWxkLCB0aGlzLmNvbmZpZy5maWVsZHNbZmllbGRdKSk7XG4gICAgfVxuICAgIGNvbnN0IGZpZWxkcyA9IFtdO1xuICAgIHRoaXMuaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5nZXRQcm9wZXJ0aWVzKCkuZm9yRWFjaChwcm9wZXJ0eSA9PiB7XG4gICAgICAgIGlmICghZmllbGRzLmZpbmQoKGYpID0+IGYucHJvcGVydHkgPT09IHByb3BlcnR5KSkge1xuICAgICAgICAgIGZpZWxkcy5wdXNoKG5ldyBGaWVsZChwcm9wZXJ0eSwgeyB0eXBlOiB0eXBlb2YgaXRlbS5yZXNvbHZlKHByb3BlcnR5KSB9KSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBmaWVsZHM7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlVmlzaWJpbGl0eShmaWVsZCkge1xuICAgIGZpZWxkLmhpZGVJbkxpc3QgPSAhZmllbGQuaGlkZUluTGlzdDtcbiAgICB0aGlzLmNoYW5nZS5uZXh0KHRoaXMpO1xuICB9XG5cbiAgLyoqIFNldHMgYWxsIGZpZWxkcyB0aGF0IGV4Y2VlZCB0aGUgbWF4Q29sdW1ucyB0byBoaWRkZW4gKi9cbiAgcHJvdGVjdGVkIGhpZGVPdmVyZmxvd0ZpZWxkcygpIHtcbiAgICBpZiAodGhpcy5jb25maWcgJiYgdGhpcy5jb25maWcubWF4Q29sdW1ucykge1xuICAgICAgdGhpcy5maWVsZHMuZmlsdGVyKGYgPT4gIWYuaGlkZUluTGlzdCkuZm9yRWFjaCgoZmllbGQsIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA+PSB0aGlzLmNvbmZpZy5tYXhDb2x1bW5zICYmIGZpZWxkLmhpZGVJbkxpc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGZpZWxkLmhpZGVJbkxpc3QgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVzb2x2ZXMgdGhlIGl0ZW0gd2l0aCB0aGUgZ2l2ZW4gQXJyYXkgaW5kZXggb3IgaWRlbnRpZmllciAoaWYgY29uZmlndXJlZClcbiAgICovXG4gIGlkKGlkZW50aWZpZXI6IGFueSk6IEl0ZW08VD4ge1xuICAgIGlmIChpZGVudGlmaWVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgY2Fubm90IGdldCBpdGVtIHdpdGggaWRlbnRpZmllciBcIiR7aWRlbnRpZmllcn1cImApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5pdGVtcy5maW5kKChpdGVtLCBrZXkpID0+IHtcbiAgICAgIGlmICghaXRlbS5jb25maWcuaWRlbnRpZmllcikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gaXRlbS5pZCgpID09PSBpZGVudGlmaWVyO1xuICAgIH0pIHx8IHRoaXMuaXRlbXNbaWRlbnRpZmllcl07XG4gIH1cblxuICAvKiogRmlsdGVycyB0aGUgbGlzdCBhZnRlciB0aGUgZ2l2ZW4gcHJvcGVydHkgYW5kIHZhbHVlICovXG4gIHB1YmxpYyBmaWx0ZXIocHJvcGVydHk6IHN0cmluZywgdmFsdWU6IGFueSA9ICcnLCBvcGVyYXRvcjogc3RyaW5nID0gJ2V4YWN0Jykge1xuICAgIHRoaXMuY29uZmlnLmZpbHRlciA9IHsgW3Byb3BlcnR5XTogdmFsdWUgfTtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHRoaXMubG9hZCgpO1xuICAgICAgcmV0dXJuO1xuICAgICAgLy8gdGhpcy5wYWdlID0gW10uY29uY2F0KHRoaXMuaXRlbXMpO1xuICAgIH1cbiAgICAvLyBUT0RPIGZpbmQgd2F5IHRvIGZpbHRlciB3aXRoIHBhZ2luYXRpb24gYW5kIHdpdGhvdXQgbG9vc2luZyBmaWx0ZXJlZCBvdXQgaXRlbXNcbiAgICB0aGlzLnBhZ2UgPSB0aGlzLml0ZW1zLmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgcmV0dXJuIGl0ZW0ucmVzb2x2ZShwcm9wZXJ0eSkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh2YWx1ZS50b0xvd2VyQ2FzZSgpKTsgLy8gVE9ETzogYmV0dGVyIGZpbHRlclxuICAgIH0pLnNsaWNlKDAsIHRoaXMuY29uZmlnLnNpemUgfHwgMTAwKTtcbiAgfVxuXG4gIC8qKiBDbGVhcnMgdGhlIGZpbHRlciBmb3IgZ2l2ZW4gcHJvcGVydHkgb3IgYWxsIHByb3BlcnRpZXMgaWYgbm9uZSBnaXZlbi4gKi9cbiAgY2xlYXJGaWx0ZXIocHJvcGVydHk/OiBzdHJpbmcpIHtcbiAgICBpZiAocHJvcGVydHkpIHtcbiAgICAgIHJldHVybiB0aGlzLmZpbHRlcihwcm9wZXJ0eSwgbnVsbCk7XG4gICAgfVxuICAgIHRoaXMubG9hZCh7XG4gICAgICBwYWdlOiAxLFxuICAgICAgZmlsdGVyOiB7fVxuICAgIH0pO1xuICB9XG5cbiAgLyoqIEhlbHBlciBmdW5jdGlvbi4gUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBxdWVyeSB2YWx1ZSBpcyBlbXB0eSAoYWxzbyByZWNvZ25pemVzIGVtcHR5IGFycmF5KSAqL1xuICBpc0VtcHR5RmlsdGVyKHF1ZXJ5OiBudWxsIHwgdW5kZWZpbmVkIHwgc3RyaW5nIHwgQXJyYXk8YW55Pikge1xuICAgIHJldHVybiBxdWVyeSA9PT0gJycgfHxcbiAgICAgIHF1ZXJ5ID09PSBudWxsIHx8XG4gICAgICBxdWVyeSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAoQXJyYXkuaXNBcnJheShxdWVyeSkgJiYgIXF1ZXJ5Lmxlbmd0aCk7XG4gIH1cblxuICAvKiogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBwcm9wZXJ0eSBoYXMgYSBmaWx0ZXIgc2V0LiBJZiBubyBwcm9wZXJ0eSBpcyBnaXZlbiBpdCByZXR1cm5zIHRydWUgd2hlbiBubyBwcm9wZXJ0eSBoYXMgYSBmaWx0ZXIuICovXG4gIGlzRmlsdGVyZWQocHJvcGVydHk/OiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMuY29uZmlnLmZpbHRlcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIXByb3BlcnR5KSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5jb25maWcuZmlsdGVyKVxuICAgICAgICAuZmlsdGVyKGtleSA9PiAhdGhpcy5pc0VtcHR5RmlsdGVyKHRoaXMuY29uZmlnLmZpbHRlcltrZXldKSlcbiAgICAgICAgLmxlbmd0aCA+IDA7XG4gICAgfVxuICAgIHJldHVybiAhdGhpcy5pc0VtcHR5RmlsdGVyKHRoaXMuY29uZmlnLmZpbHRlcltwcm9wZXJ0eV0pO1xuICB9XG5cbiAgLyoqIFJldHVybnMgdGhlIGZpbHRlciAqL1xuICBnZXRGaWx0ZXJWYWx1ZShwcm9wZXJ0eT86IHN0cmluZykge1xuICAgIGlmICghcHJvcGVydHkpIHtcbiAgICAgIHByb3BlcnR5ID0gdGhpcy5jb25maWcubGFiZWw7XG4gICAgfVxuICAgIGlmICghdGhpcy5jb25maWcuZmlsdGVyIHx8ICFwcm9wZXJ0eSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmZpbHRlcltwcm9wZXJ0eV07XG4gIH1cblxuICAvKiogQ2hhbmdlcyB0aGUgY29uZmlnJ3Mgc29ydCB2YXJpYWJsZXMgdG8gcmVmbGVjdCB0aGUgZ2l2ZW4gc29ydGluZyAqL1xuICBwcm90ZWN0ZWQgc29ydFByb3BlcnR5KHByb3BlcnR5OiBzdHJpbmcsIGRlc2M/OiBib29sZWFuKSB7XG4gICAgaWYgKHByb3BlcnR5ICE9PSB0aGlzLmNvbmZpZy5zb3J0QnkpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLmNvbmZpZy5kZXNjO1xuICAgICAgdGhpcy5jb25maWcuc29ydEJ5ID0gcHJvcGVydHk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbmZpZy5kZXNjKSB7XG4gICAgICBkZWxldGUgdGhpcy5jb25maWcuc29ydEJ5O1xuICAgIH1cbiAgICB0aGlzLmNvbmZpZy5kZXNjID0gdGhpcy5jb25maWcuZGVzYyA9PT0gdW5kZWZpbmVkID8gZGVzYyB8fCBmYWxzZSA6ICF0aGlzLmNvbmZpZy5kZXNjO1xuICB9XG5cbiAgLyoqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gc29ydCBzdGF0ZSBpcyBhY3RpdmUuIFlvdSBjYW4gZWl0aGVyIGp1c3QgY2hlY2sgZm9yIGEgcHJvcGVydHkgKyBkZXNjIGZsYWcgKi9cbiAgcHVibGljIGlzU29ydGVkKHByb3BlcnR5OiBzdHJpbmcsIGRlc2M/OiBib29sZWFuKSB7XG4gICAgaWYgKHR5cGVvZiBkZXNjID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLnNvcnRCeSA9PT0gcHJvcGVydHk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNvbmZpZy5zb3J0QnkgPT09IHByb3BlcnR5ICYmIHRoaXMuY29uZmlnLmRlc2MgPT09IGRlc2M7XG4gIH1cblxuICAvKiogU29ydHMgd2l0aCBnaXZlbiBzb3J0aW5nLCB1c2luZyB0aGUgU29ydGVyICovXG4gIHRvZ2dsZVNvcnQocHJvcGVydHk6IHN0cmluZywgZGVzYz86IGJvb2xlYW4pIHtcbiAgICB0aGlzLnNvcnRQcm9wZXJ0eShwcm9wZXJ0eSwgZGVzYyk7XG4gICAgU29ydGVyLnNvcnQodGhpcy5pdGVtcywgcHJvcGVydHksIHRoaXMuY29uZmlnLmRlc2MpO1xuICAgIHRoaXMubG9hZCh0aGlzLmNvbmZpZyk7XG4gIH1cbiAgLyoqIFRvZ2dsZXMgc2VsZWN0TW9kZSBvZiBsaXN0IGNvbmZpZyAqL1xuICB0b2dnbGVTZWxlY3RNb2RlKCkge1xuICAgIHRoaXMuY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5jb25maWcsIHtcbiAgICAgIHNlbGVjdE1vZGU6ICF0aGlzLmNvbmZpZy5zZWxlY3RNb2RlXG4gICAgfSk7XG4gICAgdGhpcy5jaGFuZ2UubmV4dCh0aGlzKTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIGFuIEFycmF5IG9mIGFsbCB1bmlxdWUgdmFsdWVzIG9mIHRoZSBnaXZlbiBwcm9wZXJ0eSAqL1xuICBncm91cEJ5KHByb3BlcnR5KSB7XG4gICAgZGVsZXRlIHRoaXMuZ3JvdXBzO1xuICAgIGNvbnN0IHBhZ2UgPSB0aGlzLnBhZ2luYXRpb24gPyB0aGlzLnBhZ2luYXRpb24uZ2V0UGFnZSgpIDogMDtcbiAgICBpZiAoIXByb3BlcnR5IHx8ICF0aGlzLmNvbmZpZy5maWVsZHMgfHwgIXRoaXMuY29uZmlnLmZpZWxkc1twcm9wZXJ0eV0gfHwgIXRoaXMuY29uZmlnLmZpZWxkc1twcm9wZXJ0eV0uZ3JvdXApIHtcbiAgICAgIHRoaXMuZ3JvdXBzID0gW3tcbiAgICAgICAgcGFnZSxcbiAgICAgICAgc29ydEJ5OiB0aGlzLmNvbmZpZy5zb3J0QnksXG4gICAgICAgIGRlc2M6IHRoaXMuY29uZmlnLmRlc2NcbiAgICAgIH1dO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBncm91cHMgPSBbXTtcbiAgICB0aGlzLnBhZ2UuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gaXRlbS5ncm91cChwcm9wZXJ0eSk7XG4gICAgICBpZiAoIWdyb3Vwcy5maW5kKChnKSA9PiBnLnZhbHVlID09PSB2YWx1ZSkpIHtcbiAgICAgICAgZ3JvdXBzLnB1c2goe1xuICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgIHBhZ2UsXG4gICAgICAgICAgcHJvcGVydHk6IHRoaXMuY29uZmlnLnNvcnRCeSxcbiAgICAgICAgICBkZXNjOiB0aGlzLmNvbmZpZy5kZXNjXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuZ3JvdXBzID0gZ3JvdXBzO1xuICB9XG5cbiAgLyoqIEl0ZW0gdHJhY2tpbmcgZm9yICpuZ0Zvci4gKi9cbiAgcHVibGljIHRyYWNrSXRlbShpbmRleCwgaXRlbSkge1xuICAgIHJldHVybiBpbmRleDtcbiAgfVxuICAvKiogUmV0dXJucyBhbiBhcnJheSBvZiBhbGwgc29ydGFibGUgZmllbGRzICovXG4gIHB1YmxpYyBzb3J0YWJsZUZpZWxkcygpIHtcbiAgICByZXR1cm4gdGhpcy5maWVsZHMuZmlsdGVyKGZpZWxkID0+IGZpZWxkLnNvcnRhYmxlKTtcbiAgfVxuICAvKiogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBmaWVsZCBpbmRleCBpbiB0aGUgdmlzaWJsZSBmaWVsZHMgaXMgaGlnaGVyIHRoYW4gbWF4Q29sdW1ucy4gICovXG4gIHB1YmxpYyBpc092ZXJUaGVNYXgoZmllbGQ6IEZpZWxkKSB7XG4gICAgcmV0dXJuIHRoaXMuZmllbGRzLmZpbHRlcihmID0+ICFmLmhpZGVJbkxpc3QpLmluZGV4T2YoZmllbGQpID49IHRoaXMuY29uZmlnLm1heENvbHVtbnM7XG4gIH1cbn1cbiJdfQ==