import { Field, Item, List, ListConfig } from '@ec.components/core';
import Core from 'ec.sdk/lib/Core';
import ListResource, { filterOptions } from 'ec.sdk/lib/resources/ListResource';
import Resource from 'ec.sdk/lib/resources/Resource';
import { Observable, Subject } from 'rxjs';

/**
 * Extension of List for SDK ListResource. Each each implementation should implement the load
 * method to call the SDK method for loading the desired list! (see EntryList for example)
 */
export class ResourceList extends List<Resource> {
  /** The current loaded ListResource */
  protected listResource: ListResource;
  /** Subject that should be nexted when loading begins */
  public loading: Subject<Promise<any>> = new Subject();
  /** latest loading promise */
  public promise: Promise<any>;
  /** Observable that is nexted when the list begins loading. */
  public loading$ = this.loading.asObservable();
  /** Subject that should be nexted when an error occurs */
  protected error: Subject<Error> = new Subject();
  /** Observable that is nexted when the list has an error. */
  public error$: Observable<Error> = this.error.asObservable();

  /** Returns the operator to use for filtering the given property. Defaults to search. */
  protected static getFilterOperator(
    property: string,
    fields: Array<Field>
  ): string {
    if (!fields) {
      return 'search';
    }
    const field = fields.find(_field => _field.property === property);
    return field && field.filterOperator ? field.filterOperator : 'search';
  }

  /** Returns true if the field of the given property has rawFilter set to true */
  protected static isRawFilter(
    property: string,
    fields: Array<Field>
  ): boolean {
    if (!fields) {
      return false;
    }
    const field = fields.find(_field => _field.property === property);
    return field && field.rawFilter;
  }

  /** The constructor will init the List and Pagination instances.
   * Make sure the config is already complete when initiating an EntryList instance. */
  constructor(
    config: ListConfig<Resource>,
    public api?: Core,
    public relation?,
    listResource?: ListResource
  ) {
    super([], config);
    if (listResource) {
      // list was already preloaded outside of this instance
      this.use(listResource);
    } else {
      this.load();
    }
  }

  load(config?: ListConfig<Resource>) {
    if (config) {
      this.config = Object.assign({}, this.config, config);
    }
    if (!this.api || !this.relation) {
      return;
    }
    const options = this.getFilterOptions(this.config);
    this.promise = this.api
      .resourceList(this.relation, options)
      .then(list => this.use(list))
      .catch(err => this.error.next(err));
    this.loading.next(this.promise);
    return this.promise;
  }

  /** deletes all undefined values from given config and assigns it to this.config */
  protected useConfig(config?: ListConfig<Resource>) {
    if (config) {
      Object.keys(config).forEach(key => {
        if (config[key] === undefined) {
          delete config[key];
        }
      });
      Object.assign(this.config, config);
    }
  }

  /** Takes the listResource and dumps the items into the the current page. Then it applies grouping if present. */
  protected use(listResource) {
    this.listResource = listResource;
    this.removeAll();
    this.addAll(
      listResource.getAllItems().map(value => {
        return new Item(value, this.config);
      }),
      true
    );
    this.page = this.items;
    if (this.pagination) {
      this.pagination.setTotal(listResource.total);
    }
    this.groupBy(this.config.sortBy);
    this.change.next(this);
  }

  /** Returns SDK filterOptions from a given ListConfig. */
  protected getFilterOptions({
    size = 20,
    page = 1,
    filter,
    sortBy,
    desc,
    sort = []
  }: ListConfig<Resource> = {}): filterOptions {
    const options = { size, page };
    if (sortBy) {
      Object.assign(options, { sort: [(desc ? '-' : '') + sortBy] });
    }
    if (!filter) {
      return options;
    }
    for (const property in filter) {
      if (filter.hasOwnProperty(property)) {
        Object.assign(options, {
          [property]: ResourceList.isRawFilter(property, this.fields)
            ? filter[property]
            : {
              [ResourceList.getFilterOperator(property, this.fields)]: filter[
                property
              ]
            }
        });
      }
    }
    return options;
  }

  /** Toggles sorting of the given property. Overloads list method to reload with the new sort setup*/
  toggleSort(property: string, desc?: boolean) {
    this.sortProperty(property, desc);
    Object.assign(this.config, {
      sort: [(this.config.desc ? '-' : '') + this.config.sortBy]
    });
    this.load();
  }

  /** Updates the config.filter with the given property filter. */
  filterProperty(property: string, value: any = '') {
    const currentFilter = this.config.filter || {};
    if (this.isEmptyFilter(value)) {
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
    if (this.isEmptyFilter(value) && !this.isFiltered(property)) {
      return; // filter is already empty => no need to load again
    }
    return this.load({
      page: 1, // reset page
      filter: this.filterProperty(property, value)
    });
  }
}
