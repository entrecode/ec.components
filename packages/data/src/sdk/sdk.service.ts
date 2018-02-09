import { Inject, Injectable } from '@angular/core';
import DataManager from 'ec.sdk/lib/DataManager';
import Accounts from 'ec.sdk/lib/Accounts';
import PublicAPI from 'ec.sdk/lib/PublicAPI';
import Session from 'ec.sdk/lib/Session';
import AccountResource from 'ec.sdk/lib/resources/accounts/AccountResource';
import { environment as env } from 'ec.sdk/lib/Core';

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
  constructor(@Inject('environment') public environment) {
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

  /** Returns a schema for the given model. Caches the promise. */
  getSchema(model) {
    if (!this.schemaRequests[model]) {
      this.schemaRequests[model] = this.api.getSchema(model);
    }
    return this.schemaRequests[model];
  }

  /** Returns the current account. Works for all apis */
  getAccount(api = this.api) {
    return api.me().then((account) => {
      return account || this.accounts.me();
    }).catch((err) => {
      return this.api.me();
    });
  }

  noDatamanagerID() {
    if (!this.environment.datamanagerID) {
      return `
No datamangerID is set in your environment! You can only use the SdkService if you
provide an environment like this in your module's provide section:

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
}
