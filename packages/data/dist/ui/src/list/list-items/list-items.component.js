"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
/** The ListItemsComponent displays the actual list, without all peripherals (header, pagination etc.).
 * It can either be given an Array of Items or just the list parent to control the shown items. */
class ListItemsComponent {
    /** Checks for host and uses its list. */
    ngOnChanges() {
        if (this.host) {
            this.list = this.host.list;
            this.selection = this.host.selection;
        }
        if (!this.items && this.list) {
            this.items = this.list.page;
        }
    }
    /** Propagate clicked item to host or toggle selection. */
    columnClick(item) {
        if (this.host) {
            this.host.columnClick(item);
        }
        else if (this.selection) {
            this.selection.toggle(item, this.solo);
        }
    }
}
ListItemsComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-list-items',
                template: require('./list-items.component.html'),
                styles: [require('./list-items.component.scss')]
            },] },
];
/** @nocollapse */
ListItemsComponent.ctorParameters = () => [];
ListItemsComponent.propDecorators = {
    'list': [{ type: core_1.Input },],
    'selection': [{ type: core_1.Input },],
    'items': [{ type: core_1.Input },],
    'host': [{ type: core_1.Input },],
    'solo': [{ type: core_1.Input },],
};
exports.ListItemsComponent = ListItemsComponent;
//# sourceMappingURL=list-items.component.js.map