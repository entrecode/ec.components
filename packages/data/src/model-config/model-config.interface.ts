import { FieldConfig, FieldConfigProperty } from '../../../core';

/** This is the interface for a model's configuration.*/
export interface ModelConfig {
  /** Array of FieldConfigProperty Objects. Sets up the behaviour of each field. */
  fields?: FieldConfig<FieldConfigProperty>
}
