"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
/** This component renders, as the name states, the header of a list.*/
class ListHeaderComponent {
    /** opens the given filter pop and closes all others */
    editFilter(pop) {
        pop.toggle();
        // this.pops.forEach((pop) => pop.hide());
    }
    /** Applies the given filter to the list. */
    applyFilter(property, value) {
        this.list.filter(property, value);
    }
    removeFilter(property, control) {
        control.reset();
    }
}
ListHeaderComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-list-header',
                template: require('./list-header.component.html'),
                styles: [require('./list-header.component.scss')]
            },] },
];
/** @nocollapse */
ListHeaderComponent.ctorParameters = () => [];
ListHeaderComponent.propDecorators = {
    'list': [{ type: core_1.Input },],
    'selection': [{ type: core_1.Input },],
    'pops': [{ type: core_1.ViewChildren, args: ['filterPop',] },],
    'filter': [{ type: core_1.ViewChild, args: ['filterForm',] },],
};
exports.ListHeaderComponent = ListHeaderComponent;
//# sourceMappingURL=list-header.component.js.map