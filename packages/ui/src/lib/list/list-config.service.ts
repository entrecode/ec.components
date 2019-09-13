import { Injectable } from '@angular/core';
import { List } from '@ec.components/core';

@Injectable()
export class ListConfigService {
  public storageKeyResolver: (list: List<any>) => string;

  retrieve(key) {
    const config = localStorage.getItem(key);
    return config ? JSON.parse(config) : null;
  }

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  store(key, config) {
    const existing = this.retrieve(key) || {};
    localStorage.setItem(key, JSON.stringify(Object.assign(existing, config)));
  }

  getStorageKey(list: List<any>) {
    if (!list || !list.fields || !list.config || !list.config.storageKey) {
      // console.log('cannot apply config: no storage key or list set');
      return;
    }
    const resolveFn = list.config.storageKey || this.storageKeyResolver;
    if (typeof resolveFn === 'function') {
      return resolveFn(list);
    }
    return list.config.storageKey;
  }

  storeConfig(list: List<any>) {
    const key = this.getStorageKey(list);
    if (!key) {
      return;
    }
    const config = { hide: list.fields.filter((f) => f.hideInList).map((f) => f.property) };
    this.store(key, config);
  }

  applyConfig(list: List<any>) {
    const key = this.getStorageKey(list);
    if (!key) {
      return;
    }
    const existing = this.retrieve(key);
    if (existing && existing.hide) {
      list.fields.forEach((field) => (field.hideInList = false));
      existing.hide.forEach((property) => {
        const field = list.fields.find((f) => f.property === property);
        if (!field) {
          console.warn('field ', property, ' not found');
          return;
        }
        field.hideInList = true;
      });
    }
  }

  getFilteredID(list) {
    if (!list || !list.config || !list.config.filter) {
      return;
    }
    return Object.keys(list.config.filter).reduce((id, property) => {
      if (!id && list.config.identifierPattern && list.config.filter &&
        typeof list.config.filter[property] === 'string' &&
        list.config.filter[property].match(list.config.identifierPattern)) {
        return list.config.filter[property];
      }
      return id;
    }, null);
  }
}
