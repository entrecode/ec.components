import { FieldConfigProperty } from '../index';
/** A Field acts as a property of an Item. It holds a single Property config. */
export class Field<T> implements FieldConfigProperty {
  /** Tells if the field is required in forms */
  required?: boolean;
  constructor(property: string, config: FieldConfigProperty = {}) {
    Object.assign(this, config);
    Object.assign(this, { property: property });
  }
}
