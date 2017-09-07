"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const EntryResource_1 = require("ec.sdk/src/resources/publicAPI/EntryResource");
const sdk_service_1 = require("../sdk/sdk.service");
const rxjs_1 = require("rxjs");
/** The CRUD service is meant to be used when modifying entries.
 * As the letters state it should be used to create update and delete entries.
 * Each action fires up a change that can be subscribed upon in any component to react to relevant
 * changes.
 * */
class CrudService {
    /** Injects sdk */
    constructor(sdk) {
        this.sdk = sdk;
        /** The changes event is emitted everytime an entry is created or updated. */
        this.changes = new rxjs_1.Subject();
    }
    /** Gives true if the given change fits all property values of the filter. */
    matches(change, filter) {
        return Object.keys(filter)
            .reduce((match, key) => match && change[key] === filter[key], true);
    }
    /** Yields an observable that emits for all updates that match the given filter */
    change(filter) {
        if (!filter) {
            return this.changes.asObservable();
        }
        return this.changes.filter((change) => this.matches(change, filter));
    }
    /** Saves the given entry with the given value. If the entry is not yet existing, it will be created. Otherwise it will be updated. */
    save(model, entry, value) {
        if (entry instanceof EntryResource_1.default) {
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
    update(model, entry, value) {
        const oldValues = {}; //save old values
        Object.keys(value).forEach((key) => oldValues[key] = entry[key]);
        Object.assign(entry, this.clean(value)); //assign new form values
        return entry.save().then((entry) => {
            this.changes.next({ model, entry, type: 'update' });
            return entry;
        })
            .catch((err) => {
            Object.assign(entry, this.clean(oldValues)); //fall back to old values
            return Promise.reject(err);
        });
    }
    /** Removes all null or undefined values from the given object */
    clean(value) {
        for (let key in value) {
            if (value[key] === '') {
                value[key] = null;
            }
        }
        return value;
    }
    /** Creates a new entry with the given value for the given model. Fires the "create" change. */
    create(model, value) {
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
    del(model, entry) {
        return entry.del().then((res) => {
            this.changes.next({ model, entry, type: 'delete' });
            return res;
        });
    }
}
CrudService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
CrudService.ctorParameters = () => [
    { type: sdk_service_1.SdkService, },
];
exports.CrudService = CrudService;
//# sourceMappingURL=crud.service.js.map