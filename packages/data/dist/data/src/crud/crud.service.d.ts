import EntryResource from "ec.sdk/src/resources/publicAPI/EntryResource";
import EntryList from "ec.sdk/src/resources/publicAPI/EntryList";
import { SdkService } from '../sdk/sdk.service';
import { Observable } from 'rxjs';
/** Instances of Update are emitted by the changes EventEmitter of the CrudService. */
export interface Update {
    /** The model that has been updated. */
    model: string | string[];
    /** The relevant entry. */
    entry?: EntryResource;
    /** The list where it happened. */
    list?: EntryList;
    /** The type of update. (create/read/update/delete) */
    type?: string;
}
/** The CRUD service is meant to be used when modifying entries.
 * As the letters state it should be used to create update and delete entries.
 * Each action fires up a change that can be subscribed upon in any component to react to relevant
 * changes.
 * */
export declare class CrudService {
    private sdk;
    /** The changes event is emitted everytime an entry is created or updated. */
    private changes;
    /** Injects sdk */
    constructor(sdk: SdkService);
    /** Gives true if the given change fits all property values of the filter. */
    matches(change: Update, filter: Update): boolean;
    /** Yields an observable that emits for all updates that match the given filter */
    change(filter?: Update): Observable<Update>;
    /** Saves the given entry with the given value. If the entry is not yet existing, it will be created. Otherwise it will be updated. */
    save(model: string, entry: EntryResource, value: Object): Promise<EntryResource>;
    /** Updates the given entry with the new value. Fires the "update" change. */
    update(model: any, entry: EntryResource, value: Object): Promise<EntryResource>;
    /** Removes all null or undefined values from the given object */
    clean(value: Object): Object;
    /** Creates a new entry with the given value for the given model. Fires the "create" change. */
    create(model: string, value: Object): Promise<EntryResource>;
    /** deletes the given entry and emits the "delete" change. */
    del(model: string, entry: EntryResource): Promise<void>;
}
