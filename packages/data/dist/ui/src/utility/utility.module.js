"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@angular/common");
const router_1 = require("@angular/router");
const forms_1 = require("@angular/forms");
const core_1 = require("@angular/core");
const tabs_component_1 = require("./tabs/tabs.component");
const tab_component_1 = require("./tab/tab.component");
const mockup_component_1 = require("./mockup/mockup.component");
const menu_component_1 = require("./menu/menu.component");
const login_component_1 = require("./login/login.component");
const io_module_1 = require("../io/io.module");
class UtilityModule {
}
UtilityModule.decorators = [
    { type: core_1.NgModule, args: [{
                entryComponents: [],
                declarations: [
                    tabs_component_1.TabsComponent,
                    tab_component_1.TabComponent,
                    mockup_component_1.MockupComponent,
                    menu_component_1.MenuComponent,
                    login_component_1.LoginComponent,
                ],
                imports: [
                    forms_1.FormsModule,
                    forms_1.ReactiveFormsModule,
                    io_module_1.IoModule,
                    common_1.CommonModule,
                    router_1.RouterModule,
                ],
                exports: [
                    forms_1.FormsModule,
                    forms_1.ReactiveFormsModule,
                    io_module_1.IoModule,
                    tabs_component_1.TabsComponent,
                    tab_component_1.TabComponent,
                    mockup_component_1.MockupComponent,
                    menu_component_1.MenuComponent,
                    login_component_1.LoginComponent,
                    router_1.RouterModule,
                ],
                providers: [],
            },] },
];
/** @nocollapse */
UtilityModule.ctorParameters = () => [];
exports.UtilityModule = UtilityModule;
//# sourceMappingURL=utility.module.js.map