import { ItemConfig } from '..';

/** An Item basically wraps an Object and provides a config with metadata and helper methods to access the object. */
export class Item<T> {
  /** The value body of the item. This can be either a primitive value or an Object. */
  protected body: T;
  /** The config of the item. */
  protected config: ItemConfig<T>;

  /** Each item is constructed with its body and an optional config. */
  constructor(body: T, config?: ItemConfig<T>) {
    this.body = body;
    this.config = config || this.generateConfig();
  }

  /** Generates a config from the body by setting view to the properties type. */
  private generateConfig() {
    const config = { fields: {} };
    this.getProperties().forEach((property) => {
      config.fields[property] = {
        view: typeof this.body[property],
        type: typeof this.body[property],
      };
      if (config.fields[property].view === 'object' && Array.isArray(this.body[property])) {
        config.fields[property].view = 'array'
      }
    });
    return config;
  }

  /** Returns the item's body */
  getBody() {
    return this.body;
  }

  /** Returns true if the body is defined and not null*/
  hasBody() {
    return this.body !== undefined && this.body !== null;
  }

  /** deletes the item body */
  clear() {
    delete this.body;
  }

  /** Assigns the given config to the existing via Object.assign */
  useConfig(config: ItemConfig<T>) {
    Object.assign(this.config, config);
  }

  /** Returns the item's config */
  getConfig() {
    return this.config;
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
    if (!this.hasBody()) {
      return;
    }
    if (!this.config) {
      return property ? this.body[property] : this.body;
    }
    if (!property) {
      if (this.config.resolve) {
        return this.config.resolve(this.body)
      }
      return this.body;
    }
    if (this.config.fields && this.config.fields[property] && this.config.fields[property].resolve) {
      return this.config.fields[property].resolve(this.body, this, property);
    }
    if (!this.config.resolve) {
      return this.body[property];
    }
    const v = this.config.resolve(this.body);
    return v ? v[property] : null;
  }

  /** The main method for transformation functions like resolve, display and group. */
  private transform(action: string, property: string) {
    if (!this.hasBody()) {
      return;
    }
    if (this.config.fields && this.config.fields[property] && this.config.fields[property][action]) {
      return this.config.fields[property][action](this.resolve(property), this.body, property);
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
  display(property?: string): any {
    if (!property) {
      return this.transform('display', this.config.label || this.getProperties()[0]); // Object.keys(this.resolve())[0]
    }
    return this.transform('display', property);
  }

  /** Transforms the given field's value for sorting */
  sort(property: string): any {
    return this.transform('sort', property);
  }

  /** Saves the given value. */
  save(value: T): Promise<Item<T>> {
    if (this.config.onSave) {
      return Promise.resolve(this.config.onSave(this, value))
      .then((value) => {
        this.body = value;
        return this;
      });
    }
    Object.assign(this.resolve() || {}, value);
    return Promise.resolve(this);
  }
}