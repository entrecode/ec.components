import { ItemConfig } from '../item/item-config.interface';

/**
 *  Configuration for List Classes.
 * */
export interface ListConfig<T> extends ItemConfig<T> {
  /** For lists with primitive values only: the title of the list header */
  title?: string;
  /** The property name that is sorted after */
  sortBy?: string;
  /** Array of properties that is sorted after, experimental... */
  sort?: string[];
  /** If set to true, the sorting will be descending */
  desc?: boolean;
  /** If true, the list will show its checkboxes and will select on column click.
   * The columnClicked output will be ignored as long selectMode is active */
  selectMode?: boolean
  /** If true, the list will have no header. */
  disableHeader?: boolean
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
  /** Maximal visible columns. Defaults to 8 */
  maxColumns?: number
}
