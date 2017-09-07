"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { BrowserModule } from '@angular/platform-browser';
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
const dynamic_slot_component_1 = require("./dynamic-slot/dynamic-slot.component");
const slot_host_directive_1 = require("./slot-host.directive");
const default_input_component_1 = require("../form/default-input/default-input.component");
const default_output_component_1 = require("../form/default-output/default-output.component");
const output_component_1 = require("./output/output.component");
const input_component_1 = require("./input/input.component");
const input_errors_component_1 = require("./input-errors/input-errors.component");
const forms_1 = require("@angular/forms");
const dynamic_rack_component_1 = require("./dynamic-rack/dynamic-rack.component");
class IoModule {
}
IoModule.decorators = [
    { type: core_1.NgModule, args: [{
                entryComponents: [
                    default_input_component_1.DefaultInputComponent,
                    default_output_component_1.DefaultOutputComponent,
                    input_component_1.InputComponent,
                    output_component_1.OutputComponent,
                    input_errors_component_1.InputErrorsComponent,
                ],
                declarations: [
                    input_errors_component_1.InputErrorsComponent,
                    slot_host_directive_1.SlotHostDirective,
                    dynamic_slot_component_1.DynamicSlotComponent,
                    dynamic_rack_component_1.DynamicRackComponent,
                    input_component_1.InputComponent,
                    output_component_1.OutputComponent,
                ],
                imports: [
                    common_1.CommonModule,
                    http_1.HttpModule,
                    forms_1.ReactiveFormsModule,
                ],
                exports: [
                    slot_host_directive_1.SlotHostDirective,
                    dynamic_slot_component_1.DynamicSlotComponent,
                    dynamic_rack_component_1.DynamicRackComponent,
                    input_component_1.InputComponent,
                    output_component_1.OutputComponent,
                    input_errors_component_1.InputErrorsComponent,
                    forms_1.ReactiveFormsModule,
                ],
                providers: []
            },] },
];
/** @nocollapse */
IoModule.ctorParameters = () => [];
exports.IoModule = IoModule;
//# sourceMappingURL=io.module.js.map