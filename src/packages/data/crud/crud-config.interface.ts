import { LoaderComponent } from '../../ui/loader/loader.component';
import { NotificationsComponent } from '../../ui/notifications/notifications.component';
import { EntryListConfig } from '../entry-list/entry-list-config';
import { Selection } from '../../core/selection/selection';
import { EntryResource } from "ec.sdk/typings/resources/publicAPI/EntryResource";

/** The CrudConfig allows a quick customization of an ec-crud component. */
export class CrudConfig {
  /** The label for the entry create button */
  createLabel?: string;
  /** An Array of Methods that should be supported. Possible values are create, read, update and delete*/
  methods?: Array<string>;
  /** An external loader component that should be used, falls back to internal. */
  loader?: LoaderComponent;
  /** An external notifications component that should be used, falls back to internal */
  notifications?: NotificationsComponent;
  /** The list config that should be used. Falls back to default. */
  listConfig?: EntryListConfig;
  /** If true, the entry pop will remain open after the entry has been successfully saved. */
  keepPopOpen?: boolean;
  /** If true, an extra develop button will be shown*/
  develop?: boolean;
  /** The selection that should be used */
  selection?: Selection<EntryResource>;
  /** With how many levels should a list entry be loaded? Defaults to 1 (taking entry directly from the list, without loading)*/
  levels?: number;
}