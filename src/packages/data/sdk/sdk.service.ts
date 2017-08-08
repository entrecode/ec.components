import { Injectable } from '@angular/core';
import { Accounts, PublicAPI, Session } from 'ec.sdk';
import { environment as env } from 'ec.sdk/typings/interfaces';
import { environment } from '../../../environments/environment';

@Injectable()
export class SdkService {
  public session: Session;
  public accounts: Accounts;
  public api: PublicAPI;
  public user;
  private ready: boolean;

  constructor() {
    this.init().then(() => {
      this.ready = true
    });
  }

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

  login(credentials: { email: string, password: string, invite: string }) {
    return this.api.login(credentials.email, credentials.password)
    .catch(() => this.session.login(credentials.email, credentials.password))
    .then((token) => {
      return this.init();
    })
  }

  logout() {
    console.log('logout:..');
    return this.api.logout().catch(() => this.session.logout())
    .then(() => {
      console.log('logout complete!?');
      return this.init();
    });
  }
}
