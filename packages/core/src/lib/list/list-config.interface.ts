import { ItemConfig } from '../item/item-config.interface';
import { List } from '../list/list';
import { Item } from '../item/item';

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
  selectMode?: boolean;
  /** If true, no select dropdown will be shown on ec-select */
  disableSearchbar?: boolean;
  /** If true, the list will have no header. */
  disableHeader?: boolean;
  /** If true, the header will also be shown when the list is empty. Defaults to false */
  alwaysShowHeader?: boolean;
  /** If true, no dropdown will be shown for a select */
  disableDropdown?: boolean;
  /** If true, removal of items wont be possible (select) */
  disableRemove?: boolean;
  /** If true, no column filter will be shown in the list header */
  disableColumnFilter?: boolean;
  /** If true, select items cannot be dragged */
  disableDrag?: boolean;
  /** If true, the default pagination will not be visible. */
  hidePagination?: boolean;
  /** The current active page */
  page?: number;
  /** The number of items per page */
  size?: number;
  /** The available sizes. If not set, the size cannot be changed */
  availableSizes?: number[];
  /** Should the selection be solo? */
  solo?: boolean;
  /** tells the list to show only items that match the filter */
  filter?: { [key: string]: any };
  /** a query that will be turned in to a filter */
  query?: { [key: string]: any };
  /** Maximal visible columns. Defaults to 8 */
  maxColumns?: number;
  /** how many columns should the pop have? */
  popColumns?: number;
  /** If true, the list will automatically load on change */
  autoload?: boolean;
  /** The key that should store the lists config in the local storage.
   * If set, the key will be populated on config changes. */
  storageKey?: string | ((list: List<T>) => string);
  /** Transforms the Items before they are displayed, e.g. to apply a filter for the view **/
  display?: (items: Item<T>[]) => Item<T>[];
}
