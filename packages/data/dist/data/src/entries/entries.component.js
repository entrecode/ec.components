"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by felix on 23.05.17.
 */
const core_1 = require("@angular/core");
const sdk_service_1 = require("../sdk/sdk.service");
// import { filterOptions } from 'ec.sdk/typings/interfaces'
/** Loads an entryList of a given model with the given config. */
class EntriesComponent {
    /** Injects sdk */
    constructor(sdk) {
        this.sdk = sdk;
    }
    /** When the model is known, the entryList will be loaded. */
    ngOnChanges() {
        if (!this.model) {
            return;
        }
        this.promise = this.sdk.api.entryList(this.model, this.config)
            .then((entryList) => {
            this.entryList = entryList;
        });
    }
    /** This helper returns all items of the current entryList. */
    entries() {
        if (!this.entryList) {
            return [];
        }
        return this.entryList.getAllItems();
    }
}
EntriesComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-entries',
                template: require('./entries.component.html')
            },] },
];
/** @nocollapse */
EntriesComponent.ctorParameters = () => [
    { type: sdk_service_1.SdkService, },
];
EntriesComponent.propDecorators = {
    'model': [{ type: core_1.Input },],
    'config': [{ type: core_1.Input },],
};
exports.EntriesComponent = EntriesComponent;
//# sourceMappingURL=entries.component.js.map