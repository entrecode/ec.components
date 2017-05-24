import * as DataManager from 'ec.datamanager';
import { Environment } from '..';
import { EntryListConfig } from '../entry-list/entry-list-config';
/**
 * This is the ec.datamanager SDK wrapper class. It consumes a given Environment instance and
 * holds an instance of the SDK DataManager.
 * To initialize the Datamanager, call useEnvironment in your app module:
 * ```typescript
 * Datamanager.useEnvironment(environment);
 * ```
 * After that, you can access the SDK via ```Datamanager.api()```, e.g:
 * ```typescript
 * Datamanager.api().model('muffin').entries()
 *  .then((entries) => {
 *    console.log('entries', entries);
 *  });
 * ```
 */
export class Datamanager {
  private static config: any = {};
  private static environment: Environment;
  private static datamanager;

  /** Uses the given environment. All following calls to api() will use that environment. */
  static useEnvironment(environment: Environment) {
    this.environment = environment;
    this.datamanager = this.fromEnvironment(environment);
    return this.datamanager;
  }

  private static fromEnvironment(environment: Environment) {
    if (this.environment.apiRoot) {
      return new DataManager({
        url: this.environment.apiRoot
      });
    }
    if (this.environment.datamanagerID) {
      console.log('Init DataManager SDK with datamanagerID ' + this.environment.datamanagerID + '. To be able to use different environments, it is recommended to use apiRoot instead.')
      return new DataManager({
        id: this.environment.datamanagerID
      });
    }
  }

  /** Retrieves the SDK instance. If no options are provided, the current environment will be used.
   * If options are provided,  */
  static api(options?) {
    if (options) {
      return new DataManager(options);
    }
    if (this.datamanager && !options) {
      return this.datamanager;
    }
    if (!this.environment) {
      throw new Error('cannot get Datamanager without id or environment set!');
    }
    return this.useEnvironment(this.environment);
  }

  /** Returns a Datamanager model schema */
  static schema(model: string) {
    return Datamanager.api().model(model).getSchema()
    .then((schema) => {
      return schema.allOf[1].properties;
    });
  }

  /** Loads a Datamanager entry */
  static entry(model: string, id: string, levels = 1): Promise<any> {
    return Datamanager.api().model(model).entry({ id, levels });
  }

  /** Loads multiple a Datamanager entryList */
  static entryList(model: string, config: EntryListConfig = {}): Promise<any> {
    return Datamanager.api().model(model).entryList(config);
  }
}
