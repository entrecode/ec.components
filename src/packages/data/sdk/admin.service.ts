import { Injectable } from '@angular/core';
import { SdkService } from './sdk.service';

@Injectable()
export class AdminService {
  constructor(private sdk: SdkService) {
  }

  login(credentials: { email: string, password: string }) {
    return this.sdk.session.login(credentials.email, credentials.password)
    .then((token) => this.sdk.init());
  }

  logout() {
    return this.sdk.session.logout().then((token) => this.sdk.init());
  }

  signup(credentials: { email: string, password: string, invite: string }) {
    return this.sdk.accounts.signup(credentials.email, credentials.password, credentials.invite || '')
    .then((token) => this.sdk.accounts.setToken(token))
    .then(() => this.sdk.init());
  }
}