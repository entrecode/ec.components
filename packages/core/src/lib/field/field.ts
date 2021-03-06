/** A Field acts as a property of an Item. It holds a single Property config. */

import { FieldConfigProperty } from '../config/field-config-property.interface';

export class Field implements FieldConfigProperty {
  /** Tells if the field is required in forms */
  required?: boolean;
  /** The name of the field's property */
  property?: string;
  /** If true, the field will not be visible anywhere */
  hidden?: boolean;
  /** If true, the field will autofocus after view init */
  autofocus?: boolean;
  /** The field's type */
  type?: string;
  /** The field's view */
  view?: string;
  /** Custom Validation function */
  validate?: (value, field) => any;
  /** Custom clean function to prepare for save */
  beforeSave?: (value?, field?, body?) => any;
  /** Custom Component to display form input **/
  input?: any;
  /** Custom Component to display value **/
  output?: any;
  /** Placeholder in inputs */
  placeholder?: string;
  /** Label for Inputs. Defaults to property name. If false, the label is empty. */
  label?: string | boolean;
  /** The operator to use for filtering: exact, search, any etc.. see ec.sdk doc */
  filterOperator?: string;
  /** Defines the class for the filter pop, e.g. in list header. DEPRECATED */
  filterPopClass?: string;
  /** If true, the form input label will always be hidden */
  hideFormLabel?: boolean;
  /** If true, the form input label will be hidden if no value is set */
  hideFormLabelIfEmpty?: boolean;
  /** Wether or not the field should appear in default forms */
  form?: boolean;
  /** Possible Values e.g. in a select */
  values: any[] = [];
  /** Class string */
  class = '';
  /** id for form labels */
  id: string;
  /** if false, the field will not be sortable in a list */
  sortable?: boolean;
  /** if false, the field will not be filterable in a list */
  filterable?: boolean;
  /** Defines the maximum of visible item (for tags view or similar). Defaults to 10 */
  maxItems?: number;
  /** Icon name that should be associated with the field */
  icon?: string;
  /** wildcard for custom config values */
  [key: string]: any;

  /** A Field is constructed by assigning the given config and the property to itself*/
  constructor(property: string, config: FieldConfigProperty) {
    if (config) {
      Object.assign(this, config);
    }
    Object.assign(this, { property: property });
    this.id = `${this.property}_${Date.now()}`;
  }

  /** Returns placeholder if any */
  getPlaceholder() {
    return this.placeholder || this.label || this.property;
  }
  /** Returns the fields label */
  getLabel() {
    if (this.label === false) {
      return '';
    }
    return this.label || this.property;
  }
  /** Returns the view for the given occasion */
  getView(occasion?) {
    return this[occasion + 'View'] || this.view;
  }
  /** Returns the component for the given occasion */
  getComponent(occasion?) {
    return this[occasion + 'Component'];
  }
}
