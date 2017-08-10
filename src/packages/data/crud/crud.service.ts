import { EventEmitter, Injectable } from '@angular/core';
import { Item } from '../../core/item/item';
import { EntryResource } from "ec.sdk/typings/resources/publicAPI/EntryResource";
import { EntryList } from "ec.sdk/typings/resources/publicAPI/EntryList";
import { SdkService } from '../sdk/sdk.service';
import { Observable } from 'rxjs';

export interface Update {
  model: string | string[],
  entry?: EntryResource,
  list?: EntryList,
  type?: string
}

/** The CRUD service is meant to be used when modifying entries.
 * As the letters state it should be used to create update and delete entries.
 * Each action fires up a change that can be subscribed upon in any component to react to relevant
 * changes.
 * */
@Injectable()
export class CrudService {

  private changes: EventEmitter<Update> = new EventEmitter();

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
      return this.changes;
    }
    return this.changes.filter((change: Update) => this.matches(change, filter));
  }

  /** Saves the given entry item with the given value. If the entry is not yet existing, it will be created. Otherwise it will be updated. */
  save(model: string, item: Item<EntryResource>, value: Object) {
    const entry = item.getBody();
    if (entry && entry.save) {
      return this.update(model, entry, value);
    }
    return this.create(model, value)
    .then((entry) => {
      return item;
    }).catch((err) => {
      console.log('create fail', err);
      return item;
    });
  }

  /** Updates the given entry with the new value. Fires the "update" change. */
  update(model, entry: EntryResource, value: Object): Promise<EntryResource> {
    const oldValues = {}; //save old values
    Object.keys(value).forEach((key) => oldValues[key] = entry[key]);
    Object.assign(entry, value); //assign new form values
    return entry.save().then((entry) => {
      this.changes.emit({ model, entry, type: 'update' });
      return entry;
    })
    .catch((err) => {
      Object.assign(entry, oldValues); //fall back to old values
      return Promise.reject(err);
    });
  }

  /** Removes all null or undefined values from the given object */
  clean(value: Object): Object {
    for (let key in value) {
      if (value[key] === null || value[key] === undefined) {
        delete value[key];
      }
    }
    return value;
  }

  /** Creates a new entry with the given value for the given model. Fires the "create" change. */
  create(model: string, value: Object): Promise<EntryResource> {
    console.log(model, this.clean(value));
    return this.sdk.api.createEntry(model, this.clean(value))
    .then((entry) => {
      this.changes.emit({ model, entry, type: 'create' });
      return entry;
    }).catch((err) => {
      return Promise.reject(err);
    });
  }

  del(model: string, entry: EntryResource) {
    console.log('delete', entry);
    return entry.del().then((res) => {
      console.log('deeleted');
      this.changes.emit({ model, entry, type: 'delete' });
      return res;
    });
  }
}