/** A Field acts as a property of an Item. It holds a single Property config. */

import { FieldConfigProperty } from '../config/field-config-property.interface';

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
  /** Placeholder in inputs */
  placeholder?: string;
  /** Label for Inputs */
  label?: string;
  /** The operator to use for filtering: exact, search, any etc.. see ec.sdk doc */
  filterOperator?: string;
  /** Defines the class for the filter pop, e.g. in list header. */
  filterPopClass?: string;
  /** Wether or not the field should appear in default forms */
  form?: boolean;

  /** A Field is constructed by assigning the given config and the property to itself*/
  constructor(property: string, config: FieldConfigProperty = {}) {
    Object.assign(this, config);
    Object.assign(this, { property: property });
  }

  /** Returns placeholder if any */
  getPlaceholder() {
    return this.placeholder || this.label || this.property;
  }
}
