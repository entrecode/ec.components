"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = require("rxjs/Subject");
var collection_1 = require("../collection/collection");
var item_1 = require("../item/item");
var field_1 = require("../field/field");
var pagination_1 = require("../pagination/pagination");
var sorter_1 = require("../sorter/sorter");
require("rxjs/add/operator/debounceTime");
/**
 * A more sophisticated Collection of Objects with arbitrary content.
 * It comes with features like resolve functions, identifiers, display formatting and sorting.
 */
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    /**
     * Constructs the List. Populates the items and instantiates the fields.
     */
    function List(values, config, pagination) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, []) || this;
        /** Subject that should be nexted when loading is finished */
        _this.change = new Subject_1.Subject();
        /** Observable that is nexted when the list has changed. */
        _this.change$ = _this.change.asObservable();
        if (values) {
            _super.prototype.addAll.call(_this, values.map(function (value) { return new item_1.Item(value, config); }), false, false);
        }
        _this.config = config || {};
        _this.config.page = 1;
        _this.fields = _this.getFields();
        _this.pagination = pagination || new pagination_1.Pagination(_this.config, _this.items.length);
        _this.pagination.change$.debounceTime(200)
            .subscribe(function (_config) { return _this.load(_config); });
        _this.load();
        return _this;
    }
    /** Loads the list page with the given config or, if none given, uses the current config.
     * Reapplies grouping (if any) and calls the change Subject. */
    List.prototype.load = function (config) {
        if (config) {
            Object.assign(this.config, config);
        }
        this.page = this.pagination.slice(this.items);
        this.groupBy(this.config.sortBy);
        this.change.next(this);
    };
    /** Adds the given item to the list and assigns the list config to the item*/
    List.prototype.add = function (item, unique, event) {
        if (event === void 0) { event = true; }
        item.useConfig(this.config);
        return _super.prototype.add.call(this, item, unique, event);
    };
    /**
     * Distills Array of item properties. Either uses keys of config.fields or parses the item
     * properties directly.
     */
    List.prototype.getFields = function () {
        var _this = this;
        if (this.config && this.config.fields) {
            return Object.keys(this.config.fields)
                .filter(function (key) { return _this.config.fields[key].list !== false; })
                .map(function (field) { return new field_1.Field(field, _this.config.fields[field]); });
        }
        var fields = [];
        this.items.forEach(function (item) {
            item.getProperties().forEach(function (property) {
                if (!fields.find(function (f) { return f.property === property; })) {
                    fields.push(new field_1.Field(property, { type: typeof item.resolve(property) }));
                }
            });
        });
        return fields;
    };
    /**
     * Resolves the item with the given Array index or identifier (if configured)
     */
    List.prototype.id = function (identifier) {
        if (!this.config.identifier && typeof identifier === 'number') {
            return this.items[identifier];
        }
        if (!this.config.identifier) {
            throw new Error("cannot get item with id " + identifier + " => config is missing idenfier");
        }
        return this.items.find(function (item, key) {
            return item.id() === identifier;
        });
    };
    /** Filters the list after the given property and value */
    List.prototype.filter = function (property, value, operator) {
        if (value === void 0) { value = ''; }
        if (operator === void 0) { operator = 'exact'; }
        // TODO find way to filter with pagination and without loosing filtered out items
        this.page = this.items.filter(function (item) {
            return item.resolve(property).includes(value);
        }).slice(0, this.config.size || 100);
    };
    /** Changes the config's sort variables to reflect the given sorting */
    List.prototype.sortProperty = function (property, desc) {
        /* if (this.config.desc && property === this.config.sortBy) {
           delete this.config.sortBy;
           return;
         }*/
        if (property !== this.config.sortBy) {
            delete this.config.desc;
        }
        this.config.sortBy = property;
        this.config.desc = this.config.desc === undefined ? desc || false : !this.config.desc;
    };
    /** Sorts with given sorting, using the Sorter */
    List.prototype.toggleSort = function (property, desc) {
        this.sortProperty(property, desc);
        sorter_1.Sorter.sort(this.items, property, this.config.desc);
        this.load(this.config);
    };
    /** Returns an Array of all unique values of the given property */
    List.prototype.groupBy = function (property) {
        var _this = this;
        delete this.groups;
        var page = this.pagination ? this.pagination.getPage() : 0;
        if (!property || !this.config.fields || !this.config.fields[property] || !this.config.fields[property].group) {
            this.groups = [{
                    page: page,
                    sortBy: this.config.sortBy,
                    desc: this.config.desc
                }];
            return;
        }
        var groups = [];
        this.page.forEach(function (item) {
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
    List.prototype.trackItem = function (index, item) {
        return index;
    };
    return List;
}(collection_1.Collection));
exports.List = List;
