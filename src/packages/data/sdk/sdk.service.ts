import { Injectable } from '@angular/core';
import { Session } from 'ec.sdk';
import { environment as env } from 'ec.sdk/typings/interfaces';
import { environment } from '../../../environments/environment';

@Injectable()
export class SdkService {
  public session: Session;
  constructor() {
    this.initSession();
  }

  initSession() {
    this.session = new Session(<env>environment.environment);
  }

  login(credentials: { email: string, password: string }) {
    return this.session.login(credentials.email, credentials.password);
  }
}
