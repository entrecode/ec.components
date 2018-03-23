import { ResourceList } from '../../resource-list/resource-list';
import { SdkService } from '../../sdk/sdk.service';
import { FileService } from '../file.service';
import { ListConfig } from '@ec.components/core/src/list/list-config.interface';
import PublicAssetResource from 'ec.sdk/lib/resources/publicAPI/PublicAssetResource';
import AssetResource from 'ec.sdk/lib/resources/datamanager/AssetResource';

/**
 * Extension of List for Datamanager Assets.
 */
export class AssetList extends ResourceList {
  /** Overrides the Config of ResourceList with a ListConfig containing an EntryResource */
  config: ListConfig<AssetResource | PublicAssetResource>;

  constructor(config: ListConfig<PublicAssetResource | AssetResource>, protected sdk: SdkService, protected fileService: FileService) {
    super(Object.assign({}, fileService.assetListConfig, config));
    this.load(this.config);
    console.warn('asset list component is deprecated!');
  }

  /** Overrides the List load method. Instead of slicing the page out of all items, a datamanager request is made using the config.*/
  public load(config?: ListConfig<PublicAssetResource | AssetResource>) {
    if (!this.sdk) {
      return;
    }
    this.useConfig(config);
    this.promise = this.sdk.api.assetList(this.getFilterOptions(this.config))
      .then((list) => {
        this.use(list);
      }).catch((err) => {
        this.error.next(err);
      });
    this.loading.next(this.promise);
    return this.promise;
  }

}
