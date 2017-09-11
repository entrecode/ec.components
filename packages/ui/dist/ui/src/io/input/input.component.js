"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const dynamic_slot_component_1 = require("../dynamic-slot/dynamic-slot.component");
const default_input_component_1 = require("../../form/default-input/default-input.component");
/** This directive can be used to display a field. It is used inside ec-form as well as ec-list. */
class InputComponent extends dynamic_slot_component_1.DynamicSlotComponent {
    constructor() {
        super(...arguments);
        /** The changed ouput emits whenever the form control of the input changes. */
        this.changed = new core_1.EventEmitter();
        /** Debounce time in ms before the changed event emits. */
        this.debounce = 0;
    }
    ngOnChanges() {
        if (!this.field) {
            return;
        }
        const data = {
            group: this.group,
            control: this.control || this.group.get(this.field.property),
            item: this.item,
            field: this.field
        };
        const componentRef = this.loadComponent(this.field.input || default_input_component_1.DefaultInputComponent, data);
        if (componentRef.instance.control) {
            componentRef.instance.control.valueChanges
                .debounceTime(this.debounce)
                .subscribe((change) => {
                this.changed.emit(change);
            });
        }
    }
}
InputComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-input',
                template: require('../dynamic-slot/dynamic-slot.component.html'),
            },] },
];
/** @nocollapse */
InputComponent.ctorParameters = () => [];
InputComponent.propDecorators = {
    'group': [{ type: core_1.Input },],
    'control': [{ type: core_1.Input },],
    'changed': [{ type: core_1.Output },],
    'debounce': [{ type: core_1.Input },],
    'field': [{ type: core_1.Input },],
    'item': [{ type: core_1.Input },],
};
exports.InputComponent = InputComponent;
//# sourceMappingURL=input.component.js.map