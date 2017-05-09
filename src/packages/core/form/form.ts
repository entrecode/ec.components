import { FormConfig } from './form-config.interface';
import { FieldConfigProperty } from '../config/field-config-property.interface';
import { Item } from '../item/item';
import { Field } from '../field/field';

export class Form<T> extends Item<T> {
  fields: FieldConfigProperty[];
  protected config: FormConfig<T>;

  constructor(body: T, config?: FormConfig<T>) {
    super(body, config);
    this.fields = [];
    if (this.config.fields) {
      Object.keys(this.config.fields).forEach((property) => {
        this.fields.push(new Field(property, this.config.fields[property]));
      });
    } else {
      this.getProperties().forEach((property) => {
        this.fields.push(new Field(property, { type: typeof this.resolve(property) }));
      })
    }
  }
}