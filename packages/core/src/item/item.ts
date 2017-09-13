import { ItemConfig } from './item-config.interface';

/** An Item basically wraps an Object and provides a config with metadata and helper methods to access the object. */
export class Item<T> {
  /** The value body of the item. This can be either a primitive value or an Object. */
  public body: T;
  /** The config of the item. */
  protected config: ItemConfig<T>;

  /** Each item is constructed with its body and an optional config. */
  constructor(body: T, config?: ItemConfig<T>) {
    this.body = body;
    this.config = config || this.generateConfig();
  }

  /** Generates a config from the body by setting view to the properties type. */
  private generateConfig(): ItemConfig<T> {
    const config = { fields: {} };
    this.getProperties().forEach((property) => {
      config.fields[property] = {
        view: typeof this.body[property],
        type: typeof this.body[property],
      };
      if (config.fields[property].view === 'object' && Array.isArray(this.body[property])) {
        config.fields[property].view = 'array';
        config.fields[property].values = this.body[property];
        // config.fields[property].solo = true;
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

  /** Returns an Array of properties possessed by the body. */
  getProperties(): Array<string> {
    if (!this.body || typeof this.body !== 'object') {
      if (typeof this.body !== 'object') {
        return [this.config.title || ''];
      }
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
    if (typeof this.body !== 'object') {
      return this.body;
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

  /** The main method for transformation functions like resolve, display and group.
   * If you dont set the third parameter, the current item value will be used.
   * The third parameter can be used to transform a value that is not yet possesed (e.g. to
   * serialize) */
  private transform(action: string, property: string, value: any = this.resolve(property)) {
    if (!this.hasBody()) {
      return;
    }
    if (this.config.fields && this.config.fields[property] && this.config.fields[property][action]) {
      return this.config.fields[property][action](value, this.body, property);
    }
    return value;
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

  /** Returns value with all readOnly properties removed */
  pickWriteOnly(value) {
    return Object.assign({}, ...Object.keys(value)
    .map(property => {
      if (this.config.fields[property].readOnly) {
        return;
      }
      return { [property]: value[property] }
    }).filter(v => !!v));

  }

  /** Transforms the given field's value for serialization when saving. */
  serialize(value, put: boolean = false): any {
    if (put) {
      value = this.pickWriteOnly(value);
    }
    /** Run the remaining properties through serializers */
    Object.keys(value).map((property) => {
      Object.assign(value, {
        [property]: this.transform('serialize', property, value[property])
      })
    });
    return value;

    /** Run the remaining properties through serializers */
    /*return Object.keys(value).reduce((serialized, property) => {
      return Object.assign(serialized, {
        [property]: this.transform('serialize', property, value[property])
      });
    }, {});*/
  }

  /** Saves the given value. Run serializers before assigning the new value. */
  save(value: T = this.body): Promise<Item<T>> {
    if (this.config.onSave) {
      return Promise.resolve(this.config.onSave(this, value))
      // return Promise.resolve(this.config.onSave(this, this.serialize(value)))
      .then((value: T) => {
        this.body = value;
        return this;
      });
    }
    Object.assign(this.resolve() || {}, value);
    // Object.assign(this.resolve() || {}, this.serialize(value));
    return Promise.resolve(this);
  }
}