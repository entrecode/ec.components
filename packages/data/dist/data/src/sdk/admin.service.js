"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const sdk_service_1 = require("./sdk.service");
//TODO move to auth?
/** This service handles the auth flow for admin accounts. */
class AdminService {
    /** Injects the sdk  */
    constructor(sdk) {
        this.sdk = sdk;
    }
    /** Logs in with the given credentials */
    login(credentials) {
        return this.sdk.session.login(credentials.email, credentials.password)
            .then((token) => this.sdk.init());
    }
    /** Logs out the current user */
    logout() {
        return this.sdk.session.logout().then((token) => this.sdk.init());
    }
    /** Registers a new user by using an invite code. */
    signup(credentials) {
        return this.sdk.accounts.signup(credentials.email, credentials.password, credentials.invite || '')
            .then((token) => this.sdk.accounts.setToken(token))
            .then(() => this.sdk.init());
    }
}
AdminService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
AdminService.ctorParameters = () => [
    { type: sdk_service_1.SdkService, },
];
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map