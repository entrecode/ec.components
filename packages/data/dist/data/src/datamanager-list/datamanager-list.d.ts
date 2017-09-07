import { ResourceList } from '../resource-list/resource-list';
import { SdkService } from '../sdk/sdk.service';
import DataManagerResource from 'ec.sdk/src/resources/datamanager/DataManagerResource';
import { ListConfig } from '@ec.components/core/src/list/list-config.interface';
/**
 * Extension of List for Datamanagers
 */
export declare class DatamanagerList extends ResourceList<DataManagerResource> {
    protected sdk: SdkService;
    constructor(config: ListConfig<DataManagerResource>, sdk: SdkService);
    /** Overrides the List load method. Instead of slicing the page out of all items, a datamanager request is made using the config.*/
    load(config?: ListConfig<DataManagerResource>): Promise<void>;
}
