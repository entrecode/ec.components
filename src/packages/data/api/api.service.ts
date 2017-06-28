import { Injectable } from '@angular/core';
import { PublicAPI } from 'ec.sdk';
import { environment as env } from 'ec.sdk/typings/interfaces';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiService {
  public api: PublicAPI;
  public user: any;
  public ready: boolean;

  constructor() {
    this.api = this.initApi();
    this.getUser().then(() => {
      this.ready = true;
    });
  }

  initApi() {
    const api = new PublicAPI(environment.datamanagerID, <env>environment.environment);
    api.setClientID(environment.clientID);
    return api;
  }

  getUser(flush = true) { //TODO reload: boolean = true
    if (flush) {
      this.api = this.initApi(); //TODO remove when reload works
    }
    return this.api.me().then((user) => { //TODO reload
      this.user = user;
      return this.user;
    });
  }

  login(email, password) {
    return this.api.login(email, password)
    .then((token) => {
      return this.getUser();
    }).then((user) => user);
  }

  logout() {
    return this.api.logout().then(() => {
      return this.getUser();
    });
  }

  signup(email, password, invite = '') {
    return this.api.signup(email, password, invite).then((token) => {
      return this.getUser();
    })
  }

}
