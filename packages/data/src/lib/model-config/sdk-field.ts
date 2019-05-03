/**
 * Field Config as obtained by PublicAPI#getFieldConfig.
 * See https://doc.entrecode.de/data_manager/#field-data-types for more info
 */
export interface SdkField {
  /** further field config options (like columns etc.) */
  config: Object;
  /** Field Type */
  type: string;
  /** System Title */
  title: string;
  /** Unique: each entry has a unique value for that field */
  unique: boolean;
  /** Default value that is returned for a newly created required field on old entries */
  default: string;
  /** Tells if the field value can be changed. If true, the field is a system field  */
  mutable: boolean;
  /** If true, the field can only be altered when creating. */
  readOnly: boolean;
  /** If true, the field must have a value */
  required: boolean;
  /** Validation info, depends on field type. */
  validation: string;
  /** Field Description. Used for placeholders */
  description: string;
  /** Not implemented yet. */
  localizable: boolean;
}
