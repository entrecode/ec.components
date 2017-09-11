"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const slot_host_directive_1 = require("../slot-host.directive");
// import { CustomFieldComponent } from './custom-field.component';
/** This directive can be used to display a field. It is used inside ec-form as well as ec-list. */
class DynamicSlotComponent {
    /** The constructor provides the instance of ViewContainerRef which is later used to create embedded views*/
    constructor(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
    }
    /** Loads the given component inside the fieldHost. Sets current item and field by default. */
    loadComponent(component, data = {}) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        const viewContainerRef = this.fieldHost.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(componentFactory);
        Object.assign(componentRef.instance, data);
        //custom field component is the component each custom field should inherit
        return componentRef;
    }
}
DynamicSlotComponent.decorators = [
    { type: core_1.Component, args: [{
                // selector: 'ec-dynamic-field',
                template: require('./dynamic-slot.component.html')
            },] },
];
/** @nocollapse */
DynamicSlotComponent.ctorParameters = () => [
    { type: core_1.ComponentFactoryResolver, },
];
DynamicSlotComponent.propDecorators = {
    'fieldHost': [{ type: core_1.ViewChild, args: [slot_host_directive_1.SlotHostDirective,] },],
};
exports.DynamicSlotComponent = DynamicSlotComponent;
//# sourceMappingURL=dynamic-slot.component.js.map