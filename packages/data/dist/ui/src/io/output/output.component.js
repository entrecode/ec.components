"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const default_output_component_1 = require("../../form/default-output/default-output.component");
const dynamic_slot_component_1 = require("../dynamic-slot/dynamic-slot.component");
/** Outputs the given field of the given item, rendering the component dynamically. */
class OutputComponent extends dynamic_slot_component_1.DynamicSlotComponent {
    /** The component is loade as soon as the field and item are known.
     * If the field has no output property set, the DefaultOutputComponent will be rendered. */
    ngOnChanges() {
        if (this.field && this.item) {
            this.loadComponent(this.field.output || default_output_component_1.DefaultOutputComponent, {
                item: this.item,
                field: this.field
            });
        }
    }
}
OutputComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-output',
                templateUrl: '../dynamic-slot/dynamic-slot.component.html',
                styleUrls: ['./output.component.scss']
            },] },
];
/** @nocollapse */
OutputComponent.ctorParameters = () => [];
OutputComponent.propDecorators = {
    'field': [{ type: core_1.Input },],
    'item': [{ type: core_1.Input },],
};
exports.OutputComponent = OutputComponent;
//# sourceMappingURL=output.component.js.map