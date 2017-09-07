"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const model_list_1 = require("./model-list");
const resource_list_component_1 = require("../resource-list/resource-list.component");
/** The ModelListComponent is a thin holder of an ModelList instance. It extends the ResourceListComponent */
class ModelListComponent extends resource_list_component_1.ResourceListComponent {
    createList() {
        if (!this.datamanager) {
            console.log('no datamanager given..');
            return;
        }
        return new model_list_1.ModelList(this.datamanager, this.config, this.sdk);
    }
}
ModelListComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-model-list',
                templateUrl: '../../../ui/src/list/list.component.html'
            },] },
];
/** @nocollapse */
ModelListComponent.ctorParameters = () => [];
ModelListComponent.propDecorators = {
    'datamanager': [{ type: core_1.Input },],
};
exports.ModelListComponent = ModelListComponent;
//# sourceMappingURL=model-list.component.js.map