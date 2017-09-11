"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
const form_component_1 = require("./form.component");
const default_input_component_1 = require("./default-input/default-input.component");
const default_output_component_1 = require("./default-output/default-output.component");
const forms_1 = require("@angular/forms");
const select_component_1 = require("./select/select.component");
const pop_module_1 = require("../pop/pop.module");
const form_service_1 = require("./form.service");
const visible_fields_pipe_1 = require("./visible-fields.pipe");
const io_module_1 = require("../io/io.module");
const datetime_component_1 = require("./datetime/datetime.component");
const month_component_1 = require("./datetime/month.component");
const datetime_pipe_1 = require("./datetime/datetime.pipe");
class FormModule {
}
FormModule.decorators = [
    { type: core_1.NgModule, args: [{
                entryComponents: [
                    default_input_component_1.DefaultInputComponent,
                    default_output_component_1.DefaultOutputComponent,
                ],
                declarations: [
                    form_component_1.FormComponent,
                    default_input_component_1.DefaultInputComponent,
                    default_output_component_1.DefaultOutputComponent,
                    select_component_1.SelectComponent,
                    datetime_component_1.DatetimeComponent,
                    datetime_pipe_1.DatetimePipe,
                    month_component_1.MonthComponent,
                    visible_fields_pipe_1.VisibleFieldsPipe,
                ],
                imports: [
                    common_1.CommonModule,
                    http_1.HttpModule,
                    forms_1.ReactiveFormsModule,
                    pop_module_1.PopModule,
                    io_module_1.IoModule,
                ],
                exports: [
                    form_component_1.FormComponent,
                    forms_1.ReactiveFormsModule,
                    select_component_1.SelectComponent,
                    datetime_component_1.DatetimeComponent,
                    datetime_pipe_1.DatetimePipe,
                    month_component_1.MonthComponent,
                    pop_module_1.PopModule,
                    visible_fields_pipe_1.VisibleFieldsPipe,
                    io_module_1.IoModule,
                ],
                providers: [
                    form_service_1.FormService
                ]
            },] },
];
/** @nocollapse */
FormModule.ctorParameters = () => [];
exports.FormModule = FormModule;
//# sourceMappingURL=form.module.js.map