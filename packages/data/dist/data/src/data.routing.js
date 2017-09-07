"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const editor_component_1 = require("./editor.component");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const dataRoutes = [
    {
        path: 'wurst',
        component: editor_component_1.EditorComponent
    },
    {
        path: 'cheese',
        component: editor_component_1.EditorComponent
    } /*,
    {
      path: '', redirectTo: 'wurst', pathMatch: 'full'
    }*/
];
class DataRoutingModule {
}
DataRoutingModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [router_1.RouterModule.forChild(dataRoutes)],
                exports: [router_1.RouterModule]
            },] },
];
/** @nocollapse */
DataRoutingModule.ctorParameters = () => [];
exports.DataRoutingModule = DataRoutingModule;
//# sourceMappingURL=data.routing.js.map