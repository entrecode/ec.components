"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { BrowserModule } from '@angular/platform-browser';
const core_1 = require("@angular/core");
const sdk_service_1 = require("./sdk.service");
const public_service_1 = require("./public.service");
const admin_service_1 = require("./admin.service");
class SdkModule {
}
SdkModule.decorators = [
    { type: core_1.NgModule, args: [{
                entryComponents: [],
                declarations: [],
                imports: [],
                exports: [],
                providers: [
                    sdk_service_1.SdkService,
                    public_service_1.PublicService,
                    admin_service_1.AdminService,
                ],
            },] },
];
/** @nocollapse */
SdkModule.ctorParameters = () => [];
exports.SdkModule = SdkModule;
//# sourceMappingURL=sdk.module.js.map