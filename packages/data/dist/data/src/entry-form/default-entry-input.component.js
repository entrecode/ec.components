"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const default_input_component_1 = require("@ec.components/ui/src/form/default-input/default-input.component");
const nested_crud_config_1 = require("../model-config/nested-crud-config");
/** This component holds the input templates for all field types that can not be represented by the default input template. */
class DefaultEntryInputComponent extends default_input_component_1.DefaultInputComponent {
    constructor() {
        super(...arguments);
        this.entrySelectConfig = nested_crud_config_1.nestedCrudConfig;
    }
}
DefaultEntryInputComponent.decorators = [
    { type: core_1.Component, args: [{
                template: require('./default-entry-input.component.html'),
            },] },
];
/** @nocollapse */
DefaultEntryInputComponent.ctorParameters = () => [];
exports.DefaultEntryInputComponent = DefaultEntryInputComponent;
//# sourceMappingURL=default-entry-input.component.js.map