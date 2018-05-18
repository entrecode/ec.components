/** A Form is an extension of an Item. In advance to an Item it will create an Array of fields that is either extracted from config.fields or directly from the item body.*/

import { FieldConfigProperty } from '@ec.components/core';
import { Field } from '../field/field';
import { Item } from '../item/item';
import { FormConfig } from './form-config.interface';

/** The Form class is an Item with additional info about its properties (Fields). */
export class Form<T> extends Item<T> {
  /** Array of fields. It will be populated automatically when the form is constructed. */
  public fields: Field[];
  /** The configuration of the form. It is an extension of ItemConfig. */
  public config: FormConfig<T>;

  /** The constructor will populate the fields array.
   * If config.fields is set only the configured fields will be created.
   * If not, all properties of the given body will be used as fields. */
  constructor(body: T, config?: FormConfig<T>) {
    super(body, config);
    this.fields = [];
    if (!this.config || !this.config.fields) {
      return;
    }
    Object.keys(this.config.fields)
      .forEach((property) => {
        this.fields.push(new Field(property, this.config.fields[property]));
      });
  }

  /** creates and adds a single field to the form */
  createField(property: string, config: FieldConfigProperty): Field | undefined {
    if (!config) {
      return;
    }
    if (!property) {
      return;
    }
    if (this.config.fields[property]) {
      console.error('cannot create field "', property, '". Property name already taken.');
      return;
    }
    this.config.fields[property] = config;
    const field = new Field(property, this.config.fields[property]);
    this.fields = this.fields.concat([field]);
    return field;
  }

  /** returns the field instance of the given property */
  getField(property: string) {
    return this.fields.find((field) => field.property === property);
  }

  /** Returns the original value of the property, if any. */
  getValue(property: string) {
    if (!this.body && this.config.fields && this.config.fields[property]) {
      // If the prefill is not a primitive, return a clone to stay pristine
      if (Array.isArray(this.config.fields[property].prefill)) {
        return this.config.fields[property].prefill.slice(0);
      } else if (typeof this.config.fields[property].prefill === 'object') {
        return Object.assign({}, this.config.fields[property].prefill);
      }
      // if no body is present, the prefills are used
      return this.config.fields[property].prefill;
    } else {
      return this.resolve(property);
    }
  }
}
