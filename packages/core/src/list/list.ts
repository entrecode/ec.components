import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { Collection } from '../collection/collection';
import { Field } from '../field/field';
import { Item } from '../item/item';
import { Pagination } from '../pagination/pagination';
import { Sorter } from '../sorter/sorter';
import { ListConfig } from './list-config.interface';

/**
 * A more sophisticated Collection of Objects with arbitrary content.
 * It comes with features like resolve functions, identifiers, display formatting and sorting.
 */
export class List<T> extends Collection<Item<T>> {
  /**
   * Array of Properties that are relevant for each item. The fields are populated on construction
   * via getFields method.
   */
  public fields: Array<Field>;
  /**
   * The List Configuration, click on ListConfig for details. Can be given an optional ListConfig.
   */
  public config: ListConfig<T>;
  /**
   * Current Value Groups (Different Unique Values).
   */
  groups = [];
  /** The list's pagination (Optional) */
  public pagination: Pagination<T>;
  /** The items of the current page */
  public page: Array<Item<T>> = [];
  /** Subject that should be nexted when loading is finished */
  protected change: Subject<List<T>> = new Subject();
  /** Observable that is nexted when the list has changed. */
  public change$: Observable<List<T>> = this.change.asObservable();

  /** Getter for items, calls transform */
  get display() {
    if (!this.config || !this.config.display) {
      return this.items;
    }
    return this.config.display(this.items);
  }

  /**
   * Constructs the List. Populates the items and instantiates the fields.
   */
  constructor(values?: Array<T>, config: ListConfig<T> = {}, pagination?: Pagination<T>) {
    super([]);
    if (values) {
      super.addAll(values.map(value => new Item(value, Object.assign({}, config))), false, false);
    }
    this.config = Object.assign({ page: 1, maxColumns: 8 }, config || {});
    this.fields = this.getFields();
    this.hideOverflowFields();
    this.pagination = pagination || new Pagination(this.config, this.items.length);
    if (!pagination) { // load if no custom pagination was given
      this.pagination.change$.debounceTime(200)
        .subscribe(_config => this.load(_config));
      this.load();
    }
  }

  /** Loads the list page with the given config or, if none given, uses the current config.
   * Reapplies grouping (if any) and calls the change Subject. */
  public load(config?: ListConfig<T>) {
    if (config) {
      Object.assign(this.config, config);
    }
    this.page = this.pagination.slice(this.items);
    this.groupBy(this.config.sortBy);
    this.change.next(this);
  }

  /** Adds the given item to the list and assigns the list config to the item*/
  add(item: Item<T>, unique?: boolean, event: boolean = true) {
    item.useConfig(this.config);
    return super.add(item, unique, event);
  }

  /**
   * Distills Array of item properties. Either uses keys of config.fields or parses the item
   * properties directly.
   */
  protected getFields(): Array<Field> {
    if (this.config && this.config.fields) {
      return Object.keys(this.config.fields)
        .filter((key) => this.config.fields[key].list !== false)
        .map((field) => new Field(field, this.config.fields[field]));
    }
    const fields = [];
    this.items.forEach((item) => {
      item.getProperties().forEach(property => {
        if (!fields.find((f) => f.property === property)) {
          fields.push(new Field(property, { type: typeof item.resolve(property) }));
        }
      });
    });
    return fields;
  }

  /** Sets all fields that exceed the maxColumns to hidden */
  protected hideOverflowFields() {
    if (this.config && this.config.maxColumns) {
      this.fields.filter(f => !f.hideInList).forEach((field, index) => {
        if (index >= this.config.maxColumns && field.hideInList === undefined) {
          field.hideInList = true;
        }
      });
    }
  }

  /**
   * Resolves the item with the given Array index or identifier (if configured)
   */
  id(identifier: any): Item<T> {
    if (identifier === undefined) {
      throw new Error(`cannot get item with identifier "${identifier}"`);
    }
    return this.items.find((item, key) => {
      if (!item.config.identifier) {
        return false;
      }
      return item.id() === identifier;
    }) || this.items[identifier];
  }

  /** Filters the list after the given property and value */
  public filter(property: string, value: any = '', operator: string = 'exact') {
    // TODO find way to filter with pagination and without loosing filtered out items
    this.page = this.items.filter((item) => {
      return item.resolve(property).includes(value);
    }).slice(0, this.config.size || 100);
  }

  /** Clears the filter for given property or all properties if none given. */
  clearFilter(property?: string) {
    if (property) {
      return this.filter(property, null);
    }
    this.load({
      filter: {}
    });
  }

  /** Helper function. Returns true if the given query value is empty (also recognizes empty array) */
  isEmptyFilter(query: null | undefined | string | Array<any>) {
    return query === '' ||
      query === null ||
      query === undefined ||
      (Array.isArray(query) && !query.length)
  }

  /** Returns true if the given property has a filter set. If no property is given it returns true when no property has a filter. */
  isFiltered(property?: string) {
    if (!this.config.filter) {
      return false;
    }
    if (!property) {
      return Object.keys(this.config.filter)
        .filter(key => !this.isEmptyFilter(this.config.filter[key]))
        .length > 0
    }
    return !this.isEmptyFilter(this.config.filter[property]);
  }

  /** Changes the config's sort variables to reflect the given sorting */
  protected sortProperty(property: string, desc?: boolean) {
    if (property !== this.config.sortBy) {
      delete this.config.desc;
      this.config.sortBy = property;
    } else if (this.config.desc) {
      delete this.config.sortBy;
    }
    this.config.desc = this.config.desc === undefined ? desc || false : !this.config.desc;
  }

  /** Returns true if the given sort state is active. You can either just check for a property + desc flag */
  public isSorted(property: string, desc?: boolean) {
    if (typeof desc === 'undefined') {
      return this.config.sortBy === property;
    }
    return this.config.sortBy === property && this.config.desc === desc;
  }

  /** Sorts with given sorting, using the Sorter */
  toggleSort(property: string, desc?: boolean) {
    this.sortProperty(property, desc);
    Sorter.sort(this.items, property, this.config.desc);
    this.load(this.config);
  }
  /** Toggles selectMode of list config */
  toggleSelectMode() {
    this.config = Object.assign({}, this.config, {
      selectMode: !this.config.selectMode
    });
  }

  /** Returns an Array of all unique values of the given property */
  groupBy(property) {
    delete this.groups;
    const page = this.pagination ? this.pagination.getPage() : 0;
    if (!property || !this.config.fields || !this.config.fields[property] || !this.config.fields[property].group) {
      this.groups = [{
        page,
        sortBy: this.config.sortBy,
        desc: this.config.desc
      }];
      return;
    }
    const groups = [];
    this.page.forEach(item => {
      const value = item.group(property);
      if (!groups.find((g) => g.value === value)) {
        groups.push({
          value,
          page,
          property: this.config.sortBy,
          desc: this.config.desc
        });
      }
    });
    this.groups = groups;
  }

  /** Item tracking for *ngFor. */
  public trackItem(index, item) {
    return index;
  }
  /** Returns an array of all sortable fields */
  public sortableFields() {
    return this.fields.filter(field => field.sortable);
  }
  /** Returns true if the given field index in the visible fields is higher than maxColumns.  */
  public isOverTheMax(field: Field) {
    return this.fields.filter(f => !f.hideInList).indexOf(field) >= this.config.maxColumns;
  }
}
