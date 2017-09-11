import { SdkService } from '../sdk/sdk.service';
import { ResourceList } from '../resource-list/resource-list';
import { filterOptions } from 'ec.sdk/src/resources/ListResource';
import EntryResource from 'ec.sdk/src/resources/publicAPI/EntryResource';
import { ListConfig } from '@ec.components/core/src/list/list-config.interface';
/**
 * Extension of List for Datamanager Entries.
 */
export declare class EntryList extends ResourceList<EntryResource> {
    protected sdk: SdkService;
    /** The model that is loaded from. */
    private model;
    /** The constructor will init the List and Pagination instances.
     * Make sure the config is already complete when initiating an EntryList instance. */
    constructor(model: string, config: ListConfig<EntryResource>, sdk: SdkService);
    /** Generates the filterOptions for loading the entries. Sets the _fields option. */
    getFilterOptions(config: ListConfig<EntryResource>): filterOptions;
    /** Overrides the SdkList load method. */
    load(config?: ListConfig<EntryResource>): void;
}
