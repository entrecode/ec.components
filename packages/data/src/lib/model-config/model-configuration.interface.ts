import { FieldConfig } from '@ec.components/core';
/** This is the interface for a model's configuration.*/
export interface ModelConfiguration {
  /** Array of FieldConfigProperty Objects. Sets up the behaviour of each field. */
  fields?: FieldConfig;
}
