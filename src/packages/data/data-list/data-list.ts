import { Item, List } from '../../core';
import { EntryListConfig } from '../../data/';
import { SdkService } from '../sdk/sdk.service';
import { Subject } from 'rxjs';

/**
 * Extension of List for SDK ListResource. Each each implementation should implement the load
 * method to call the SDK method for loading the desired list! (see EntryList for example)
 */
export class DataList<T> extends List<T> {
  /** The current loaded assetList */
  protected listResource; //TODO import ListResource
  /** The list's config. */
  public config; //TODO use filterOptions
  /** Subject that should be nexted when loading begins */
  protected loading = new Subject();
  /** Observable that is nexted when the list begins loading. */
  public loading$ = this.loading.asObservable();

  /** The constructor will init the List and Pagination instances.
   * Make sure the config is already complete when initiating an EntryList instance. */
  constructor(config: EntryListConfig, protected sdk: SdkService) { //TODO filterOptions import
    super([], config);
    this.load();
  }

  /** deletes all undefined values from given config and assigns it to this.config */
  protected useConfig(config?: EntryListConfig) {
    if (config) {
      Object.keys(config).forEach((key) => {
        if (config[key] === undefined) {
          delete config[key];
        }
      });
      Object.assign(this.config, config);
    }
  }

  /** Takes the entryList and dumps the items into the the current page. Then it applies grouping if present. */
  protected use(listResource) {
    this.listResource = listResource;
    this.removeAll();
    this.addAll(listResource.getAllItems().map((value) => {
      return new Item(value, this.config);
    }), true);
    this.page = this.items;
    if (this.pagination) {
      this.pagination.setTotal(listResource.total);
    }
    this.groupBy(this.config.sortBy);
    this.change.next(this);
  }

  /** Returns SDK filterOptions from a given EntryListConfig. */
  protected getFilterOptions({ size = 20, page = 1, filter, sortBy, desc, sort = [] }: EntryListConfig) {
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

  /** Toggles sorting of the given property. Overloads list method to reload with the new sort setup*/
  toggleSort(property: string, desc?: boolean) {
    this.sortProperty(property, desc);
    this.config.sort = [(this.config.desc ? '-' : '') + this.config.sortBy];
    this.load();
  }

  /** Returns the operator to use for filtering the given property. Defaults to search. */
  protected getFilterOperator(property: string): string {
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
