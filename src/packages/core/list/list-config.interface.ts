import { ItemConfig } from '..';

/**
 *  Configuration for List Classes.
 * */
export interface ListConfig<T> extends ItemConfig<T> {
  /** The property name that is sorted after */
  sortBy?: string;
  /** Array of properties that is sorted after, experimental... */
  sort?: string[];
  /** If set to true, the sorting will be descending */
  desc?: boolean;
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
