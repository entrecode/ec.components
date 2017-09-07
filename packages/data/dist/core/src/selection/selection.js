"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const list_1 = require("../list/list");
/**
 * Extension of List that keeps track of selected items. It can keep track of items via identifier
 * property even if the object references are being replaced, e.g. when reloading a set if items.
 * It supports solo and multiple selection.
 */
class Selection extends list_1.List {
    /** Adds item to selection. If solo is true, all other items will be removed. */
    select(item, solo = this.config.solo) {
        if (solo) {
            this.removeAll();
            this.add(item);
        }
        else {
            this.add(item, true);
        }
    }
    /** Returns the index of the given item or an item that has the same identifier or value. */
    index(item) {
        if (this.config.identifier) {
            return this.items.indexOf(this.id(item.resolve(this.config.identifier)));
        }
        return this.items.indexOf(this.items.find(i => i.resolve() === item.resolve()));
    }
    /** Toggle item in and out of selection.
     * The solo property will change the behaviour like you would expect it to behave :) */
    toggle(item, solo = this.config.solo, event = true) {
        if (!item) {
            console.warn('toggle malicious item', item);
            return;
        }
        if (!this.has(item)) {
            if (solo) {
                this.removeAll();
            }
            this.add(item, event);
        }
        else if (solo) {
            if (this.items.length > 1) {
                //if multiple are selected => keep item
                this.removeAll();
                return this.add(item, event);
            }
            this.removeAll();
        }
        else {
            this.remove(item, event);
        }
    }
    /** Toggle multiple items. You can control if the items should be kept, flipped, or be kept unique*/
    toggleAll(items, flip, keep) {
        items = items || [];
        // items = Array.isArray(items) ? items : [items];
        if (!flip && !keep && this.hasAll(items)) {
            this.removeAll(items);
            return this;
        }
        items.forEach((item) => {
            if (flip) {
                this.toggle(item, this.config.solo, false);
            }
            else if (!this.hasAll(items)) {
                this.add(item, true, false);
            }
        });
        this.update.next(this);
        return this;
    }
    ;
    /** Flips all items. */
    flipAll(items) {
        return this.toggleAll(items, true);
    }
    ;
    /** Returns an Array containing the current value. If an identifier is set, the array will consist of the identifier values, if not, it will resolve the item contents. */
    getValue(solo = this.config.solo) {
        const value = this.items.map((item) => this.config.identifier ? item.id() : item.resolve());
        if (solo) {
            return value.length ? value[0] : null;
        }
        return value;
    }
}
exports.Selection = Selection;
//# sourceMappingURL=selection.js.map