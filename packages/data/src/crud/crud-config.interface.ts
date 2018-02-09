import { LoaderComponent } from '@ec.components/ui/src/loader/loader.component';
import { NotificationsComponent } from '@ec.components/ui/src/notifications/notifications.component';
import { ListConfig } from '@ec.components/core/src/list/list-config.interface';

/** The CrudConfig allows a quick customization of an ec-crud component. */
export interface CrudConfig<T> extends ListConfig<T> {
  /** The label for the entry create button */
  createLabel?: string;
  /** An Array of Methods that should be supported. Possible values are create, read, update and delete*/
  methods?: Array<string>;
  /** An external loader component that should be used, falls back to internal. */
  loader?: LoaderComponent;
  /** An external notifications component that should be used, falls back to internal */
  notifications?: NotificationsComponent;
  /** If true, an extra develop button will be shown*/
  develop?: boolean;
  /** If true, the entry pop will remain open after the entry has been successfully saved. */
  keepPopOpen?: boolean;
  /** With how many levels should a list entry be loaded? Defaults to 1 (taking entry directly from the list, without loading)*/
  levels?: number;
  /** If true, an entry is always loaded when opened, even with lvl1 */
  alwaysLoadEntry?: boolean;
  /** The class that should be used for the pop. */
  popClass?: string;
  /** The class that should be used for the nested resources pops, defaults to no class. */
  nestedPopClass?: string;
  /** maps the permissions to the methods post put create delete */
  permissions?: { put?: string | boolean, post?: string | boolean, get?: string | boolean, delete?: string | boolean }
}
