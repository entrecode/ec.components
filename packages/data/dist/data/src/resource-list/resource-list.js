"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const list_1 = require("@ec.components/core/src/list/list");
const item_1 = require("@ec.components/core/src/item/item");
const Subject_1 = require("rxjs/Subject");
/**
 * Extension of List for SDK ListResource. Each each implementation should implement the load
 * method to call the SDK method for loading the desired list! (see EntryList for example)
 */
class ResourceList extends list_1.List {
    /** The constructor will init the List and Pagination instances.
     * Make sure the config is already complete when initiating an EntryList instance. */
    constructor(config, sdk) {
        super([], config);
        this.sdk = sdk;
        /** Subject that should be nexted when loading begins */
        this.loading = new Subject_1.Subject();
        /** Observable that is nexted when the list begins loading. */
        this.loading$ = this.loading.asObservable();
        /** Subject that should be nexted when an error occurs */
        this.error = new Subject_1.Subject();
        /** Observable that is nexted when the list has an error. */
        this.error$ = this.error.asObservable();
        this.load();
    }
    /** deletes all undefined values from given config and assigns it to this.config */
    useConfig(config) {
        if (config) {
            Object.keys(config).forEach((key) => {
                if (config[key] === undefined) {
                    delete config[key];
                }
            });
            Object.assign(this.config, config);
        }
    }
    /** Takes the entryList and dumps the items into the the current page. Then it applies grouping if present. */
    use(listResource) {
        this.listResource = listResource;
        this.removeAll();
        this.addAll(listResource.getAllItems().map((value) => {
            return new item_1.Item(value, this.config);
        }), true);
        // this.removeAll();
        /*this.replaceWith(listResource.getAllItems().map((value) => {
          return new Item(value, this.config);
        }), true);*/
        this.page = this.items;
        if (this.pagination) {
            this.pagination.setTotal(listResource.total);
        }
        this.groupBy(this.config.sortBy);
        this.change.next(this);
    }
    /** Returns SDK filterOptions from a given ListConfig. */
    getFilterOptions({ size = 20, page = 1, filter, sortBy, desc, sort = [] }) {
        const options = { size, page };
        if (sortBy) {
            Object.assign(options, { sort: [(desc ? '-' : '') + sortBy] });
        }
        if (filter) {
            for (let property in filter) {
                Object.assign(options, {
                    [property]: {
                        [ResourceList.getFilterOperator(property, this.fields)]: filter[property]
                    }
                });
            }
        }
        return options;
    }
    /** Toggles sorting of the given property. Overloads list method to reload with the new sort setup*/
    toggleSort(property, desc) {
        this.sortProperty(property, desc);
        Object.assign(this.config, { sort: [(this.config.desc ? '-' : '') + this.config.sortBy] });
        this.load();
    }
    /** Returns the operator to use for filtering the given property. Defaults to search. */
    static getFilterOperator(property, fields) {
        if (!fields) {
            return 'search';
        }
        const field = fields.find((field) => field.property === property);
        return field && field.filterOperator ? field.filterOperator : 'search';
    }
    /** Updates the config.filter with the given property filter. */
    filterProperty(property, value = '') {
        const currentFilter = this.config.filter || {};
        if (value === '' || value === null || value === undefined || (Array.isArray(value) && !value.length)) {
            if (!currentFilter[property]) {
                return; //filter is already empty => no need to load again
            }
            delete currentFilter[property];
        }
        else {
            Object.assign(currentFilter, {
                [property]: value
            });
        }
        return currentFilter;
    }
    /** Filters the entry list by a given property value. Triggers load. */
    filter(property, value = '') {
        return this.load({
            filter: this.filterProperty(property, value)
        });
    }
}
exports.ResourceList = ResourceList;
//# sourceMappingURL=resource-list.js.map