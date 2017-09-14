import { Inject, Injectable } from '@angular/core';
import DataManager from 'ec.sdk/src/DataManager';
import Accounts from 'ec.sdk/src/Accounts';
import PublicAPI from 'ec.sdk/src/PublicAPI';
import Session from 'ec.sdk/src/Session';
import AccountResource from 'ec.sdk/src/resources/accounts/AccountResource';
import { environment as env } from 'ec.sdk/src/Core';

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
@Injectable()
export class SdkService {
  /** Current Session instance */
  public session: Session;
  /** Current Accounts instance */
  public accounts: Accounts;
  /** Current Public API instance */
  public api: PublicAPI;
  /** Current DataManager instance */
  public datamanager: DataManager;
  /** Current User */
  public user: AccountResource;
  /** Pending schema requests */
  private schemaRequests = {};
  /** Promise that should be used before using any auth related stuff:
   *
   * ```ts
   * this.sdk.ready.then(account => {});
   * ```
   * */
  public ready: Promise<AccountResource>;

  /** Calls init and sets ready to true when finished. */
  constructor(@Inject('environment') private environment) {
    this.init().then((account) => {
      this.datamanager = new DataManager(<env>environment.environment);
    });
  }

  /** Creates all the API instances and determines the current user. */
  public init(environment = this.environment): Promise<AccountResource> {
    if (this.noDatamanagerID()) {
      return Promise.reject(this.noDatamanagerID());
    }
    this.session = new Session(<env>environment.environment);
    this.accounts = new Accounts(<env>environment.environment);
    this.api = new PublicAPI(environment.datamanagerID, <env>environment.environment, true);
    if (environment.clientID) {
      this.api.setClientID(environment.clientID);
      this.session.setClientID(environment.clientID);
    }
    this.ready = this.getAccount()
    .then((user) => {
      this.user = user;
      return this.user;
    });
    return this.ready;
  }

  getSchema(model) {
    if (!this.schemaRequests[model]) {
      this.schemaRequests[model] = this.api.getSchema(model);
    }
    return this.schemaRequests[model];
  }

  /** Generic login that works with both public and admin API. */
  login({ email, password }, api?) {
    if (this.noClientID()) {
      return Promise.reject(this.noClientID());
    }
    return Promise.resolve(api || this.getApi(email))
    .then((resolvedAPI) => {
      const _api = resolvedAPI || this.session;
      return !_api ? Promise.reject('api_not_found') : _api.login(email, password);
    }).then(() => {
      return this.init();
    });
  }

  /** Generic Signup, works for accounts API and PublicAPI */
  signup({ email, password, invite }, api?) {
    if (this.noClientID()) {
      return Promise.reject(this.noClientID());
    }
    return api ? api.signup() : this.api.signup(email, password, invite)
    .catch(() => this.accounts.signup(email, password, invite))
    .then((res) => {
      return this.init();
    })
  }

  /** Returns the current account. Works for all apis */
  getAccount(api = this.api) {
    return api.me().then((account) => {
      return account || this.accounts.me();
    }).catch((err) => {
      return this.api.me();
    });
  }

  /** checks given public permission for given api, defaults to this.api. Also works as ec user */
  checkPublicPermission(permission: string, api = this.api) {
    return this.ready.then((user) => {
      return api.checkPermission(permission);
    })
  }

  /** Generic password reset that works with both public and admin API. */
  resetPassword(email, api?) {
    if (this.noClientID()) {
      return Promise.reject(this.noClientID());
    }
    return Promise.resolve(api || this.getApi(email))
    .then((resolvedAPI) => {
      const _api = resolvedAPI || this.accounts;
      return !_api ? Promise.reject('api_not_found') : api.resetPassword(email);
    });
  }

  /** Generic logout that works with both public and admin API. */
  logout(api?) {
    if (this.noClientID()) {
      return Promise.reject(this.noClientID());
    }
    return api ? api.logout() : this.api.logout().catch(() => this.session.logout())
    .then(() => {
      return this.init();
    });
  }

  getApi(email: string) {
    if (!this.api && !this.accounts) {
      return Promise.reject('no_api_found');
    }
    return this.api.emailAvailable(email)
    .then((available) => {
      if (!available) {
        return this.api;
      }
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
