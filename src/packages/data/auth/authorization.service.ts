import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';
import { backendErrorCodes } from './errors';

@Injectable()
export class AuthorizationService {
  token: string;
  constructor(private cookie: CookieService) {
    this.token = this.cookie.get('ec-token');
  }

  setToken(token) {
    this.token = token;
    this.cookie.put('ec-token', token);
  }

  clearToken() {
    this.cookie.remove('ec-token');
    delete this.token;
    //TODO: logout in backend to invalidate token
  }

  getToken() {
    return this.token;
  }

  authorized() {
    return !!this.token;
  }

  unauthorized() {
    return !this.token;
  }

  catchError(err) {
    console.log('error', err.json());
    const error = err.json();
    const message = backendErrorCodes[error.code][error.detail];
    return Observable.throw({ error: error, message: message });
  }

}
