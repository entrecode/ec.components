import { Injectable } from '@angular/core';
import { SdkService } from './sdk.service';
import AccountResource from 'ec.sdk/src/resources/accounts/AccountResource';

//TODO move to auth?

/** This service handles the auth flow for admin accounts. */
@Injectable()
export class AdminService {
  /** Injects the sdk  */
  constructor(private sdk: SdkService) {
  }

  /** Logs in with the given credentials */
  login(credentials: { email: string, password: string }): Promise<AccountResource> {
    return this.sdk.session.login(credentials.email, credentials.password)
    .then((token) => this.sdk.init());
  }

  /** Logs out the current user */
  logout() {
    return this.sdk.session.logout().then((token) => this.sdk.init());
  }

  /** Registers a new user by using an invite code. */
  signup(credentials: { email: string, password: string, invite: string }) {
    return this.sdk.accounts.signup(credentials.email, credentials.password, credentials.invite || '')
    .then((token) => this.sdk.accounts.setToken(token))
    .then(() => this.sdk.init());
  }
}