import { SdkService } from '../sdk/sdk.service';
/** Loads an entryList of a given model with the given config. */
export declare class EntriesComponent {
    private sdk;
    /** The promise of the entryList call. */
    private promise;
    /** The model to load from. */
    model: string;
    /** The config (filterOptions) for loading. */
    config: any;
    /** The current loaded entryList */
    private entryList;
    /** Injects sdk */
    constructor(sdk: SdkService);
    /** When the model is known, the entryList will be loaded. */
    ngOnChanges(): void;
    /** This helper returns all items of the current entryList. */
    entries(): any;
}
