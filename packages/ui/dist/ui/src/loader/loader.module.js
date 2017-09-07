"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
const loader_component_1 = require("./loader.component");
const loader_service_1 = require("./loader.service");
class LoaderModule {
}
LoaderModule.decorators = [
    { type: core_1.NgModule, args: [{
                declarations: [
                    loader_component_1.LoaderComponent,
                ],
                imports: [
                    common_1.CommonModule,
                    http_1.HttpModule,
                ],
                exports: [
                    loader_component_1.LoaderComponent,
                ],
                providers: [loader_service_1.LoaderService]
            },] },
];
/** @nocollapse */
LoaderModule.ctorParameters = () => [];
exports.LoaderModule = LoaderModule;
//# sourceMappingURL=loader.module.js.map