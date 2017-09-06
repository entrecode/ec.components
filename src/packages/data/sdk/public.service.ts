import { Injectable } from '@angular/core';
import { SdkService } from './sdk.service';
import AccountResource from 'ec.sdk/src/resources/accounts/AccountResource';

//TODO move to auth?

/** This service handles the auth flow for public user accounts. */
@Injectable()
export class PublicService {
  /** Injects the sdk  */
  constructor(private sdk: SdkService) {
  }

  /** Logs in with the given credentials */
  login(credentials: { email: string, password: string }): Promise<AccountResource> {
    return this.sdk.api.login(credentials.email, credentials.password)
    .then((token): Promise<AccountResource> => this.sdk.init());
  }

  /** Logs out the current user */
  logout() {
    return this.sdk.api.logout().then((token) => this.sdk.init());
  }

  /** Registers a new user with an optional invite code */
  signup(credentials: { email: string, password: string, invite: string }) {
    return this.sdk.api.signup(credentials.email, credentials.password, credentials.invite || '')
    .then((token) => this.sdk.init());
  }
}