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
var list_1 = require("../list/list");
/**
 * Extension of List that keeps track of selected items. It can keep track of items via identifier
 * property even if the object references are being replaced, e.g. when reloading a set if items.
 * It supports solo and multiple selection.
 */
var Selection = /** @class */ (function (_super) {
    __extends(Selection, _super);
    function Selection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** Adds item to selection. If solo is true, all other items will be removed. */
    Selection.prototype.select = function (item, solo) {
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
    Selection.prototype.index = function (item) {
        if (this.config.identifier) {
            return this.items.indexOf(this.id(item.resolve(this.config.identifier)));
        }
        return this.items.indexOf(this.items.find(function (i) { return i.resolve() === item.resolve(); }));
    };
    /** Toggle item in and out of selection.
     * The solo property will change the behaviour like you would expect it to behave :) */
    Selection.prototype.toggle = function (item, solo, event) {
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
    Selection.prototype.toggleAll = function (items, flip, keep) {
        var _this = this;
        items = items || [];
        // items = Array.isArray(items) ? items : [items];
        if (!flip && !keep && this.hasAll(items)) {
            this.removeAll(items);
            return this;
        }
        items.forEach(function (item) {
            if (flip) {
                _this.toggle(item, _this.config.solo, false);
            }
            else if (!_this.hasAll(items)) {
                _this.add(item, true, false);
            }
        });
        this.update.next(this);
        return this;
    };
    ;
    /** Flips all items. */
    Selection.prototype.flipAll = function (items) {
        return this.toggleAll(items, true);
    };
    ;
    /** Returns an Array containing the current value. If an identifier is set, the array will consist of the identifier values, if not, it will resolve the item contents. */
    Selection.prototype.getValue = function (solo) {
        var _this = this;
        if (solo === void 0) { solo = this.config.solo; }
        var value = this.items.map(function (item) { return _this.config.identifier ? item.id() : item.resolve(); });
        if (solo) {
            return value.length ? value[0] : null;
        }
        return value;
    };
    return Selection;
}(list_1.List));
exports.Selection = Selection;
