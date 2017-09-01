import { Item, List } from '../../core';
import { EntryListConfig } from '../../data/';
import { SdkService } from '../sdk/sdk.service';
import { Subject } from 'rxjs';
import ListResource, { filterOptions } from "ec.sdk/src/resources/ListResource";
import { Field } from '../../core/field/field';

/**
 * Extension of List for SDK ListResource. Each each implementation should implement the load
 * method to call the SDK method for loading the desired list! (see EntryList for example)
 */
export class ResourceList<T> extends List<T> {
  /** The current loaded assetList */
  protected listResource: ListResource;
  /** Subject that should be nexted when loading begins */
  protected loading = new Subject();
  /** Observable that is nexted when the list begins loading. */
  public loading$ = this.loading.asObservable();

  /** The constructor will init the List and Pagination instances.
   * Make sure the config is already complete when initiating an EntryList instance. */
  constructor(config: EntryListConfig, protected sdk: SdkService) {
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

    // this.removeAll();
    /*this.replaceWith(listResource.getAllItems().map((value) => {
      return new Item(value, this.config);
    }), true);*/

    this.page = this.items;
    if (this.pagination) {
      this.pagination.setTotal(listResource.total);
    }
    this.groupBy(this.config.sortBy);
    this.change.next(this);
  }

  /** Returns SDK filterOptions from a given EntryListConfig. */
  protected getFilterOptions({ size = 20, page = 1, filter, sortBy, desc, sort = [] }: EntryListConfig): filterOptions {
    const options = { size, page };
    if (sortBy) {
      Object.assign(options, { sort: [(desc ? '-' : '') + sortBy] });
    }
    if (filter) {
      for (let property in filter) {
        Object.assign(options, {
          [property]: {
            [ResourceList.getFilterOperator(property, this.fields)]: filter[property]
          }
        });
      }
    }
    return options;
  }

  /** Toggles sorting of the given property. Overloads list method to reload with the new sort setup*/
  toggleSort(property: string, desc?: boolean) {
    this.sortProperty(property, desc);
    Object.assign(this.config, { sort: [(this.config.desc ? '-' : '') + this.config.sortBy] });
    this.load();
  }

  /** Returns the operator to use for filtering the given property. Defaults to search. */
  protected static getFilterOperator(property: string, fields: Array<Field<any>>): string {
    if (!fields) {
      return 'search';
    }
    const field = fields.find((field) => field.property === property);
    return field && field.filterOperator ? field.filterOperator : 'search';
  }

  /** Updates the config.filter with the given property filter. */
  filterProperty(property: string, value: any = '') {
    const currentFilter = this.config.filter || {};
    if (value === '' || value === null || value === undefined || (Array.isArray(value) && !value.length)) {
      if (!currentFilter[property]) {
        return; //filter is already empty => no need to load again
      }
      delete currentFilter[property];
    } else {
      Object.assign(currentFilter, {
        [property]: value
      });
    }
    return currentFilter;
  }

  /** Filters the entry list by a given property value. Triggers load. */
  filter(property: string, value: any = '') {
    return this.load({
      filter: this.filterProperty(property, value)
    });
  }
}
