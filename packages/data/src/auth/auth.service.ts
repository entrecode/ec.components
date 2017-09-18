import { Inject, Injectable } from '@angular/core';
import { SdkService } from '../sdk/sdk.service';

/** The SdkService exposes all instances of the ec.sdk APIs.
 * To be able to use it, you have to provide an environment like this in your module's providers:
 *
 *```json
 {
   provide: "environment",
   useValue: {
     datamanagerID: "83cc6374",
     environment: "stage",
     clientID: "rest"
   }
 }```
 * The environment is optional, defaulting to live. See
 * https://entrecode.github.io/ec.sdk/#environment for more info. The clientID is only optional if
 * you do not plan to use authentication. See https://entrecode.github.io/ec.sdk/#environment =>
 * setClientID.
 */
@Injectable()
export class AuthService {

  /** Calls init and sets ready to true when finished. */
  constructor(@Inject('environment') private environment, private sdk: SdkService) {
  }

  /** Generic login that works with both public and admin API. */
  login({ email, password }, api?) {
    if (this.noClientID()) {
      return Promise.reject(this.noClientID());
    }
    return Promise.resolve(api || this.getApi(email))
    .then((resolvedAPI) => {
      const _api = resolvedAPI || this.sdk.session;
      return !_api ? Promise.reject('api_not_found') : _api.login(email, password);
    }).then(() => {
      return this.sdk.init();
    });
  }

  /** Generic Signup, works for accounts API and PublicAPI */
  signup({ email, password, invite }, api?) {
    if (this.noClientID()) {
      return Promise.reject(this.noClientID());
    }
    return api ? api.signup() : this.sdk.api.signup(email, password, invite)
    .catch(() => this.sdk.accounts.signup(email, password, invite))
    .then((res) => {
      return this.sdk.init();
    })
  }

  /** Returns the current account. Works for all apis */
  getAccount(api = this.sdk.api) {
    return api.me().then((account) => {
      return account || this.sdk.accounts.me();
    }).catch((err) => {
      return this.sdk.api.me();
    });
  }

  /** checks given public permission for given api, defaults to this.sdk.api. Also works as ec user */
  checkPublicPermission(permission: string, api = this.sdk.api) {
    return this.sdk.ready.then((user) => {
      return api.checkPermission(permission);
    })
  }

  /** Returns an array of all allowed methods for the given model */
  getAllowedMethods(model: string, methods?: string[]): Promise<string[]> {
    if (methods) {
      return Promise.resolve(methods);
    }
    return ['get', 'post', 'put', 'delete']
    .map((method) => (results) =>
      this.checkPublicPermission(`${model}:${method}`)
      .then(res => {
        if (res) {
          results.push(method);
        }
        return results;
      })
    )
    .reduce((a, b) => a.then(r => b(r)), Promise.resolve([]))
    .then(_methods => {
      _methods.filter(x => !!x);
      return _methods;
    });
  }

  /** Generic password reset that works with both public and admin API. */
  resetPassword(email, api?) {
    if (this.noClientID()) {
      return Promise.reject(this.noClientID());
    }
    return Promise.resolve(api || this.getApi(email))
    .then((resolvedAPI) => {
      const _api = resolvedAPI || this.sdk.accounts;
      return !_api ? Promise.reject('api_not_found') : api.resetPassword(email);
    });
  }

  /** Generic logout that works with both public and admin API. */
  logout(api?) {
    if (this.noClientID()) {
      return Promise.reject(this.noClientID());
    }
    return api ? api.logout() : this.sdk.api.logout().catch(() => this.sdk.session.logout())
    .then(() => {
      return this.sdk.init();
    });
  }

  getApi(email: string) {
    if (!this.sdk.api && !this.sdk.accounts) {
      return Promise.reject('no_api_found');
    }
    return this.sdk.api.emailAvailable(email)
    .then((available) => {
      if (!available) {
        return this.sdk.api;
      }
    }).catch(() => {
      return;
    });
  }

  noClientID() {
    if (!this.environment.clientID) {
      return `
No clientID set in environment! To enable all auth related functionalities,
you can create a client in your datamanager settings and provide it with your environment:

  providers: [
    {
      provide: 'environment',
      useValue: {
        datamanagerID: '83cc6374',
        clientID: 'myClient',
      }
    }
  ]
`;
    }
  }
}
