import { Item, List, Pagination } from '@ec.components/core';
import { Datamanager, EntryListConfig } from '../index';

/**
 * Extension of List for Datamanager Entries.
 */
export class EntryList<Entry> extends List<Entry> {
  private entryList;
  private model: string;
  /** The list's config. */
  public config: EntryListConfig;
  /** The list's pagination (Optional) */
  public pagination: Pagination;

  /** The constructor will init the List and Pagination instances.*/
  constructor(model: string, config: EntryListConfig) {
    super([], {
      identifier: '_id',
      resolve: (entry => entry.value),
      fields: config.fields
    });
    this.model = model;
    Object.assign(this.config, config);
    this.pagination = this.pagination || new Pagination(this.config);
    this.pagination.change$.debounceTime(200)
    .subscribe((config) => {
      this.load(config);
    });
    this.load(config);
  }

  private useList(entryList) {
    this.entryList = entryList;
    this.removeAll();
    this.addAll(entryList.entries.map((entry) => {
      return new Item(entry, this.config);
    }));
    if (this.pagination) {
      this.pagination.setTotal(entryList.total);
    }
    if (this.config.sortBy) {
      this.groupBy(this.config.sortBy);
    }
  }

  private load(config?: EntryListConfig) {
    if (config) {
      Object.assign(this.config, config);
    }
    return Datamanager.api().model(this.model).entryList(this.config)
    .then(entryList => this.useList(entryList));
  }

  private nextPage() {
    if (!this.entryList || !this.entryList.next) {
      throw new Error('cannot load next page of entryList' + this.entryList);
    }
    this.entryList.next().then(entryList => this.useList(entryList));
  }

  private previousPage() {
    if (!this.entryList || !this.entryList.prev) {
      throw new Error('cannot load previous page of entryList' + this.entryList);
    }
    this.entryList.prev().then(entryList => this.useList(entryList));
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
