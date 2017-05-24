/** Configuration for a FieldConfig property. */
export interface FieldConfigProperty {
  /** Property name */
  property?: string;
  /** Human readable field label*/
  label?: string;
  /** Custom field template (experimental) */
  template?: string;
  /** Custom display transformation function.
   * @param value The current property value
   * @param field The field property name */
  display?: (value, field) => any;
  /** Custom resolve transformation function.
   * @param body The item body */
  resolve?: (body: any, item: any) => any;
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
  /** The field's type (use FieldType.*) */
  type?: string;
  /** The model title of the entries/entry field */
  model?: string;
  /** The type of cell view. (e.g. labels, email etc..) */
  view?: string;
  /** Tells if the field should be hidden */
  hidden?: boolean;
  /** Tells if the field is required in forms */
  required?: boolean;
  /** The field's JSON schema. */
  schema?: {
    type: string;
    title: string
  };
}