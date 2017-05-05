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
  /** Custom group transformation function. Its return value will be used for grouping.
   *
   * Custom display transformation function.
   * @param value The current property value
   * @param field The field property name */
  group?: (value, field) => any;
  /** The field's type (use FieldType.*) */
  type?: string;
  /** The model title of the entries/entry field */
  model?: string;
  /** The type of cell view. (e.g. labels, email etc..) */
  view?: string;
  /** The field's JSON schema. */
  schema?: {
    type: string;
    title: string
  };
}