import { Item } from './item';
import { FieldConfig } from '../config/field-config.interface';
/** An ItemConfig describes an abstract entity with certain properties.*/
export interface ItemConfig<T> {
    /** For primitive values only: the title for the item */
    title?: string;
    /** The Property that is used to identify items from another (e.g. in a selection). */
    identifier?: string;
    /** Pattern of the identifier field. Is used e.g. in the searchbar */
    identifierPattern?: RegExp;
    /** The Property that is used to display the item for humans */
    label?: string;
    /** The Items field Config */
    fields?: FieldConfig;
    /** The type of the Item. It determines how it will be displayed in different contexts */
    type?: string;
    /** Custom resolve path function. It can be used e.g. to access subbranches of an Object. */
    resolve?: (body: T) => any;
    /** Contains the parent Instance which inhabits the item. This property is set programmatically and therefore meant to be readonly.*/
    parent?: any;
    /** Callback that is invoked when the item is saved */
    onSave?: (item?: Item<T>, value?: Object) => Promise<T> | T;
    /** Callback that is invoked before the item is edited */
    onEdit?: (value?: T) => Promise<T> | T;
    /** This method can be used to set custom classes based on item contents. Used e.g. in list-items for row class */
    classes?: (item?: Item<T>) => string;
}
