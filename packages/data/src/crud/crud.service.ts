import { Injectable } from '@angular/core';
import EntryResource from 'ec.sdk/src/resources/publicAPI/EntryResource';
import EntryList from 'ec.sdk/src/resources/publicAPI/EntryList';
import { SdkService } from '../sdk/sdk.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import { Subject } from 'rxjs/Subject';

/** Instances of Update are emitted by the changes EventEmitter of the CrudService. */
export interface Update {
  /** The model that has been updated. */
  model: string | string[],
  /** The relevant entry. */
  entry?: EntryResource,
  /** The list where it happened. */
  list?: EntryList,
  /** The type of update. (create/read/update/delete) */
  type?: string
}

/** The CRUD service is meant to be used when modifying entries.
 * As the letters state it should be used to create update and delete entries.
 * Each action fires up a change that can be subscribed upon in any component to react to relevant
 * changes.
 * */
@Injectable()
export class CrudService {
  /** The changes event is emitted everytime an entry is created or updated. */
  private changes: Subject<Update> = new Subject();

  /** Injects sdk */
  constructor(private sdk: SdkService) {
  }

  /** Gives true if the given change fits all property values of the filter. */
  matches(change: Update, filter: Update): boolean {
    return Object.keys(filter)
    .reduce((match, key) => match && change[key] === filter[key], true);
  }

  /** Yields an observable that emits for all updates that match the given filter */
  change(filter?: Update): Observable<Update> {
    if (!filter) {
      return this.changes.asObservable();
    }
    return this.changes.asObservable().filter((change: Update) => this.matches(change, filter));
  }

  /** Saves the given entry with the given value. If the entry is not yet existing, it will be created. Otherwise it will be updated. */
  save(model: string, entry: EntryResource, value: Object) {
    if (entry instanceof EntryResource) {
      return this.update(model, entry, value);
    }
    return this.create(model, value)
    .then((_entry) => {
      return _entry;
    }).catch((err) => {
      return Promise.reject(err);
    });
  }

  /** Updates the given entry with the new value. Fires the "update" change. */
  update(model, entry: EntryResource, value: Object): Promise<EntryResource> {
    const oldValues = {}; // save old values
    Object.keys(value).forEach((key) => oldValues[key] = entry[key]);
    Object.assign(entry, this.clean(value)); // assign new form values
    return entry.save().then((_entry) => {
      this.changes.next({ model, entry: _entry, type: 'update' });
      return _entry;
    })
    .catch((err) => {
      Object.assign(entry, this.clean(oldValues)); // fall back to old values
      return Promise.reject(err);
    });
  }

  /** Removes all null or undefined values from the given object */
  clean(value: Object): Object {
    for (const key in value) {
      if (value[key] === '') { // clear empty strings
        value[key] = null;
      }
      if (value[key][0] === '_') { // filter system properties
        delete value[key];
      }
    }
    return value;
  }

  /** Creates a new entry with the given value for the given model. Fires the "create" change. */
  create(model: string, value: Object): Promise<EntryResource> {
    return this.sdk.api.createEntry(model, this.clean(value))
    .then((entry) => {
      // console.log('created entry', entry);
      // TODO make sure leveled entries are returned leveled
      this.changes.next({ model, entry, type: 'create' });
      return entry;
    }).catch((err) => {
      return Promise.reject(err);
    });
  }

  /** deletes the given entry and emits the "delete" change. */
  del(model: string, entry: EntryResource) {
    return entry.del().then((res) => {
      this.changes.next({ model, entry, type: 'delete' });
      return res;
    });
  }
}
