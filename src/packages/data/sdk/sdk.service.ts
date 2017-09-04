import { Inject, Injectable } from '@angular/core';
import { Accounts, DataManager, PublicAPI, Session } from 'ec.sdk';
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
    this.ready = this.init();
    this.ready.then((account) => {
      this.datamanager = new DataManager(<env>environment.environment);
      // this.ready.emit(account);
    });
  }

  /** Creates all the API instances and determines the current user. */
  public init(environment = this.environment): Promise<AccountResource> {
    if (this.noDatamanagerID()) {
      return Promise.reject(this.noDatamanagerID());
    }
    this.session = new Session(<env>environment.environment);
    this.accounts = new Accounts(<env>environment.environment);
    this.api = new PublicAPI(environment.datamanagerID, <env>environment.environment, true); //true
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
  login(credentials: { email: string, password: string, invite: string }) {
    if (this.noClientID()) {
      return Promise.reject(this.noClientID());
    }
    return this.api.login(credentials.email, credentials.password)
    .catch(() => this.session.login(credentials.email, credentials.password))
    .then((token) => {
      return this.init();
    })
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
  getAccount(): Promise<AccountResource> {
    return this.accounts.me().then((account) => {
      return account || this.api.me();
    }).catch((err) => {
      return this.api.me();
    })
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
