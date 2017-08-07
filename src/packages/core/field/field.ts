import { FieldConfigProperty } from '..';

/** A Field acts as a property of an Item. It holds a single Property config. */
export class Field<T> implements FieldConfigProperty {
  /** Tells if the field is required in forms */
  required?: boolean;
  /** The name of the field's property */
  property?: string;
  /** If true, the field will not be visible anywhere */
  hidden?: boolean;
  /** The field's type */
  type?: string;
  /** The field's view */
  view?: string;
  /** Custom Validation function */
  validate?: (value, field) => any;
  /** Custom Component to display form input **/
  input?: any;
  /** Custom Component to display value **/
  output?: any;

  /** A Field is constructed by assigning the given config and the property to itself*/
  constructor(property: string, config: FieldConfigProperty = {}) {
    Object.assign(this, config);
    Object.assign(this, { property });
  }
}
