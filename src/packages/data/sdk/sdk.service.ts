import { Injectable } from '@angular/core';
import { Accounts, PublicAPI, Session } from 'ec.sdk';
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
  /** Current User */
  public user;
  /** Flips to true after the APIs have been initialized. */
  private ready: boolean;

  /** Calls init and sets ready to true when finished. */
  constructor() {
    this.init().then(() => {
      this.ready = true
    });
  }

  /** Creates all the API instances and determines the current user. */
  public init() {
    this.session = new Session(<env>environment.environment);
    this.accounts = new Accounts(<env>environment.environment);
    this.api = new PublicAPI(environment.datamanagerID, <env>environment.environment);
    this.api.setClientID(environment.clientID);

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
}
