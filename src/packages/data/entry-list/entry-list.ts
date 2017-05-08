import { Item, List } from '@ec.components/core';
import { Datamanager, EntryListConfig } from '../index';

/**
 * Extension of List for Datamanager Entries.
 */
export class EntryList<Entry> extends List<Entry> {
  private entryList;
  private model: string;
  /** The list's config. */
  public config: EntryListConfig;

  /** The constructor will init the List and Pagination instances.*/
  constructor(model: string, config: EntryListConfig) {
    super([], Object.assign({
      identifier: '_id',
      resolve: (entry => entry.value),
      fields: config.fields
    }, config));
    this.model = model;
    // Object.assign(this.config, config);
    this.load();
  }

  private useList(entryList) {
    this.entryList = entryList;
    this.removeAll();
    this.addAll(entryList.entries.map((entry) => {
      return new Item(entry, this.config);
    }), true);
    this.page = this.items;

    if (this.pagination) {
      this.pagination.setTotal(entryList.total);
    }
    this.groupBy(this.config.sortBy);
  }

  protected load(config?: EntryListConfig) {
    if (!this.model) {
      return;
    }
    if (config) {
      Object.assign(this.config, config);
    }
    return Datamanager.api().model(this.model).entryList(this.config)
    .then(entryList => this.useList(entryList));
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
