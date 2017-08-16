import { EventEmitter, Injectable } from '@angular/core';
import { EntryResource } from "ec.sdk/typings/resources/publicAPI/EntryResource";
import { EntryList } from "ec.sdk/typings/resources/publicAPI/EntryList";
import { SdkService } from '../sdk/sdk.service';
import { Observable } from 'rxjs';

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
  private changes: EventEmitter<Update> = new EventEmitter();

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
      return this.changes;
    }
    return this.changes.filter((change: Update) => this.matches(change, filter));
  }

  /** Saves the given entry with the given value. If the entry is not yet existing, it will be created. Otherwise it will be updated. */
  save(model: string, entry: EntryResource, value: Object) {
    if (entry && entry.save) {
      return this.update(model, entry, value);
    }
    return this.create(model, value)
    .then((entry) => {
      return entry;
    }).catch((err) => {
      return Promise.reject(err);
    });
  }

  /** Updates the given entry with the new value. Fires the "update" change. */
  update(model, entry: EntryResource, value: Object): Promise<EntryResource> {
    const oldValues = {}; //save old values
    Object.keys(value).forEach((key) => oldValues[key] = entry[key]);
    Object.assign(entry, this.clean(value, oldValues)); //assign new form values
    return entry.save().then((entry) => {
      this.changes.emit({ model, entry, type: 'update' });
      return entry;
    })
    .catch((err) => {
      Object.assign(entry, this.clean(oldValues)); //fall back to old values
      return Promise.reject(err);
    });
  }

  //TODO serialization => set boolean to false if null, etc. transform date
  //could also be solved over prefills in type-config.... at least boolean

  /** Removes all null or undefined values from the given object */
  clean(value: Object, oldValues: any = {}): Object {
    for (let key in value) {
      if (value[key] === null || value[key] === undefined || value[key] === '') {
        //TODO find way to decide, when to send empty string and when not:
        //  it is important to send it when an entries value needs to be "cleared"
        //    e.g. to remove a description
        //  it is though important to remove it for fields that require a validation
        //    e.g. email fields will throw an error once clicked (filled with empty string)
        //  should this be handled by the sdk or the module??!!
        //    how to decide ???!?!!??!??!
        delete value[key];
      }
    }
    return value;
  }

  /** Creates a new entry with the given value for the given model. Fires the "create" change. */
  create(model: string, value: Object): Promise<EntryResource> {
    return this.sdk.api.createEntry(model, this.clean(value))
    .then((entry) => {
      this.changes.emit({ model, entry, type: 'create' });
      return entry;
    }).catch((err) => {
      return Promise.reject(err);
    });
  }

  /** deletes the given entry and emits the "delete" change. */
  del(model: string, entry: EntryResource) {
    return entry.del().then((res) => {
      this.changes.emit({ model, entry, type: 'delete' });
      return res;
    });
  }
}