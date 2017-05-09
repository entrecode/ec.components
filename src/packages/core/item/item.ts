import { ItemConfig } from './item-config.interface';
/** An Item basically wraps an Object and provides a config with metadata and helper methods to access the object. */
export class Item<T> {
  /** The value body of the item. This can be either a primitive value or an Object. */
  protected body: T;
  /** The config of the item. */
  protected config: ItemConfig<T>;

  /** Each item is constructed with its body and an optional config. */
  constructor(body: T, config: ItemConfig<T> = {}) {
    this.body = body;
    this.config = config;
  }

  /** Assigns the given config to the existing via Object.assign */
  useConfig(config: ItemConfig<T>) {
    Object.assign(this.config, config);
  }

  /** Returns an Array of properties possesed by the object. */
  getProperties(): Array<string> {
    if (typeof this.body !== 'object') {
      return [];
    }
    return Object.keys(this.body);
  }

  /** Returns the value of the the Item's identifier property. */
  id(): any {
    if (!this.config.identifier) {
      throw new Error('cannot get id of item without identifier!');
    }
    return this.resolve(this.config.identifier);
  }

  /** Returns either the whole body (if no property is given) or the value of the given property.
   * This method will traverse the body via the config.resolve function (if given). */
  resolve(property?: string): any {
    if (!property) {
      return this.body; //should this part use config.resolve too??
    }
    if (!this.config.resolve) {
      return this.body[property];
    }
    return this.config.resolve(this.body)[property];
  }

  private transform(action: string, property: string) {
    if (this.config.fields && this.config.fields[property] && this.config.fields[property][action]) {
      return this.config.fields[property][action](this.resolve(property), this.resolve());
    }
    return this.resolve(property);
  }

  /** Returns the output of the config.group transformation function with the given property value.
   * If no group function is set, it will just return the property value.*/
  group(property: string): any {
    return this.transform('group', property);
  }

  /** Returns the output of the config.display transformation function with the given property value.
   * If no display function is set, it will just return the property value.*/
  /** Transforms the given field's value for displaying */
  display(property): any {
    return this.transform('display', property);
  }
}