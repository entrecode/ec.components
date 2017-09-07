"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const sdk_service_1 = require("./sdk.service");
//TODO move to auth?
/** This service handles the auth flow for public user accounts. */
class PublicService {
    /** Injects the sdk  */
    constructor(sdk) {
        this.sdk = sdk;
    }
    /** Logs in with the given credentials */
    login(credentials) {
        return this.sdk.api.login(credentials.email, credentials.password)
            .then((token) => this.sdk.init());
    }
    /** Logs out the current user */
    logout() {
        return this.sdk.api.logout().then((token) => this.sdk.init());
    }
    /** Registers a new user with an optional invite code */
    signup(credentials) {
        return this.sdk.api.signup(credentials.email, credentials.password, credentials.invite || '')
            .then((token) => this.sdk.init());
    }
}
PublicService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
PublicService.ctorParameters = () => [
    { type: sdk_service_1.SdkService, },
];
exports.PublicService = PublicService;
//# sourceMappingURL=public.service.js.map