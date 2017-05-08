import { Collection } from '../collection/collection';
import { ListConfig } from './list-config.interface';
import { Sorter } from '../sorter/sorter';
import { FieldConfigProperty } from '../config/field-config-property.interface';
import { Item } from './item';
import { Pagination } from '../pagination/pagination';
import { PaginationConfig } from '../pagination/pagination-config.interface';

/**
 * A more sophisticated Collection of Objects with arbitrary content.
 * It comes with features like resolve functions, identifiers, display formatting and sorting.
 */
export class List<T> extends Collection<Item<T>> {
  /**
   * Array of Properties that are relevant for each item. The fields are populated on construction
   * via getFields method.
   */
  public fields: Array<FieldConfigProperty>;
  /**
   * The List Configuration, click on ListConfig for details. Can be given an optional ListConfig.
   */
  public config: ListConfig;
  /**
   * Current Value Groups (Different Unique Values).
   */
  groups: any[];
  /** The list's pagination (Optional) */
  public pagination: Pagination;
  /** The items of the current page */
  public page: Array<Item<T>>;

  /**
   * Constructs the List. Populates the items and instantiates the fields.
   */
  constructor(items?: Array<T>, config: ListConfig = {}) {
    super([]);
    if (items) {
      super.addAll(items.map(item => new Item(item, config)));
    }
    this.config = config || {};
    this.config.page = 1;
    this.fields = this.getFields();
    this.pagination = this.config.pagination || new Pagination(this.config, this.items.length);
    this.pagination.change$.subscribe(config => this.load(config));
    this.load();
  }

  protected load(config?: PaginationConfig) {
    if (config) {
      Object.assign(this.config, config);
    }
    this.page = this.pagination.slice(this.items);
    this.groupBy(this.config.sortBy);

  }

  /** Adds the given item to the list and assigns the list config to the item*/
  add(item: Item<T>, unique?: boolean) {
    item.useConfig(this.config);
    return super.add(item, unique);
  }

  private makeField(property: string) {
    const config = this.config && this.config.fields ? this.config.fields[property] : {} || {};
    return Object.assign(config, { property: property });
  }

  /**
   * Distills Array of item properties. Either uses keys of config.fields or parses the item
   * properties directly.
   */
  protected getFields(): Array<FieldConfigProperty> {
    if (this.config && this.config.fields) {
      return Object.keys(this.config.fields).map((field) => this.makeField(field));
    }
    const properties = [];
    this.items.forEach((item) => {
      item.getProperties().forEach(property => {
        if (properties.indexOf(property) === -1) {
          properties.push(property);
        }
      });
    });
    return properties.map((property) => this.makeField(property));
  }

  /**
   * Resolves the item with the given Array index or identifier (if configured)
   */
  id(identifier: any): Item<T> {
    if (!this.config.identifier && typeof identifier === 'number') {
      return this.items[identifier];
    }
    if (!this.config.identifier) {
      throw new Error(`cannot get item with id ${identifier} => config is missing idenfier`);
    }
    return this.items.find((item, key) => {
      return item.id() === identifier;
    });
  }

  /** Changes the config's sort variables to reflect the given sorting */
  protected sortProperty(property: string, desc?: boolean) {
    if (property !== this.config.sortBy) {
      delete this.config.sortBy;
    }
    this.config.sortBy = property;
    this.config.desc = this.config.desc === undefined ? desc || false : !this.config.desc;
  }

  /** Sorts with given sorting, using the Sorter */
  toggleSort(property: string, desc?: boolean) {
    this.sortProperty(property, desc);
    Sorter.sort(this.items, property, this.config.desc);
    this.load(this.config);
  }

  /** Returns an Array of all unique values of the given property */
  groupBy(property) {
    delete this.groups;
    if (!property || !this.config.fields || !this.config.fields[property] || !this.config.fields[property].group) {
      return;
    }
    const values = [];
    this.page.forEach(item => {
      let value = item.group(property);
      if (values.indexOf(value) === -1) {
        values.push(value);
      }
    });
    this.groups = values;
  }

  private trackGroup(index, group) {
    //track group by index to force reload
    return index + group + Math.random();
  }

  private groupFilter(value) {
    return {
      property: this.config.sortBy,
      value: value,
    }
  }
}
