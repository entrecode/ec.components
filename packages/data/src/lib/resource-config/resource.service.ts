import { Injectable } from '@angular/core';
import { Item } from '@ec.components/core';
import Core from 'ec.sdk/lib/Core';
import Resource from 'ec.sdk/lib/resources/Resource';
import { Subject, Observable } from 'rxjs';
import { filter as rxFilter } from 'rxjs/operators';
import { ResourceList } from '../resource-list/resource-list';
import { SdkService } from '../sdk/sdk.service';
import { ResourceConfig } from './resource-config.service';

/** Instances of Update are emitted by the changes EventEmitter of the ResourceService. */
export interface Update {
  /** The relation that has been updated. */
  relation: string | string[];
  /** The relevant resource. */
  resource?: Resource;
  /** The list where it happened. */
  list?: ResourceList;
  /** The type of update. (create/read/update/delete) */
  type?: 'post' | 'get' | 'put' | 'delete';
  /** An identifier associated with the update e.g. an entryID */
  identifier?: string;
  /** If true, the Update will reach all subscribers, ignoring all filters. Use with caution (reloads everything) */
  broadcast?: boolean;
}

/** The CRUD service is meant to be used when modifying entries.
 * As the letters state it should be used to create update and delete entries.
 * Each action fires up a change that can be subscribed upon in any component to react to relevant
 * changes.
 * */
@Injectable()
export class ResourceService {
  /** The changes event is emitted everytime an resource is created or updated. */
  public changes: Subject<Update> = new Subject();

  /** Injects sdk */
  constructor(private sdk: SdkService, public config: ResourceConfig) {
    /* this.sdk.changesEnvironment.subscribe(env =>
            this.changes.next({
                relation: 'environment',
                broadcast: true
            })) */
  }

  /** Gives true if the given change fits all property values of the filter. */
  matches(change: Update, filter: Update): boolean {
    return change.broadcast || Object.keys(filter).reduce((match, key) => match && change[key] === filter[key], true);
  }

  /** Yields an observable that emits for all updates that match the given filter */
  change(filter?: Update): Observable<Update> {
    if (!filter) {
      return this.changes.asObservable();
    }
    return this.changes.asObservable().pipe(rxFilter((change: Update) => this.matches(change, filter)));
  }

  /** Saves the given resource with the given value. If the resource is not yet existing,
   * it will be created.Otherwise it will be updated. */
  save(item: Item<Resource>, value: Object, relation: string, api: Core): Promise<Resource> {
    const resource = item.getBody();
    if (item.config.onSave) {
      return Promise.resolve(item.config.onSave(item, value));
    }
    item.deleteImmutableProperties(value);
    if (resource && resource.save) {
      return this.update(relation, resource, value);
    }
    return this.create(relation, value, api)
      .then((_resource) => {
        return _resource;
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  /** Updates the given resource with the new value. Fires the "update" change. */
  update(relation, resource: Resource, value: Object): Promise<Resource> {
    const oldValues = {}; // save old values
    Object.keys(value).forEach((key) => (oldValues[key] = resource[key]));
    Object.assign(resource, this.clean(value, false, false)); // assign new form values
    return resource
      .save()
      .then((_resource) => {
        this.changes.next({ relation, resource: _resource, type: 'put' });
        return _resource;
      })
      .catch((err) => {
        Object.assign(resource, this.clean(oldValues, false, false)); // fall back to old values
        return Promise.reject(err);
      });
  }

  /** Returns true if the given field key is an immutable system property */
  isImmutableProperty(key: string) {
    return key[0] === '_' || ['id', 'created', 'modified'].indexOf(key) !== -1;
  }

  /** Removes all null or undefined values from the given object */
  clean(value: Object, setEmptyStringsToNull = true, deleteNullProperties = true): Object {
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        if (setEmptyStringsToNull && value[key] === '') {
          // clear empty strings
          value[key] = null;
        }
        if (deleteNullProperties && value[key] === null) {
          delete value[key];
        }
        if (this.isImmutableProperty(key)) {
          // filter system properties
          delete value[key];
        }
      }
    }
    return value;
  }

  /** Creates a new resource with the given value for the given relation. Fires the "create" change. */
  create(relation: string, value: Object, api: Core): Promise<Resource> {
    return api
      .create(relation, this.clean(value))
      .then((resource: Resource) => {
        this.changes.next({ relation, resource, type: 'post' });
        return resource;
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  /** deletes the given resource and emits the "delete" change. */
  del(relation: string, resource: Resource) {
    return resource.del().then((res) => {
      this.changes.next({ relation, resource, type: 'delete' });
      return res;
    });
  }
}
