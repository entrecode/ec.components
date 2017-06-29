import { Injectable } from '@angular/core';
import { SdkService } from './sdk.service';

@Injectable()
export class PublicService {
  constructor(private sdk: SdkService) {
  }

  login(credentials: { email: string, password: string }) {
    return this.sdk.api.login(credentials.email, credentials.password)
    .then((token) => this.sdk.init());
  }

  logout() {
    return this.sdk.api.logout().then((token) => this.sdk.init());
  }

  signup(credentials: { email: string, password: string, invite: string }) {
    return this.sdk.api.signup(credentials.email, credentials.password, credentials.invite || '')
    .then((token) => this.sdk.init());
  }
}