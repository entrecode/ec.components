"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
const notifications_component_1 = require("./notifications.component");
const notifications_service_1 = require("./notifications.service");
const pop_module_1 = require("../pop/pop.module");
const error_component_1 = require("./error/error.component");
class NotificationsModule {
}
NotificationsModule.decorators = [
    { type: core_1.NgModule, args: [{
                declarations: [
                    notifications_component_1.NotificationsComponent,
                    error_component_1.ErrorComponent,
                ],
                imports: [
                    common_1.CommonModule,
                    http_1.HttpModule,
                    pop_module_1.PopModule,
                ],
                exports: [
                    notifications_component_1.NotificationsComponent,
                    error_component_1.ErrorComponent,
                ],
                providers: [
                    {
                        provide: 'useDesktopNotifications',
                        useValue: false
                    }, notifications_service_1.NotificationsService
                ]
            },] },
];
/** @nocollapse */
NotificationsModule.ctorParameters = () => [];
exports.NotificationsModule = NotificationsModule;
//# sourceMappingURL=notifications.module.js.map