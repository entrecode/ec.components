import { FieldConfigProperty } from './field-config-property.interface';

/**
 * Configuration for list fields.
 */
export interface FieldConfig {
  /** Each field can be configured in the form of FieldConfigProperty. */
  [key: string]: FieldConfigProperty;
}
