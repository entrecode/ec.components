import { FieldConfig } from '../config/field-config.interface';
import { FieldConfigProperty } from '../config/field-config-property.interface';
export interface ItemConfig<T> {
  /** The Property that is used to identify items from another. */
  identifier?: string;
  /** The Property that is used to display the item for humans */
  label?: string;
  /** The Items field Config */
  fields?: FieldConfig<FieldConfigProperty>;
  /** The type of the Item. It determines how it will be displayed in different contexts */
  type?: string;
  /** Custom resolve path function. It can be used e.g. to access subbranches of an Object. */
  resolve?: (body: T) => any;
  /** Contains the parent Instance which inhabits the item. This property is set programmatically and therefore meant to be readonly.*/
  parent?: any;
}
