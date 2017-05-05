import { ItemConfig } from './item-config.interface';

/**
 *  Configuration for List Classes.
 * */
export interface ListConfig extends ItemConfig<any> {
  /** The property name that is sorted after */
  sortBy?: string;
  /** If set to true, the sorting will be descending */
  desc?: boolean;
  /** A Function to expose relevant part of item objects.
   * @example
   * ```(item) => item.value```
   **/
  resolve?: (item: any) => any;
  /** If true, the list will have no checkboxes and selection feature. */
  disableSelection?: boolean
}
