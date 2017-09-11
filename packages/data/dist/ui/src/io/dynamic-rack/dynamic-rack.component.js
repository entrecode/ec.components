"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
// import { CustomFieldComponent } from './custom-field.component';
/** This directive can be used to display a field. It is used inside ec-form as well as ec-list. */
class DynamicRackComponent {
    /** The constructor provides the instance of ViewContainerRef which is later used to create embedded views*/
    constructor(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
    }
}
DynamicRackComponent.decorators = [
    { type: core_1.Component, args: [{
                // selector: 'ec-dynamic-rack',
                template: require('./dynamic-rack.component.html')
            },] },
];
/** @nocollapse */
DynamicRackComponent.ctorParameters = () => [
    { type: core_1.ComponentFactoryResolver, },
];
exports.DynamicRackComponent = DynamicRackComponent;
//# sourceMappingURL=dynamic-rack.component.js.map