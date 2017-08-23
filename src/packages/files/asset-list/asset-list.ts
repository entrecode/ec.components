import { EntryListConfig } from '../../data/';
import { ResourceList } from '../../data/resource-list/resource-list';
import { SdkService } from '../../data/sdk/sdk.service';
import { FileService } from '../file.service';

/**
 * Extension of List for Datamanager Assets.
 */
export class AssetList<PublicAssetResource> extends ResourceList<PublicAssetResource> {

  constructor(config: EntryListConfig, protected sdk: SdkService, protected fileService: FileService) {
    super(Object.assign(config, fileService.assetListConfig), sdk);
  }

  /** Overrides the List load method. Instead of slicing the page out of all items, a datamanager request is made using the config.*/
  public load(config?: EntryListConfig) {
    if (!this.sdk) {
      return;
    }
    this.useConfig(config);
    const loading = this.sdk.api.assetList(this.getFilterOptions(this.config))
    .then((list) => {
      console.log('got list', list.getAllItems());
      this.use(list);
    }).catch((err) => {
      console.log('load error', err);
    });
    this.loading.next(loading);
    return loading;
  }

}
