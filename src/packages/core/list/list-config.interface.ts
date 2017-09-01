import { ItemConfig } from '..';

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
  /** The current active page */
  page?: number,
  /** The number of items per page */
  size?: number,
  /** Should the selection be solo? */
  solo?: boolean,
  /** tells the list to show only items that match the filter */
  filter?: { [key: string]: any },
  /** a query that will be turned in to a filter */
  query?: { [key: string]: any },
}
