import { EventEmitter, Inject, Injectable } from '@angular/core';
import { Accounts, DataManager, PublicAPI, Session } from 'ec.sdk';
import { AccountResource } from 'ec.sdk/typings/resources/accounts/AccountResource';
import { environment as env } from 'ec.sdk/typings/interfaces';

/** The SdkService exposes all instances of the ec.sdk APIs.
 * To be able to use it, you have to provide an environment like this:
 *
 * ```
 * providers: [
 {
   provide: 'environment',
   useValue: {
     production: false,
     name: 'development',
     datamanagerID: '83cc6374',
     environment: 'stage',
     clientID: 'rest',
     apiRoot: 'https://datamanager.cachena.entrecode.de/api/83cc6374'
   }
 }
 ]```
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
  /** Emits  after the APIs have been initialized. */
  public ready: EventEmitter<AccountResource> = new EventEmitter();

  /** Calls init and sets ready to true when finished. */
  constructor(@Inject('environment') private environment) {
    if (!environment) {
      console.error(`could not initialize SDK: no environment is set up, you have to set it via your provider: 
      providers: [
        {
          provide: 'environment',
          useValue: {
            production: false,
            name: 'development',
            datamanagerID: '83cc6374',
            environment: 'stage',
            clientID: 'rest',
            apiRoot: 'https://datamanager.cachena.entrecode.de/api/83cc6374'
          }
        }
      ],`);
      return;
    }
    this.init().then((account) => {
      this.datamanager = new DataManager(<env>environment.environment);
      this.ready.emit(account);
    });
  }

  /** Creates all the API instances and determines the current user. */
  public init(environment = this.environment) {
    this.session = new Session(<env>environment.environment);
    this.accounts = new Accounts(<env>environment.environment);
    this.api = new PublicAPI(environment.datamanagerID, <env>environment.environment, true); //true
    //TODO recall new PublicAPI with third param set to true when ec user logs in?
    this.api.setClientID(environment.clientID);
    this.session.setClientID(environment.clientID);
    return this.accounts.me().then((account) => {
      return account || this.api.me();
    }).catch((err) => {
      return this.api.me();
    }).then((user) => {
      this.user = user;
      return this.user;
    });
  }

  /** Generic login that works with both public and admin API. */
  login(credentials: { email: string, password: string, invite: string }) {
    return this.api.login(credentials.email, credentials.password)
    .catch(() => this.session.login(credentials.email, credentials.password))
    .then((token) => {
      return this.init();
    })
  }

  /** Generic logout that works with both public and admin API. */
  logout() {
    return this.api.logout().catch(() => this.session.logout())
    .then(() => {
      return this.init();
    });
  }

  /** Returns the current account. Returns ec user or public user if any found. */
  getAccount(): Promise<AccountResource> {
    return this.accounts.me().then((account) => {
      if (account) {
        this.datamanager = new DataManager(<env>this.environment.environment);
        const list = this.datamanager.dataManagerList().then((list) => {
          console.log('list', list.getAllItems());
        });
      }
      return account || this.api.me();
    }).catch((err) => {
      return this.api.me();
    })
  }
}
