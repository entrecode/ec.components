import { Item, List } from '../../core';
import { EntryListConfig } from '..';
import { SdkService } from '../sdk/sdk.service';
import { Subject } from 'rxjs';

/**
 * Extension of List for Datamanager Entries.
 */
export class EntryList<Entry> extends List<Entry> {
  /** The current loaded entryList */
  private entryList;
  /** The model that is loaded from. */
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

  /** Takes the entryList and dumps the items into the the current page. Then it applies grouping if present. */
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

  /** Returns SDK filterOptions from a given EntryListConfig. */
  private getFilterOptions({ size = 20, page = 1, filter, sortBy, desc, sort = [] }: EntryListConfig) {
    const options = { size, page };
    if (sortBy) {
      options['sort'] = [(desc ? '-' : '') + sortBy];
    }
    if (filter) {
      for (let property in filter) {
        Object.assign(options, { [property]: filter[property] });
      }
    }
    return options;
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
    const loading = this.sdk.api.entryList(this.model, this.getFilterOptions(this.config))
    .then((list) => {
      this.use(list);
    }).catch((err) => {
      console.error('err', err);
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

  /** Returns the operator to use for filtering the given property. Defaults to search. */
  private getFilterOperator(property: string): string {
    if (!this.fields) {
      return 'search';
    }
    const field = this.fields.find((field) => field.property === property);
    return field && field.filterOperator ? field.filterOperator : 'search';
  }

  /** Filters the entry list by a given property value. Triggers load */
  filter(property: string, value: any = '', operator: string = this.getFilterOperator(property)) {
    const currentFilter = this.config.filter || {};
    if (value === '' || value === null || value === undefined || (Array.isArray(value) && !value.length)) {
      delete currentFilter[property];
    } else {
      Object.assign(currentFilter, {
        [property]: {
          [operator]: value
        }
      });
    }
    return this.load({
      filter: currentFilter
    })
  }
}
