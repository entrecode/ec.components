import { Type } from '@angular/core';

/** Configuration for a FieldConfig property. */

export interface FieldConfigProperty {
  /** Property name */
  property?: string;
  /** Human readable field label. Defaults to property name. If false, the label is empty. */
  label?: string | boolean;
  /** Placeholder in inputs */
  placeholder?: string;
  /** Custom resolve transformation function.
   * @param body The item body */
  resolve?: (body: any, item: any, property: string) => any;
  /** Custom resolve method to get the title, has priority over label property. */
  title?: (body: any, item: any, property: string) => any;
  /** Custom edit transformation function. It is used before editing the value, e.g. in a form.
   * @param body The item body */
  // edit?: (value, field, property: string) => any;
  /** Custom serialize transformation function. It is used before saving it, e.g. in a form.
   * @param body The item body */
  // serialize?: (value, field, property: string) => any;
  /** Custom display transformation function.
   * @param value The current property value
   * @param field The field property name */
  display?: (value, field, property: string) => any;
  /** Custom copy transformation function.
   * @param value The current property value
   * @param field The field property name */
  copy?: (value, field, property: string) => any;
  /** Custom group transformation function. Its return value will be used for grouping.
   * @param value The current property value
   * @param field The field property name */
  group?: (value, field) => any;
  /** Custom sort transformation function. Its return value will be used for sorting.
   * @param value The current property value
   * @param field The field property name */
  sort?: (value, field) => any;
  /** Custom validation function. Its return value will be used for validation in a form.
   * @param value The current property value
   * @param field The field property name */
  validate?: (value, field) => any;
  /** Custom validation function. Its return value will be used for validation in a form.
   * @param value The current property value
   * @param field The field property name */
  filter?: (value, items) => any;
  /** The field's type (use FieldType.*) */
  type?: string;
  /** The model title of the entries/entry field */
  model?: string;
  /** The type of cell view. (e.g. tags, email etc..) */
  view?: string;
  /** The type of form input view. Defaults to type if not specified. */
  inputView?: string;
  /** Tells if the field should be hidden */
  hidden?: boolean;
  /** Tells if the field is required in forms */
  required?: boolean;
  /** The field's JSON schema. */
  schema?: {
    type: string;
    title: string;
  };
  /** Custom Component for input (forms) */
  input?: Type<any>;
  /** Custom Component for output (e.g. list cell) */
  output?: Type<any>;
  /** If true, the form input will be disabled when editing */
  readOnly?: boolean;
  /** If true, the property will always be disabled (like readOnly but also on create) */
  disabled?: boolean | any;
  /** If true, the property will be ignored when saving (filtered out from object of emitted object) */
  immutable?: boolean | any;
  /** if false, the field will not be filterable in a list */
  filterable?: boolean;
  /** The operator to use for filtering: exact, search, any etc.. see ec.sdk doc */
  filterOperator?: string;
  /** Defines the class for the filter pop, e.g. in list header. DEPRECATED */
  filterPopClass?: string;
  /** Transforms a string value from the url query to a value that is used for filtering.
   * e.g. transforms "A,B,C" to ['A','B','C'] */
  queryFilter?: (value: string) => any;
  /** if false, the field will not be sortable in a list */
  sortable?: boolean;
  /** if false, the field will not be visible in a list */
  list?: boolean;
  /** if false, the field will not be visible in a form */
  form?: boolean;
  /** If a prefill value is set, it will be used at creation in a form. */
  prefill?: any;
  /** Possible Values e.g. for a select */
  values?: any[];
  /** Defines the maximum of visible item (for tags view or similar). Defaults to 10 */
  maxItems?: number;
  /** Any other configuration properties*/
  action?: (item: any, property: string) => any;
  /** Class string */
  class?: string;
  /** Icon name that should be associated with the field */
  icon?: string;
  /** Related identifier e.g. model name or assetGroupID */
  relation?: string;
  /** If true, the field will be filtered raw (no filterOperator magic) */
  rawFilter?: boolean;
  /** Columns that the field should inhabit in the form grid. */
  columns?: number;
  /** If true, the field wont be shown in the list column filter. */
  hideInColumnFilter?: boolean;
  /** If true, the field wont be shown in the form */
  hideInForm?: boolean;
  /** If true, the field title will be shown beside the label (if any) */
  showTitle?: boolean;
  /** If true, the field description will be shown below the label (if any) */
  showDescription?: boolean;
  /** If true, the field will be hidden in the list (but still be loaded) */
  /* hideInList?: boolean; */
  /** is fired when the value changes in a form */
  changed?: (value: any, form: any) => void;
  /** if true, the field will auto focus after view init */
  autofocus?: boolean;
  /** wildcard for custom config values */
  [key: string]: any;
}
