"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const ngx_cookie_1 = require("ngx-cookie");
const rxjs_1 = require("rxjs");
const errors_1 = require("./errors");
class AuthorizationService {
    constructor(cookie) {
        this.cookie = cookie;
        this.token = this.cookie.get('ec-token');
    }
    setToken(token) {
        this.token = token;
        this.cookie.put('ec-token', token);
    }
    clearToken() {
        this.cookie.remove('ec-token');
        delete this.token;
        //TODO: logout in backend to invalidate token
    }
    getToken() {
        return this.token;
    }
    authorized() {
        return !!this.token;
    }
    unauthorized() {
        return !this.token;
    }
    catchError(err) {
        const error = err.json();
        const message = errors_1.backendErrorCodes[error.code][error.detail];
        rxjs_1.Observable.throw({ error: error, message: message });
    }
}
AuthorizationService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
AuthorizationService.ctorParameters = () => [
    { type: ngx_cookie_1.CookieService, },
];
exports.AuthorizationService = AuthorizationService;
//# sourceMappingURL=authorization.service.js.map