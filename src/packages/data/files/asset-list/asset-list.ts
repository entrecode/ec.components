import { ResourceList } from '../../resource-list/resource-list';
import { SdkService } from '../../sdk/sdk.service';
import { FileService } from '../file.service';
import { ListConfig } from '../../../core/list/list-config.interface';
import PublicAssetResource from 'ec.sdk/src/resources/publicAPI/PublicAssetResource';
import AssetResource from 'ec.sdk/src/resources/datamanager/AssetResource';

/**
 * Extension of List for Datamanager Assets.
 */
export class AssetList extends ResourceList<PublicAssetResource | AssetResource> {

  constructor(config: ListConfig<PublicAssetResource | AssetResource>, protected sdk: SdkService, protected fileService: FileService) {
    super(Object.assign(config, fileService.assetListConfig), sdk);
  }

  /** Overrides the List load method. Instead of slicing the page out of all items, a datamanager request is made using the config.*/
  public load(config?: ListConfig<PublicAssetResource | AssetResource>) {
    if (!this.sdk) {
      return;
    }
    this.useConfig(config);
    const loading = this.sdk.api.assetList(this.getFilterOptions(this.config))
    .then((list) => {
      this.use(list);
    }).catch((err) => {
      this.error.next(err);
    });
    this.loading.next(loading);
    return loading;
  }

}
