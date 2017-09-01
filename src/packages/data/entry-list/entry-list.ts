import { EntryListConfig } from '..';
import { SdkService } from '../sdk/sdk.service';
import { ResourceList } from '../resource-list/resource-list';
import { filterOptions } from "ec.sdk/src/resources/ListResource";

/**
 * Extension of List for Datamanager Entries.
 */
export class EntryList<Entry> extends ResourceList<Entry> {
  /** The model that is loaded from. */
  private model: string;

  /** The constructor will init the List and Pagination instances.
   * Make sure the config is already complete when initiating an EntryList instance. */
  constructor(model: string, config: EntryListConfig, protected sdk: SdkService) {
    super(config, sdk);
    this.model = model;
    this.load();
  }

  /** Generates the filterOptions for loading the entries. Sets the _fields option. */
  getFilterOptions(config: EntryListConfig): filterOptions {
    const _fields = Object.keys(this.config.fields)
    .filter((field) => this.config.fields[field].list !== false);
    console.log('fields', _fields);
    return Object.assign(super.getFilterOptions(config), { _fields });
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