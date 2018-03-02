import { Inject, Injectable } from '@angular/core';
import DataManager from 'ec.sdk/lib/DataManager';
import Accounts from 'ec.sdk/lib/Accounts';
import PublicAPI from 'ec.sdk/lib/PublicAPI';
import Session from 'ec.sdk/lib/Session';
import AccountResource from 'ec.sdk/lib/resources/accounts/AccountResource';
import Core, { environment as env } from 'ec.sdk/lib/Core';

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
  public _api: PublicAPI;
  /** getter for api. Throws error if no api present. */
  get api(): PublicAPI {
    if (this.noApi()) {
      throw new Error('get api: ' + this.noApi());
    }
    return this._api;
  }
  /** Sets the public api */
  set api(api: PublicAPI) {
    this._api = api;
  }
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
  constructor(@Inject('environment') public environment) {
    this.init().then((account) => {
      this.datamanager = new DataManager(<env>environment.environment);
    });
  }

  /** Creates all the API instances and determines the current user. */
  public init(environment = this.environment): Promise<AccountResource> {
    this.session = new Session(<env>environment.environment);
    if (environment.clientID) {
      this.session.setClientID(environment.clientID);
    }
    this.accounts = new Accounts(<env>environment.environment);
    if (environment.datamanagerID) {
      this.useDatamanager(environment.datamanagerID);
    }
    this.ready = this.getAccount()
      .then((user) => {
        this.user = user;
        return this.user;
      });
    return this.ready;
  }
  /** Uses the given datamanager and optional short id to init api. If you set "datamanagerID" in your environment, this method is called automatically. */
  useDatamanager(shortID: string, environment = this.environment) {
    this._api = new PublicAPI(shortID, <env>environment.environment, true);
    if (environment.clientID) {
      this._api.setClientID(environment.clientID);
    }
  }

  /** Returns a schema for the given model. Caches the promise. */
  getSchema(model, api = this._api) {
    if (this.noApi(api)) {
      return Promise.reject('getSchema: ' + this.noApi(api));
    }
    if (!this.schemaRequests[model]) {
      this.schemaRequests[model] = api.getSchema(model);
    }
    return this.schemaRequests[model];
  }

  /** Returns the current account. Works for all apis */
  getAccount(api = this.accounts) {
    if (this.noApi(api)) {
      /* return Promise.reject('getAccount: ' + this.noApi(api)); */
      return Promise.resolve();
    }
    return api.me().then((account) => {
      return account || this._api.me();
    }).catch((err) => {
      return null;
    });
  }

  noApi(api: Core = this._api) {
    if (!api) {
      return `No API was initialized. Either set datamanagerID in your environment or call useDatamanager with your shortID`;
    }
  }
}
