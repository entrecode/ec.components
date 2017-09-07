import { ResourceList } from '../../resource-list/resource-list';
import { SdkService } from '../../sdk/sdk.service';
import { FileService } from '../file.service';
import { ListConfig } from '@ec.components/core/src/list/list-config.interface';
import PublicAssetResource from 'ec.sdk/src/resources/publicAPI/PublicAssetResource';
import AssetResource from 'ec.sdk/src/resources/datamanager/AssetResource';
/**
 * Extension of List for Datamanager Assets.
 */
export declare class AssetList extends ResourceList<PublicAssetResource | AssetResource> {
    protected sdk: SdkService;
    protected fileService: FileService;
    constructor(config: ListConfig<PublicAssetResource | AssetResource>, sdk: SdkService, fileService: FileService);
    /** Overrides the List load method. Instead of slicing the page out of all items, a datamanager request is made using the config.*/
    load(config?: ListConfig<PublicAssetResource | AssetResource>): Promise<void>;
}
