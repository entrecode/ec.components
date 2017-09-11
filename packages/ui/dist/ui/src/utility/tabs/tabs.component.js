"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const collection_1 = require("@ec.components/core/src/collection/collection");
/** The TabsComponent holds serveral instances of TabComponent. */
class TabsComponent {
    /** The constructor inits the collection of tabs */
    constructor() {
        this.tabs = new collection_1.Collection([]);
    }
    /** This method adds a new tab to the tabs collection and auto selects if it is the first. */
    add(tab) {
        this.tabs.add(tab);
        if (!this.selected) {
            this.selected = tab;
        }
    }
}
TabsComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-tabs',
                template: require('./tabs.component.html'),
                styles: [require('./tabs.component.scss')]
            },] },
];
/** @nocollapse */
TabsComponent.ctorParameters = () => [];
TabsComponent.propDecorators = {
    'selected': [{ type: core_1.Input },],
};
exports.TabsComponent = TabsComponent;
//# sourceMappingURL=tabs.component.js.map