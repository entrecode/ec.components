import { Item, List } from '../../core';
import { EntryListConfig } from '..';
import { SdkService } from '../sdk/sdk.service';
import { Subject } from 'rxjs';

/**
 * Extension of List for Datamanager Entries.
 */
export class EntryList<Entry> extends List<Entry> {
  private entryList;
  private model: string;
  /** The list's config. */
  public config; //TODO use filterOptions
  /** Subject that should be nexted when loading begins */
  protected loading = new Subject();
  /** Observable that is nexted when the list begins loading. */
  public loading$ = this.loading.asObservable();

  /** The constructor will init the List and Pagination instances.
   * Make sure the config is already complete when initiating an EntryList instance. */
  constructor(model: string, config: EntryListConfig, private sdk: SdkService) { //TODO filterOptions import
    super([], config);
    this.model = model;
    this.load();
  }

  private use(entryList) {
    this.entryList = entryList;
    this.removeAll();
    this.addAll(entryList.getAllItems().map((entry) => {
      return new Item(entry, this.config);
    }), true);
    this.page = this.items;
    if (this.pagination) {
      this.pagination.setTotal(entryList.total);
    }
    this.groupBy(this.config.sortBy);
    this.change.next(this);
  }

  /** Overrides the List load method. Instead of slicing the page out of all items, a datamanager request is made using the config.*/
  public load(config?: EntryListConfig) {
    if (!this.model) {
      return;
    }
    if (config) {
      Object.keys(config).forEach((key) => {
        if (config[key] === undefined) {
          delete config[key];
        }
      });
      Object.assign(this.config, config);
    }
    let c = {
      size: this.config.size,
      page: this.config.page
      // fields: Object.keys(this.config.fields)
    };
    if (this.config.sortBy) {
      c['sort'] = [(this.config.desc ? '-' : '') + this.config.sortBy];
    }
    const loading = this.sdk.api.entryList(this.model, c)
    .then((list) => {
      this.use(list);
    });
    this.loading.next(loading);
    return loading;
  }

  /** Toggles sorting of the given property. Overloads list method to reload with the new sort setup*/
  toggleSort(property: string, desc?: boolean) {
    this.sortProperty(property, desc);
    this.config.sort = [(this.config.desc ? '-' : '') + this.config.sortBy];
    this.load();
  }

  /** Filters the entry list by a given property value. Triggers load */
  filter(property: string, value: any, operator: string = 'exact') {
    this.load({
      filter: {
        [property]: {
          [operator]: value
        }
      }
    })
  }
}
