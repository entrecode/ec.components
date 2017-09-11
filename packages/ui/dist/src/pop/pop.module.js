"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
const pop_component_1 = require("./pop.component");
class PopModule {
}
PopModule.decorators = [
    { type: core_1.NgModule, args: [{
                declarations: [
                    pop_component_1.PopComponent
                ],
                imports: [
                    common_1.CommonModule,
                    http_1.HttpModule,
                ],
                exports: [
                    pop_component_1.PopComponent
                ],
                providers: []
            },] },
];
/** @nocollapse */
PopModule.ctorParameters = () => [];
exports.PopModule = PopModule;
//# sourceMappingURL=pop.module.js.map