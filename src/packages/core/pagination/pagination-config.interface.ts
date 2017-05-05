import { ListConfig } from '../list/list-config.interface';
/** Configuration of Pagination instances. */
export interface PaginationConfig extends ListConfig {
  /** The current active page */
  page?: number,
  /** The number of items per page */
  size?: number,
}