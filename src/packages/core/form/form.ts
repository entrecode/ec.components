/** A Form is an extension of an Item. In advance to an Item it will create an Array of fields that is either extracted from config.fields or directly from the item body.*/

import { Item } from '../item/item';
import { Field } from '../field/field';
import { FormConfig } from './form-config.interface';

/** The Form class is an Item with additional info about its properties (Fields). */
export class Form<T> extends Item<T> {
  /** Array of fields. It will be populated automatically when the form is constructed. */
  fields: Field<T>[];
  /** The configuration of the form. It is an extension of ItemConfig. */
  protected config: FormConfig<T>;

  /** The constructor will populate the fields array. If config.fields is set only the configured fields will be created. If not, all properties of the given body will be used as fields. */
  constructor(body: T, config?: FormConfig<T>) {
    super(body, config);
    this.fields = [];
    if (this.config.fields) {
      Object.keys(this.config.fields)
      .filter((key) => this.config.fields[key].form !== false)
      .forEach((property) => {
        this.fields.push(new Field(property, this.config.fields[property]));
      });
    } else {
      this.getProperties().forEach((property) => {
        this.fields.push(new Field(property, { type: typeof this.resolve(property) }));
      })
    }
  }

  /** returns the field instance of the given property */
  getField(property: string) {
    return this.fields.find((field) => field.property === property);
  }

  /** Returns the original value of the property, if any. */
  getValue(property: string, shouldPrefill: boolean = false) {
    if (shouldPrefill && this.config.fields && this.config.fields[property]) {
      return this.config.fields[property].prefill;
    } else {
      return (this.resolve() || {})[property];
    }
  }
}