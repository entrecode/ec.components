/**
 * Configuration for list fields.
 */
export interface FieldConfig<FieldConfigProperty> {
  /** Each field can be configured in the form of FieldConfigProperty. */
  [key: string]: FieldConfigProperty,
  /** This helper property is only used to provide a link to the interface of each property!*/
  propertyConfig?: FieldConfigProperty
}