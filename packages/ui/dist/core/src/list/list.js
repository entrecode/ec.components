"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const collection_1 = require("../collection/collection");
const item_1 = require("../item/item");
const field_1 = require("../field/field");
const pagination_1 = require("../pagination/pagination");
const sorter_1 = require("../sorter/sorter");
/**
 * A more sophisticated Collection of Objects with arbitrary content.
 * It comes with features like resolve functions, identifiers, display formatting and sorting.
 */
class List extends collection_1.Collection {
    /**
     * Constructs the List. Populates the items and instantiates the fields.
     */
    constructor(values, config = {}, pagination) {
        super([]);
        /** Subject that should be nexted when loading is finished */
        this.change = new rxjs_1.Subject();
        /** Observable that is nexted when the list has changed. */
        this.change$ = this.change.asObservable();
        if (values) {
            super.addAll(values.map(value => new item_1.Item(value, config)), false, false);
        }
        this.config = config || {};
        this.config.page = 1;
        this.fields = this.getFields();
        this.pagination = pagination || new pagination_1.Pagination(this.config, this.items.length);
        this.pagination.change$.debounceTime(200)
            .subscribe(config => this.load(config));
        this.load();
    }
    /** Loads the list page with the given config or, if none given, uses the current config. Reapplies grouping (if any) and calls the change Subject. */
    load(config) {
        if (config) {
            Object.assign(this.config, config);
        }
        this.page = this.pagination.slice(this.items);
        this.groupBy(this.config.sortBy);
        this.change.next(this);
    }
    /** Adds the given item to the list and assigns the list config to the item*/
    add(item, unique, event = true) {
        item.useConfig(this.config);
        return super.add(item, unique, event);
    }
    /**
     * Distills Array of item properties. Either uses keys of config.fields or parses the item
     * properties directly.
     */
    getFields() {
        if (this.config && this.config.fields) {
            return Object.keys(this.config.fields)
                .filter((key) => this.config.fields[key].list !== false)
                .map((field) => new field_1.Field(field, this.config.fields[field]));
        }
        const fields = [];
        this.items.forEach((item) => {
            item.getProperties().forEach(property => {
                if (!fields.find((f) => f.property === property)) {
                    fields.push(new field_1.Field(property, { type: typeof item.resolve(property) }));
                }
            });
        });
        return fields;
    }
    /**
     * Resolves the item with the given Array index or identifier (if configured)
     */
    id(identifier) {
        if (!this.config.identifier && typeof identifier === 'number') {
            return this.items[identifier];
        }
        if (!this.config.identifier) {
            throw new Error(`cannot get item with id ${identifier} => config is missing idenfier`);
        }
        return this.items.find((item, key) => {
            return item.id() === identifier;
        });
    }
    /** Filters the list after the given property and value */
    filter(property, value = '', operator = 'exact') {
        //TODO find way to filter with pagination and without loosing filtered out items
        this.page = this.items.filter((item) => {
            return item.resolve(property).includes(value);
        }).slice(0, this.config.size || 100);
    }
    /** Changes the config's sort variables to reflect the given sorting */
    sortProperty(property, desc) {
        /* if (this.config.desc && property === this.config.sortBy) {
           delete this.config.sortBy;
           return;
         }*/
        if (property !== this.config.sortBy) {
            delete this.config.desc;
        }
        this.config.sortBy = property;
        this.config.desc = this.config.desc === undefined ? desc || false : !this.config.desc;
    }
    /** Sorts with given sorting, using the Sorter */
    toggleSort(property, desc) {
        this.sortProperty(property, desc);
        sorter_1.Sorter.sort(this.items, property, this.config.desc);
        this.load(this.config);
    }
    /** Returns an Array of all unique values of the given property */
    groupBy(property) {
        delete this.groups;
        const page = this.pagination ? this.pagination.getPage() : 0;
        if (!property || !this.config.fields || !this.config.fields[property] || !this.config.fields[property].group) {
            this.groups = [{
                    page,
                    sortBy: this.config.sortBy,
                    desc: this.config.desc
                }];
            return;
        }
        const groups = [];
        this.page.forEach(item => {
            let value = item.group(property);
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
    /** Item tracking for *ngFor. */
    trackItem(index, item) {
        return index;
    }
}
exports.List = List;
//# sourceMappingURL=list.js.map