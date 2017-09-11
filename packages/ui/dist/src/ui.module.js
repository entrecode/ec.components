"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const list_module_1 = require("./list/list.module");
const form_module_1 = require("./form/form.module");
const pop_module_1 = require("./pop/pop.module");
const loader_module_1 = require("./loader/loader.module");
const notifications_module_1 = require("./notifications/notifications.module");
const utility_module_1 = require("./utility/utility.module");
class UiModule {
    forRoot() {
    }
}
UiModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    forms_1.FormsModule,
                    common_1.CommonModule,
                    forms_1.ReactiveFormsModule,
                    utility_module_1.UtilityModule,
                    notifications_module_1.NotificationsModule,
                    pop_module_1.PopModule,
                    loader_module_1.LoaderModule,
                    form_module_1.FormModule,
                    list_module_1.ListModule,
                ],
                exports: [
                    forms_1.ReactiveFormsModule,
                    forms_1.FormsModule,
                    utility_module_1.UtilityModule,
                    pop_module_1.PopModule,
                    notifications_module_1.NotificationsModule,
                    loader_module_1.LoaderModule,
                    list_module_1.ListModule,
                    form_module_1.FormModule,
                ]
            },] },
];
/** @nocollapse */
UiModule.ctorParameters = () => [];
exports.UiModule = UiModule;
//# sourceMappingURL=ui.module.js.map