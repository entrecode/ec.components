import { Inject, Injectable } from '@angular/core';
import Accounts from 'ec.sdk/lib/Accounts';
import Core, { environment as env } from 'ec.sdk/lib/Core';
import DataManager from 'ec.sdk/lib/DataManager';
import PublicAPI from 'ec.sdk/lib/PublicAPI';
import Session from 'ec.sdk/lib/Session';
import AccountResource from 'ec.sdk/lib/resources/accounts/AccountResource';
import DataManagerResource from 'ec.sdk/lib/resources/datamanager/DataManagerResource';
import { Subject } from 'rxjs';

/** The SdkService exposes all instances of the ec.sdk APIs.
 * To be able to use it, you have to provide an environment like this in your module's providers:
 *
 *```json
 {
   provide: 'environment',
   useValue: {
     datamanagerID: '83cc6374',
     environment: 'stage',
     clientID: 'rest',
     // init: false
     // the init option will prevent automatically initing the sdk.
     // you have to call sdk.init() yourself. This can be useful if your environment is not known before runtime
   }
 }```
 * The environment is optional, defaulting to live. See
 * https://entrecode.github.io/ec.sdk/#environment for more info. The clientID is only optional if
 * you do not plan to use authentication. See https://entrecode.github.io/ec.sdk/#environment =>
 * setClientID.
 */
@Injectable()
export class SdkService {
  /** Flips to true as soon as the PublicAPI instance was resolved (now contains model and asset relations) */
  apiResolved: boolean;
  /** Collects different datamanager root instances */
  roots: { [id: string]: Promise<DataManagerResource> } = {};
  get root(): Promise<DataManagerResource> {
    if (!this._api) {
      throw new Error('no api');
    }
    if (!this.roots[this._api.dataManagerID]) {
      this.roots[this._api.dataManagerID] = this.ready.then(() =>
        this.datamanager.dataManager(this._api.dataManagerID),
      );
    }
    return this.roots[this._api.dataManagerID];
  }
  /** Current Session instance */
  public session: Session;
  /** Current Accounts instance */
  public accounts: Accounts;
  /** Current Public API instance */
  public _api: PublicAPI;
  /** Emits when the env changes */
  public changesEnvironment: Subject<any> = new Subject();
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
    this._api.resolve().then(() => (this.apiResolved = true));
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

  /** Calls init and sets ready to true when finished. Omits init if environment has set init: false */
  constructor(@Inject('environment') public environment) {
    if (!environment || environment.init !== false) {
      this.init();
    }
  }

  /** Creates all the API instances and determines the current user. */
  public init(environment = this.environment): Promise<AccountResource> {
    if (environment !== this.environment) {
      this.changesEnvironment.next(environment);
    }
    this.environment = environment;
    this.session = new Session(<env>environment.environment);
    if (environment.clientID) {
      this.session.setClientID(environment.clientID);
    }
    this.accounts = new Accounts(<env>environment.environment);
    if (environment.datamanagerID) {
      this.useDatamanager(environment.datamanagerID, environment);
    }
    this.ready = this.getAccount().then((user) => {
      this.user = user;
      this.datamanager = new DataManager(<env>environment.environment);
      return this.user;
    });
    return this.ready;
  }
  /** Uses the given datamanager and optional short id to init api.
   * If you set "datamanagerID" in your environment, this method is called automatically. */
  useDatamanager(shortID: string, environment = this.environment) {
    this.apiResolved = false;
    this._api = new PublicAPI(shortID, <env>environment.environment, true);
    if (environment.clientID) {
      this._api.setClientID(environment.clientID);
    }
    return this._api.resolve().then((api) => {
      this.apiResolved = true;
      return api;
    });
  }

  /** Returns a schema for the given model. Caches the promise. */
  getSchema(model, api = this._api) {
    if (this.noApi(api)) {
      return Promise.reject('getSchema: ' + this.noApi(api));
    }
    if (!this.schemaRequests[model] || this.schemaRequests[model].api !== api) {
      this.schemaRequests[model] = { request: api.getSchema(model), api };
    }
    return this.schemaRequests[model].request;
  }

  /** Returns the current account. Works for all apis */
  getAccount(api = this.accounts) {
    if (this.noApi(api)) {
      /* return Promise.reject('getAccount: ' + this.noApi(api)); */
      return Promise.resolve();
    }
    return api
      .me()
      .then((account) => {
        return account || this._api.me();
      })
      .catch((error) => {
        return this._api && this._api.getToken() ? this._api.me() : null;
      });
  }

  noApi(api: Core = this._api) {
    if (!api) {
      return `No API was initialized. Either set datamanagerID in your environment or call useDatamanager with your shortID`;
    }
  }
}
