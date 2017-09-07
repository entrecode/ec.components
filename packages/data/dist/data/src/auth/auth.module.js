"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
const forms_1 = require("@angular/forms");
const ngx_cookie_1 = require("ngx-cookie");
const public_auth_service_1 = require("./public-auth.service");
const request_options_1 = require("./request-options");
const authorization_service_1 = require("./authorization.service");
const public_login_component_1 = require("./public-login/public-login.component");
const validate_onblur_1 = require("./validate-onblur");
const public_signup_component_1 = require("./public-signup/public-signup.component");
const admin_login_component_1 = require("./admin-login/admin-login.component");
const ui_module_1 = require("@ec.components/ui/src/ui.module");
const admin_signup_component_1 = require("./admin-signup/admin-signup.component");
function cookieFactory() {
    //https://github.com/auth0/angular2-jwt/issues/305
    return ngx_cookie_1.CookieModule.forRoot();
}
exports.cookieFactory = cookieFactory;
class AuthModule {
}
AuthModule.decorators = [
    { type: core_1.NgModule, args: [{
                declarations: [
                    public_login_component_1.PublicLoginComponent,
                    public_signup_component_1.PublicSignupComponent,
                    validate_onblur_1.ValidationOnBlurDirective,
                    admin_login_component_1.AdminLoginComponent,
                    admin_signup_component_1.AdminSignupComponent,
                ],
                imports: [
                    cookieFactory(),
                    common_1.CommonModule,
                    forms_1.ReactiveFormsModule,
                    http_1.HttpModule,
                    ui_module_1.UiModule
                ],
                exports: [
                    validate_onblur_1.ValidationOnBlurDirective,
                    public_login_component_1.PublicLoginComponent,
                    public_signup_component_1.PublicSignupComponent,
                    admin_login_component_1.AdminLoginComponent,
                    admin_signup_component_1.AdminSignupComponent,
                    forms_1.ReactiveFormsModule
                ],
                providers: [authorization_service_1.AuthorizationService, request_options_1.requestOptionsProvider, public_auth_service_1.PublicAuthService]
            },] },
];
/** @nocollapse */
AuthModule.ctorParameters = () => [];
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map