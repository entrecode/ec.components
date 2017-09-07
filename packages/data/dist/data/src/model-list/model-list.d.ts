import { ResourceList } from '../resource-list/resource-list';
import { SdkService } from '../sdk/sdk.service';
import DataManagerResource from 'ec.sdk/src/resources/datamanager/DataManagerResource';
import ModelResource from 'ec.sdk/src/resources/datamanager/ModelResource';
import { ListConfig } from '@ec.components/core/src/list/list-config.interface';
/**
 * Extension of List for Datamanagers
 */
export declare class ModelList extends ResourceList<ModelResource> {
    private datamanager;
    constructor(datamanager: DataManagerResource | string, config: ListConfig<ModelResource>, sdk: SdkService);
    /** Overrides the List load method. Instead of slicing the page out of all items, a datamanager request is made using the config.*/
    load(config?: ListConfig<ModelResource>): Promise<void>;
    resolveDatamanager(): Promise<DataManagerResource>;
}
