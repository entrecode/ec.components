import { EntryListConfig } from '..';
import { SdkService } from '../sdk/sdk.service';
import { DataList } from '../data-list/data-list';

/**
 * Extension of List for Datamanager Entries.
 */
export class EntryList<Entry> extends DataList<Entry> {
  /** The model that is loaded from. */
  private model: string;

  /** The constructor will init the List and Pagination instances.
   * Make sure the config is already complete when initiating an EntryList instance. */
  constructor(model: string, config: EntryListConfig, protected sdk: SdkService) { //TODO filterOptions import
    super(config, sdk);
    this.model = model;
    this.load();
  }

  /** Overrides the SdkList load method. */
  public load(config?: EntryListConfig) {
    if (!this.model || !this.sdk) {
      return;
    }
    this.useConfig(config);
    const loading = this.sdk.api.entryList(this.model, this.getFilterOptions(this.config))
    .then((list) => {
      this.use(list);
    }).catch((err) => {
      this.error.next(err);
    });
    this.loading.next(loading);
    return loading;
  }
}