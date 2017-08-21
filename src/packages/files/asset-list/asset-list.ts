import { EntryListConfig } from '../../data/';
import { DataList } from '../../data/data-list/data-list';

/**
 * Extension of List for Datamanager Assets.
 */
export class AssetList<PublicAssetResource> extends DataList<PublicAssetResource> {

  /** Overrides the List load method. Instead of slicing the page out of all items, a datamanager request is made using the config.*/
  public load(config?: EntryListConfig) {
    if (!this.sdk) {
      return;
    }
    this.useConfig(config);
    const loading = this.sdk.api.assetList(this.getFilterOptions(this.config))
    .then((list) => {
      this.use(list);
    }).catch((err) => {
    });
    this.loading.next(loading);
    return loading;
  }

}
