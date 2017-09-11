"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const datamanager_list_1 = require("./datamanager-list");
const resource_list_component_1 = require("../resource-list/resource-list.component");
/** The EntryListComponent is a thin holder of an EntryList instance. It extends the ListComponent */
class DatamanagerListComponent extends resource_list_component_1.ResourceListComponent {
    createList() {
        return new datamanager_list_1.DatamanagerList(this.config, this.sdk);
    }
}
DatamanagerListComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-datamanager-list',
                template: require('../../../ui/src/list/list.component.html')
            },] },
];
/** @nocollapse */
DatamanagerListComponent.ctorParameters = () => [];
exports.DatamanagerListComponent = DatamanagerListComponent;
//# sourceMappingURL=datamanager-list.component.js.map