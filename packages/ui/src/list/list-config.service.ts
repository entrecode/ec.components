import { Injectable } from '@angular/core';
import { List } from '@ec.components/core';

@Injectable()
export class ListConfigService {

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
        if (typeof list.config.storageKey === 'function') {
            return list.config.storageKey(list);
        }
        return list.config.storageKey;
    }

    storeConfig(list: List<any>) {
        const key = this.getStorageKey(list);
        if (!key) {
            return;
        }
        const config = { hide: list.fields.filter(f => f.hidden).map(f => f.property) };
        this.store(key, config);
    }

    applyConfig(list: List<any>) {
        const key = this.getStorageKey(list);
        if (!key) {
            return;
        }
        const existing = this.retrieve(key);
        if (existing && existing.hide) {
            list.fields.forEach(field => field.hidden = false);
            existing.hide.forEach(property => {
                const field = list.fields.find(f => f.property === property);
                if (!field) {
                    console.warn('field ', property, ' not found');
                    return;
                }
                field.hidden = true;
            });
        }
    }
}
