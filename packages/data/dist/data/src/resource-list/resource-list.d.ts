import { List } from '@ec.components/core/src/list/list';
import { SdkService } from '../sdk/sdk.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import ListResource, { filterOptions } from 'ec.sdk/src/resources/ListResource';
import { Field } from '@ec.components/core/src/field/field';
import { ListConfig } from '@ec.components/core/src/list/list-config.interface';
/**
 * Extension of List for SDK ListResource. Each each implementation should implement the load
 * method to call the SDK method for loading the desired list! (see EntryList for example)
 */
export declare class ResourceList<T> extends List<T> {
    protected sdk: SdkService;
    /** The current loaded assetList */
    protected listResource: ListResource;
    /** Subject that should be nexted when loading begins */
    protected loading: Subject<{}>;
    /** Observable that is nexted when the list begins loading. */
    loading$: Observable<{}>;
    /** Subject that should be nexted when an error occurs */
    protected error: Subject<Error>;
    /** Observable that is nexted when the list has an error. */
    error$: Observable<Error>;
    /** The constructor will init the List and Pagination instances.
     * Make sure the config is already complete when initiating an EntryList instance. */
    constructor(config: ListConfig<T>, sdk: SdkService);
    /** deletes all undefined values from given config and assigns it to this.config */
    protected useConfig(config?: ListConfig<T>): void;
    /** Takes the entryList and dumps the items into the the current page. Then it applies grouping if present. */
    protected use(listResource: any): void;
    /** Returns SDK filterOptions from a given ListConfig. */
    protected getFilterOptions({size, page, filter, sortBy, desc, sort}: ListConfig<T>): filterOptions;
    /** Toggles sorting of the given property. Overloads list method to reload with the new sort setup*/
    toggleSort(property: string, desc?: boolean): void;
    /** Returns the operator to use for filtering the given property. Defaults to search. */
    protected static getFilterOperator(property: string, fields: Array<Field<any>>): string;
    /** Updates the config.filter with the given property filter. */
    filterProperty(property: string, value?: any): {
        [key: string]: any;
    };
    /** Filters the entry list by a given property value. Triggers load. */
    filter(property: string, value?: any): void;
}
