/**
 * Configuration for list fields.
 */
export interface FieldConfig<FieldConfigProperty> {
  /** Each field can be configured in the form of FieldConfigProperty. */
  [key: string]: FieldConfigProperty
}
