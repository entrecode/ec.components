import { EventEmitter, Injectable } from '@angular/core';
import { Accounts, DataManager, PublicAPI, Session } from 'ec.sdk';
// import { AccountResource } from 'ec.sdk/typings/resources/accounts/AccountResource';
// TODO find out how to resolve
import { environment as env } from 'ec.sdk/typings/interfaces';
import { environment } from '../../../environments/environment';

/** The SdkService exposes all instances of the ec.sdk APIs. */
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
  public user;
  /** Emits  after the APIs have been initialized. */
  public ready: EventEmitter<void> = new EventEmitter();

  /** Calls init and sets ready to true when finished. */
  constructor() {
    this.init().then((account) => {
      this.datamanager = new DataManager(<env>environment.environment);
      this.ready.emit(account);
    });
  }

  /** Creates all the API instances and determines the current user. */
  public init() {
    this.session = new Session(<env>environment.environment);
    this.accounts = new Accounts(<env>environment.environment);
    this.api = new PublicAPI(environment.datamanagerID, <env>environment.environment);
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
  getAccount() {
    return this.accounts.me().then((account) => {
      if (account) {
        this.datamanager = new DataManager(<env>environment.environment);
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
