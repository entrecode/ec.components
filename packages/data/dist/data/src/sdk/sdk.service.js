"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const DataManager_1 = require("ec.sdk/src/DataManager");
const Accounts_1 = require("ec.sdk/src/Accounts");
const PublicAPI_1 = require("ec.sdk/src/PublicAPI");
const Session_1 = require("ec.sdk/src/Session");
/** The SdkService exposes all instances of the ec.sdk APIs.
 * To be able to use it, you have to provide an environment like this in your module's providers:
 *
 *```json
 {
   provide: "environment",
   useValue: {
     datamanagerID: "83cc6374",
     environment: "stage",
     clientID: "rest"
   }
 }```
 * The environment is optional, defaulting to live. See
 * https://entrecode.github.io/ec.sdk/#environment for more info. The clientID is only optional if
 * you do not plan to use authentication. See https://entrecode.github.io/ec.sdk/#environment =>
 * setClientID.
 */
class SdkService {
    /** Calls init and sets ready to true when finished. */
    constructor(environment) {
        this.environment = environment;
        /** Pending schema requests */
        this.schemaRequests = {};
        this.ready = this.init();
        this.ready.then((account) => {
            this.datamanager = new DataManager_1.default(environment.environment);
            // this.ready.emit(account);
        });
    }
    /** Creates all the API instances and determines the current user. */
    init(environment = this.environment) {
        if (this.noDatamanagerID()) {
            return Promise.reject(this.noDatamanagerID());
        }
        this.session = new Session_1.default(environment.environment);
        this.accounts = new Accounts_1.default(environment.environment);
        this.api = new PublicAPI_1.default(environment.datamanagerID, environment.environment, true); //true
        if (environment.clientID) {
            this.api.setClientID(environment.clientID);
            this.session.setClientID(environment.clientID);
        }
        return this.accounts.me().then((account) => {
            return account || this.api.me();
        }).catch((err) => {
            return this.api.me();
        }).then((user) => {
            this.user = user;
            return this.user;
        });
    }
    getSchema(model) {
        if (!this.schemaRequests[model]) {
            this.schemaRequests[model] = this.api.getSchema(model);
        }
        return this.schemaRequests[model];
    }
    /** Generic login that works with both public and admin API. */
    login(credentials) {
        if (this.noClientID()) {
            return Promise.reject(this.noClientID());
        }
        return this.api.login(credentials.email, credentials.password)
            .catch(() => this.session.login(credentials.email, credentials.password))
            .then((token) => {
            return this.init();
        });
    }
    /** Generic logout that works with both public and admin API. */
    logout() {
        if (this.noClientID()) {
            return Promise.reject(this.noClientID());
        }
        return this.api.logout().catch(() => this.session.logout())
            .then(() => {
            return this.init();
        });
    }
    /** Returns the current account. Returns ec user or public user if any found. */
    getAccount() {
        return this.accounts.me().then((account) => {
            return account || this.api.me();
        }).catch((err) => {
            return this.api.me();
        });
    }
    noDatamanagerID() {
        if (!this.environment.datamanagerID) {
            return `
No datamangerID is set in your environment! You can only use the SdkService if you provide an environment like this in your module's provide section: 

providers: [
  {
    provide: 'environment',
    useValue: {
      datamanagerID: '83cc6374',
      environment: 'stage',
      clientID: 'rest'
    }
  }
]`;
        }
    }
    noClientID() {
        if (!this.environment.clientID) {
            return `
No clientID set in environment! To enable all auth related functionalities, you can create a client in your datamanager settings and provide it with your environment:
  
  providers: [
    {
      provide: 'environment',
      useValue: {
        datamanagerID: '83cc6374',
        clientID: 'myClient',
      }
    }
  ]
`;
        }
    }
}
SdkService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
SdkService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: core_1.Inject, args: ['environment',] },] },
];
exports.SdkService = SdkService;
//# sourceMappingURL=sdk.service.js.map