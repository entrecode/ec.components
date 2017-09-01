import { LoaderComponent } from '../../ui/loader/loader.component';
import { NotificationsComponent } from '../../ui/notifications/notifications.component';
import { EntryListConfig } from '../entry-list/entry-list-config';
import { Selection } from '../../core/selection/selection';
import EntryResource from "ec.sdk/src/resources/publicAPI/EntryResource";

/** The CrudConfig allows a quick customization of an ec-crud component. */
export interface CrudConfig extends EntryListConfig {
  /** The label for the entry create button */
  createLabel?: string;
  /** An Array of Methods that should be supported. Possible values are create, read, update and delete*/
  methods?: Array<string>;
  /** An external loader component that should be used, falls back to internal. */
  loader?: LoaderComponent;
  /** An external notifications component that should be used, falls back to internal */
  notifications?: NotificationsComponent;
  /** If true, the entry pop will remain open after the entry has been successfully saved. */
  keepPopOpen?: boolean;
  /** If true, an extra develop button will be shown*/
  develop?: boolean;
  /** The selection that should be used */
  selection?: Selection<EntryResource>;
  /** With how many levels should a list entry be loaded? Defaults to 1 (taking entry directly from the list, without loading)*/
  levels?: number;
  /** If true, an entry is always loaded when opened, even with lvl1 */
  alwaysLoadEntry?: boolean;
  /** The class that should be used for the pop, defaults to modal */
  popClass?: string;
  /** The class that should be used for the nested resources pops, defaults to no class. */
  nestedPopClass?: string;
}