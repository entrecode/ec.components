import { Inject, Injectable } from '@angular/core';
import { SdkService } from '../sdk/sdk.service';
import AccountResource from 'ec.sdk/lib/resources/accounts/AccountResource';
import PublicAPI from 'ec.sdk/lib/PublicAPI';
import { ResourceConfig } from '../resource-config/resource-config.service';
import Core from 'ec.sdk/lib/Core';

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
  constructor(private resourceConfig: ResourceConfig, @Inject('environment') private environment, private sdk: SdkService) {
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
  checkPermission(permission: string, api?) {
    return this.sdk.ready.then((user) => {
      api = api || this.sdk.user;
      return api.checkPermission(permission);
    })
  }
  /** replaces all variables by values in a string */
  resolveVariables(string: string, variables: Object) {
    Object.keys(variables).forEach((key) => {
      string = string.replace(`<${key}>`, variables[key]);
    });
    return string;
  }

  /** Returns only the allowed methods for a given relation. Uses the permissions config option from resource-config. */
  getAllowedResourceMethods(relation: string, variables: Object = {}, methods?: string[], api?: Core): Promise<string[]> {
    if (methods) {
      return Promise.resolve(methods);
    }
    if (!this.resourceConfig.get(relation) || !this.resourceConfig.get(relation).permissions) {
      /* console.warn(`relation ${relation} has no defined permissions, defaulting to all methods available`); */
      return Promise.resolve(['get', 'post', 'put', 'delete']);
    }
    const permissions = this.resourceConfig.get(relation).permissions;
    return Object.keys(permissions)
      .map((method) => (results) => {
        return !permissions[method] ? Promise.resolve(results) :
          permissions[method] === true ? Promise.resolve(results.concat(method)) :
            this.checkPermission(`${this.resolveVariables(permissions[method], variables)}`, api)
              .then(res => {
                if (res) {
                  results.push(method);
                }
                return results;
              }).catch(err => {
                return results;
              })
      })
      .reduce((a, b) => a.then(r => b(r)), Promise.resolve([]))
      .then(_methods => {
        _methods.filter(x => !!x);
        return _methods;
      });
  }

  /** Returns an array of all allowed methods for the given relation */
  getAllowedModelMethods(model: string, methods?: string[]): Promise<string[]> {
    if (methods) {
      return Promise.resolve(methods);
    }
    return ['get', 'post', 'put', 'delete']
      .map((method) => (results) =>
        this.checkPermission(`${model}:${method}`, this.sdk.api)
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
        return !_api ? Promise.reject('api_not_found') : _api.resetPassword(email);
      });
  }

  /** Generic logout that works with both public and admin API. */
  logout(api?) {
    if (this.noClientID()) {
      return Promise.reject(this.noClientID());
    }
    return api ? api.logout() : this.sdk.session.logout().catch(() => this.sdk.api.logout())
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
