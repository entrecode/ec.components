import { Field, FormConfig, Item } from '..';

/** A Form is an extension of an Item. In advance to an Item it will create an Array of fields that is either extracted from config.fields or directly from the item body.*/
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
}