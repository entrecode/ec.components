import { PaginationConfig } from '@ec.components/core';
/** Configuration for an EntryList instance */
export interface EntryListConfig extends PaginationConfig {
  /** Property that is sorted after. */
  sort?: Array<string>;
  /** SDK Entry Filter Object. */
  filter?: any;
}