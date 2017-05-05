import { FieldConfigProperty } from '../index';
export class Field<T> {
  /** The value body of the item. */
  private value: T;
  public config: FieldConfigProperty;

  constructor(value: T, config: FieldConfigProperty) {
    this.value = value;
    this.config = config || {};
  }

  /** Transforms the given field's value for displaying */
  display(): any {
    if (!this.config.display) {
      return this.value;
    }
    return this.config.display(this.value, this);
  }
}
