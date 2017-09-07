"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/http");
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const authorization_service_1 = require("./authorization.service");
class PublicAuthService {
    constructor(agent, auth) {
        this.agent = agent;
        this.auth = auth;
        this.authorized = this.hasToken;
        this.logout = this.clearToken;
        this.useToken(this.auth.getToken());
    }
    useToken(token) {
        if (!token) {
            rxjs_1.Observable.throw('cannot use token: token is undefined');
        }
        this.auth.setToken(token);
        console.log('token', token);
        // Datamanager.updateEnvironment({ token: token });
        // return Observable.of({ token: token })
    }
    hasToken() {
        return !!this.auth.getToken();
    }
    clearToken() {
        this.auth.clearToken();
        // Datamanager.updateEnvironment({ token: null });
    }
    login(data) {
        console.log('login...');
        // return
        // this.agent.post(`${environment.apiRoot}/_auth/login?clientID=${environment.clientID}`, data)
        // .catch(this.auth.catchError) .map(res => res.json());
    }
    signup(data) {
        console.log('signup');
    }
}
PublicAuthService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
PublicAuthService.ctorParameters = () => [
    { type: http_1.Http, },
    { type: authorization_service_1.AuthorizationService, },
];
exports.PublicAuthService = PublicAuthService;
//# sourceMappingURL=public-auth.service.js.map