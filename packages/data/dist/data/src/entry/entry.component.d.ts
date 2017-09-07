/**
 * Created by felix on 23.05.17.
 */
import { EventEmitter } from '@angular/core';
import { SdkService } from '../sdk/sdk.service';
import EntryResource from "ec.sdk/src/resources/publicAPI/EntryResource";
/** Loads an entry by id to the template. */
export declare class EntryComponent {
    private sdk;
    /** The loading promise */
    promise: any;
    /** The entry id that should be loaded*/
    id: string;
    /** The model to load from */
    model: string;
    /** The levels to use. */
    levels: number;
    /** Fires as soon as the entry has been loaded. */
    loaded: EventEmitter<EntryResource>;
    /** The current loaded entry */
    entry: any;
    /** Injects the sdk */
    constructor(sdk: SdkService);
    /** as soon as model and id are known, the entry will be loaded. */
    ngOnChanges(): void;
}
