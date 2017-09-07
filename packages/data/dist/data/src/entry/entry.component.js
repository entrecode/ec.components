"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by felix on 23.05.17.
 */
const core_1 = require("@angular/core");
const sdk_service_1 = require("../sdk/sdk.service");
/** Loads an entry by id to the template. */
class EntryComponent {
    /** Injects the sdk */
    constructor(sdk) {
        this.sdk = sdk;
        /** Fires as soon as the entry has been loaded. */
        this.loaded = new core_1.EventEmitter();
    }
    /** as soon as model and id are known, the entry will be loaded. */
    ngOnChanges() {
        if (this.id && this.model) {
            this.promise = this.sdk.api.entry(this.model, this.id, this.levels)
                .then((entry) => {
                this.entry = entry;
                this.loaded.emit(entry);
                return entry;
            });
        }
    }
}
EntryComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-entry',
                templateUrl: './entry.component.html'
            },] },
];
/** @nocollapse */
EntryComponent.ctorParameters = () => [
    { type: sdk_service_1.SdkService, },
];
EntryComponent.propDecorators = {
    'id': [{ type: core_1.Input },],
    'model': [{ type: core_1.Input },],
    'levels': [{ type: core_1.Input },],
    'loaded': [{ type: core_1.Output },],
};
exports.EntryComponent = EntryComponent;
//# sourceMappingURL=entry.component.js.map