import { Item, List } from '../../core';
import { Datamanager, EntryListConfig, ModelConfig } from '..';

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
    if (this.config.fields) {
      this.load();
      return;
    }
    ModelConfig.generateFieldConfig(this.model).then((fieldConfig) => {
      Object.assign(this.config, { fields: fieldConfig });
      this.fields = this.getFields();
      this.load();
    });
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
    this.change.next(this);
  }

  /** Overrides the List load method. Instead of slicing the page out of all items, a datamanager request is made using the config.*/
  protected load(config?: EntryListConfig) {
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
