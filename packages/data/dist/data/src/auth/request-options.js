"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
const authorization_service_1 = require("./authorization.service");
class DefaultRequestOptions extends http_1.BaseRequestOptions {
    constructor(auth) {
        super();
        this.auth = auth;
        // Set the default 'Content-Type' header
        this.headers.set('Content-Type', 'application/json');
    }
    merge(options) {
        const newOptions = super.merge(options);
        const token = this.auth.getToken();
        if (token) {
            newOptions.headers.set('Authorization', `Bearer ${token}`);
        }
        else {
            newOptions.headers.delete('Authorization');
        }
        return newOptions;
    }
}
DefaultRequestOptions.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
DefaultRequestOptions.ctorParameters = () => [
    { type: authorization_service_1.AuthorizationService, },
];
exports.DefaultRequestOptions = DefaultRequestOptions;
exports.requestOptionsProvider = { provide: http_1.RequestOptions, useClass: DefaultRequestOptions };
//# sourceMappingURL=request-options.js.map