import { SdkService } from '../sdk/sdk.service';
import { ResourceList } from '../resource-list/resource-list';
import { filterOptions } from 'ec.sdk/lib/resources/ListResource';
import EntryResource from 'ec.sdk/lib/resources/publicAPI/EntryResource';
import { ListConfig } from '@ec.components/core/src/list/list-config.interface';

/**
 * Extension of List for Datamanager Entries.
 */
export class EntryList extends ResourceList<EntryResource> {
  /** The model that is loaded from. */
  private model: string;

  /** The constructor will init the List and Pagination instances.
   * Make sure the config is already complete when initiating an EntryList instance. */
  constructor(model: string, config: ListConfig<EntryResource>, protected sdk: SdkService) {
    super(config);
    this.model = model;
    this.load();
  }

  /** Generates the filterOptions for loading the entries. Sets the _fields option. */
  getFilterOptions(config: ListConfig<EntryResource>): filterOptions {
    const _fields = Object.keys(this.config.fields)
    .filter((field) => this.config.fields[field].list !== false);
    return Object.assign(super.getFilterOptions(config), { _fields });
  }

  /** Overrides the SdkList load method. */
  public load(config?: ListConfig<EntryResource>) {
    if (!this.model || !this.sdk) {
      return;
    }
    this.useConfig(config);
    this.promise = this.sdk.api.entryList(this.model, this.getFilterOptions(this.config))
    .then((list) => {
      this.use(list);
    }).catch((err) => {
      this.error.next(err);
    });
    this.loading.next(this.promise);
  }
}
