import { Collection } from '../collection/collection';
import { ListConfig } from './list-config.interface';
import { Sorter } from '../sorter/sorter';
import { Item } from '../item/item';
import { Pagination } from '../pagination/pagination';
import { PaginationConfig } from '../pagination/pagination-config.interface';
import { Field } from '../field/field';
import { Selection } from '../selection/selection';
import { Subject } from 'rxjs';

/**
 * A more sophisticated Collection of Objects with arbitrary content.
 * It comes with features like resolve functions, identifiers, display formatting and sorting.
 */
export class List<T> extends Collection<Item<T>> {
  /**
   * Array of Properties that are relevant for each item. The fields are populated on construction
   * via getFields method.
   */
  public fields: Array<Field<T>>;
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
  /** The list's selection (Optional) */
  public selection: Selection<T>;
  /** The items of the current page */
  public page: Array<Item<T>>;
  /** Subject that should be nexted when loading is finished */
  protected change = new Subject();
  /** Observable that is nexted when the list has changed. */
  public change$ = this.change.asObservable();

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
    this.change.next(this);
  }

  /** Adds the given item to the list and assigns the list config to the item*/
  add(item: Item<T>, unique?: boolean) {
    item.useConfig(this.config);
    return super.add(item, unique);
  }

  /**
   * Distills Array of item properties. Either uses keys of config.fields or parses the item
   * properties directly.
   */
  protected getFields(): Array<Field<T>> {
    if (this.config && this.config.fields) {
      return Object.keys(this.config.fields).map((field) => new Field(field, this.config.fields[field]));
    }
    const fields = [];
    this.items.forEach((item) => {
      item.getProperties().forEach(property => {
        if (fields.indexOf(property) === -1) {
          fields.push(new Field(property, { type: typeof item.resolve(property) }));
        }
      });
    });
    return fields;
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
