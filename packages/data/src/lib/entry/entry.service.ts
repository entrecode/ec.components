import { Injectable } from '@angular/core';
import EntryResource from 'ec.sdk/lib/resources/publicAPI/EntryResource';
import { SdkService } from '../sdk/sdk.service';
import { Observable } from 'rxjs';
import { ResourceService } from '../resource-config/resource.service';
import { Item, ItemConfig } from '@ec.components/core';

/** The CRUD service is meant to be used when modifying entries.
 * As the letters state it should be used to create update and delete entries.
 * Each action fires up a change that can be subscribed upon in any component to react to relevant
 * changes.
 * */
@Injectable()
export class EntryService {
  /** Injects sdk */
  constructor(private sdk: SdkService, public resourceService: ResourceService) {}

  /** Yields an observable that emits for all updates that match the given filter */
  change(filter?: any): Observable<any> {
    if (filter.model) {
      filter.relation = `model.${filter.model}`;
      delete filter.model;
    }
    console.warn(`EntryService.change is deprecated! Use ResourceService.change instead!
    Make sure to change the "model" property to "relation" with prefix "model.":

    this.entryService.change({model:'muffin'}) // OLD
    // CHANGE TO
    this.resourceService.change({relation:'model.muffin'}) // NEW

    The EntryService#change method will be removed in a future release!
    `);
    return this.resourceService.change(filter);
  }

  /** Saves the given entry with the given value. If the entry is not yet existing, it will be created. Otherwise it will be updated. */
  save(model: string, entryItem: Item<EntryResource>, value: Object) {
    const entry = entryItem.getBody();
    if (entry && entry.save) {
      return this.update(model, entryItem, value);
    }
    return this.create(model, value)
      .then((_entry) => {
        return _entry;
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  /** Updates the given entry with the new value. Fires the "update" change. */
  async update(model, entryItem: Item<EntryResource>, value: Object, safePut = true): Promise<EntryResource> {
    const oldValues = {}; // save old values
    const entry = entryItem.getBody();
    Object.keys(value).forEach((key) => (oldValues[key] = entry[key]));
    // TODO: EDITOR-263 get model config, clean readOnly fields too. Add custom filter argument to clean method
    Object.assign(entry, this.clean(value, entryItem.config, true)); // assign new form values
    return entry
      .save(safePut)
      .then((_entry) => {
        this.resourceService.changes.next({ relation: `model.${model}`, resource: _entry, type: 'put' });
        return _entry;
      })
      .catch((err) => {
        Object.assign(entry, this.clean(oldValues)); // fall back to old values
        return Promise.reject(err);
      });
  }

  /** Returns true if the given field key is an immutable system property */
  isImmutableProperty(key: string) {
    return key[0] === '_' || ['id', 'created', 'modified'].indexOf(key) !== -1;
  }

  /** Removes all null or undefined values from the given object */
  clean(value: Object, config?: ItemConfig<EntryResource>, cleanReadOnly = false): Object {
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        if (value[key] === '') {
          // clear empty strings
          value[key] = null;
        }
        if (this.isImmutableProperty(key)) {
          // filter system properties
          delete value[key];
        }
        if (config && config.fields && config.fields[key]) {
          if (config.fields[key].immutable || (cleanReadOnly && config.fields[key].readOnly)) {
            delete value[key];
          } else if (config.fields[key].beforeSave) {
            value[key] = config.fields[key].beforeSave(value[key], config.fields[key], value);
          }
        }
      }
    }
    return value;
  }

  /** Creates a new entry with the given value for the given model. Fires the "create" change. */
  create(model: string, value: Object): Promise<EntryResource> {
    return this.sdk.api
      .createEntry(model, this.clean(value))
      .then((entry: EntryResource) => {
        // TODO: make sure leveled entries are returned leveled
        this.resourceService.changes.next({ relation: `model.${model}`, resource: entry, type: 'post' });
        return entry;
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  /** deletes the given entry and emits the "delete" change. */
  del(model: string, entry: EntryResource) {
    return entry.del().then((res) => {
      this.resourceService.changes.next({ relation: `model.${model}`, resource: entry, type: 'delete' });
      return res;
    });
  }
}
