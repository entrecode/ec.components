"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = require("rxjs/Subject");
/** This class can be used to control the loading behaviour of external data. */
var Pagination = /** @class */ (function () {
    /** You can init each Pagination instance with an optional config.
     * If no config is provided, it will default to ```{page: 1, size: 25}```. */
    function Pagination(config, total) {
        /** Subject for tracking changes. */
        this.change = new Subject_1.Subject();
        /** Observable that is nexted when the pagination has changed. */
        this.change$ = this.change.asObservable();
        this.config = { page: 1, size: 25 };
        Object.assign(this.config, config);
        if (total) {
            this.setTotal(total);
        }
    }
    /** Retrieves the current page */
    Pagination.prototype.getPage = function () {
        return this.config.page;
    };
    /** Retrieves the number of pages */
    Pagination.prototype.getPages = function () {
        return this.pages ? this.pages.length : 0;
    };
    /** Loads the next page. Throws error if already on last page. */
    Pagination.prototype.next = function () {
        if (this.isLast()) {
            return; // already last page
        }
        this.config.page += 1;
        this.load();
    };
    /** Loads the previous page. Throws error if already on first page. */
    Pagination.prototype.prev = function () {
        if (this.isFirst()) {
            return; // already first page
        }
        this.config.page -= 1;
        this.load();
    };
    /**
     * Sets the total number of items and calculcates the page count.
     * */
    Pagination.prototype.setTotal = function (total) {
        this.total = total;
        this.pages = new Array(Math.ceil(this.total / this.config.size));
        if (this.config.page !== 1 && this.config.page > this.pages.length) {
            this.config.page = this.pages.length || 1;
            this.load();
        }
    };
    /** Merges config and fires next on change */
    Pagination.prototype.load = function (config) {
        if (config) {
            Object.assign(this.config, config);
        }
        this.change.next(this.config);
    };
    /** Selects the given page number */
    Pagination.prototype.select = function (page) {
        if (page === this.config.page) {
            return;
        }
        this.load({ page: page });
    };
    /** Loads the first Page */
    Pagination.prototype.first = function () {
        this.load({ page: 1 });
    };
    /** Loads the last page */
    Pagination.prototype.last = function () {
        if (!this.pages) {
            throw new Error("Cannot load last page without knowing the item count.\n        Call setTotal(itemCount) before loading.");
        }
        this.load({ page: this.pages.length });
    };
    /** Returns true if the given page number is currently active.*/
    Pagination.prototype.isActive = function (page) {
        return this.config.page === page;
    };
    /** Returns true if the current page is the first one */
    Pagination.prototype.isFirst = function () {
        return this.config.page === 1;
    };
    /** Returns true if the current page is the last one */
    Pagination.prototype.isLast = function () {
        if (!this.pages) {
            return true;
        }
        return this.config.page === this.pages.length;
    };
    /** slices a given array according to the current pagination state */
    Pagination.prototype.slice = function (items) {
        return items.slice((this.config.page - 1) * this.config.size, (this.config.page) * this.config.size);
    };
    return Pagination;
}());
exports.Pagination = Pagination;
