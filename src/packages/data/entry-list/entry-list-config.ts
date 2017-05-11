import { ListConfig } from '../../core';
/** Configuration for an EntryList instance */
export interface EntryListConfig extends ListConfig {
  /** Property that is sorted after. */
  sort?: Array<string>;
  /** SDK Entry Filter Object. */
  filter?: any;
}