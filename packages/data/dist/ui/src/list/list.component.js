"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const core_2 = require("@ec.components/core");
/**
 * The ListComponent will render a list containing the given items or collection.
 * */
class ListComponent {
    constructor() {
        /** The current list config */
        this.config = {};
        /** Event emitter on item selection */
        this.select = new core_1.EventEmitter();
        /** Event emitter on selection change */
        this.selected = new core_1.EventEmitter();
    }
    /** Changing items or collection will trigger reconstructing the list with the new items.
     * Changing the selection will reconstruct the selection */
    ngOnChanges() {
        Object.assign(this.config || {}, this.configInput || {});
        if (this.items) {
            this.list = new core_2.List(this.items, this.config);
        }
        else if (this.collection) {
            this.list = new core_2.List(this.collection.items, this.config);
        }
        if (!this.list) {
            return;
        }
        if (!this.selection && this.list.config && !this.list.config.disableSelection) {
            this.selection = new core_2.Selection([], this.list.config);
        }
        if (this.selection) {
            this.selection.update$.subscribe((selection) => {
                this.selected.emit(selection);
            });
        }
        /*this.list.update$.subscribe(() => {
          this.list.load();
        });*/
    }
    /** Column click handler. Triggers select.emit(item) with fallback to selection.toggle*/
    columnClick(item) {
        if (this.select.observers.length) {
            return this.select.emit(item);
        }
        if (this.selection) {
            this.selection.toggle(item, this.solo);
        }
    }
}
ListComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-list',
                template: require('./list.component.html'),
                styles: [require('./list.component.scss')],
                encapsulation: core_1.ViewEncapsulation.None
            },] },
];
/** @nocollapse */
ListComponent.ctorParameters = () => [];
ListComponent.propDecorators = {
    'configInput': [{ type: core_1.Input, args: ['config',] },],
    'items': [{ type: core_1.Input },],
    'collection': [{ type: core_1.Input },],
    'selection': [{ type: core_1.Input },],
    'solo': [{ type: core_1.Input },],
    'select': [{ type: core_1.Output },],
    'selected': [{ type: core_1.Output },],
    'list': [{ type: core_1.Input },],
};
exports.ListComponent = ListComponent;
//# sourceMappingURL=list.component.js.map