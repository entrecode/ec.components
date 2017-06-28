import { Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorizationService } from './authorization.service';
import { environment } from '../../environments/environment';

@Injectable()
export class PublicAuthService {
  private headers;
  private options: RequestOptions;

  constructor(private agent: Http, private auth: AuthorizationService) {
    this.useToken(this.auth.getToken());
  }

  useToken(token: string) {
    if (!token) {
      Observable.throw('cannot use token: token is undefined');
    }
    this.auth.setToken(token);
    console.log('token', token);
    // Datamanager.updateEnvironment({ token: token });
    // return Observable.of({ token: token })
  }

  hasToken(): boolean {
    return !!this.auth.getToken();
  }

  authorized = this.hasToken;

  clearToken() {
    this.auth.clearToken();
    // Datamanager.updateEnvironment({ token: null });
  }

  logout = this.clearToken;

  login(data) {
    console.log('login...');
    // return
    // this.agent.post(`${environment.apiRoot}/_auth/login?clientID=${environment.clientID}`, data)
    // .catch(this.auth.catchError) .map(res => res.json());
  }

  signup(data) {
    console.log('signup');
  }
}