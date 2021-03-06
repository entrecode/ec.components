import { ItemConfig } from './item-config.interface';

/** An Item basically wraps an Object and provides a config with metadata and helper methods to access the object. */
export class Item<T> {
  /** The value body of the item. This can be either a primitive value or an Object. */
  public body: T;
  /** The config of the item. */
  public config: ItemConfig<T>;

  /** Each item is constructed with its body and an optional config. */
  constructor(body: T, config: ItemConfig<T> = {}) {
    this.body = body;
    this.config = config || this.generateConfig();
  }

  /** Generates a config from the body by setting view to the properties type. */
  protected generateConfig(): ItemConfig<T> {
    const config = { fields: {} };
    if (this.body === undefined) {
      return config;
    }
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
    this.config = (<any>Object).assign(this.config, config);
  }

  /** Returns the item's config */
  getConfig() {
    return this.config;
  }

  /** Returns an Array of properties possessed by the body. */
  getProperties(): Array<string> {
    if (!this.body || typeof this.body !== 'object') {
      if (typeof this.body !== 'object') {
        return [this.config && this.config.title ? this.config.title : 'body'];
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
        return this.config.resolve(this.body, this);
      }
      return this.body;
    }
    if (this.config.fields && this.config.fields[property] && this.config.fields[property].resolve) {
      return this.config.fields[property].resolve(this.body, this, property);
    }
    if (!this.config.resolve) {
      return this.body[property];
    }
    const v = this.config.resolve(this.body, this);
    return v ? v[property] : null;
  }

  /** Resolves the given path on the item object. e.g. "value.config.usePassword" will resolve that object path, if existing. */
  resolvePath(path: string) {
    return getPath(this.body, path);
  }

  /** The main method for transformation functions like resolve, display and group.
   * If you dont set the third parameter, the current item value will be used.
   * The third parameter can be used to transform a value that is not yet possesed (e.g. to
   * serialize) */
  public transform(
    action: string,
    property: string,
    value: any = this.resolve(property),
    defaultValue: any = this.resolve(property),
  ) {
    if (!this.hasBody()) {
      return;
    }
    if (this.config.fields && this.config.fields[property] && this.config.fields[property][action]) {
      return this.config.fields[property][action](value, this.body, property);
    }
    return defaultValue;
  }

  /** Returns the output of the config.group transformation function with the given property value.
   * If no group function is set, it will just return the property value.*/
  group(property: string): any {
    return this.transform('group', property);
  }

  /** If no property given: Returns the output of the config.classes method or ''.
   * If property given: Returns the output of the config.fields[property].classes method or '' */
  classes(property?: string): string {
    if (property) {
      return this.transform('classes', property, this.resolve(property), '') || '';
    }
    if (!this.config || !this.config.classes) {
      return '';
    }
    return this.config.classes(this);
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
  pickWriteOnly(value = this.body) {
    return (<any>Object).assign(
      {},
      ...Object.keys(value)
        .map((property) => {
          if (this.config.fields[property].readOnly) {
            return;
          }
          return { [property]: value[property] };
        })
        .filter((v) => !!v),
    );
  }

  isImmutableProperty(property: string): boolean {
    if (
      this.config &&
      this.config.fields &&
      this.config.fields[property] &&
      typeof this.config.fields[property].immutable === 'function'
    ) {
      return this.config.fields[property].immutable(this);
    }
    return this.config.fields[property].immutable;
  }

  deleteImmutableProperties(value: Object = this.body) {
    Object.keys(this.config.fields).forEach((property) => {
      if (value.hasOwnProperty(property) && this.isImmutableProperty(property)) {
        delete value[property];
      }
    });
  }

  /** Transforms the given field's value for serialization when saving. */
  serialize(value, put: boolean = false): any {
    if (put) {
      value = this.pickWriteOnly(value);
    }
    this.deleteImmutableProperties(value);
    /** Run the remaining properties through serializers */
    Object.keys(value).map((property) => {
      (<any>Object).assign(value, {
        [property]: this.transform('serialize', property, value[property]), // TODO: fix
      });
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
      return new Promise((resolve, reject) => {
        try {
          Promise.resolve(this.config.onSave(this, value)).then((_value: T) => {
            this.body = _value;
            resolve(this);
          }).catch(error => reject(error));
        } catch (error) {
          reject(error);
        }
      });
    }
    this.body = (<any>Object).assign(this.resolve() || {}, value);
    return Promise.resolve(this);
  }
  /** Action method that is meant to be called on a button click or similar.
   * Calls the config#action method with the item and the property name */
  action(property, e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    if (this.config.fields[property].action) {
      this.config.fields[property].action(this, property);
    }
  }
}

function getPath(o, path) {
  const p = path.split('.');
  return p.length === 1 ? (o || {})[p[0]] : getPath((o || {})[p[0]], p.slice(1).join('.'));
}