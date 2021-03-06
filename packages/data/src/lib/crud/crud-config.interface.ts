import { ListConfig, FieldConfig } from '@ec.components/core';
import { NotificationsComponent, LoaderComponent } from '@ec.components/ui';
import { FileOptions } from '../files/file.service';

/** The CrudConfig allows a quick customization of an ec-crud component. */
export interface CrudConfig<T> extends ListConfig<T> {
  /** The fields that are used in select dropdowns, defaults to label field only. */
  dropdownFields?: FieldConfig;
  /** The label for one entity */
  singularLabel?: string;
  /** The label for the save button, defaults to "Speichern" */
  saveButtonLabel?: string;
  /** The label for the delete button, defaults to "Löschen" */
  deleteButtonLabel?: string;
  /** The label for multiple entities */
  pluralLabel?: string;
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
  /** maps the permissions to the methods post put create delete */
  permissions?: { put?: string | boolean; post?: string | boolean; get?: string | boolean; delete?: string | boolean };
  /** If true, no select mode switch will be shown */
  disableSelectSwitch?: boolean;
  /** If true, no list pop will be available at selects */
  disableListPop?: boolean;
  /** If true, assets cannot be upload via url */
  disableUrlUpload?: boolean;
  /** If true, no create pop will be available at selects */
  disableCreatePop?: boolean;
  /** If true, no dropdown will be accessible */
  disableSearchbar?: boolean;
  /** If true, removal of items wont be possible (select) */
  disableRemove?: boolean;
  /** If true, selects will delete entries that are removed from the selection */
  deleteOnRemove?: boolean;
  /** If true, delete operations need confirmation */
  safeDelete?: boolean;
  /** Hides the assetGroup select in asset-list-pop */
  hideAssetGroupSelect?: boolean;
  /** Default options for file uploads */
  fileOptions?: FileOptions;
  /** If true, a pop will open before upload to set up custom options */
  customUpload?: boolean;
  /** Defines the column width of the pops used. Defaults to popService.defaultColumns */
  popColumns?: number;
  /** If true, a nested pop will be active immediately */
  nestedPopActive?: boolean;
  /** Sets a placeholder. Used e.g. for empty entry-select */
  placeholder?: string;
}
